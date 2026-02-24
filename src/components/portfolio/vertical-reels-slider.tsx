"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

type Props = {
  videos: string[];
};

export default function VerticalReelsSlider({ videos }: Props) {
  const [unmutedVideo, setUnmutedVideo] = React.useState<number | null>(null);
  const videoRefs = React.useRef<(HTMLVideoElement | null)[]>([]);
  const [activeSlide, setActiveSlide] = React.useState<number>(0);
  const [videosReady, setVideosReady] = React.useState<Set<number>>(new Set());
  const swiperRef = React.useRef<any>(null);
  const [hasScrolled, setHasScrolled] = React.useState<boolean>(false);

  return (
    <div style={{ position: "relative", width: "450px", maxWidth: "100%", margin: "0 auto", overflow: "hidden" }}>
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
        modules={[Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        direction="vertical"
        loop={true}
        mousewheel={true}
        onSlideChange={(swiper) => {
          const newIndex = swiper.realIndex;
          setActiveSlide(newIndex);
          if (unmutedVideo !== null) {
            setUnmutedVideo(newIndex);
          }
          // Mark as scrolled if user changed from initial video
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
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                  if (el) {
                    // Auto-play when active
                    if (index === activeSlide) {
                      el.play().catch(() => {});
                    }
                    // Listen for when video can play through
                    el.addEventListener('canplaythrough', () => {
                      setVideosReady(prev => new Set(prev).add(index));
                    }, { once: true });
                  }
                }}
                src={video}
                muted={unmutedVideo !== index}
                loop
                playsInline
                preload="auto"
                autoPlay={index === activeSlide}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: videosReady.has(index) || index === activeSlide ? 1 : 0.5,
                }}
              />
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "40%",
                background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
                pointerEvents: "none",
                zIndex: 1,
              }} />
              {unmutedVideo !== index && (
                <div style={{
                  position: "absolute",
                  bottom: "20px",
                  left: "20px",
                  fontSize: "24px",
                  color: "white",
                  opacity: 1,
                  pointerEvents: "none",
                  transition: "all 0.3s",
                  textShadow: "0 2px 8px rgba(0,0,0,0.8)",
                  zIndex: 10,
                  background: "rgba(0,0,0,0.5)",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  backdropFilter: "blur(10px)",
                }}>🔇</div>
              )}
              <div style={{
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
              }}>
                {index + 1} / {videos.length}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Scroll to see more text - only show if user hasn't scrolled yet */}
      {!hasScrolled && (
        <div style={{
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
        }}>
          <div style={{
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
          }}>
            Scroll to see more
          </div>
          <div style={{
            fontSize: "20px",
            color: "rgba(255,107,53,0.9)",
            textShadow: "0 2px 8px rgba(0,0,0,0.8)",
          }}>
            <i className="fa-regular fa-arrow-down"></i>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </div>
  );
}
