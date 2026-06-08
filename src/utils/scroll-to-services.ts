"use client";
// IMPORTANT: import from "gsap/*" (NOT "@/plugins"). The home page creates the
// smoother via `gsap/ScrollSmoother` (see use-scroll-smooth.ts). The local
// "@/plugins" minified copy is a SEPARATE class with its own instance registry,
// so ScrollSmoother.get() there always returns null and we'd never find the
// live instance after a cross-page navigation.
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

type RouterLike = { push: (href: string) => void };

// Intent is carried across a client navigation with a module flag (survives
// next-intl soft navigation) backed by sessionStorage (full-reload fallback).
// We deliberately do NOT use a URL hash: the browser's native #services anchor
// jump fights GSAP ScrollSmoother's transform-based scroll on home load.
const INTENT_KEY = "scrollToServices";
const HEADER_FALLBACK = 100;

let pendingIntent = false;
let scrolling = false; // re-entry guard, de-dupes rapid clicks
let servicesScrollActive = false; // true from intent-consume until the scroll completes

function getSmoother(): any {
  return typeof (ScrollSmoother as any).get === "function"
    ? (ScrollSmoother as any).get()
    : null;
}

// The sticky header is position:fixed once scrolled, so it covers the top of
// the viewport. Measure it (height + top margin + small gap) instead of
// hardcoding — the margin is clamp(20px, 3.5vh, 35px), i.e. viewport-dependent.
export function headerOffset(): number {
  const h = document.getElementById("header-sticky");
  if (!h) return HEADER_FALLBACK;
  const rect = h.getBoundingClientRect();
  const marginTop = parseFloat(getComputedStyle(h).marginTop) || 0;
  return Math.round(rect.height + marginTop + 8);
}

export function setServicesIntent(): void {
  pendingIntent = true;
  try {
    sessionStorage.setItem(INTENT_KEY, "1");
  } catch {
    /* ignore */
  }
}

export function consumeServicesIntent(): boolean {
  let has = pendingIntent;
  try {
    if (sessionStorage.getItem(INTENT_KEY) === "1") has = true;
  } catch {
    /* ignore */
  }
  pendingIntent = false;
  try {
    sessionStorage.removeItem(INTENT_KEY);
  } catch {
    /* ignore */
  }
  if (has) servicesScrollActive = true;
  return has;
}

// True while a "scroll to services" is intended or in flight. The scroll-to-top
// on-navigation reset checks this so it never fights the services scroll —
// order-independent: it sees the intent both before consume (pendingIntent /
// sessionStorage) and after (servicesScrollActive).
export function servicesScrollPending(): boolean {
  if (pendingIntent || servicesScrollActive) return true;
  try {
    return sessionStorage.getItem(INTENT_KEY) === "1";
  } catch {
    return false;
  }
}

// Resolve once the layout above #services is stable enough to measure correctly:
// fonts loaded, window 'load', and every <img> positioned above #services done.
// A 1.5s cap guarantees we never hang if a media event never fires.
function whenLayoutStable(): Promise<void> {
  const tasks: Promise<unknown>[] = [];

  if (document.fonts && document.fonts.ready) {
    tasks.push(document.fonts.ready);
  }

  if (document.readyState !== "complete") {
    tasks.push(
      new Promise<void>((resolve) => {
        window.addEventListener("load", () => resolve(), { once: true });
      })
    );
  }

  const services = document.getElementById("services");
  if (services) {
    const imgs = Array.from(
      document.querySelectorAll<HTMLImageElement>("#smooth-content img")
    ).filter((img) => {
      // keep only images that sit ABOVE #services and haven't loaded yet —
      // those are what shift the target position as they decode.
      const servicesFollowsImg =
        img.compareDocumentPosition(services) & Node.DOCUMENT_POSITION_FOLLOWING;
      return Boolean(servicesFollowsImg) && !img.complete;
    });
    imgs.forEach((img) => {
      tasks.push(
        new Promise<void>((resolve) => {
          const done = () => resolve();
          img.addEventListener("load", done, { once: true });
          img.addEventListener("error", done, { once: true });
        })
      );
    });
  }

  const cap = new Promise<void>((resolve) => window.setTimeout(resolve, 1500));
  return Promise.race([Promise.all(tasks).then(() => undefined), cap]);
}

function delay(ms: number): Promise<void> {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms));
}

function settleFrames(): Promise<void> {
  return new Promise<void>((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
  );
}

// Robust scroll to #services. Used both on the home page directly and by the
// home-page intent runner after a cross-page navigation.
export async function scrollToServicesNow(): Promise<void> {
  if (!document.getElementById("services")) return;

  if (scrolling) return;
  scrolling = true;

  // If the user takes over scrolling, never yank them back.
  let userInterrupted = false;
  const markInterrupted = () => {
    userInterrupted = true;
  };
  window.addEventListener("wheel", markInterrupted, { once: true, passive: true });
  window.addEventListener("touchstart", markInterrupted, { once: true, passive: true });
  const cleanupInterrupt = () => {
    window.removeEventListener("wheel", markInterrupted);
    window.removeEventListener("touchstart", markInterrupted);
  };

  // Wait for the real causes of measurement drift to settle: media + fonts,
  // then the home page's SplitText reveal pass (a setTimeout(…, 100) reflow),
  // then two frames so the new layout is painted before we measure.
  await whenLayoutStable();
  await delay(120);
  await settleFrames();

  // Re-fetch AFTER waiting: across a navigation (and in dev Strict Mode) the
  // element and the ScrollSmoother instance can be torn down and recreated, so
  // a reference captured before the await may be stale/killed.
  const el = document.getElementById("services");
  if (!el) {
    cleanupInterrupt();
    scrolling = false;
    return;
  }

  const smoother = getSmoother();

  // Pages without the smooth scroller: native smooth scroll with header offset.
  if (!smoother) {
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset();
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    cleanupInterrupt();
    scrolling = false;
    return;
  }

  // Re-measure against the now-stable layout, then animate.
  ScrollTrigger.refresh();
  smoother.scrollTo(el, true, `top ${headerOffset()}px`);

  // Re-assert ONCE on the next refresh. ScrollSmoother fires a debounced refresh
  // after init/resize that would otherwise reset our position to the top; this
  // one-shot listener catches it and re-applies the target — unless the user has
  // already started scrolling.
  let settled = false;
  const finish = () => {
    if (settled) return;
    settled = true;
    ScrollTrigger.removeEventListener("refresh", onRefresh);
    cleanupInterrupt();
    scrolling = false;
  };
  const onRefresh = () => {
    if (!userInterrupted) {
      smoother.scrollTo(el, false, `top ${headerOffset()}px`);
    }
    finish();
  };
  ScrollTrigger.addEventListener("refresh", onRefresh);

  // Safety: clear the lock even if no further refresh ever fires.
  window.setTimeout(finish, 2500);
}

// Polls until both #services and a live ScrollSmoother exist, then performs the
// robust scroll. Self-terminating (not cancelled on unmount) so it survives dev
// Strict Mode's mount→unmount→mount cycle; re-reads the smoother each tick so it
// never holds a stale instance. Calls onDone when the scroll has been initiated
// or it gives up (~8s).
export function runServicesIntent(onDone?: () => void): void {
  let tries = 0;
  const done = () => {
    servicesScrollActive = false;
    onDone?.();
  };
  const tick = () => {
    if (document.getElementById("services") && getSmoother()) {
      void scrollToServicesNow().finally(done);
      return;
    }
    if (tries++ > 80) {
      done();
      return;
    }
    window.setTimeout(tick, 100);
  };
  tick();
}

export function scrollToServices(router: RouterLike): void {
  // Already on a page that renders #services (the home page) — scroll directly.
  if (typeof document !== "undefined" && document.getElementById("services")) {
    void scrollToServicesNow();
    return;
  }

  // The section lives on the home page. Record intent and navigate; the home
  // page consumes the intent and scrolls once the smoother + layout are ready.
  setServicesIntent();
  router.push("/");
}
