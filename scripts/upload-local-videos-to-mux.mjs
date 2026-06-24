/**
 * Upload local video files directly to Mux (no S3 involved).
 *
 * For each video in the given folder:
 *   1. Create a Mux direct upload, PUT the file bytes to it.
 *   2. Wait for Mux to create + transcode the asset (adaptive HLS).
 *   3. Record it under a synthetic CloudFront-style URL key so it slots into the
 *      same maps the app already uses (videoProdukcija/<file>), and shows up in
 *      the video-production slider automatically.
 *
 * Idempotent: files whose synthetic URL is already in mux-map.json are skipped.
 *
 * Run:  node scripts/upload-local-videos-to-mux.mjs "/Users/adi/work/fulkrumsFoto/videoProdukcija"
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const MAP_PATH = resolve(ROOT, 'src/data/generated/mux-map.json');
const ASSETS_PATH = resolve(ROOT, 'src/data/generated/mux-assets.json');

const CF = process.env.NEXT_PUBLIC_CLOUDFRONT_URL || '';
const MUX_ID = process.env.MUX_TOKEN_ID;
const MUX_SECRET = process.env.MUX_TOKEN_SECRET;
const FOLDER = process.argv[2] || '/Users/adi/work/fulkrumsFoto/videoProdukcija';
// S3-style key prefix these videos slot under (synthetic — they live on Mux, not S3).
const S3_PREFIX = (process.argv[3] || 'videoProdukcija').replace(/\/+$/, '');

if (!MUX_ID || !MUX_SECRET) {
  console.error('❌ MUX_TOKEN_ID / MUX_TOKEN_SECRET missing in .env.local');
  process.exit(1);
}

const MUX_AUTH = 'Basic ' + Buffer.from(`${MUX_ID}:${MUX_SECRET}`).toString('base64');
const VIDEO_RE = /\.(mp4|mov|m4v|webm)$/i;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Use a trimmed filename for the key/url (some source files have stray spaces).
const cleanName = (file) => file.trim();
const keyFor = (file) => `${S3_PREFIX}/${cleanName(file)}`;
const syntheticUrl = (file) =>
  `${CF}/${keyFor(file)}`.split('/').map((s, i) => (i < 3 ? s : encodeURIComponent(s))).join('/');

function readJson(p, fb) {
  if (!existsSync(p)) return fb;
  try { return JSON.parse(readFileSync(p, 'utf8')); } catch { return fb; }
}
function writeJson(p, d) { writeFileSync(p, JSON.stringify(d, null, 2) + '\n'); }

async function muxFetch(path, init = {}) {
  const res = await fetch(`https://api.mux.com${path}`, {
    ...init,
    headers: { Authorization: MUX_AUTH, 'Content-Type': 'application/json', ...(init.headers || {}) },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Mux ${res.status}: ${JSON.stringify(body)}`);
  return body.data;
}

async function main() {
  if (!existsSync(FOLDER)) { console.error(`Folder not found: ${FOLDER}`); process.exit(1); }

  const map = readJson(MAP_PATH, {});
  const assets = readJson(ASSETS_PATH, {});

  const files = readdirSync(FOLDER).filter((f) => VIDEO_RE.test(f) && statSync(resolve(FOLDER, f)).isFile());
  const todo = files.filter((f) => !map[syntheticUrl(f)]);

  console.log(`Folder: ${FOLDER}`);
  console.log(`${files.length} videos, ${files.length - todo.length} already on Mux, ${todo.length} to upload:\n`);
  todo.forEach((f) => console.log(`   • ${f}`));
  console.log('');

  for (let i = 0; i < todo.length; i++) {
    const file = todo[i];
    const path = resolve(FOLDER, file);
    const url = syntheticUrl(file);
    const mb = (statSync(path).size / 1048576).toFixed(0);
    try {
      console.log(`[${i + 1}/${todo.length}] ${file} (${mb} MB) — creating upload…`);
      const upload = await muxFetch('/video/v1/uploads', {
        method: 'POST',
        body: JSON.stringify({
          cors_origin: '*',
          new_asset_settings: { playback_policy: ['public'], video_quality: 'plus' },
        }),
      });

      console.log(`            uploading bytes (curl)…`);
      // curl streams large files reliably (Node fetch chokes on 100MB+ bodies).
      execFileSync('curl', [
        '-sS', '--fail', '-X', 'PUT',
        '-H', 'Content-Type: video/mp4',
        '--upload-file', path,
        upload.url,
      ], { stdio: ['ignore', 'ignore', 'inherit'], maxBuffer: 1024 * 1024 });

      // Wait for the upload to turn into an asset
      let assetId;
      for (let r = 0; r < 40 && !assetId; r++) {
        await sleep(3000);
        const u = await muxFetch(`/video/v1/uploads/${upload.id}`);
        if (u.asset_id) assetId = u.asset_id;
        else if (u.status === 'errored') throw new Error(`upload errored: ${JSON.stringify(u.error)}`);
      }
      if (!assetId) throw new Error('timed out waiting for asset_id');

      assets[url] = { assetId, playbackId: null, status: 'preparing', key: keyFor(file) };
      writeJson(ASSETS_PATH, assets);
      console.log(`            asset ${assetId} — transcoding…`);

      // Wait for transcode
      for (let r = 0; r < 120; r++) {
        await sleep(5000);
        const a = await muxFetch(`/video/v1/assets/${assetId}`);
        assets[url].status = a.status;
        assets[url].playbackId = a.playback_ids?.[0]?.id || assets[url].playbackId;
        assets[url].duration = a.duration;
        writeJson(ASSETS_PATH, assets);
        if (a.status === 'ready' || a.status === 'errored') break;
      }
      if (assets[url].status === 'ready' && assets[url].playbackId) {
        map[url] = assets[url].playbackId;
        writeJson(MAP_PATH, map);
        console.log(`            ✅ ready (${assets[url].playbackId})`);
      } else {
        console.log(`            ⚠️ status: ${assets[url].status}`);
      }
    } catch (e) {
      console.error(`            ❌ ${e.message}`);
      assets[url] = { ...(assets[url] || {}), status: 'upload_failed', error: e.message, key: keyFor(file) };
      writeJson(ASSETS_PATH, assets);
    }
  }

  const ready = Object.values(assets).filter((a) => a.key?.startsWith(S3_PREFIX) && a.status === 'ready').length;
  console.log(`\n✅ Done. ${ready} videoProdukcija videos on Mux total.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
