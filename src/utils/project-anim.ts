import { gsap } from "gsap";
import $ from "jquery";
import { ScrollTrigger } from '@/plugins';

/**
 * Calculate responsive animation distance based on actual element width
 * Automatically accounts for viewport size AND browser zoom
 * @param element - DOM element to measure
 * @param scaleFactor - Percentage of element width (0.7 = 70%)
 * @returns Animation distance in pixels (zoom-aware)
 */
function calculateResponsiveDistance(
  element: HTMLElement | null,
  scaleFactor: number = 0.7
): number {
  if (!element) return 500; // Fallback

  // getBoundingClientRect() accounts for zoom automatically
  const rect = element.getBoundingClientRect();
  const elementWidth = rect.width;

  // Distance = 70% of image width by default
  // Higher than before (60%) for more dramatic effect
  const distance = Math.round(elementWidth * scaleFactor);

  return distance;
}

function projectThreeAnimation() {
  if (document.querySelectorAll(".tp-project-3-area").length > 0) {
    let pw = gsap.matchMedia();

    // DESKTOP & LARGE SCREENS (≥1400px)
    pw.add("(min-width: 1400px)", () => {
      let projects: any = gsap.utils.toArray(".tp-project-3-wrap");

      projects.forEach((item: any) => {
        let $this: any = $(item);

        const leftImage = $this.find(".pro-img-1 img")[0];
        const rightImage = $this.find(".pro-img-2 img")[0];

        // DYNAMIC - 50% of image width
        const leftDistance = calculateResponsiveDistance(leftImage, 0.5);
        const rightDistance = calculateResponsiveDistance(rightImage, 0.5);

        gsap.set(leftImage, { x: leftDistance });
        gsap.set(rightImage, { x: -rightDistance });
        gsap.set($this.find(".tp-project-3-content"), { opacity: 0 });

        gsap.to(leftImage, {
          x: "0",
          scrollTrigger: {
            trigger: $this,
            start: "center center",
            end: "bottom top",
            scrub: 1,
            pin: true,
            pinSpacing: true,
            transformOrigin: "50% 50%" as any,
          } as any,
        });

        gsap.to(rightImage, {
          x: "0",
          scrollTrigger: {
            trigger: $this,
            start: "center center",
            end: "bottom top",
            scrub: 1,
            pin: false,
            transformOrigin: "50% 50%" as any,
          } as any,
        });

        gsap.to($this.find(".tp-project-3-content"), {
          opacity: 1,
          scrollTrigger: {
            trigger: $this,
            start: "center center",
            end: "bottom top",
            scrub: 1,
          } as any,
        });
      });
    });

    // STANDARD DESKTOP (1200px - 1399px)
    pw.add("(min-width: 1200px) and (max-width: 1399px)", () => {
      let projects: any = gsap.utils.toArray(".tp-project-3-wrap");

      projects.forEach((item: any) => {
        let $this: any = $(item);

        const leftImage = $this.find(".pro-img-1 img")[0];
        const rightImage = $this.find(".pro-img-2 img")[0];

        // Less dramatic - 45%
        const leftDistance = calculateResponsiveDistance(leftImage, 0.45);
        const rightDistance = calculateResponsiveDistance(rightImage, 0.45);

        gsap.set(leftImage, { x: leftDistance });
        gsap.set(rightImage, { x: -rightDistance });
        gsap.set($this.find(".tp-project-3-content"), { opacity: 0 });

        gsap.to(leftImage, {
          x: "0",
          scrollTrigger: {
            trigger: $this,
            start: "center center",
            end: "bottom top",
            scrub: 1,
            pin: true,
            pinSpacing: true,
            transformOrigin: "50% 50%" as any,
          } as any,
        });

        gsap.to(rightImage, {
          x: "0",
          scrollTrigger: {
            trigger: $this,
            start: "center center",
            end: "bottom top",
            scrub: 1,
            pin: false,
            transformOrigin: "50% 50%" as any,
          } as any,
        });

        gsap.to($this.find(".tp-project-3-content"), {
          opacity: 1,
          scrollTrigger: {
            trigger: $this,
            start: "center center",
            end: "bottom top",
            scrub: 1,
          } as any,
        });
      });
    });

    // TABLETS (768px - 1199px)
    pw.add("(min-width: 768px) and (max-width: 1199px)", () => {
      let projects: any = gsap.utils.toArray(".tp-project-3-wrap");

      projects.forEach((item: any) => {
        let $this: any = $(item);

        const leftImage = $this.find(".pro-img-1 img")[0];
        const rightImage = $this.find(".pro-img-2 img")[0];

        // Even less dramatic - 40%
        const leftDistance = calculateResponsiveDistance(leftImage, 0.4);
        const rightDistance = calculateResponsiveDistance(rightImage, 0.4);

        gsap.set(leftImage, { x: leftDistance });
        gsap.set(rightImage, { x: -rightDistance });
        gsap.set($this.find(".tp-project-3-content"), { opacity: 0 });

        gsap.to(leftImage, {
          x: "0",
          scrollTrigger: {
            trigger: $this,
            start: "center center",
            end: "bottom top",
            scrub: 1,
            pin: false, // No pin on tablets
            transformOrigin: "50% 50%" as any,
          } as any,
        });

        gsap.to(rightImage, {
          x: "0",
          scrollTrigger: {
            trigger: $this,
            start: "center center",
            end: "bottom top",
            scrub: 1,
            pin: false,
            transformOrigin: "50% 50%" as any,
          } as any,
        });

        gsap.to($this.find(".tp-project-3-content"), {
          opacity: 1,
          scrollTrigger: {
            trigger: $this,
            start: "center center",
            end: "bottom top",
            scrub: 1,
          } as any,
        });
      });
    });

    // MOBILE (<768px) - Fade only
    pw.add("(max-width: 767px)", () => {
      // Mobile uses vertical layout - just fade in content
      gsap.set(".tp-project-3-wrap .tp-project-3-content", { opacity: 1 });
    });
  }
};

function projectDetailsPin() {
  let pd = gsap.matchMedia();
  pd.add("(min-width: 1400px)", () => {
    const sections = document.querySelectorAll('.project-details-1-area');

    sections.forEach((section) => {
      const rightWrap = section.querySelector('.project-details-1-right-wrap');

      if (rightWrap) {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom 100%",
          pin: rightWrap,
          pinSpacing: false,
        });
      }
    });
  });
};

function projectDetailsVideoPin() {
  const vd = gsap.matchMedia();
vd.add("(min-width: 1200px)", () => {
  const projectDetails2Area = document.querySelector('.project-details-2-area');
  const projectDetailsVideo = document.querySelector('.project-details-video');

  if (projectDetails2Area && projectDetailsVideo) {
    ScrollTrigger.create({
      trigger: projectDetails2Area,
      start: "top top",
      end: "bottom -100%",
      pin: projectDetailsVideo,
      pinSpacing: false,
    });
  }
});

// Get references to elements and ensure they are not null
const progress = document.getElementById("progress") as HTMLProgressElement | null;
const timer = document.getElementById("timer") as HTMLElement | null;
const videoProgressBtn = document.getElementById("play") as HTMLElement | null;
const video = document.querySelector("video") as HTMLVideoElement | null;

function progressLoop() {
  if (video && progress && timer) {
    setInterval(function () {
      progress.value = Math.round((video.currentTime / video.duration) * 100);
      timer.innerHTML = `${Math.round(video.currentTime)} seconds`;
    }, 1000);
  }
}

function playPause() {
  if (video && videoProgressBtn) {
    if (video.paused) {
      video.play();
      videoProgressBtn.innerHTML = "&#10073;&#10073;"; // Pause symbol
    } else {
      video.pause();
      videoProgressBtn.innerHTML = "►"; // Play symbol
    }
  }
}

if (videoProgressBtn) {
  videoProgressBtn.addEventListener("click", playPause);
}

if (video) {
  video.addEventListener("play", progressLoop);
}
  
}

export { projectThreeAnimation, projectDetailsPin,projectDetailsVideoPin };
