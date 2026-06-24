import muxAssets from "./generated/mux-assets.json";

type MuxAsset = { key?: string; status?: string };

/**
 * CloudFront URLs of the `videoProdukcija/` S3 folder videos that have been
 * migrated to Mux (status ready), sorted. These resolve to Mux HLS at playback
 * time via the Mux map. Imported server-side only (keeps the assets JSON out of
 * the client bundle), mirroring how graphic-design images are sourced.
 */
export function getVideoProductionVideos(): string[] {
  return Object.entries(muxAssets as Record<string, MuxAsset>)
    .filter(([, a]) => a.status === "ready" && (a.key || "").startsWith("videoProdukcija"))
    .map(([url]) => url)
    .sort();
}
