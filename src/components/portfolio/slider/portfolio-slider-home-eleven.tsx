"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Autoplay } from "swiper/modules";
import { SwiperOptions } from "swiper/types";
import { Link } from "@/i18n/routing";
import Image from "next/image";
// images

import { portfolio_data } from "@/data/project-data";
import { useTranslations } from 'next-intl';

// slider setting
const slider_setting: SwiperOptions = {
  direction: "horizontal",
  loop: false,
  slidesPerView:1,
  touchStartPreventDefault: false,
  speed: 1000,
  autoplay: {
    delay: 5000,
  },
  mousewheel: true,
  simulateTouch: true,
  navigation: {
    nextEl: ".swiper-next",
    prevEl: ".swiper-prev",
  },
  pagination: {
    el: ".tp-slider-dot",
    clickable: true,
    renderBullet: function (index, className) {
      return '<div className="' + className + '"></div>';
    },
  },
};

export default function PortfolioSliderHomeEleven() {
  const t = useTranslations('projects');
  const tData = useTranslations('projectData');
  return (
    <div id="port-showcase-slider-main">
      <div className="port-showcase-slider-spaces p-relative">
        <div
          className="port-showcase-slider-wrap tp-slider-parallax fix"
          id="showcase-slider-holder"
          data-pattern-img="/assets/img/webgl/1.jpg"
        >
          <div
            className="swiper-container parallax-slider-active p-relative"
            id="showcase-slider"
          >
            <Swiper
              direction="horizontal"
              slidesPerView="auto"
              touchStartPreventDefault={false}
              speed={1000}
              effect="fade"
              loop={true}                 
              mousewheel={true}
              simulateTouch={true}
              navigation={{
                nextEl: '.swiper-next',
                prevEl: '.swiper-prev',
              }}
              pagination={{
                el: '.tp-slider-dot',
                clickable: true,
              }}
              modules={[Navigation, Pagination, Autoplay, Mousewheel]}
              id="trigger-slides"
            >
              {portfolio_data.map((project,i) => (
                <SwiperSlide key={project.id}>
                  <div className={`slide-wrap ${i === 0 ? 'active' : ''}`} data-slide={i} style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: -1
                  }}>
                    <Image
                      src={project.heroImage}
                      alt={project.titleKey}
                      fill
                      style={{ objectFit: 'cover' }}
                      priority={i === 0}
                    />
                  </div>
                  <div className="container">
                    <div className="row">
                      <div className="col-xl-8">
                        <div className="port-showcase-slider-item">
                          <div className="port-showcase-slider-content">
                            <span className="port-showcase-slider-subtitle">
                              {project.category}
                            </span>
                            <h4 className="port-showcase-slider-title">
                              <Link href={`/portfolio/${project.slug}`}>
                                {project.titleKey}
                              </Link>
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="tp-showcase-arrow-box">
              <button className="tp-showcase__button-next swiper-next">
                <i className="fa-light fa-angle-up"></i>
              </button>
              <button className="tp-showcase__button-prev swiper-prev">
                <i className="fa-light fa-angle-down"></i>
              </button>
            </div>
            <div className="tp-slider-dot d-none d-md-block"></div>
            <div className="port-showcase-slider-social tp-hover-btn-wrapper d-none d-md-block">
              <Link className="tp-hover-btn-item" href="#">Fb</Link>
              <Link className="tp-hover-btn-item" href="#">In</Link>
              <Link className="tp-hover-btn-item" href="#">Be</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
