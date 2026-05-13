'use client';
import React from "react";
import { Link } from "@/i18n/routing";
import HeaderMenus from "./header-menus";
import MobileOffcanvas from "@/components/offcanvas/mobile-offcanvas";
import useStickyHeader from "@/hooks/use-sticky-header";
import LanguageSwitcher from "@/components/language-switcher";

type HeaderFourProps = {
  noZIndex?: boolean;
};

export default function HeaderFour({ noZIndex = false }: HeaderFourProps) {
  const { isSticky } = useStickyHeader(20);
  const [openOffCanvas, setOpenOffCanvas] = React.useState(false);

  return (
    <>
      <header>
        <div
          id="header-sticky"
          className={`tp-header-3-area ${!noZIndex ? "z-index-5" : ""} ${
            isSticky ? "header-sticky" : ""
          }`}
          style={{
            margin: "clamp(20px, 3.5vh, 35px) 0",
            ...(noZIndex && { position: "relative" }),
          }}
        >
          <div className="container container-1740">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                minHeight: "72px",
              }}
            >
              {/* Logo */}
              <div style={{ display: "flex", alignItems: "center", flex: "0 0 auto" }}>
                <Link href="/" aria-label="Fulkrums home" style={{ display: "inline-block", lineHeight: 0 }}>
                  <img
                    src="https://d1hqd8vqu5a5q0.cloudfront.net/homepage/faviconFulkrums.png"
                    alt="Fulkrums"
                    width={64}
                    height={64}
                    style={{ display: "block", height: "64px", width: "auto" }}
                  />
                </Link>
              </div>

              {/* Menu pill (xl+ only) */}
              <nav className="tp-header-3-menu-pill d-none d-xl-flex">
                <div className="tp-header-3-menu header-main-menu">
                  <HeaderMenus />
                </div>
              </nav>

              {/* Right actions */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "12px", flex: "0 0 auto" }}>
                <div className="d-none d-xl-block">
                  <LanguageSwitcher />
                </div>
                <button
                  onClick={() => setOpenOffCanvas(true)}
                  className="tp-header-3-bar tp-offcanvas-open-btn d-xl-none"
                  style={{ color: "#fff" }}
                  aria-label="Open menu"
                >
                  <i className="fa-solid fa-bars"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <MobileOffcanvas openOffcanvas={openOffCanvas} setOpenOffcanvas={setOpenOffCanvas} />

      <style jsx global>{`
        .tp-header-3-menu-pill {
          align-items: center !important;
          background: rgba(46, 46, 46, 0.9) !important;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-radius: 100px !important;
          padding: 6px 28px !important;
          align-self: center !important;
        }
        .tp-header-3-menu-pill .tp-header-3-menu,
        .tp-header-3-menu-pill .tp-header-3-menu > ul {
          margin: 0 !important;
          padding: 0 !important;
        }
        .tp-header-3-menu-pill .tp-header-3-menu > ul {
          display: flex !important;
          align-items: center !important;
          gap: 28px !important;
          list-style: none !important;
        }
        .tp-header-3-menu-pill .tp-header-3-menu li {
          margin: 0 !important;
          padding: 0 !important;
          display: block !important;
        }
        .tp-header-3-menu-pill .tp-header-3-menu li > a {
          padding: 8px 0 !important;
          color: #fff !important;
          font-size: 17px !important;
          font-weight: 500 !important;
          line-height: 1 !important;
          display: inline-block !important;
        }
      `}</style>
    </>
  );
}
