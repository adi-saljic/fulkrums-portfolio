"use client";
import { gsap } from "gsap";
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
  slug: string;
  graphicDesignImages?: string[];
  videoProductionVideos?: string[];
};

const SUPPORTED_SLUGS = ["video-production", "digital-marketing", "graphic-design"];

// `slug` is resolved server-side and passed in as a plain string so the page body
// is server-rendered (was previously gated behind a client-only useEffect, which
// left crawlers with an empty <body> — see SEO audit "title-only content").
export default function ServicePageClient({ slug, graphicDesignImages, videoProductionVideos }: IProps) {
  useGSAP(() => {
    const timer = setTimeout(() => {
      charAnimation();
      titleAnimation();
    }, 100);
    return () => clearTimeout(timer);
  });

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
            {slug === "video-production" && <ServiceDetailsArea videos={videoProductionVideos} />}
            {slug === "digital-marketing" && <DigitalMarketingDetailsArea />}
            {slug === "graphic-design" && <GraphicDesignDetailsArea images={graphicDesignImages} />}
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
