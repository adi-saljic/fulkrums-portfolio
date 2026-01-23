"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Autoplay } from "swiper/modules";
import { SwiperOptions } from "swiper/types";
import { Link } from "@/i18n/routing";
// images

import project_data from "@/data/project-data";
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

// slider images
const showcase_1 = "https://drive.google.com/thumbnail?id=1P2cm97dtcE97ZgQDJih7zKdCUPKNTsmE&sz=w1000";
const showcase_2 = "https://drive.google.com/thumbnail?id=1P2cm97dtcE97ZgQDJih7zKdCUPKNTsmE&sz=w1000";
const showcase_3 = "https://drive.google.com/thumbnail?id=1P2cm97dtcE97ZgQDJih7zKdCUPKNTsmE&sz=w1000";
const showcase_4 = "https://drive.google.com/thumbnail?id=1P2cm97dtcE97ZgQDJih7zKdCUPKNTsmE&sz=w1000";
const slider_images = [showcase_1, showcase_2, showcase_3, showcase_4];
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
              {project_data.map((project,i) => (
                <SwiperSlide key={project.id}>
                  <div className={`slide-wrap ${i === 0 ? 'active' : ''}`} data-slide={i}></div>
                  <div className="container">
                    <div className="row">
                      <div className="col-xl-8">
                        <div className="port-showcase-slider-item">
                          <div className="port-showcase-slider-content">
                            <span className="port-showcase-slider-subtitle">
                              {project.category}
                            </span>
                            <h4 className="port-showcase-slider-title">
                              <Link href={`/study-cases/${project.slug}`}>
                                {tData(`${project.titleKey}.title`)}
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
