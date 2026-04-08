"use client";
import { useTranslations } from "next-intl";
import { FirstBracket, FirstBracketTwo } from "@/components/svg";
import { X, Check } from "lucide-react";

const BEFORE_COUNT = 5;
const AFTER_COUNT = 6;

export default function DigitalMarketingComparison() {
  const t = useTranslations("digitalMarketing");

  return (
    <section
      style={{
        background: "#0a0a0a",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        paddingTop: "clamp(60px,8vw,120px)",
        paddingBottom: "clamp(60px,8vw,120px)",
      }}
    >
      <div className="container">
        {/* Section heading */}
        <div className="text-center mb-80">
          <span className="tp-section-subtitle-2 tp_fade_bottom">
            <span>
              <FirstBracket />
            </span>
            <span className="tp-subtitle-text tp_text_invert">
              {t("comparison.subtitle")}
            </span>
            <span>
              <FirstBracketTwo />
            </span>
          </span>
          <h2
            className="tp-section-title-90 tp_text_invert tp_fade_bottom"
            style={{ fontSize: "clamp(28px,3.5vw,56px)", marginTop: "16px" }}
          >
            {t("comparison.title")}
          </h2>
          <p
            style={{
              fontSize: "clamp(13px,1.1vw,15px)",
              color: "rgba(255,255,255,0.5)",
              maxWidth: "640px",
              margin: "20px auto 0",
              lineHeight: 1.7,
            }}
          >
            {t("comparison.description")}
          </p>
        </div>

        {/* Comparison table */}
        <div style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
          <div className="row g-0">
            {/* Before column */}
            <div className="col-md-6">
              <div
                style={{
                  padding: "20px 32px",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--tp-ff-marcellus)",
                    fontSize: "12px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.35)",
                  }}
                >
                  {t("comparison.beforeLabel")}
                </span>
              </div>
              {Array.from({ length: BEFORE_COUNT }, (_, i) => i + 1).map((n) => (
                <div
                  key={n}
                  style={{
                    padding: "20px 32px",
                    borderBottom:
                      n < BEFORE_COUNT
                        ? "1px solid rgba(255,255,255,0.06)"
                        : "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "flex-start",
                    }}
                  >
                    <X
                      size={14}
                      style={{
                        color: "rgba(255,80,80,0.7)",
                        flexShrink: 0,
                        marginTop: "4px",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "clamp(13px,1vw,15px)",
                        color: "rgba(255,255,255,0.45)",
                        lineHeight: 1.65,
                      }}
                    >
                      {t(`comparison.before${n}`)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* After column */}
            <div
              className="col-md-6"
              style={{ borderLeft: "1px solid rgba(255,255,255,0.1)" }}
            >
              <div
                style={{
                  padding: "20px 32px",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--tp-ff-marcellus)",
                    fontSize: "12px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#fff",
                  }}
                >
                  {t("comparison.afterLabel")}
                </span>
              </div>
              {Array.from({ length: AFTER_COUNT }, (_, i) => i + 1).map((n) => (
                <div
                  key={n}
                  style={{
                    padding: "20px 32px",
                    borderBottom:
                      n < AFTER_COUNT
                        ? "1px solid rgba(255,255,255,0.06)"
                        : "none",
                    background: "rgba(255,255,255,0.015)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "flex-start",
                    }}
                  >
                    <Check
                      size={14}
                      style={{
                        color: "rgba(80,200,120,0.85)",
                        flexShrink: 0,
                        marginTop: "4px",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "clamp(13px,1vw,15px)",
                        color: "rgba(255,255,255,0.72)",
                        lineHeight: 1.65,
                      }}
                    >
                      {t(`comparison.after${n}`)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
