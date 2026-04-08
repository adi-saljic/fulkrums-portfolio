"use client";
import { gsap } from "gsap";
import React from "react";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
import { notFound } from "next/navigation";
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);

import HeaderFour from "@/layouts/headers/header-four";
import FooterFour from "@/layouts/footers/footer-four";
import ProjectDetailsArea from "@/components/portfolio/details/project-details-area";
import ContactOne from "@/components/contact/contact-one";
import { getProjectData } from "@/data/project-data";
import { charAnimation, titleAnimation } from "@/utils/title-animation";
import { hoverBtn } from "@/utils/hover-btn";
import YouTubeIframeSlider from "@/components/youtube/youtube-iframe-slider";
import { youtubeVideos } from "@/data/youtube-videos";

type IProps = {
  params: Promise<{ slug: string }>;
};

export default function ProjectPage({ params }: IProps) {
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

  const project = getProjectData().find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Check if this project has YouTube videos for study case
  const slugToKey: Record<string, keyof typeof youtubeVideos> = {
    "atleta": "atleta",
    "quickie-liga": "quickieLiga",
  };
  const youtubeKey = slugToKey[slug];
  const youtubeEntry = youtubeKey ? (youtubeVideos[youtubeKey] as { studyCase?: string[]; portfolio?: string[] }) : null;
  const hasYouTubeVideos = !!(youtubeEntry?.studyCase);
  const youtubeVideoEmbeds = youtubeEntry?.studyCase ?? null;

  return (
    <>
      {/* header area start */}
      <HeaderFour />
      {/* header area end */}

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            {/* project details */}
            <ProjectDetailsArea project={project} />
            {/* project details */}

            {/* YouTube Video Slider for Results - BOTTOM before contact */}
            {hasYouTubeVideos && youtubeVideoEmbeds && (
              <section className="study-case-youtube-section pt-120 pb-60">
                <div className="container">
                  <div className="row justify-content-center mb-60">
                    <div className="col-xl-8 text-center">
                      <h2 className="tp-section-title">Results Video</h2>
                    </div>
                  </div>
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
