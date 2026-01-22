"use client";
import React from "react";
import Marquee from "react-fast-marquee";

export default function BrandSlider() {
  return (
    <div className="tp-brand-slider-active fix">
      <Marquee
        speed={100}
        loop={0}
        className="brand-wrapper"
      >
      </Marquee>
      {/* <Swiper
        {...slider_setting}
        modules={[Autoplay, FreeMode]}
        className="brand-wrapper"
      >
        {brand_images.map((b, i) => (
          <SwiperSlide key={i}>
            <div className="tp-brand-item">
              <Image src={b} alt="" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper> */}
    </div>
  );
}
