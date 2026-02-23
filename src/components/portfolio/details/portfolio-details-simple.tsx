"use client";
import React from "react";
import Image from "next/image";
import { IPortfolio } from "@/data/portfolio-data";

type IProps = {
  project: IPortfolio;
  hasVideos?: boolean;
};

export default function PortfolioDetailsSimple({ project, hasVideos = false }: IProps) {
  const [fullscreenImage, setFullscreenImage] = React.useState<string | null>(null);

  return (
    <>
      {/* Main thumb - details area - ONLY show if NO videos */}
      {!hasVideos && (
        <div className="tp-showcase-details-area">
        <div
          className="tp-showcase-details-bg d-flex align-items-center justify-content-center include-bg p-relative"
          style={{
            minHeight: "30vh",
            height: "30vh",
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
                objectFit: "cover",
                objectPosition: "center",
                zIndex: 0,
              }}
            />
          )}
          <div className="container" style={{ position: "relative", zIndex: 1 }}>
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
      )}

      {/* Images - Clean grid layout with 3 columns */}
      {project.detailImages && project.detailImages.length > 0 && (
        <div className="showcase-details-thumb-wrap pb-60 pt-60">
          <div className="container">
            <div className="row gx-4 gy-4 justify-content-center">
              {project.detailImages.map((img, index) => (
                <div key={index} className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                  <div
                    className="showcase-details-thumb"
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
                        objectFit: "cover",
                        display: "block"
                      }}
                    />
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
