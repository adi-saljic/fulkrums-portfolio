"use client";
import React from "react";
import { useTranslations } from 'next-intl';
import { IPortfolio } from "@/data/portfolio-data";
import VerticalReelsSlider from "./vertical-reels-slider";

interface Props {
  project: IPortfolio;
  projectIndex: number;
}

export default function PortfolioDetailsSection({
  project,
  projectIndex,
}: Props) {
  const t = useTranslations('portfolio');
  const tUI = useTranslations('projectDetails');

  React.useEffect(() => {
    // Initialize GSAP sticky scroll effect
    if (typeof window !== "undefined") {
      import("@/utils/project-anim").then((module) => {
        module.projectDetailsPin();
      });
    }
  }, []);

  return (
    <div className="project-details-1-area project-details-1-pt" style={{ marginTop: "100px", marginBottom: "100px" }}>
      <div className="container-fluid p-0">
        <div className="row g-0">
          {/* LEFT SIDE - Vertical Reels Slider */}
          <div className="col-xl-6">
            <div className="project-details-1-left">
              {project.detailVideos && project.detailVideos.length > 0 && (
                <VerticalReelsSlider videos={project.detailVideos} />
              )}
            </div>
          </div>

          {/* RIGHT SIDE - Text Content */}
          <div className="col-xl-6">
            <div className="project-details-1-right-wrap">
              <div className="project-details-1-right p-relative">
                {/* Title Section */}
                <div className="project-details-1-title-box">
                  <span className="project-details-1-subtitle">
                    {project.category}
                  </span>
                  <h4 className="project-details-1-title">
                    {project.titleKey}
                  </h4>
                  <p>{t(`${project.slug}.description`)}</p>
                </div>

                {/* Info Cards */}
                <div className="project-details-1-info-wrap">
                  <div className="project-details-1-info">
                    <span>{tUI('client')}</span>
                    <h4>{t(`${project.slug}.client`)}</h4>
                  </div>
                  <div className="project-details-1-info">
                    <span>{tUI('services')}</span>
                    <h4>{t(`${project.slug}.services`)}</h4>
                  </div>
                  <div className="project-details-1-info">
                    <span>{tUI('deliverables')}</span>
                    <h4>{t(`${project.slug}.deliverables`)}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
