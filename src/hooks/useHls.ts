"use client";
import { useEffect } from "react";
import Hls from "hls.js";

/**
 * Attaches an adaptive HLS (.m3u8) source to a <video> element.
 *
 * - Safari / iOS play HLS natively → just set video.src.
 * - Chrome / Firefox / Android → use hls.js to feed the stream.
 *
 * Pass src=null to skip (e.g. inactive slide, or video not migrated to Mux yet).
 */
export function useHls(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  src: string | null
) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    // Native HLS (Safari, iOS)
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      return;
    }

    // Everything else via hls.js
    if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true, lowLatencyMode: false });
      hls.loadSource(src);
      hls.attachMedia(video);
      return () => hls.destroy();
    }
  }, [videoRef, src]);
}
