"use client";
import { useState, useEffect, useRef } from "react";

const useStickyHeader = (offset = 20) => {
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const setHeaderHeight = headerRef.current?.offsetHeight;

    if (setHeaderHeight) {
      const headerElements =
        document.querySelectorAll<HTMLDivElement>(".tp-header-height");
      headerElements.forEach((element) => {
        element.style.height = `${setHeaderHeight}px`;
      });
    }
  }, []);

  function adjustMenuBackground() {
    const headerArea = document.querySelector<HTMLElement>(".tp-header-3-area");
    if (headerArea) {
      const menuBox = headerArea.querySelector<HTMLElement>(".tp-header-3-menu-box");
      const menuBg = headerArea.querySelector<HTMLElement>(".menu-bg");

      if (menuBox && menuBg) {
        // Use offsetWidth/Height which are zoom-independent
        const width = menuBox.offsetWidth;
        const height = menuBox.offsetHeight;

        // Use relative positioning instead of absolute left
        menuBg.style.width = `${width}px`;
        menuBg.style.height = `${height}px`;
        menuBg.style.left = `0`;
        menuBg.style.right = `0`;
        menuBg.style.margin = `0 auto`;
      }
    }
  }

  function headerFullWidth() {
    const menuElements = document.querySelectorAll(".tp-menu-fullwidth");
    menuElements.forEach((element: Element) => {
      const previousDiv = element.parentElement?.parentElement;
      if (previousDiv) {
        previousDiv.classList.add("has-homemenu");
      }
    });
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > offset);
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset]);

  return { isSticky, headerFullWidth, adjustMenuBackground, headerRef };
};

export default useStickyHeader;
