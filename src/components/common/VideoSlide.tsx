"use client";
import React, { useRef, useEffect, useState } from "react";

interface VideoSlideProps {
  src: string;
  isActive: boolean;
  isMuted: boolean;
  onReady?: () => void;
  className?: string;
  style?: React.CSSProperties;
  objectFit?: "contain" | "cover";
}

export default function VideoSlide({
  src,
  isActive,
  isMuted,
  onReady,
  className,
  style,
  objectFit = "contain",
}: VideoSlideProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      setIsLoading(true);

      // If already buffered (e.g. revisiting slide), play immediately
      if (video.readyState >= 3) {
        setIsLoading(false);
        video.play().catch(() => {});
        onReady?.();
      }
    } else {
      video.pause();
    }
  }, [isActive]);

  // Sync mute state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = isMuted;
  }, [isMuted]);

  const handleCanPlay = () => {
    if (isActive) {
      setIsLoading(false);
      videoRef.current?.play().catch(() => {});
      onReady?.();
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", ...style }}>
      {/* Loading spinner */}
      {isLoading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.85)",
            zIndex: 5,
            borderRadius: "inherit",
          }}
          aria-hidden="true"
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              border: "3px solid rgba(255,255,255,0.15)",
              borderTopColor: "#ffffff",
              borderRadius: "50%",
              animation: "videoSlide-spin 0.8s linear infinite",
            }}
          />
        </div>
      )}

      <video
        ref={videoRef}
        className={className}
        // Only load src when this slide is active
        src={isActive ? src : undefined}
        preload={isActive ? "metadata" : "none"}
        onCanPlay={handleCanPlay}
        muted={isMuted}
        loop
        playsInline
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "100%",
          objectFit,
        }}
      />

      <style jsx>{`
        @keyframes videoSlide-spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
