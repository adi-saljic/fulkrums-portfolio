"use client";
import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from 'next-intl';
import { CloseTwo } from "../svg";
import fulkrumsLogo from '../../../public/assets/img/logo/logo-transparent.png';
import MobileMenus from "./mobile-menus";

// prop type
type IProps = {
  openOffcanvas: boolean;
  setOpenOffcanvas: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MobileOffcanvas({ openOffcanvas, setOpenOffcanvas }: IProps) {
  const t = useTranslations();

  return (
    <>
      <div className={`tp-offcanvas-area ${openOffcanvas ? "opened" : ""}`}>
        <div className="tp-offcanvas-wrapper">
          <div className="tp-offcanvas-top d-flex align-items-center justify-content-between">
            <div className="tp-offcanvas-logo">
              <Link href="/">
                <Image src={fulkrumsLogo} alt="Fulkrums Logo" width={440} height={160} style={{width: 'auto', height: '35px', maxWidth: '100%'}} />
              </Link>
            </div>
            <div className="tp-offcanvas-close">
              <button
                className="tp-offcanvas-close-btn"
                onClick={() => setOpenOffcanvas(false)}
              >
                <CloseTwo />
              </button>
            </div>
          </div>
          <div className="tp-offcanvas-main">
            <div className="tp-main-menu-mobile d-xl-none">
              <MobileMenus />
            </div>
            <div className="tp-offcanvas-contact" style={{ marginTop: '30px' }}>
              <h3 className="tp-offcanvas-title sm" style={{ color: '#fff' }}>{t('footer.links.contact')}</h3>
              <ul>
                <li>
                  <Link href="mailto:office@fulkrums.com" style={{ color: '#fff' }}>office@fulkrums.com</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div
        onClick={() => setOpenOffcanvas(false)}
        className={`body-overlay ${openOffcanvas ? "opened" : ""}`}
      ></div>
    </>
  );
}
