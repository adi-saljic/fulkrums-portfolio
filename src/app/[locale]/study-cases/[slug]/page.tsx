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
import project_data from "@/data/project-data";
import { charAnimation, titleAnimation } from "@/utils/title-animation";
import { hoverBtn } from "@/utils/hover-btn";

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

  const project = project_data.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

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
