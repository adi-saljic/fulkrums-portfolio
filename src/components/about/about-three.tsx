"use client";
import React from "react";
import { useTranslations } from "next-intl";
// internal imports
import { FirstBracket, FirstBracketTwo } from "../svg";

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
        <div className="row align-items-center justify-content-center">
          <div className="col-xl-10 col-lg-10 col-md-12">
            <div className="tp-about-3-content" style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
              <p className="mb-30 tp_fade_bottom">{t("description1")}</p>
              <p className="tp_fade_bottom">{t("description2")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
