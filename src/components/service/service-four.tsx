"use client";
import React from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from 'next-intl';
import { FirstBracket, FirstBracketTwo, RightArrow, SvgBg } from "../svg";
import Image from 'next/image';

const icon = "https://drive.google.com/thumbnail?id=1P2cm97dtcE97ZgQDJih7zKdCUPKNTsmE&sz=w1000";

export default function ServiceFour() {
  const t = useTranslations('services');
  return (
    <div className="tp-service-3-area pt-130 pb-130">
      <div className="container">
        <div className="row">
          <div className="col-xl-9">
            <div className="tp-service-3-title-box mb-60 p-relative">
              <div className="tp-service-3-icon">
                <Image src={icon} alt="icon" width={100} height={100} />
              </div>
              <span className="tp-section-subtitle-2 tp_fade_bottom">
                <span>
                  <FirstBracket />
                </span>
                <span className="tp-subtitle-text tp_text_invert">
                  {t('subtitle')}
                </span>
                <span>
                  <FirstBracketTwo />
                </span>
              </span>
              <h4 className="tp-section-title-90 tp_text_invert tp_fade_bottom">
                {t('title')}
              </h4>
            </div>
          </div>
        </div>

        {[0, 1, 2, 3, 4, 5].map((index) => {
          const item = t.raw(`items.${index}`);
          return (
            <div key={index} className="tp-service-3-wrap tp_fade_bottom">
              <div className="row align-items-start">
                <div className="col-xl-3 col-lg-3">
                  <div className="tp-service-3-title-box">
                    <h4 className="tp-service-3-title">
                      <Link href="/service">{item.title}</Link>
                    </h4>
                  </div>
                </div>
                <div className="col-xl-7 col-lg-7">
                  <div className="tp-service-3-content">
                    <p>{item.desc}</p>
                    <div className="tp-service-3-category">
                      {item.category.map((c: string, i: number) => (
                        <span key={i}>{c}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-2">
                  <div className="tp-service-3-btn-box text-start text-md-end"></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
