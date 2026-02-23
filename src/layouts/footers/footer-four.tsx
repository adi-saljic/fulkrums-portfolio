"use client";
import React from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from 'next-intl';

export default function FooterFour() {
  const t = useTranslations('footer');

  return (
    <footer>
      <div className="tp-footer-3-area dark-bg pt-60 pb-40">
        <div className="container">
          <div className="row align-items-end">
            <div className="col-xl-4 col-lg-4 col-md-4 mb-30">
              <div className="tp-footer-3-widget text-center text-md-start">
                <Link className="tp-footer-3-logo" href="/" style={{fontSize: '32px', fontWeight: 'bold', color: '#fff', textDecoration: 'none'}}>
                  FULKRUMS
                </Link>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 mb-30">
              <div className="tp-footer-3-widget text-center">
                <p className="tp-footer-3-copyright mb-0">
                  {t('copyright')}
                </p>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 mb-30">
              <div className="tp-footer-3-widget text-center text-md-end">
                <div className="tp-footer-2-contact-item mb-2">
                  <span>
                    <Link
                      href="https://www.google.com/maps/@23.8223596,90.3656686,15z?entry=ttu"
                      target="_blank"
                    >
                      Mihaljevska 100, 71000 Sarajevo
                    </Link>
                  </span>
                </div>
                <div className="tp-footer-2-contact-item mb-2">
                  <span>
                    <Link href="mailto:office@fulkrums.com">
                      office@fulkrums.com
                    </Link>
                  </span>
                </div>
                <div className="tp-footer-3-social d-flex justify-content-center justify-content-md-end gap-4 align-items-end">
                  <div className="d-flex flex-column align-items-center">
                    <span style={{ fontSize: "12px", marginBottom: "8px", color: "#ff6b35" }}>
                      {t('social.marketing')}
                    </span>
                    <Link
                      href="https://www.linkedin.com/in/zlatan-saljic-54334126a/"
                      target="_blank"
                      title="Marketing Team"
                      className="linkedin-marketing"
                    >
                      <i className="fa-brands fa-linkedin-in"></i>
                    </Link>
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    <span style={{ fontSize: "12px", marginBottom: "8px", color: "#4a90e2" }}>
                      {t('social.development')}
                    </span>
                    <Link
                      href="https://www.linkedin.com/in/adi-saljic-04169227b"
                      target="_blank"
                      title="Development Team"
                      className="linkedin-dev"
                    >
                      <i className="fa-brands fa-linkedin-in"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
