"use client";
import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { muxHls, muxPoster, muxPlaybackIdFor } from "@/lib/mux";
import { useHls } from "@/hooks/useHls";

type Props = React.VideoHTMLAttributes<HTMLVideoElement> & {
  /** Legacy CloudFront URL — resolved to Mux adaptive HLS when migrated. */
  src?: string;
  /** Only load/stream when active (false → show poster only, no network). */
  active?: boolean;
  /** Seconds into the video to grab the poster frame from. */
  posterTime?: number;
};

/**
 * A <video> that streams adaptive HLS from Mux when the source has been migrated,
 * and falls back to the raw file otherwise. Shows the Mux poster instantly so there's
 * no black flash before the stream starts. Forwards its ref so callers keep control.
 */
const HlsVideo = forwardRef<HTMLVideoElement, Props>(function HlsVideo(
  { src, active = true, posterTime = 0, poster, ...rest },
  ref
) {
  const innerRef = useRef<HTMLVideoElement>(null);
  useImperativeHandle(ref, () => innerRef.current as HTMLVideoElement, []);

  const playbackId = src ? muxPlaybackIdFor(src) : null;
  const hlsSrc = playbackId && active ? muxHls(playbackId) : null;
  useHls(innerRef, hlsSrc);

  // Not migrated → use the raw file directly (only when active, to avoid eager loads).
  const nativeSrc = !playbackId && active ? src : undefined;
  const resolvedPoster =
    poster ?? (playbackId ? muxPoster(playbackId, { time: posterTime }) : undefined);

  return <video ref={innerRef} src={nativeSrc} poster={resolvedPoster} {...rest} />;
});

export default HlsVideo;
