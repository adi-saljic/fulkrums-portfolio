/**
 * Upload local images to S3 under given keys and print their CloudFront URLs.
 *
 * Edit the UPLOADS list below, then run:  node scripts/upload-images-to-s3.mjs
 */
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { readFileSync, existsSync } from 'fs';
import { extname } from 'path';
import mime from 'mime-types';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const REGION = process.env.AWS_REGION || 'eu-central-1';
const BUCKET = process.env.AWS_S3_BUCKET || 'fulkrums-data';
const CF = process.env.NEXT_PUBLIC_CLOUDFRONT_URL || '';

const NOVI = '/Users/adi/work/fulkrumsFoto/novi';

// local file -> S3 key
const UPLOADS = [
  [`${NOVI}/maxdent.png`, 'Portfolio/Baneri-Portfolio/Maxdent.png'],
  [`${NOVI}/sensei.png`, 'Portfolio/Baneri-Portfolio/Sensei.png'],
  [`${NOVI}/SENSEI/sensei_static_disciplina.png`, 'Portfolio/SENSEI/sensei_static_disciplina.png'],
  [`${NOVI}/SENSEI/sensei_static_problem.png`, 'Portfolio/SENSEI/sensei_static_problem.png'],
  [`${NOVI}/SENSEI/sensei_static_viseodtreninga.png`, 'Portfolio/SENSEI/sensei_static_viseodtreninga.png'],
];

const cloudFrontUrl = (key) => `${CF}/${key.split('/').map(encodeURIComponent).join('/')}`;

const client = new S3Client({
  region: REGION,
  credentials: process.env.AWS_ACCESS_KEY_ID
    ? { accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY }
    : undefined,
});

async function main() {
  for (const [localPath, key] of UPLOADS) {
    if (!existsSync(localPath)) { console.error(`❌ missing: ${localPath}`); continue; }
    const Body = readFileSync(localPath);
    const ContentType = mime.lookup(extname(localPath)) || 'application/octet-stream';
    await client.send(new PutObjectCommand({ Bucket: BUCKET, Key: key, Body, ContentType }));
    console.log(`✅ ${key}`);
    console.log(`   ${cloudFrontUrl(key)}`);
  }
  console.log('\nDone.');
}

main().catch((e) => { console.error(e); process.exit(1); });
