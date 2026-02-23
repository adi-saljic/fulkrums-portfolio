"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

type Props = {
  videos: string[];
};

export default function VerticalReelsSlider({ videos }: Props) {
  const [unmutedVideo, setUnmutedVideo] = React.useState<number | null>(null);
  const videoRefs = React.useRef<(HTMLVideoElement | null)[]>([]);
  const [activeSlide, setActiveSlide] = React.useState<number>(0);
  const [videosReady, setVideosReady] = React.useState<Set<number>>(new Set());

  return (
    <div style={{ position: "relative", width: "450px", maxWidth: "100%", margin: "0 auto" }}>
      <Swiper
        modules={[]}
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
        }}
        onSwiper={() => {
          setActiveSlide(0);
        }}
        style={{ height: "85vh" }}
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
                height: "85vh",
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
    </div>
  );
}
