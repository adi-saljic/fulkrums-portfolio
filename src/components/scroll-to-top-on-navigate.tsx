"use client";
import { useEffect } from "react";
import { usePathname } from "@/i18n/routing";
import { servicesScrollPending } from "@/utils/scroll-to-services";

// New pages should always open at the top. Next's automatic scroll restoration
// is disabled by GSAP ScrollSmoother (it sets history.scrollRestoration =
// "manual"), so without this the next route keeps the previous page's scroll
// position. We reset on every pathname change — except when a "scroll to
// services" is pending/in flight, which owns the scroll for that navigation.
export default function ScrollToTopOnNavigate() {
  const pathname = usePathname();

  useEffect(() => {
    if (servicesScrollPending()) return;
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
