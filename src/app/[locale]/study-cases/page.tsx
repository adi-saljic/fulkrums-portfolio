"use client";
import React, { useEffect } from "react";
import HeaderFour from "@/layouts/headers/header-four";
import PortfolioSliderHomeTen from "@/components/portfolio/slider/portfolio-slider-home-ten";

const StudyCasesPage = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Make header transparent for this page
    const header = document.querySelector('.tp-header-3-area');
    if (header) {
      (header as HTMLElement).style.background = 'transparent';
    }

    // Wait for menu to render and adjust menu-bg
    const timer = setTimeout(() => {
      const menuBg = document.querySelector('.menu-bg');
      if (menuBg) {
        (menuBg as HTMLElement).style.background = '#2e2e2ee6';
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
      // Restore header background
      if (header) {
        (header as HTMLElement).style.background = '';
      }
      const menuBg = document.querySelector('.menu-bg');
      if (menuBg) {
        (menuBg as HTMLElement).style.background = '';
      }
    };
  }, []);

  return (
    <div style={{ height: '100vh', overflow: 'hidden', position: 'relative' }}>
      {/* header area start */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1000 }}>
        <HeaderFour />
      </div>
      {/* header area end */}

      <main style={{ position: 'relative', zIndex: 1 }}>
        {/* portfolio slider start */}
        <PortfolioSliderHomeTen />
        {/* portfolio slider end */}
      </main>
    </div>
  );
};

export default StudyCasesPage;
