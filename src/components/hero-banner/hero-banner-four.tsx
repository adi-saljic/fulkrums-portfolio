"use client";
import React from "react";
import { useTranslations } from 'next-intl';

export default function HeroBannerFour() {
  const t = useTranslations('hero');

  return (
    <div className="tp-hero-3-area tp-hero-3-ptb fix">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="tp-hero-3-content-box text-center p-relative">
              <div className="tp-hero-3-circle-shape">
                <span></span>
              </div>
              <h4 className="tp-hero-3-title tp_reveal_anim">
                <span className="tp-reveal-line"> {t('title.line1')} </span>
                <span className="tp-reveal-line">{t('title.line2')}</span>
              </h4>
              <span className="tp-hero-3-category tp_reveal_anim">
                {t('services')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
