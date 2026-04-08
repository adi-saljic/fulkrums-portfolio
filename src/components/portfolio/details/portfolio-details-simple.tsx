"use client";
import React from "react";
import Image from "next/image";
import { IPortfolio } from "@/data/portfolio-data";
import SmartImageGrid from "../smart-image-grid";

type IProps = {
  project: IPortfolio;
  hasVideos?: boolean;
};

export default function PortfolioDetailsSimple({ project, hasVideos = false }: IProps) {

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
                    className="port-showcase-slider-title"
                    style={{
                      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8), -2px -2px 4px rgba(0, 0, 0, 0.8), 2px -2px 4px rgba(0, 0, 0, 0.8), -2px 2px 4px rgba(0, 0, 0, 0.8)",
                      fontSize: "clamp(20px, 3.5vw, 36px)",
                      letterSpacing: "0.05em",
                      lineHeight: "1.4",
                      wordSpacing: "0.1em"
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

      {/* Smart Image Grid - Automatically adapts layout based on aspect ratios */}
      {project.detailImages && project.detailImages.length > 0 && (
        <div className="showcase-details-thumb-wrap pb-60 pt-60">
          <div className="container">
            <SmartImageGrid images={project.detailImages} />
          </div>
        </div>
      )}
    </>
  );
}
