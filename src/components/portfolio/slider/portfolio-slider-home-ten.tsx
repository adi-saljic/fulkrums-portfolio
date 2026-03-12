import React, { useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import "slick-carousel/slick/slick.css";
import { getProjectData } from "@/data/project-data";
import { useTranslations } from 'next-intl';

// slider setting one - will be created with disabled state
const getSliderSettingOne = (isDisabled: boolean) => ({
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  speed: 1000,
  infinite: true,
  arrows: false,
});

// slider setting two - will be created with disabled state
const getSliderSettingTwo = (isDisabled: boolean) => ({
  slidesToShow: 3,
  slidesToScroll: 1,
  dots: false,
  arrows: false,
  focusOnSelect: true,
  centerPadding: "0",
  speed: 600,
  infinite: true,
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

export default function PortfolioSliderHomeTen() {
  const [slider1, setSlider1] = useState<any>(null);
  const [slider2, setSlider2] = useState<any>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const t = useTranslations('projectData');

  // Get all projects for slider - called on every render to get fresh data
  const slider_projects = getProjectData();

  // Debug: Log the heroImage URLs
  React.useEffect(() => {
    console.log('Study Cases Projects:', slider_projects.map(p => ({
      slug: p.slug,
      heroImage: p.heroImage
    })));
  }, []);

  // Preload all images on mount
  React.useEffect(() => {
    slider_projects.forEach((project) => {
      const img = document.createElement('img');
      img.src = project.heroImage;
    });
  }, []);

  const handleBeforeChange = (current: number, next: number) => {
    setIsTransitioning(true);
    setCurrentSlide(next);
    if (slider1) {
      slider1.slickGoTo(next);
    }
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };

  return (
    <div className="tp-portfolio-11-area fix">
      <div className="tp-portfolio-11-slider-wrap p-relative" style={{ height: '100vh', minHeight: '600px' }}>
        <TypedSlider
          {...getSliderSettingOne(isTransitioning)}
          asNavFor={slider2}
          ref={(slider: any) => setSlider1(slider)}
          className="tp-portfolio-11-slider-active"
        >
          {slider_projects.map((project) => (
            <div key={project.id}>
              <div
                className="tp-portfolio-11-slider-bg d-flex align-items-start"
              >
                {project.heroImage && (
                  <>
                    <Image
                      src={project.heroImage}
                      alt={t(`${project.titleKey}.title`)}
                      fill
                      priority
                      sizes="100vw"
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                        zIndex: 0,
                      }}
                    />
                    {/* White overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        zIndex: 0,
                      }}
                    />
                  </>
                )}
                <div className="tp-portfolio-11-slider-content" style={{ position: 'relative', zIndex: 1 }}>
                  <span
                    className="tp-portfolio-11-slider-subtitle"
                    style={{
                      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8), -1px -1px 2px rgba(0, 0, 0, 0.8), 1px -1px 2px rgba(0, 0, 0, 0.8), -1px 1px 2px rgba(0, 0, 0, 0.8)'
                    }}
                  >
                    {project.category}
                  </span>
                  <h3
                    className="tp-portfolio-11-slider-title"
                    style={{
                      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), -2px -2px 4px rgba(0, 0, 0, 0.8), 2px -2px 4px rgba(0, 0, 0, 0.8), -2px 2px 4px rgba(0, 0, 0, 0.8)',
                      letterSpacing: '0.02em'
                    }}
                  >
                    {t(`${project.titleKey}.title`)}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </TypedSlider>

        {/* Mobile Controls - Arrows + See More Button */}
        <div
          className="tp-portfolio-11-mobile-controls d-lg-none"
          style={{
            position: 'absolute',
            bottom: '80px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            width: 'auto',
          }}
        >
          {/* Left Arrow */}
          <button
            type="button"
            onClick={() => slider1?.slickPrev()}
            disabled={isTransitioning}
            style={{
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              border: '2px solid black',
              backgroundColor: 'transparent',
              color: 'black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              opacity: isTransitioning ? 0.5 : 1,
              pointerEvents: isTransitioning ? 'none' : 'auto',
              flexShrink: 0,
            }}
          >
            <i className="fa-light fa-angle-left" style={{ fontSize: '20px' }}></i>
          </button>

          {/* See More Button */}
          <Link
            href={`/study-cases/${slider_projects[currentSlide]?.slug}`}
            className="tp-btn-border"
            style={{
              fontSize: '14px',
              padding: '0 35px',
              height: '50px',
              lineHeight: '50px',
              whiteSpace: 'nowrap',
              border: '2px solid black',
              backgroundColor: 'transparent',
              color: 'black',
            }}
          >
            <span className="tp-btn-border-wrap">
              <span className="text-1" style={{ color: 'black' }}>See More</span>
              <span className="text-2" style={{ color: 'black' }}>See More</span>
            </span>
          </Link>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={() => slider1?.slickNext()}
            disabled={isTransitioning}
            style={{
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              border: '2px solid black',
              backgroundColor: 'transparent',
              color: 'black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              opacity: isTransitioning ? 0.5 : 1,
              pointerEvents: isTransitioning ? 'none' : 'auto',
              flexShrink: 0,
            }}
          >
            <i className="fa-light fa-angle-right" style={{ fontSize: '20px' }}></i>
          </button>
        </div>

        <div className="dddd"></div>

        <div className="tp-portfolio-11-slider-nav-wrap z-index-5">
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
                  href={`/study-cases/${project.slug}`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                    padding: "0 5px",
                    position: "relative"
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* 1. TITLE/CATEGORY FIRST - at top */}
                  <div className="tp-portfolio-11-slider-nav-content-wrap" style={{
                    position: "relative",
                    padding: "0 10px 4px",
                    marginBottom: "4px",
                    order: 1
                  }}>
                    <div className="tp-portfolio-11-slider-nav-content d-flex flex-column justify-content-between">
                      <div className="tp-portfolio-11-slider-nav-tittle-box" style={{ maxHeight: "3em", overflow: "hidden" }}>
                        <h4 className="tp-portfolio-11-slider-nav-tittle">
                          <span
                            style={{
                              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8), -1px -1px 2px rgba(0, 0, 0, 0.8), 1px -1px 2px rgba(0, 0, 0, 0.8), -1px 1px 2px rgba(0, 0, 0, 0.8)',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              wordBreak: 'break-word',
                              lineHeight: '1.5em'
                            } as React.CSSProperties}
                          >
                            {t(`${project.titleKey}.title`)}
                          </span>
                        </h4>
                      </div>
                    </div>
                  </div>

                  {/* 2. IMAGE SECOND - in middle */}
                  <div
                    className="tp-portfolio-11-slider-nav-thumb"
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "clamp(150px, 16vh, 175px)",
                      overflow: "hidden",
                      borderRadius: "8px",
                      border: hoveredIndex === index ? "2px solid rgba(255,107,53,0.8)" : "2px solid rgba(255,255,255,0.1)",
                      transform: hoveredIndex === index ? "scale(1.05)" : "scale(1)",
                      transition: "all 0.3s ease",
                      boxShadow: hoveredIndex === index ? "0 8px 25px rgba(255,107,53,0.3)" : "none",
                      order: 2
                    }}
                  >
                    {project.heroImage && (
                      <Image
                        src={project.heroImage}
                        alt={t(`${project.titleKey}.title`)}
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
                  </div>

                  {/* 3. BUTTON LAST - at bottom */}
                  <div style={{
                    padding: "12px 10px 8px",
                    display: "flex",
                    justifyContent: "center",
                    order: 3
                  }}>
                    <div style={{
                      height: "40px",
                      padding: "0 25px",
                      border: hoveredIndex === index ? "2px solid rgba(255,107,53,0.95)" : "2px solid rgba(255,255,255,0.5)",
                      borderRadius: "20px",
                      background: hoveredIndex === index ? "rgba(255,107,53,0.95)" : "rgba(0,0,0,0.7)",
                      color: "white",
                      fontSize: "12px",
                      fontWeight: 500,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s ease",
                      transform: hoveredIndex === index ? "scale(1.05)" : "scale(1)",
                      boxShadow: hoveredIndex === index ? "0 4px 12px rgba(255,107,53,0.5)" : "0 2px 8px rgba(0,0,0,0.4)",
                      backdropFilter: "blur(4px)"
                    } as React.CSSProperties}>
                      See More
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </TypedSlider>
        </div>

        {/* CUSTOM NAVIGATION ARROWS - OUTSIDE SLICK CONTAINER */}
        <button
          type="button"
          className="portfolio-custom-arrow portfolio-custom-arrow-prev d-none d-lg-block"
          onClick={() => slider2?.slickPrev()}
          disabled={isTransitioning}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,107,53,0.95)';
            e.currentTarget.style.borderColor = 'rgba(255,107,53,0.95)';
            e.currentTarget.style.transform = 'translateX(-70px) scale(1.05)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,107,53,0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0,0,0,0.7)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
            e.currentTarget.style.transform = 'translateX(-70px) scale(1)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.4)';
          }}
          style={{
            position: 'fixed',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-70px)',
            width: '55px',
            height: '55px',
            borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.5)',
            background: 'rgba(0,0,0,0.7)',
            color: 'white',
            cursor: isTransitioning ? 'not-allowed' : 'pointer',
            zIndex: 999,
            transition: 'all 0.3s ease',
            opacity: isTransitioning ? 0.5 : 1,
            pointerEvents: isTransitioning ? 'none' : 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4px)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
          }}
        >
          <i className="fa-light fa-angle-left" style={{ fontSize: '18px', lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}></i>
        </button>

        <button
          type="button"
          className="portfolio-custom-arrow portfolio-custom-arrow-next d-none d-lg-block"
          onClick={() => slider2?.slickNext()}
          disabled={isTransitioning}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,107,53,0.95)';
            e.currentTarget.style.borderColor = 'rgba(255,107,53,0.95)';
            e.currentTarget.style.transform = 'translateX(15px) scale(1.05)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,107,53,0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0,0,0,0.7)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
            e.currentTarget.style.transform = 'translateX(15px) scale(1)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.4)';
          }}
          style={{
            position: 'fixed',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(15px)',
            width: '55px',
            height: '55px',
            borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.5)',
            background: 'rgba(0,0,0,0.7)',
            color: 'white',
            cursor: isTransitioning ? 'not-allowed' : 'pointer',
            zIndex: 999,
            transition: 'all 0.3s ease',
            opacity: isTransitioning ? 0.5 : 1,
            pointerEvents: isTransitioning ? 'none' : 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4px)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
          }}
        >
          <i className="fa-light fa-angle-right" style={{ fontSize: '18px', lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}></i>
        </button>
      </div>
    </div>
  );
}