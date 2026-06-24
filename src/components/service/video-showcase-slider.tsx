"use client";
import { useCallback, useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import HlsVideo from "@/components/common/HlsVideo";
import { muxPoster, muxPlaybackIdFor } from "@/lib/mux";

/**
 * Mirror of ImageShowcaseSlider but for video: a marquee of poster thumbnails,
 * click to open a fullscreen lightbox that plays the (Mux HLS) video.
 */
export default function VideoShowcaseSlider({ videos }: { videos: string[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isOpen = openIndex !== null;

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? i : (i - 1 + videos.length) % videos.length
      ),
    [videos.length]
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % videos.length)),
    [videos.length]
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close, prev, next]);

  if (!videos || videos.length === 0) return null;

  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <Marquee speed={80} gradient={false} pauseOnHover play={!isOpen} autoFill>
          {videos.map((src, i) => {
            const pid = muxPlaybackIdFor(src);
            return (
              <button
                key={i}
                type="button"
                onClick={() => setOpenIndex(i)}
                aria-label="Play video"
                style={{
                  position: "relative",
                  height: "360px",
                  width: "203px",
                  marginRight: "8px",
                  flexShrink: 0,
                  background: "#000",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  display: "block",
                  overflow: "hidden",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={
                    pid
                      ? muxPoster(pid, { width: 406, height: 720, fitMode: "smartcrop" })
                      : undefined
                  }
                  alt=""
                  style={{
                    height: "100%",
                    width: "100%",
                    display: "block",
                    objectFit: "cover",
                  }}
                />
                {/* Play indicator */}
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background: "rgba(0,0,0,0.5)",
                    border: "1px solid rgba(255,255,255,0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff" aria-hidden>
                    <polygon points="6 4 20 12 6 20 6 4" />
                  </svg>
                </span>
              </button>
            );
          })}
        </Marquee>
      </div>

      {isOpen && (
        <div
          onClick={close}
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            cursor: "zoom-out",
          }}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            aria-label="Close"
            style={{
              position: "absolute",
              top: "24px",
              right: "24px",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff",
              fontSize: "20px",
              lineHeight: 1,
              cursor: "pointer",
            }}
          >
            ×
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous"
            style={{
              position: "absolute",
              left: "24px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff",
              fontSize: "24px",
              lineHeight: 1,
              cursor: "pointer",
            }}
          >
            ‹
          </button>

          <HlsVideo
            key={openIndex}
            src={videos[openIndex!]}
            controls
            autoPlay
            playsInline
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "92vw",
              height: "92vh",
              objectFit: "contain",
              cursor: "default",
            }}
          />

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next"
            style={{
              position: "absolute",
              right: "24px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff",
              fontSize: "24px",
              lineHeight: 1,
              cursor: "pointer",
            }}
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
