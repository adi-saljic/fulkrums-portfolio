/**
 * Mux helpers — turn a Mux playback ID into stream / poster URLs,
 * and resolve a legacy CloudFront video URL to its Mux playback ID.
 *
 * Mux delivers adaptive HLS (.m3u8): the player/browser picks the right
 * resolution per device & network, which is what makes playback fast and
 * smooth on mobile (vs. serving one heavy .mp4).
 */
import muxMap from "@/data/generated/mux-map.json";

type MuxMap = Record<string, string>; // cloudfront url -> playback id

const MAP = muxMap as MuxMap;

/** Adaptive HLS stream URL for a playback ID. */
export function muxHls(playbackId: string): string {
  return `https://stream.mux.com/${playbackId}.m3u8`;
}

/**
 * Poster/thumbnail image URL for a playback ID.
 * Shows instantly while the stream starts, so there's no black flash.
 */
export function muxPoster(
  playbackId: string,
  opts: {
    time?: number;
    width?: number;
    height?: number;
    /** "smartcrop" crops to the subject — use with width+height for uniform tiles. */
    fitMode?: "preserve" | "stretch" | "crop" | "smartcrop" | "pad";
  } = {}
): string {
  const params = new URLSearchParams();
  if (opts.time != null) params.set("time", String(opts.time));
  if (opts.width != null) params.set("width", String(opts.width));
  if (opts.height != null) params.set("height", String(opts.height));
  if (opts.fitMode != null) params.set("fit_mode", opts.fitMode);
  const qs = params.toString();
  return `https://image.mux.com/${playbackId}/thumbnail.webp${qs ? `?${qs}` : ""}`;
}

/** Resolve a legacy CloudFront video URL to its Mux playback ID (or null if not migrated yet). */
export function muxPlaybackIdFor(cloudfrontUrl: string): string | null {
  return MAP[cloudfrontUrl] ?? null;
}
