"use client";
import React, { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

type CounterItemProps = {
  target: number;
  suffix: string;
};

function CounterItem({ target, suffix }: CounterItemProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let current = 0;
          const steps = 40;
          const increment = Math.ceil(target / steps);
          const timer = setInterval(() => {
            current = Math.min(current + increment, target);
            setCount(current);
            if (current >= target) clearInterval(timer);
          }, 50);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} style={{ fontStyle: "normal" }}>
      {count}
      {suffix}
    </span>
  );
}

export default function GraphicDesignStats() {
  const t = useTranslations("graphicDesign");

  const stats = [
    { target: 100,  suffix: "+", label: t("stats.stat1Label") },
    { target: 6,    suffix: "+", label: t("stats.stat2Label") },
    { target: 1400, suffix: "+", label: t("stats.stat3Label") },
  ];

  return (
    <section
      style={{
        background: "#0a0a0a",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="container-fluid">
        <div className="row gx-0">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="col-xl-4 col-lg-4 col-md-4 col-12"
              style={{
                borderRight:
                  index < stats.length - 1
                    ? "1px solid rgba(255,255,255,0.12)"
                    : "none",
              }}
            >
              <div
                style={{
                  padding: "clamp(40px, 6vw, 100px) clamp(20px, 3vw, 60px)",
                  textAlign: "center",
                }}
              >
                <h3
                  style={{
                    fontSize: "clamp(48px, 6vw, 90px)",
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: "12px",
                    lineHeight: 1,
                    fontFamily: "var(--tp-ff-shoulders, inherit)",
                  }}
                >
                  <CounterItem target={stat.target} suffix={stat.suffix} />
                </h3>
                <p
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "clamp(13px, 1.2vw, 15px)",
                    lineHeight: "1.6",
                    margin: 0,
                    maxWidth: "220px",
                    marginInline: "auto",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
