"use client";
import React from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from 'next-intl';

import { ProjectShape, RightArrow } from "../svg";

// portfolio data
const project_data = [
  {
    id: 1,
    meta_1: "DEC 2024 . Creative",
    title_1: "Cheyf",
    description_1: "Brief description of Cheyf project",
    meta_2: "NOV 2024 . Creative",
    title_2: "AISpecify",
    description_2: "Brief description of AISpecify project",
  },
  {
    id: 2,
    meta_1: "OCT 2024 . Creative",
    title_1: "Cera",
    description_1: "Brief description of Cera project",
    meta_2: "SEP 2024 . Creative",
    title_2: "Kera",
    description_2: "Brief description of Kera project",
  },
  {
    id: 3,
    meta_1: "AUG 2024 . Development",
    title_1: "TechFlow",
    description_1: "Modern web application with AI integration",
    meta_2: "JUL 2024 . Marketing",
    title_2: "BrandBoost",
    description_2: "Performance marketing campaign for local business",
  },
  {
    id: 4,
    meta_1: "JUN 2024 . Creative",
    title_1: "VisualWorks",
    description_1: "Creative video production for social media",
    meta_2: "MAY 2024 . Development",
    title_2: "DataSync",
    description_2: "Custom CRM integration solution",
  },
  {
    id: 5,
    meta_1: "APR 2024 . Marketing",
    title_1: "GrowthPath",
    description_1: "Lead generation campaign with automation",
    meta_2: "MAR 2024 . Creative",
    title_2: "StudioPro",
    description_2: "Brand identity and design system",
  },
];

// prop type
type IProps = {
  style_2?: boolean;
  showTitle?: boolean;
};
export default function ProjectFour({ style_2 = false, showTitle = true }: IProps) {
  const t = useTranslations('projects');

  return (
    <div
      className={`tp-project-3-area ${
        style_2 ? "pt-60 pw-project-style" : "pt-130 black-bg"
      }`}
    >
      <div className="container container-1720">
        {!style_2 && showTitle && (
          <div className="row justify-content-center">
            <div className="col-xl-7">
              <div className="tp-project-3-title-box p-relative mb-150">
                <h4 className="tp-section-title-200 tp_reveal_anim" style={{ fontSize: "80px" }}>
                  {t('title')} <span>{t('titleHighlight')}</span>
                </h4>
              </div>
            </div>
          </div>
        )}
        {/* Desktop Layout */}
        <div className="row d-none d-lg-block">
          <div className="col-xl-12">
            {project_data.map((item, i) => (
              <div key={item.id} className="tp-project-3-wrap">
                <div className="row">
                  <div className="col-xl-6 col-lg-6">
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                      <div className="tp-project-3-content text-start">
                        <h4 className="tp-project-3-title-sm" style={{ fontSize: "32px" }}>
                          {item.title_1}
                        </h4>
                        <p style={{ color: "#999", fontSize: "14px", marginTop: "10px", marginBottom: "15px" }}>
                          {item.description_1}
                        </p>
                      </div>
                      <div className="tp-project-3-content text-end">
                        <h4 className="tp-project-3-title-sm" style={{ fontSize: "32px" }}>
                          {item.title_2}
                        </h4>
                        <p style={{ color: "#999", fontSize: "14px", marginTop: "10px", marginBottom: "15px" }}>
                          {item.description_2}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6">
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Layout: Image, Content, Content, Image pattern */}
        <div className="row d-lg-none">
          <div className="col-12">
            {project_data.map((item, i) => (
              <div key={item.id} className="tp-project-3-wrap">
                {/* Image 1 */}
                <div className="tp-project-3-thumb pro-img-1 mb-30">
                  <Image
                    src={item.img_1}
                    alt="port-img"
                    style={{ height: "auto" }}
                  />
                </div>

                {/* Content 1 */}
                <div className="tp-project-3-content text-start mb-40">
                  <h4 className="tp-project-3-title-sm" style={{ fontSize: "32px" }}>
                    {item.title_1}
                  </h4>
                  <p style={{ color: "#999", fontSize: "14px", marginTop: "10px", marginBottom: "15px" }}>
                    {item.description_1}
                  </p>
                </div>

                {/* Content 2 */}
                <div className="tp-project-3-content text-start mb-30">
                  <h4 className="tp-project-3-title-sm" style={{ fontSize: "32px" }}>
                    {item.title_2}
                  </h4>
                  <p style={{ color: "#999", fontSize: "14px", marginTop: "10px", marginBottom: "15px" }}>
                    {item.description_2}
                  </p>
                </div>

                {/* Image 2 */}
                <div className="tp-project-3-thumb pro-img-2 mb-60">
                  <Image
                    src={item.img_2}
                    alt="port-img"
                    style={{ height: "auto" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
