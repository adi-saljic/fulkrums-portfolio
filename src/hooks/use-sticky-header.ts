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

  // Kept for backwards compatibility with other headers that import this; no-op now.
  function adjustMenuBackground() {}
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
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset]);

  return { isSticky, headerFullWidth, adjustMenuBackground, headerRef };
};

export default useStickyHeader;
