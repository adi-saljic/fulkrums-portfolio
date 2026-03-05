"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

type YouTubeIframeSliderProps = {
  iframeEmbeds: string[];
  height?: string;
};

export default function YouTubeIframeSlider({
  iframeEmbeds,
  height = "70vh",
}: YouTubeIframeSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentSlide(swiper.realIndex);
  };

  const handlePrevClick = () => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

  const handleNextClick = () => {
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  };

  if (!iframeEmbeds || iframeEmbeds.length === 0) {
    return null;
  }

  return (
    <div className="youtube-iframe-slider" style={{ height }}>
      <Swiper
        modules={[Navigation, Mousewheel]}
        direction="horizontal"
        slidesPerView={1}
        spaceBetween={0}
        mousewheel={true}
        speed={800}
        loop={iframeEmbeds.length > 1}
        onSwiper={setSwiperInstance}
        onSlideChange={handleSlideChange}
        className="youtube-swiper"
      >
        {iframeEmbeds.map((embed, index) => (
          <SwiperSlide key={index}>
            <div
              className="youtube-iframe-wrapper"
              dangerouslySetInnerHTML={{ __html: embed }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation arrows - only show if more than 1 video */}
      {iframeEmbeds.length > 1 && (
        <>
          <button
            className="youtube-nav-btn youtube-prev"
            onClick={handlePrevClick}
            aria-label="Previous video"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <button
            className="youtube-nav-btn youtube-next"
            onClick={handleNextClick}
            aria-label="Next video"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          {/* Slide counter */}
          <div className="youtube-slide-counter">
            {currentSlide + 1} / {iframeEmbeds.length}
          </div>
        </>
      )}
    </div>
  );
}
