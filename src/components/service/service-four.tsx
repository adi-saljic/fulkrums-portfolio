"use client";
import React from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from 'next-intl';
import { FirstBracket, FirstBracketTwo, RightArrow, SvgBg } from "../svg";

type ServiceSlug = `/services/${string}`;

export default function ServiceFour() {
  const t = useTranslations('services');
  const tCommon = useTranslations('common');
  return (
    <div
      className="tp-service-3-area pt-130 pb-130"
      style={{
        paddingTop: 'clamp(15px, 3vw, 130px)',
        paddingBottom: 'clamp(15px, 3vw, 130px)'
      }}
    >
      <div className="container container-1720">
        <div className="row">
          <div className="col-xl-12">
            <div className="tp-service-3-title-box mb-60 p-relative">
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
              <h2 className="tp-section-title-90 tp_text_invert tp_fade_bottom">
                {t('title')}
              </h2>
            </div>
          </div>
        </div>

        {[0, 1, 2, 3].map((index) => {
          const item = t.raw(`items.${index}`);
          const slug: string | undefined = item.slug;
          const href = slug ? (`/services/${slug}` as ServiceSlug) : '/service';
          return (
            <div key={index} className="tp-service-3-wrap tp_fade_bottom">
              <div className="row align-items-start">
                <div className="col-xl-3 col-lg-3">
                  <div className="tp-service-3-title-box">
                    <h3 className="tp-service-3-title">
                      <Link href={href}>{item.title}</Link>
                    </h3>
                  </div>
                </div>
                <div className={slug ? 'col-xl-7 col-lg-7' : 'col-xl-9 col-lg-9'}>
                  <div className="tp-service-3-content">
                    <p style={{
                      color: '#ffffff',
                      fontSize: 'clamp(16px, 1.5vw, 20px)',
                      lineHeight: '1.6'
                    }}>{item.desc}</p>
                    <div className="tp-service-3-category">
                      {item.category.map((c: string, i: number) => (
                        <span key={i}>{c}</span>
                      ))}
                    </div>
                  </div>
                </div>
                {slug && (
                  <div className="col-xl-2 col-lg-2">
                    <div className="tp-service-3-btn-box text-start text-md-end">
                      <Link className="tp-btn-zikzak-sm p-relative" href={href}>
                        <span className="zikzak-content">
                          {tCommon('seeMore')} <RightArrow clr="currentColor" />
                        </span>
                        <span><SvgBg /></span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
