import React from "react";
import Marquee from "react-fast-marquee";

const port_images = [
  "https://d1hqd8vqu5a5q0.cloudfront.net/Portfolio/Baneri-Portfolio/Atleta.jpg",
  "https://d1hqd8vqu5a5q0.cloudfront.net/Portfolio/Baneri-Portfolio/Atraktiv.jpg",
  "https://d1hqd8vqu5a5q0.cloudfront.net/Portfolio/Baneri-Portfolio/Zamzam-Project.jpg",
  "https://d1hqd8vqu5a5q0.cloudfront.net/Portfolio/Baneri-Portfolio/Cheyf.jpg",
  "https://d1hqd8vqu5a5q0.cloudfront.net/Portfolio/Baneri-Portfolio/Green-Concept-Houses.jpg",
  "https://d1hqd8vqu5a5q0.cloudfront.net/Portfolio/Baneri-Portfolio/Sommerhagene.jpg",
  "https://d1hqd8vqu5a5q0.cloudfront.net/Portfolio/Baneri-Portfolio/Igny.jpg",
];

export default function LineImgSlider() {
  return (
    <div className="tp-line-text-wrap tp-line-text-wrap-2 pb-120">
      <div className="swiper tp-img-slide">
        <Marquee speed={150}>
          {port_images.map((src, index) => (
            <div
              key={index}
              className={`sv-port-thumb port-thumb-${index % 2 === 0 ? 1 : 2}`}
              style={{ marginRight: "40px" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="port-img" style={{ height: "auto", display: "block" }} />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
