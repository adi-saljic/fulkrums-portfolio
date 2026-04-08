"use client";
import { gsap } from "gsap";
import React from "react";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
import { notFound } from "next/navigation";
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);

// internal imports
import HeaderFour from "@/layouts/headers/header-four";
import ServiceDetailsArea from "@/components/service/service-details-area";
import DigitalMarketingDetailsArea from "@/components/service/digital-marketing-details-area";
import GraphicDesignDetailsArea from "@/components/service/graphic-design-details-area";
import FooterFour from "@/layouts/footers/footer-four";
// animation
import { charAnimation, titleAnimation } from "@/utils/title-animation";

type IProps = {
  params: Promise<{ slug: string }>;
};

const SUPPORTED_SLUGS = ["video-production", "digital-marketing", "performance-marketing", "graphic-design"];

export default function ServicePage({ params }: IProps) {
  const [slug, setSlug] = React.useState<string | null>(null);

  React.useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  useGSAP(() => {
    const timer = setTimeout(() => {
      charAnimation();
      titleAnimation();
    }, 100);
    return () => clearTimeout(timer);
  });

  if (!slug) return null;
  if (!SUPPORTED_SLUGS.includes(slug)) notFound();

  return (
    <>
      {/* header area start */}
      <HeaderFour />
      {/* header area end */}

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            {/* service details area */}
            {slug === "video-production" && <ServiceDetailsArea />}
            {(slug === "digital-marketing" || slug === "performance-marketing") && <DigitalMarketingDetailsArea />}
            {slug === "graphic-design" && <GraphicDesignDetailsArea />}
            {/* service details area */}
          </main>

          {/* footer area */}
          <FooterFour />
          {/* footer area */}
        </div>
      </div>
    </>
  );
}
