"use client";
import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCreative } from "swiper/modules";
import { useTranslations } from "next-intl";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-creative";

type Props = {
  videos: string[];
};

export default function VerticalReelsSlider({ videos }: Props) {
  const tSlider = useTranslations("videoSlider");
  const [unmutedVideo, setUnmutedVideo] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const swiperRef = useRef<any>(null);
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(true);

  const [videoDimensions, setVideoDimensions] = useState<Map<number, { width: number; height: number }>>(new Map());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeVideoDimensions = videoDimensions.get(activeSlide);
  const isLandscape = activeVideoDimensions
    ? activeVideoDimensions.width / activeVideoDimensions.height > 1
    : true;

  const handleVideoLoadedMetadata = (index: number, event: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget;
    setVideoDimensions((prev) => new Map(prev).set(index, { width: video.videoWidth, height: video.videoHeight }));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // When active slide changes: show spinner, pause others, play active
  useEffect(() => {
    setIsLoading(true);

    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index !== activeSlide) {
        video.pause();
      }
    });

    // If the active video already has data buffered (e.g. revisiting a slide), play immediately
    const activeVideo = videoRefs.current[activeSlide];
    if (activeVideo && activeVideo.readyState >= 3) {
      setIsLoading(false);
      activeVideo.play().catch(() => {});
    }
  }, [activeSlide]);

  const handleCanPlay = (index: number) => {
    if (index === activeSlide) {
      setIsLoading(false);
      videoRefs.current[index]?.play().catch(() => {});
    }
  };

  const dismissHint = () => setShowHint(false);

  return (
    <div
      ref={containerRef}
      className={`video-slider-container ${isLandscape ? "landscape-mode" : "portrait-mode"}`}
    >
      {/* Fullscreen Button */}
      <button
        onClick={toggleFullscreen}
        className="fullscreen-toggle-btn"
        aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      >
        {isFullscreen ? <i className="fa-solid fa-compress"></i> : <i className="fa-solid fa-expand"></i>}
      </button>

      {/* Navigation Arrows */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        style={{
          position: "absolute",
          left: "20px",
          top: "30%",
          transform: "translateY(-50%)",
          zIndex: 10,
          width: "55px",
          height: "55px",
          borderRadius: "50%",
          border: "2px solid rgba(255,107,53,0.9)",
          background: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(10px)",
          color: "#fff",
          fontSize: "24px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
          boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255,107,53,0.95)";
          e.currentTarget.style.transform = "translateY(-50%) scale(1.15)";
          e.currentTarget.style.boxShadow = "0 6px 25px rgba(255,107,53,0.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(0,0,0,0.7)";
          e.currentTarget.style.transform = "translateY(-50%) scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.4)";
        }}
      >
        <i className="fa-regular fa-arrow-up"></i>
      </button>

      <button
        onClick={() => swiperRef.current?.slideNext()}
        style={{
          position: "absolute",
          left: "20px",
          bottom: "15%",
          zIndex: 10,
          width: "55px",
          height: "55px",
          borderRadius: "50%",
          border: "2px solid rgba(255,107,53,0.9)",
          background: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(10px)",
          color: "#fff",
          fontSize: "24px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
          boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255,107,53,0.95)";
          e.currentTarget.style.transform = "scale(1.15)";
          e.currentTarget.style.boxShadow = "0 6px 25px rgba(255,107,53,0.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(0,0,0,0.7)";
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.4)";
        }}
      >
        <i className="fa-regular fa-arrow-down"></i>
      </button>

      <Swiper
        modules={[Navigation, EffectCreative]}
        spaceBetween={0}
        slidesPerView={1}
        direction={isMobile ? "horizontal" : "vertical"}
        effect={isMobile ? "creative" : undefined}
        creativeEffect={
          isMobile
            ? {
                prev: { translate: [0, "-100%", 0] },
                next: { translate: [0, "100%", 0] },
              }
            : undefined
        }
        loop={true}
        mousewheel={!isMobile}
        onSlideChange={(swiper) => {
          const newIndex = swiper.realIndex;
          setActiveSlide(newIndex);
          if (unmutedVideo !== null) {
            setUnmutedVideo(newIndex);
          }
          if (newIndex !== 0) {
            setHasScrolled(true);
          }
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setActiveSlide(0);
        }}
        style={{ height: "70vh" }}
      >
        {videos.map((video, index) => (
          <SwiperSlide key={index}>
            <div
              className="showcase-details-video"
              onClick={() => setUnmutedVideo(unmutedVideo === index ? null : index)}
              style={{
                cursor: "pointer",
                position: "relative",
                width: "100%",
                height: "70vh",
                overflow: "hidden",
                backgroundColor: "#000",
                borderRadius: "16px",
              }}
            >
              {/* Loading spinner — shown while active video is buffering */}
              {index === activeSlide && isLoading && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(0,0,0,0.85)",
                    zIndex: 5,
                    borderRadius: "16px",
                  }}
                  aria-hidden="true"
                >
                  <div className="tp-video-spinner" />
                </div>
              )}

              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                // Only set src on the active slide — all others stay unloaded
                src={index === activeSlide ? video : undefined}
                onLoadedMetadata={(e) => handleVideoLoadedMetadata(index, e)}
                onCanPlay={() => handleCanPlay(index)}
                muted={unmutedVideo !== index}
                loop
                playsInline
                // metadata only for active, none for inactive
                preload={index === activeSlide ? "metadata" : "none"}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />

              {/* Gradient overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "40%",
                  background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              />

              {/* Mute indicator */}
              {unmutedVideo !== index && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "20px",
                    fontSize: "24px",
                    color: "white",
                    pointerEvents: "none",
                    textShadow: "0 2px 8px rgba(0,0,0,0.8)",
                    zIndex: 10,
                    background: "rgba(0,0,0,0.5)",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  🔇
                </div>
              )}

              {/* Video counter */}
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "600",
                  background: "rgba(0,0,0,0.5)",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  backdropFilter: "blur(10px)",
                }}
              >
                {index + 1} / {videos.length}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Scroll hint — desktop only, before first scroll */}
      {!hasScrolled && !isMobile && (
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            animation: "bounce 2s infinite",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              fontWeight: 500,
              color: "rgba(255, 255, 255, 0.9)",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              fontFamily: "Syne, Syne Fallback, sans-serif",
              textShadow: "0 2px 8px rgba(0,0,0,0.8)",
              background: "rgba(0,0,0,0.5)",
              padding: "8px 16px",
              borderRadius: "20px",
              backdropFilter: "blur(10px)",
            }}
          >
            Scroll to see more
          </div>
          <div
            style={{
              fontSize: "20px",
              color: "rgba(255,107,53,0.9)",
              textShadow: "0 2px 8px rgba(0,0,0,0.8)",
            }}
          >
            <i className="fa-regular fa-arrow-down"></i>
          </div>
        </div>
      )}

      {/* Mobile swipe hint */}
      {isMobile && showHint && (
        <div
          className="mobile-swipe-hint-overlay"
          onClick={dismissHint}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 20,
            gap: "20px",
            backdropFilter: "blur(5px)",
            animation: "fadeIn 0.3s ease",
          }}
        >
          <div style={{ fontSize: "48px" }}>
            <i className="fa-solid fa-hand-point-left" style={{ marginRight: "20px" }}></i>
            <i className="fa-solid fa-hand-point-right"></i>
          </div>
          <p
            style={{
              color: "white",
              fontSize: "18px",
              textAlign: "center",
              padding: "0 40px",
              fontWeight: 600,
            }}
          >
            {tSlider("swipeInstruction")}
          </p>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "16px" }}>{tSlider("tapToContinue")}</p>
        </div>
      )}

      <style jsx>{`
        .tp-video-spinner {
          width: 44px;
          height: 44px;
          border: 3px solid rgba(255, 255, 255, 0.15);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: tp-spin 0.8s linear infinite;
        }

        @keyframes tp-spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateX(-50%) translateY(0);
          }
          40% {
            transform: translateX(-50%) translateY(-10px);
          }
          60% {
            transform: translateX(-50%) translateY(-5px);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
