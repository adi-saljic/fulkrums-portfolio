"use client";
import { useCallback, useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

export default function ImageShowcaseSlider({ images }: { images: string[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isOpen = openIndex !== null;

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? i : (i - 1 + images.length) % images.length
      ),
    [images.length]
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close, prev, next]);

  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <Marquee speed={80} gradient={false} pauseOnHover play={!isOpen}>
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label="Open image"
              style={{
                height: "360px",
                marginRight: "8px",
                flexShrink: 0,
                background: "transparent",
                border: "none",
                padding: 0,
                cursor: "zoom-in",
                display: "block",
              }}
            >
              <img
                src={src}
                alt=""
                style={{
                  height: "100%",
                  width: "auto",
                  display: "block",
                  objectFit: "contain",
                }}
              />
            </button>
          ))}
        </Marquee>
      </div>

      {isOpen && (
        <div
          onClick={close}
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            cursor: "zoom-out",
          }}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            aria-label="Close"
            style={{
              position: "absolute",
              top: "24px",
              right: "24px",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff",
              fontSize: "20px",
              lineHeight: 1,
              cursor: "pointer",
            }}
          >
            ×
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous"
            style={{
              position: "absolute",
              left: "24px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff",
              fontSize: "24px",
              lineHeight: 1,
              cursor: "pointer",
            }}
          >
            ‹
          </button>

          <img
            src={images[openIndex!]}
            alt=""
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "92vw",
              maxHeight: "92vh",
              objectFit: "contain",
              cursor: "default",
            }}
          />

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next"
            style={{
              position: "absolute",
              right: "24px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff",
              fontSize: "24px",
              lineHeight: 1,
              cursor: "pointer",
            }}
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
