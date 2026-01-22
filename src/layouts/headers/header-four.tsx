'use client';
import React, { useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import HeaderMenus from "./header-menus";
import fulkrumsLogo from '../../../public/assets/img/logo/logo-transparent.png';
import MobileOffcanvas from "@/components/offcanvas/mobile-offcanvas";
import useStickyHeader from "@/hooks/use-sticky-header";
import LanguageSwitcher from "@/components/language-switcher";

export default function HeaderFour() {
const {isSticky, headerFullWidth, adjustMenuBackground} = useStickyHeader(20);
  const [openOffCanvas, setOpenOffCanvas] = React.useState(false);
  useEffect(() => {
    headerFullWidth();
    adjustMenuBackground();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <header>
        <div id="header-sticky" className={`tp-header-3-area z-index-5 ${isSticky?'header-sticky':''}`} style={{ margin: '35px 0' }}>
          <span className="menu-bg"></span>
          <div className="container container-1740">
            <div className="row align-items-center">
              <div className="col-xl-2 col-lg-6 col-md-6 col-6">
                <div className="tp-header-logo tp-header-3-logo">
                  <Link href="/">
                    <Image src={fulkrumsLogo} alt="Fulkrums Logo" width={440} height={160} style={{width: 'auto', height: '45px', maxWidth: '100%'}} />
                  </Link>
                </div>
              </div>
              <div className="col-xl-8 col-lg-6 d-none d-xl-block">
                <div className="tp-header-3-menu-wrap text-center">
                  <div className="tp-header-3-menu-box d-flex align-items-center justify-content-center">
                    <div className="tp-header-3-menu header-main-menu">
                      <nav className="tp-main-menu-content">
                        {/* header menus */}
                        <HeaderMenus />
                        {/* header menus */}
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-6 col-md-6 col-6">
                <div className="tp-header-3-right d-flex align-items-center justify-content-end gap-3">
                  <LanguageSwitcher />
                  <button onClick={() => setOpenOffCanvas(true)} className="tp-header-3-bar tp-offcanvas-open-btn d-xl-none" style={{ color: '#fff' }}>
                    <i className="fa-solid fa-bars"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* off canvas */}
      <MobileOffcanvas openOffcanvas={openOffCanvas} setOpenOffcanvas={setOpenOffCanvas} />
      {/* off canvas */}
    </>
  );
}
