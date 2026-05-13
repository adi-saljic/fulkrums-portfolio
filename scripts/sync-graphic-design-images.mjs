/**
 * Jednokratan sync: lista `graphicDesign/graphicDesign/` iz S3
 * i upiše URL-ove u src/data/service-images.ts (zamijeni samo `graphicDesign` niz).
 *
 * Pokretanje (bilo koji od ova tri načina rade):
 *   npm run sync:graphic-design                         # ako su creds u .env.local
 *   AWS_ACCESS_KEY_ID=xxx AWS_SECRET_ACCESS_KEY=yyy node scripts/sync-graphic-design-images.mjs
 *   node scripts/sync-graphic-design-images.mjs         # ako su creds već exportovani u shell
 */

import { config as loadEnv } from 'dotenv';
loadEnv({ path: '.env.local' });
loadEnv();

import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION = 'eu-central-1',
  AWS_S3_BUCKET = 'fulkrums-data',
  NEXT_PUBLIC_CLOUDFRONT_URL = 'https://d1hqd8vqu5a5q0.cloudfront.net',
} = process.env;

if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
  console.error('❌ AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY nisu postavljeni.');
  console.error('   Stavi ih u .env.local ili pred komandu (vidi komentar na vrhu skripte).');
  process.exit(1);
}

const PREFIX = 'graphicDesign/graphicDesign/';
const IMAGE_RX = /\.(jpe?g|png|webp|avif|gif)$/i;
const FILE = path.resolve('src/data/service-images.ts');

const s3 = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

function cdnUrl(key) {
  const encoded = key
    .trim()
    .split('/')
    .map(encodeURIComponent)
    .join('/');
  return `${NEXT_PUBLIC_CLOUDFRONT_URL.replace(/\/+$/, '')}/${encoded}`;
}

async function listAll() {
  const out = [];
  let token;
  do {
    const res = await s3.send(
      new ListObjectsV2Command({
        Bucket: AWS_S3_BUCKET,
        Prefix: PREFIX,
        ContinuationToken: token,
      })
    );
    for (const o of res.Contents || []) {
      if (!o.Key || o.Key.endsWith('/')) continue;
      if (!IMAGE_RX.test(o.Key)) continue;
      out.push(o.Key);
    }
    token = res.NextContinuationToken;
  } while (token);
  return out.sort();
}

function buildBlock(urls) {
  const lines = urls.map((u) => `    "${u}",`).join('\n');
  return `  graphicDesign: [\n${lines}\n  ],`;
}

async function main() {
  console.log(`📦 Listam s3://${AWS_S3_BUCKET}/${PREFIX} ...`);
  const keys = await listAll();
  console.log(`   Nađeno ${keys.length} slika`);
  if (keys.length === 0) {
    console.error('❌ Nema fajlova — provjeri prefix/bucket.');
    process.exit(1);
  }

  const urls = keys.map(cdnUrl);
  const src = await readFile(FILE, 'utf8');

  const block = buildBlock(urls);
  const updated = src.replace(
    /  graphicDesign:\s*\[[\s\S]*?\n\s*\],/,
    block
  );

  if (updated === src) {
    console.error('❌ Nisam našao `graphicDesign: [...]` blok u service-images.ts');
    process.exit(1);
  }

  await writeFile(FILE, updated);
  console.log(`✅ Upisao ${urls.length} URL-ova u ${path.relative(process.cwd(), FILE)}`);
}

main().catch((err) => {
  console.error('❌ Fatal:', err?.message || err);
  process.exit(1);
});
