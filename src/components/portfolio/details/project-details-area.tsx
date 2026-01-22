"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { IProject } from "@/data/project-data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

type IProps = {
  project: IProject;
};

export default function ProjectDetailsArea({ project }: IProps) {
  const t = useTranslations("projectData");
  const tDetails = useTranslations("projectDetails");
  const projectData = t.raw(project.titleKey);
  const [unmutedVideo, setUnmutedVideo] = React.useState<number | null>(null);
  const [fullscreenImage, setFullscreenImage] = React.useState<string | null>(
    null
  );
  const videoRefs = React.useRef<(HTMLVideoElement | null)[]>([]);
  const [activeSlide, setActiveSlide] = React.useState<number>(0);

  // Define which fields to display in order
  const infoFields = [
    "client",
    "goal",
    "services",
    "market",
    "period",
    "delivery",
    "result",
    "industry",
    "audience",
    "funnel",
    "geoTargeting",
  ];

  return (
    <>
      {/* Main thumb - details area */}
      <div className="tp-showcase-details-area">
        <div
          className="tp-showcase-details-bg d-flex align-items-center justify-content-center include-bg p-relative"
          style={{
            backgroundImage: `url(${project.heroImage})`,
            minHeight: "30vh",
            height: "30vh",
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="tp-showcase-details-content text-center">
                  <span
                    className="port-showcase-slider-subtitle tp_title_anim"
                    style={{
                      textShadow:
                        "1px 1px 2px rgba(0, 0, 0, 0.8), -1px -1px 2px rgba(0, 0, 0, 0.8), 1px -1px 2px rgba(0, 0, 0, 0.8), -1px 1px 2px rgba(0, 0, 0, 0.8)",
                    }}
                  >
                    {project.category}
                  </span>
                  <h4
                    className="port-showcase-slider-title tp-char-animation"
                    style={{
                      textShadow:
                        "2px 2px 4px rgba(0, 0, 0, 0.8), -2px -2px 4px rgba(0, 0, 0, 0.8), 2px -2px 4px rgba(0, 0, 0, 0.8), -2px 2px 4px rgba(0, 0, 0, 0.8)",
                    }}
                  >
                    {projectData.title}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main thumb */}

      {/* Slider of videos - TikTok style */}
      {project.detailVideos && project.detailVideos.length > 0 && (
        <div className="showcase-details-video-wrap pb-120 pt-60">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5 col-md-7 col-sm-9">
                <div style={{ position: "relative", width: "100%" }}>
                  <Swiper
                    modules={[Navigation]}
                    spaceBetween={0}
                    slidesPerView={1}
                    direction="vertical"
                    loop={true}
                    mousewheel={true}
                    navigation={{
                      nextEl: ".video-slider-next",
                      prevEl: ".video-slider-prev",
                    }}
                    onSlideChange={(swiper) => {
                      // Pause all videos
                      videoRefs.current.forEach((video) => {
                        if (video && !video.paused) {
                          video.pause();
                        }
                      });

                      // Play active video after a short delay
                      setTimeout(() => {
                        const activeVideo = videoRefs.current[swiper.realIndex];
                        if (activeVideo) {
                          activeVideo.currentTime = 0;
                          activeVideo.play().catch((error) => {
                            console.log("Video play interrupted:", error);
                          });
                        }
                      }, 50);

                      setActiveSlide(swiper.realIndex);
                      if (unmutedVideo !== null) {
                        setUnmutedVideo(swiper.realIndex);
                      }
                    }}
                    onSwiper={(swiper) => {
                      // Play first video on mount
                      setTimeout(() => {
                        const firstVideo = videoRefs.current[0];
                        if (firstVideo) {
                          firstVideo.play().catch((error) => {
                            console.log("Video play interrupted:", error);
                          });
                        }
                      }, 100);
                    }}
                    style={{ height: "85vh" }}
                  >
                    {project.detailVideos?.map((video, index) => (
                      <SwiperSlide key={index}>
                        <div
                          className="showcase-details-video"
                          onClick={() =>
                            setUnmutedVideo(
                              unmutedVideo === index ? null : index
                            )
                          }
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
                            }}
                            muted={unmutedVideo !== index}
                            loop
                            playsInline
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          >
                            <source src={video} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>

                          {/* Gradient overlay for better text visibility */}
                          <div
                            style={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              right: 0,
                              height: "40%",
                              background:
                                "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
                              pointerEvents: "none",
                              zIndex: 1,
                            }}
                          />

                          {/* Mute icon - only show when muted */}
                          {unmutedVideo !== index && (
                            <div
                              style={{
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
                            {index + 1} / {project.detailVideos?.length || 0}
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {/* Scroll indicators - subtle */}
                  <div
                    style={{
                      position: "absolute",
                      right: "-40px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      zIndex: 10,
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <div
                      className="video-slider-prev"
                      style={{
                        width: "8px",
                        height: "40px",
                        background: "rgba(255,255,255,0.3)",
                        borderRadius: "4px",
                        cursor: "pointer",
                        transition: "all 0.3s",
                      }}
                    />
                    <div
                      className="video-slider-next"
                      style={{
                        width: "8px",
                        height: "40px",
                        background: "rgba(255,255,255,0.3)",
                        borderRadius: "4px",
                        cursor: "pointer",
                        transition: "all 0.3s",
                      }}
                    />
                  </div>

                  {/* Swipe hint text */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-50px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      color: "#666",
                      fontSize: "14px",
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span style={{ fontSize: "20px" }}>⟰</span>
                    Scroll to see more
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Slider of videos */}

      {/* Table - details overview */}
      <div id="xyz" className="showcase-details-overview pt-120 pb-60">
        <div className="container">
          <div className="row">
            <div className="col-xl-4">
              <div className="showcase-details-overview-left">
                <span className="showcase-details-subtitle">
                  {tDetails("overview")}
                </span>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="showcase-details-overview-right">
                <p className="tp_title_anim">{projectData.overview}</p>
                <div className="showcase-details-overview-info">
                  {infoFields.map((field) =>
                    projectData[field] ? (
                      <div
                        key={field}
                        className="showcase-details-overview-info-item tp_fade_bottom"
                      >
                        <div className="row align-items-center">
                          <div className="col-xl-3 col-lg-4 col-md-4 col-5">
                            <div className="showcase-details-overview-info-left">
                              <span style={{ fontSize: "16px" }}>
                                {tDetails(field)}
                              </span>
                            </div>
                          </div>
                          <div className="col-xl-9 col-lg-8 col-md-8 col-7">
                            <div className="showcase-details-overview-info-right">
                              <span style={{ fontSize: "14px" }}>
                                {projectData[field]}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Table */}

      {/* PDF Viewer - if PDF exists */}
      {project.detailPdf && (
        <div className="showcase-details-pdf-wrap pb-60">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12">
                <style jsx>{`
                  @keyframes slowScroll {
                    0% {
                      transform: translateY(0);
                    }
                    100% {
                      transform: translateY(-100%);
                    }
                  }
                  .pdf-scroll-container {
                    animation: slowScroll 10s linear infinite;
                  }
                  .showcase-details-pdf:hover .pdf-scroll-container {
                    animation-play-state: paused;
                  }
                `}</style>
                <div
                  className="showcase-details-pdf"
                  style={{
                    width: "100%",
                    height: "80vh",
                    minHeight: "600px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <div
                    className="pdf-scroll-container"
                    style={{
                      width: "100%",
                      height: "200%",
                    }}
                  >
                    <iframe
                      src={project.detailPdf}
                      width="100%"
                      height="100%"
                      style={{ border: "none", display: "block" }}
                      title="Project PDF"
                    />
                    <iframe
                      src={project.detailPdf}
                      width="100%"
                      height="100%"
                      style={{ border: "none", display: "block" }}
                      title="Project PDF Loop"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* PDF Viewer */}

      {/* Images - details thumb */}
      {project.detailImages.length > 0 && (
        <div className="showcase-details-thumb-wrap pb-60">
          <div className="container">
            <div className="row gx-4 justify-content-center">
              {project.detailImages.map((img, index) => (
                <div
                  key={index}
                  className="col-xl-5 col-lg-5 col-md-6 col-sm-12"
                >
                  <div
                    className="showcase-details-thumb mb-30"
                    onClick={() => setFullscreenImage(img)}
                    style={{ cursor: "pointer" }}
                  >
                    <Image
                      data-speed=".8"
                      src={img}
                      alt="details-thumb"
                      width={600}
                      height={450}
                      style={{
                        height: "auto",
                        width: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Images */}

      {/* Izazov - details challenge */}
      <div className="showcase-details-overview pb-60">
        <div className="container">
          <div className="row">
            <div className="col-xl-4">
              <div className="showcase-details-overview-left">
                <span className="showcase-details-subtitle fs-40 tp-char-animation">
                  {tDetails("challenge")}
                </span>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="showcase-details-overview-right tp_title_anim">
                <p>{projectData.challenge}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Izazov */}

      {/* Fullscreen image modal */}
      {fullscreenImage && (
        <div
          onClick={() => setFullscreenImage(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#000",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setFullscreenImage(null);
            }}
            style={{
              position: "fixed",
              top: "15px",
              right: "15px",
              background: "transparent",
              border: "none",
              color: "white",
              fontSize: "40px",
              cursor: "pointer",
              zIndex: 10001,
              lineHeight: "1",
              padding: "0",
              width: "auto",
              height: "auto",
              textShadow: "0 0 10px rgba(0,0,0,0.8)",
            }}
          >
            ×
          </button>
          <Image
            src={fullscreenImage}
            alt="Fullscreen"
            fill
            sizes="100vw"
            style={{
              objectFit: "contain",
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
      {/* Fullscreen image modal */}
    </>
  );
}
