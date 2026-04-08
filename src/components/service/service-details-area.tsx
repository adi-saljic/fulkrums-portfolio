"use client";
import React from "react";
import { useTranslations } from "next-intl";
import VideoShowcaseSlider from "./video-production-slider";
import VideoProductionStats from "./video-production-stats";
import VideoProductionProcess from "./video-production-process";
import VideoProductionComparison from "./video-production-comparison";
import ContactOne from "@/components/contact/contact-one";
import { serviceVideos } from "@/data/service-videos";

export default function ServiceDetailsArea() {
  const t = useTranslations("videoProduction");

  return (
    <div className="service-details__area pb-120">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="service-details__title-box mb-40">
              <span className="service-details__subtitle tp-char-animation">
                {t("smallLabel")}
              </span>
              <p style={{
                fontSize: "clamp(13px, 1.1vw, 15px)",
                color: "rgba(255,255,255,0.45)",
                letterSpacing: "0.05em",
                marginBottom: "16px",
              }}>
                {t("secondaryLabel")}
              </p>
              <h4 className="sv-hero-title tp-char-animation">
                {t("headline")}
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "20px" }}>
                {t("hashtags").split(" ").filter(Boolean).map((tag) => (
                  <span key={tag} style={{ color: "rgba(255,255,255,0.4)", fontSize: "clamp(11px, 1vw, 13px)", letterSpacing: "0.05em" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="offset-xl-4 col-xl-5">
              <div className="service-details__banner-text mb-80">
                <p className="tp_title_anim">
                  {t("description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video showcase slider — replaces static hero image */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="service-details__tab-wrapper text-center mb-120">
              <VideoShowcaseSlider videos={serviceVideos.videoProduction} />
            </div>
          </div>
        </div>
      </div>

      {/* Stats section — replaces left/right content columns */}
      <VideoProductionStats />

      {/* Process section */}
      <VideoProductionProcess />

      {/* Before / After comparison section */}
      <VideoProductionComparison />

      {/* Contact CTA */}
      <ContactOne buttonLabel="Book a call" />
    </div>
  );
}
