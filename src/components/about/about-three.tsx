"use client";
import React from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
// internal imports
import { ArrowBg, RightArrowTwo, FirstBracket, FirstBracketTwo } from "../svg";

export default function AboutThree() {
  const t = useTranslations("about");

  return (
    <div className="tp-about-3-area pt-120 pb-110">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="tp-about-3-title-box">
              <span className="tp-section-subtitle-2 tp_fade_bottom">
                <span>
                  <FirstBracket />
                </span>
                <span className="tp-subtitle-text tp_text_invert">
                  {t("subtitle")}
                </span>
                <span>
                  <FirstBracketTwo />
                </span>
              </span>
              <h4
                className="tp-section-title-90 tp_text_invert tp_fade_bottom"
                style={{
                  fontSize: "clamp(40px, 6vw, 90px)",
                  lineHeight: "1.2",
                  wordWrap: "break-word",
                }}
              >
                {t("title")}
              </h4>
            </div>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6 col-md-4"></div>
          <div className="col-xl-6 col-lg-6 col-md-8">
            <div className="tp-about-3-content">
              <p className="mb-30 tp_fade_bottom">{t("description1")}</p>
              <p className="mb-45 tp_fade_bottom">{t("description2")}</p>
              <Link
                className="tp-btn-black-2 tp_fade_bottom"
                href="/our-team"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "15px 30px",
                  backgroundColor: "#fff",
                  color: "#000",
                  borderRadius: "50px",
                  textDecoration: "none",
                  fontWeight: "500",
                  transition: "all 0.3s ease",
                }}
              >
                {t("button")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
