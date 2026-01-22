"use client";
import { gsap } from "gsap";
import React from "react";
import { useGSAP } from "@gsap/react";
import { useTranslations } from 'next-intl';
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

// internal imports
import HeaderFour from "@/layouts/headers/header-four";
import TeamArea from "@/components/team/team-area";
import FooterFour from "@/layouts/footers/footer-four";
// animation
import { charAnimation, titleAnimation } from "@/utils/title-animation";
import { hoverBtn } from "@/utils/hover-btn";
import ContactOne from "@/components/contact/contact-one";

const OurTeamPage = () => {
  const t = useTranslations('nav');

  useGSAP(() => {
    const timer = setTimeout(() => {
      charAnimation();
      titleAnimation();
      hoverBtn();
    }, 100);
    return () => clearTimeout(timer);
  });

  return (
    <>
      {/* header area start */}
      <HeaderFour />
      {/* header area end */}

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            {/* team hero */}
            <div className="tm-hero-area tm-hero-ptb">
              <div className="container">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="tm-hero-content">
                      <span className="tm-hero-subtitle">Fulkrums</span>
                      <h4 className="tm-hero-title tp-char-animation">
                        {t('ourTeam')}
                      </h4>
                    </div>
                    <div className="tm-hero-text tp_title_anim">
                      <p>
                        We're a diverse team that works as fancies attention to
                        details, enjoys beers on Friday nights and aspires to
                        design the dent in the universe.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* team hero */}

            {/* team area */}
            <TeamArea />
            {/* team area */}

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
};

export default OurTeamPage;
