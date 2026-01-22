"use client";
import React from "react";
import Image from "next/image";
import { IPortfolio } from "@/data/portfolio-data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

type IProps = {
  project: IPortfolio;
};

export default function PortfolioDetailsSimple({ project }: IProps) {
  const [unmutedVideo, setUnmutedVideo] = React.useState<number | null>(null);
  const [fullscreenImage, setFullscreenImage] = React.useState<string | null>(null);
  const videoRefs = React.useRef<(HTMLVideoElement | null)[]>([]);
  const [activeSlide, setActiveSlide] = React.useState<number>(0);

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
                      textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8), -1px -1px 2px rgba(0, 0, 0, 0.8), 1px -1px 2px rgba(0, 0, 0, 0.8), -1px 1px 2px rgba(0, 0, 0, 0.8)",
                    }}
                  >
                    {project.category}
                  </span>
                  <h4
                    className="port-showcase-slider-title tp-char-animation"
                    style={{
                      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8), -2px -2px 4px rgba(0, 0, 0, 0.8), 2px -2px 4px rgba(0, 0, 0, 0.8), -2px 2px 4px rgba(0, 0, 0, 0.8)",
                    }}
                  >
                    {project.titleKey}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                      videoRefs.current.forEach((video) => {
                        if (video && !video.paused) {
                          video.pause();
                        }
                      });
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
                            ref={(el) => { videoRefs.current[index] = el; }}
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
                          </video>
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
                            {index + 1} / {project.detailVideos?.length || 0}
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div style={{
                    position: "absolute",
                    right: "-40px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}>
                    <div className="video-slider-prev" style={{
                      width: "8px",
                      height: "40px",
                      background: "rgba(255,255,255,0.3)",
                      borderRadius: "4px",
                      cursor: "pointer",
                      transition: "all 0.3s",
                    }} />
                    <div className="video-slider-next" style={{
                      width: "8px",
                      height: "40px",
                      background: "rgba(255,255,255,0.3)",
                      borderRadius: "4px",
                      cursor: "pointer",
                      transition: "all 0.3s",
                    }} />
                  </div>
                  <div style={{
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
                  }}>
                    <span style={{ fontSize: "20px" }}>⟰</span>
                    Scroll to see more
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Images */}
      {project.detailImages && project.detailImages.length > 0 && (
        <div className="showcase-details-thumb-wrap pb-60">
          <div className="container">
            <div className="row gx-4 justify-content-center">
              {project.detailImages.map((img, index) => (
                <div key={index} className="col-xl-5 col-lg-5 col-md-6 col-sm-12">
                  <div className="showcase-details-thumb mb-30" onClick={() => setFullscreenImage(img)} style={{ cursor: "pointer" }}>
                    <Image data-speed=".8" src={img} alt="details-thumb" width={600} height={450} style={{ height: "auto", width: "100%", objectFit: "contain" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen modal */}
      {fullscreenImage && (
        <div onClick={() => setFullscreenImage(null)} style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "#000", zIndex: 9999, display: "flex",
          alignItems: "center", justifyContent: "center", padding: 0,
        }}>
          <button onClick={(e) => { e.stopPropagation(); setFullscreenImage(null); }} style={{
            position: "fixed", top: "15px", right: "15px", background: "transparent",
            border: "none", color: "white", fontSize: "40px", cursor: "pointer",
            zIndex: 10001, lineHeight: "1", padding: "0", textShadow: "0 0 10px rgba(0,0,0,0.8)",
          }}>×</button>
          <Image src={fullscreenImage} alt="Fullscreen" fill sizes="100vw" style={{ objectFit: "contain" }} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </>
  );
}
