"use client";
import { useTranslations } from "next-intl";
import { FirstBracket, FirstBracketTwo } from "@/components/svg";
import { Activity, Target, Layers, PenTool, TrendingUp, BarChart2 } from "lucide-react";

const STEP_ICONS = [Activity, Target, Layers, PenTool, TrendingUp, BarChart2];
const STEP_COUNT = 6;

export default function DigitalMarketingProcess() {
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
              {t("process.subtitle")}
            </span>
            <span>
              <FirstBracketTwo />
            </span>
          </span>
          <h2
            className="tp-section-title-90 tp_text_invert tp_fade_bottom"
            style={{ fontSize: "clamp(28px,3.5vw,56px)", marginTop: "16px" }}
          >
            {t("process.title")}
          </h2>
        </div>

        {/* Step cards */}
        <div className="row g-4">
          {Array.from({ length: STEP_COUNT }, (_, i) => i + 1).map((n) => {
            const listRaw = t(`process.step${n}List`);
            const listItems = listRaw ? listRaw.split("\n").filter(Boolean) : [];
            const outro = t(`process.step${n}Outro`);
            const Icon = STEP_ICONS[n - 1];
            return (
              <div key={n} className="col-xl-4 col-lg-4 col-md-6 col-12">
                <div
                  style={{
                    border: "1px solid rgba(255,255,255,0.1)",
                    padding: "clamp(24px,3vw,48px)",
                    height: "100%",
                  }}
                >
                  {/* Icon + number row */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "20px",
                      color: "rgba(255,255,255,0.35)",
                    }}
                  >
                    <Icon size={22} strokeWidth={1.5} />
                    <span
                      style={{
                        fontFamily: "var(--tp-ff-marcellus)",
                        fontSize: "clamp(13px,1vw,15px)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {n < 10 ? "0" + n : n}
                    </span>
                  </div>

                  {/* Title */}
                  <h4
                    style={{
                      fontFamily: "var(--tp-ff-marcellus)",
                      fontSize: "clamp(18px,1.8vw,26px)",
                      color: "#fff",
                      marginBottom: "14px",
                      fontWeight: 400,
                      lineHeight: 1.3,
                    }}
                  >
                    {t(`process.step${n}Title`)}
                  </h4>

                  {/* Body */}
                  <p
                    style={{
                      fontSize: "clamp(13px,1vw,15px)",
                      color: "rgba(255,255,255,0.6)",
                      lineHeight: 1.7,
                      marginBottom: listItems.length > 0 ? "14px" : "0",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {t(`process.step${n}Body`)}
                  </p>

                  {/* List */}
                  {listItems.length > 0 && (
                    <ul style={{ paddingLeft: "18px", margin: 0, marginBottom: outro ? "14px" : "0" }}>
                      {listItems.map((item, idx) => (
                        <li
                          key={idx}
                          style={{
                            fontSize: "clamp(12px,0.9vw,14px)",
                            color: "rgba(255,255,255,0.45)",
                            lineHeight: 1.8,
                            marginBottom: "2px",
                          }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Outro */}
                  {outro && (
                    <p
                      style={{
                        fontSize: "clamp(12px,0.9vw,14px)",
                        color: "rgba(255,255,255,0.55)",
                        lineHeight: 1.7,
                        margin: 0,
                        fontStyle: "italic",
                      }}
                    >
                      {outro}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
