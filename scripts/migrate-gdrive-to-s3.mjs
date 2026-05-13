/**
 * Google Drive -> S3 migracija
 *
 * Skida fajlove iz javno dijeljenog Drive foldera i uploada ih u S3
 * uz istu strukturu pod prefixom (default: `graphicDesign/`).
 *
 * .env.local mora imati:
 *   AWS_ACCESS_KEY_ID
 *   AWS_SECRET_ACCESS_KEY
 *   AWS_REGION              (default eu-central-1)
 *   AWS_S3_BUCKET           (default fulkrums-data)
 *   GOOGLE_API_KEY          (Google Cloud Console -> APIs & Services -> Credentials -> API key,
 *                            sa enable-ovanim "Google Drive API"; restrict na Drive API je dovoljno)
 *
 * Pokretanje:
 *   node scripts/migrate-gdrive-to-s3.mjs
 *   node scripts/migrate-gdrive-to-s3.mjs <folderId> <s3Prefix>
 *   node scripts/migrate-gdrive-to-s3.mjs --dry-run
 *   node scripts/migrate-gdrive-to-s3.mjs --overwrite     (default: preskoči ako već postoji)
 */

import 'dotenv/config';
import { google } from 'googleapis';
import {
  S3Client,
  HeadObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { Readable } from 'node:stream';
import { buffer as readToBuffer } from 'node:stream/consumers';
import mime from 'mime-types';

// ---------- args ----------
const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith('--')));
const positional = args.filter((a) => !a.startsWith('--'));

const DRY_RUN = flags.has('--dry-run');
const OVERWRITE = flags.has('--overwrite');

const DEFAULT_FOLDER_ID = '1_U0falVvUmjE3ab9XK6xHYqnKmgYCX6p';
const DEFAULT_PREFIX = 'graphicDesign';

const FOLDER_ID = positional[0] || DEFAULT_FOLDER_ID;
const S3_PREFIX = (positional[1] || DEFAULT_PREFIX).replace(/^\/+|\/+$/g, '');

// ---------- env ----------
const {
  GOOGLE_API_KEY,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION = 'eu-central-1',
  AWS_S3_BUCKET = 'fulkrums-data',
} = process.env;

if (!GOOGLE_API_KEY) {
  console.error('❌ GOOGLE_API_KEY nije postavljen u .env.local');
  console.error('   Napravi API key na https://console.cloud.google.com/apis/credentials');
  console.error('   i enable-uj "Google Drive API" za projekat.');
  process.exit(1);
}
if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
  console.error('❌ AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY nisu postavljeni u .env.local');
  process.exit(1);
}

// ---------- clients ----------
const drive = google.drive({ version: 'v3', auth: GOOGLE_API_KEY });
const s3 = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

const FOLDER_MIME = 'application/vnd.google-apps.folder';

// ---------- helpers ----------

async function listChildren(folderId) {
  const items = [];
  let pageToken;
  do {
    const { data } = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: 'nextPageToken, files(id, name, mimeType, size, md5Checksum)',
      pageSize: 1000,
      pageToken,
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    });
    items.push(...(data.files || []));
    pageToken = data.nextPageToken || undefined;
  } while (pageToken);
  return items;
}

// Vrati niz {file, relativePath} obilaskom u dubinu.
async function walk(folderId, relativePath = '') {
  const children = await listChildren(folderId);
  const out = [];
  for (const child of children) {
    const childPath = relativePath ? `${relativePath}/${child.name}` : child.name;
    if (child.mimeType === FOLDER_MIME) {
      const nested = await walk(child.id, childPath);
      out.push(...nested);
    } else {
      out.push({ file: child, relativePath: childPath });
    }
  }
  return out;
}

async function s3KeyExists(key) {
  try {
    await s3.send(new HeadObjectCommand({ Bucket: AWS_S3_BUCKET, Key: key }));
    return true;
  } catch (err) {
    if (err?.$metadata?.httpStatusCode === 404 || err?.name === 'NotFound') return false;
    throw err;
  }
}

async function downloadDriveFile(fileId) {
  // Drive izvorne fajlove (binarne) skidamo sa alt=media.
  // Google-native dokumenti (Docs/Sheets/Slides) traže files.export — preskačemo ih.
  const res = await drive.files.get(
    { fileId, alt: 'media', supportsAllDrives: true },
    { responseType: 'stream' }
  );
  return res.data; // Readable
}

async function uploadToS3(key, body, contentType, contentLength) {
  await s3.send(
    new PutObjectCommand({
      Bucket: AWS_S3_BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType,
      ContentLength: contentLength,
    })
  );
}

function isGoogleNative(mimeType) {
  return mimeType?.startsWith('application/vnd.google-apps.');
}

function formatBytes(n) {
  if (!n) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  let i = 0;
  let v = Number(n);
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v.toFixed(1)} ${units[i]}`;
}

// ---------- main ----------

async function main() {
  console.log('🔄 Drive -> S3 migracija');
  console.log(`   Drive folder:  ${FOLDER_ID}`);
  console.log(`   S3 bucket:     ${AWS_S3_BUCKET} (${AWS_REGION})`);
  console.log(`   S3 prefix:     ${S3_PREFIX}/`);
  console.log(`   Mode:          ${DRY_RUN ? 'DRY RUN' : 'LIVE'}${OVERWRITE ? ' + OVERWRITE' : ''}`);
  console.log('');

  console.log('📂 Listam Drive folder rekurzivno...');
  const entries = await walk(FOLDER_ID);
  console.log(`   Pronađeno ${entries.length} fajlova\n`);

  const stats = {
    uploaded: 0,
    skipped: 0,
    skippedNative: 0,
    failed: 0,
    bytes: 0,
  };

  for (let i = 0; i < entries.length; i++) {
    const { file, relativePath } = entries[i];
    const key = `${S3_PREFIX}/${relativePath}`;
    const idx = `[${i + 1}/${entries.length}]`;

    if (isGoogleNative(file.mimeType)) {
      console.log(`${idx} ⏭️  (google-native) ${relativePath} [${file.mimeType}]`);
      stats.skippedNative++;
      continue;
    }

    if (!OVERWRITE && (await s3KeyExists(key))) {
      console.log(`${idx} ⏭️  postoji  s3://${AWS_S3_BUCKET}/${key}`);
      stats.skipped++;
      continue;
    }

    const contentType =
      file.mimeType && file.mimeType !== 'application/octet-stream'
        ? file.mimeType
        : mime.lookup(file.name) || 'application/octet-stream';

    const sizeStr = formatBytes(file.size);
    console.log(`${idx} ⬆️  ${relativePath} (${sizeStr}) -> s3://${AWS_S3_BUCKET}/${key}`);

    if (DRY_RUN) {
      stats.uploaded++;
      stats.bytes += Number(file.size || 0);
      continue;
    }

    try {
      const driveStream = await downloadDriveFile(file.id);
      // PutObject u v3 voli poznatu dužinu; bufferujemo da bismo poslali ContentLength.
      // Za jako velike fajlove razmisli o @aws-sdk/lib-storage Upload klasi.
      const buf = await readToBuffer(driveStream);
      await uploadToS3(key, buf, contentType, buf.byteLength);
      stats.uploaded++;
      stats.bytes += buf.byteLength;
    } catch (err) {
      console.error(`     ❌ ${err?.message || err}`);
      stats.failed++;
    }
  }

  console.log('');
  console.log('✅ Gotovo');
  console.log(`   Uploaded:        ${stats.uploaded}`);
  console.log(`   Skipped (exist): ${stats.skipped}`);
  console.log(`   Skipped (gdocs): ${stats.skippedNative}`);
  console.log(`   Failed:          ${stats.failed}`);
  console.log(`   Total bytes:     ${formatBytes(stats.bytes)}`);
}

main().catch((err) => {
  console.error('❌ Fatal:', err);
  process.exit(1);
});
