"use client";
import React, { useState, useRef } from "react";
import Marquee from "react-fast-marquee";

type VideoShowcaseSliderProps = {
  videos: string[];
};

function isYouTubeEmbed(entry: string): boolean {
  return entry.trimStart().startsWith("<iframe");
}

function extractYouTubeId(embed: string): string | null {
  const match = embed.match(/youtube\.com\/embed\/([^?&"]+)/);
  return match ? match[1] : null;
}

function responsiveEmbed(embed: string): string {
  return embed.replace(
    /width="\d+" height="\d+"/,
    'width="100%" height="100%" style="border:0;display:block"'
  );
}

export default function VideoShowcaseSlider({ videos }: VideoShowcaseSliderProps) {
  const [activeEntry, setActiveEntry] = useState<string | null>(null);
  const [isModalLoading, setIsModalLoading] = useState<boolean>(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  if (!videos || videos.length === 0) return null;

  const open = (entry: string) => {
    setActiveEntry(entry);
    if (!isYouTubeEmbed(entry)) {
      setIsModalLoading(true);
    }
  };

  const close = () => {
    if (modalVideoRef.current) modalVideoRef.current.pause();
    setActiveEntry(null);
    setIsModalLoading(false);
  };

  return (
    <div className="tp-gallery-area fix p-relative">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="tp-gallery-slider-wrap">
              <div className="swiper-container tp-gallery-slider-active">
                <Marquee className="tp-gallery-titming" speed={100} direction="left">

                  {videos.map((entry, i) => {
                    const isYT = isYouTubeEmbed(entry);
                    const ytId = isYT ? extractYouTubeId(entry) : null;

                    return (
                      <div key={i} onClick={() => open(entry)}>
                        <div
                          className="tp-gallery-item mr-30"
                          style={{
                            position: "relative",
                            width: "280px",
                            aspectRatio: "9/16",
                            borderRadius: "8px",
                            overflow: "hidden",
                            cursor: "pointer",
                            background: "#111",
                            flexShrink: 0,
                          }}
                        >
                          {/* Thumbnail */}
                          {isYT && ytId ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={`https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`}
                              alt={`Video ${i + 1}`}
                              style={{
                                position: "absolute",
                                inset: 0,
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <video
                              src={entry}
                              muted
                              playsInline
                              preload="metadata"
                              style={{
                                position: "absolute",
                                inset: 0,
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                pointerEvents: "none",
                              }}
                            />
                          )}

                          {/* Dark overlay */}
                          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.25)" }} />

                          {/* Play button */}
                          <div
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              width: "56px",
                              height: "56px",
                              borderRadius: "50%",
                              background: "rgba(255,255,255,0.12)",
                              border: "2px solid rgba(255,255,255,0.75)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              backdropFilter: "blur(4px)",
                            }}
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="white" style={{ marginLeft: "3px" }}>
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {activeEntry && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.95)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={close}
        >
          <button
            onClick={close}
            style={{
              position: "absolute",
              top: "24px",
              right: "24px",
              background: "transparent",
              border: "none",
              color: "white",
              cursor: "pointer",
              padding: "8px",
              lineHeight: 0,
            }}
            aria-label="Close video"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div
            style={{ position: "relative", width: "min(90vw, 420px)", aspectRatio: "9/16", maxHeight: "85vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Spinner while video buffers */}
            {isModalLoading && (
              <div style={{
                position: "absolute", inset: 0, display: "flex",
                alignItems: "center", justifyContent: "center",
                background: "rgba(0,0,0,0.85)", borderRadius: "8px", zIndex: 2,
              }}>
                <div style={{
                  width: "44px", height: "44px",
                  border: "3px solid rgba(255,255,255,0.15)",
                  borderTopColor: "#fff", borderRadius: "50%",
                  animation: "modal-spin 0.8s linear infinite",
                }} />
              </div>
            )}

            {isYouTubeEmbed(activeEntry) ? (
              <div
                style={{ width: "100%", height: "100%" }}
                dangerouslySetInnerHTML={{ __html: responsiveEmbed(activeEntry) }}
              />
            ) : (
              <video
                ref={modalVideoRef}
                src={activeEntry}
                controls
                autoPlay
                playsInline
                onCanPlay={() => setIsModalLoading(false)}
                style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "8px" }}
              />
            )}
          </div>

          <style jsx>{`
            @keyframes modal-spin { to { transform: rotate(360deg); } }
          `}</style>
        </div>
      )}
    </div>
  );
}
