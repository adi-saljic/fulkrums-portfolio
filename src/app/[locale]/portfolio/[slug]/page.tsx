"use client";
import { gsap } from "gsap";
import React from "react";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
import { notFound } from "next/navigation";
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);

import HeaderFour from "@/layouts/headers/header-four";
import FooterFour from "@/layouts/footers/footer-four";
import PortfolioDetailsSimple from "@/components/portfolio/details/portfolio-details-simple";
import PortfolioDetailsSection from "@/components/portfolio/portfolio-details-section";
import ContactOne from "@/components/contact/contact-one";
import { getPortfolioData } from "@/data/portfolio-data";
import { charAnimation, titleAnimation } from "@/utils/title-animation";
import { hoverBtn } from "@/utils/hover-btn";
import YouTubeIframeSlider from "@/components/youtube/youtube-iframe-slider";
import { youtubeVideos } from "@/data/youtube-videos";

type IProps = {
  params: Promise<{ slug: string }>;
};

export default function PortfolioDetailPage({ params }: IProps) {
  const [slug, setSlug] = React.useState<string | null>(null);

  React.useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  useGSAP(() => {
    const timer = setTimeout(() => {
      charAnimation();
      titleAnimation();
      hoverBtn();
    }, 100);
    return () => clearTimeout(timer);
  });

  if (!slug) {
    return null;
  }

  const portfolio_data = getPortfolioData();
  const portfolioItem = portfolio_data.find((p) => p.slug === slug);

  if (!portfolioItem) {
    notFound();
  }

  // Get projects with videos for navigation
  const projectsWithVideos = portfolio_data.filter(
    (p) => p.detailVideos && p.detailVideos.length > 0
  );
  const currentIndex = projectsWithVideos.findIndex((p) => p.slug === slug);
  const hasVideos =
    portfolioItem.detailVideos && portfolioItem.detailVideos.length > 0;

  // Check if this project has YouTube videos
  const hasYouTubeVideos =
    (slug === "atleta" && youtubeVideos.atleta?.portfolio) ||
    (slug === "sommerhagen" && youtubeVideos.sommerhagen?.portfolio) ||
    (slug === "zamzam" && youtubeVideos.zamzam?.portfolio);

  // Get YouTube videos for current project
  const getYouTubeVideos = () => {
    if (slug === "atleta") return youtubeVideos.atleta?.portfolio;
    if (slug === "sommerhagen") return youtubeVideos.sommerhagen?.portfolio;
    if (slug === "zamzam") return youtubeVideos.zamzam?.portfolio;
    return null;
  };

  const youtubeVideoEmbeds = getYouTubeVideos();

  return (
    <>
      {/* header area start */}
      <HeaderFour />
      {/* header area end */}

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            {/* portfolio details section with video slider - FIRST if has videos */}
            {hasVideos && (
              <PortfolioDetailsSection
                project={portfolioItem}
                projectIndex={currentIndex}
              />
            )}
            {/* portfolio details section end */}

            {/* portfolio details - hero image and detail images */}
            <PortfolioDetailsSimple project={portfolioItem} hasVideos={hasVideos} />
            {/* portfolio details */}

            {/* YouTube Video Slider - BOTTOM before contact */}
            {hasYouTubeVideos && youtubeVideoEmbeds && (
              <section className="portfolio-youtube-section pt-120 pb-120">
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-xl-10">
                      <YouTubeIframeSlider iframeEmbeds={youtubeVideoEmbeds} />
                    </div>
                  </div>
                </div>
              </section>
            )}
            {/* YouTube Video Slider end */}

            {/* contact area */}
            <ContactOne />
            {/* contact area */}
          </main>

          {/* footer area */}
          <FooterFour />
          {/* footer area */}
        </div>
      </div>
    </>
  );
}
