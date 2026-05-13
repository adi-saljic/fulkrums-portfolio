"use client";
import React, { useEffect, useRef, useState } from "react";

export default function VideoThree() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(true);

  const startPlayback = () => {
    const v = videoRef.current;
    if (!v) return;
    setReady(true);
    v.play().catch(() => {});
  };

  const handleProgress = () => {
    const v = videoRef.current;
    if (!v || !v.duration || !v.buffered.length) return;
    const end = v.buffered.end(v.buffered.length - 1);
    const pct = (end / v.duration) * 100;
    setProgress(pct);
    if (pct >= 99.5) startPlayback();
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const id = window.setInterval(handleProgress, 500);
    return () => window.clearInterval(id);
  }, []);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !muted;
    v.muted = next;
    if (!next) v.play().catch(() => {});
    setMuted(next);
  };

  return (
    <div className="tp-video-3-area">
      <div className="tp-video-3-wrap p-relative">
        <video
          ref={videoRef}
          data-speed=".7"
          className="play-video"
          loop
          muted
          playsInline
          preload="auto"
          onProgress={handleProgress}
          onCanPlayThrough={startPlayback}
          style={{
            opacity: ready ? 1 : 0,
            transition: "opacity 400ms ease",
          }}
        >
          <source
            src="https://d1hqd8vqu5a5q0.cloudfront.net/homepage/HeroVideo.mp4"
            type="video/mp4"
          />
        </video>

        {!ready && (
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "18px",
              background: "rgba(0,0,0,0.9)",
              pointerEvents: "none",
            }}
          >
            <span className="tp-video-spinner" />
            <div className="tp-video-progress">
              <div
                className="tp-video-progress-bar"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <span
              style={{
                color: "rgba(255,255,255,0.8)",
                fontSize: "13px",
                letterSpacing: "0.05em",
              }}
            >
              {Math.floor(progress)}%
            </span>
          </div>
        )}

        {ready && (
          <button
            type="button"
            onClick={toggleSound}
            aria-label={muted ? "Unmute video" : "Mute video"}
            style={{
              position: "absolute",
              bottom: "24px",
              right: "24px",
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              background: "rgba(0,0,0,0.55)",
              border: "1px solid rgba(255,255,255,0.25)",
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              zIndex: 2,
            }}
          >
            {muted ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            )}
          </button>
        )}
      </div>

      <style jsx>{`
        .tp-video-spinner {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 3px solid rgba(255, 255, 255, 0.15);
          border-top-color: rgba(255, 255, 255, 0.9);
          animation: tp-video-spin 0.8s linear infinite;
        }
        @keyframes tp-video-spin {
          to {
            transform: rotate(360deg);
          }
        }
        .tp-video-progress {
          width: 220px;
          height: 4px;
          background: rgba(255, 255, 255, 0.12);
          border-radius: 999px;
          overflow: hidden;
        }
        .tp-video-progress-bar {
          height: 100%;
          background: rgba(255, 255, 255, 0.9);
          transition: width 200ms ease;
        }
      `}</style>
    </div>
  );
}
