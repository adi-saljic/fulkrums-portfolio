"use client";
import Marquee from "react-fast-marquee";

export default function ImageShowcaseSlider({ images }: { images: string[] }) {
  return (
    <div style={{ overflow: "hidden" }}>
      <Marquee speed={80} gradient={false} pauseOnHover>
        {images.map((src, i) => (
          <div key={i} style={{ width: "420px", marginRight: "16px", flexShrink: 0 }}>
            <div style={{ position: "relative", width: "100%", paddingTop: "62.5%" }}>
              <img
                src={src}
                alt=""
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
