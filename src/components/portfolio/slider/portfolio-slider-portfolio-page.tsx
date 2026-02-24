import React, { useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import "slick-carousel/slick/slick.css";
import { DownArrow } from "../../svg";
import { SlickNextArrow, SlickPrevArrow } from "@/components/slick-arrow";
import { getPortfolioData } from "@/data/portfolio-data";

// slider setting one - will be created with disabled state
const getSliderSettingOne = (isDisabled: boolean) => ({
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  speed: 1000,
  infinite: true,
  nextArrow: <SlickNextArrow disabled={isDisabled} />,
  prevArrow: <SlickPrevArrow disabled={isDisabled} />,
});

// slider setting two - will be created with disabled state
const getSliderSettingTwo = (isDisabled: boolean) => ({
  slidesToShow: 3,
  slidesToScroll: 1,
  dots: false,
  arrows: true,
  focusOnSelect: true,
  centerPadding: "0",
  speed: 600,
  infinite: true,
  nextArrow: <SlickNextArrow disabled={isDisabled} />,
  prevArrow: <SlickPrevArrow disabled={isDisabled} />,
  responsive: [
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 992,
      settings: {
        arrows: false,
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        slidesToShow: 4,
      },
    },
  ],
});

// Slider component with proper typing
const TypedSlider = Slider as React.ComponentType<any>;

export default function PortfolioSliderPortfolioPage() {
  const [slider1, setSlider1] = useState<any>(null);
  const [slider2, setSlider2] = useState<any>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Load portfolio data at runtime (not build time)
  const slider_projects = getPortfolioData();

  const handleBeforeChange = (current: number, next: number) => {
    setIsTransitioning(true);
    if (slider1) {
      slider1.slickGoTo(next);
    }
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };

  return (
    <div className="tp-portfolio-11-area fix">
      <div
        className="tp-portfolio-11-slider-wrap p-relative"
        style={{ height: "100vh", minHeight: "600px" }}
      >
        <TypedSlider
          {...getSliderSettingOne(isTransitioning)}
          asNavFor={slider2}
          ref={(slider: any) => setSlider1(slider)}
          className="tp-portfolio-11-slider-active"
        >
          {slider_projects.map((project) => (
            <div key={project.id}>
              <div
                className="tp-portfolio-11-slider-bg d-flex align-items-end"
                style={{
                  position: "relative",
                  height: "100vh",
                  minHeight: "600px",
                  paddingTop: "170px",
                  paddingBottom: "150px",
                  overflow: "hidden",
                }}
              >
                {project.heroImage && (
                  <Image
                    src={project.heroImage}
                    alt={project.titleKey}
                    fill
                    priority
                    sizes="100vw"
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                      zIndex: 0,
                    }}
                  />
                )}
                <div
                  className="tp-portfolio-11-slider-content"
                  style={{ position: "relative", zIndex: 1 }}
                >
                  <div className="tp-portfolio-11-slider-link">
                    <DownArrow />
                  </div>
                  <span
                    className="tp-portfolio-11-slider-subtitle"
                    style={{
                      textShadow:
                        "1px 1px 2px rgba(0, 0, 0, 0.8), -1px -1px 2px rgba(0, 0, 0, 0.8), 1px -1px 2px rgba(0, 0, 0, 0.8), -1px 1px 2px rgba(0, 0, 0, 0.8)",
                    }}
                  >
                    {project.category}
                  </span>
                  <h3
                    className="tp-portfolio-11-slider-title"
                    style={{
                      textShadow:
                        "2px 2px 4px rgba(0, 0, 0, 0.8), -2px -2px 4px rgba(0, 0, 0, 0.8), 2px -2px 4px rgba(0, 0, 0, 0.8), -2px 2px 4px rgba(0, 0, 0, 0.8)",
                    }}
                  >
                    {project.titleKey}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </TypedSlider>

        <div className="dddd"></div>

        <div className="tp-portfolio-11-slider-nav-wrap z-index-5" style={{ paddingLeft: "10%", maxWidth: "90%" }}>
          <TypedSlider
            {...getSliderSettingTwo(isTransitioning)}
            asNavFor={slider1}
            ref={(slider: any) => setSlider2(slider)}
            beforeChange={handleBeforeChange}
            className="tp-portfolio-11-slider-nav-active d-none d-lg-block"
          >
            {slider_projects.map((project, index) => (
              <div
                key={project.id}
                className="tp-portfolio-11-slider-nav-item p-relative"
              >
                <Link
                  href={`/portfolio/${project.slug}`}
                  style={{ display: "block", cursor: "pointer", padding: "0 10px" }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div
                    className="tp-portfolio-11-slider-nav-thumb"
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "150px",
                      overflow: "hidden",
                      borderRadius: "8px",
                      border: hoveredIndex === index ? "2px solid rgba(255,107,53,0.8)" : "2px solid rgba(255,255,255,0.1)",
                      transform: hoveredIndex === index ? "scale(1.05)" : "scale(1)",
                      transition: "all 0.3s ease",
                      boxShadow: hoveredIndex === index ? "0 8px 25px rgba(255,107,53,0.3)" : "none"
                    }}
                  >
                    {project.heroImage && (
                      <Image
                        src={project.heroImage}
                        alt={project.titleKey}
                        fill
                        sizes="300px"
                        style={{
                          objectFit: "cover",
                          objectPosition: "center",
                          transition: "all 0.3s ease",
                          transform: hoveredIndex === index ? "scale(1.1)" : "scale(1)",
                          filter: hoveredIndex === index ? "blur(3px)" : "none"
                        }}
                      />
                    )}
                    {hoveredIndex === index && (
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'rgba(0, 0, 0, 0.6)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.3s ease',
                          zIndex: 10
                        }}
                      >
                        <span
                          style={{
                            fontSize: '13px',
                            fontWeight: 500,
                            color: '#fff',
                            letterSpacing: '2px',
                            textAlign: 'center',
                            textTransform: 'uppercase',
                            fontFamily: 'Syne, Syne Fallback, sans-serif'
                          }}
                        >
                          See more
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="tp-portfolio-11-slider-nav-content-wrap">
                    <div className="tp-portfolio-11-slider-nav-content d-flex flex-column justify-content-between">
                      <div className="tp-portfolio-11-slider-nav-year">
                        <span
                          style={{
                            textShadow:
                              "1px 1px 2px rgba(0, 0, 0, 0.8), -1px -1px 2px rgba(0, 0, 0, 0.8), 1px -1px 2px rgba(0, 0, 0, 0.8), -1px 1px 2px rgba(0, 0, 0, 0.8)",
                          }}
                        >
                          {project.category}
                        </span>
                      </div>
                      <div className="tp-portfolio-11-slider-nav-tittle-box" style={{ maxHeight: "3em", overflow: "hidden" }}>
                        <h4 className="tp-portfolio-11-slider-nav-tittle">
                          <span
                            style={{
                              textShadow:
                                "1px 1px 2px rgba(0, 0, 0, 0.8), -1px -1px 2px rgba(0, 0, 0, 0.8), 1px -1px 2px rgba(0, 0, 0, 0.8), -1px 1px 2px rgba(0, 0, 0, 0.8)",
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              wordBreak: 'break-word',
                              lineHeight: '1.5em'
                            } as React.CSSProperties}
                          >
                            {project.titleKey}
                          </span>
                        </h4>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </TypedSlider>
        </div>
      </div>
    </div>
  );
}
