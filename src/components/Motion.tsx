"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Motion() {
  useEffect(() => {
    const reduce =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      new URLSearchParams(window.location.search).has("nomotion");

    gsap.registerPlugin(ScrollTrigger);

    if (reduce) {
      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    lenis.on("scroll", ScrollTrigger.update);
    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    // Anchor smooth-scroll through Lenis
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -10, duration: 1.2 });
      }
    };
    document.addEventListener("click", onClick);

    const ctx = gsap.context(() => {
      // Genuine pinned panel reveal: the outgoing section is pinned (held still)
      // while the incoming rounded panel slides up from below and covers it.
      // Scrubbed to scroll progress so it is fully reversible.
      // Pinned-panel reveal via counter-translation (no layout pinning, so it
      // never reflows or fights the smooth-scroller). During the transition the
      // outgoing section is translated downward at exactly the scroll rate, so
      // it appears frozen in place, while the incoming rounded panel — the next
      // element in normal flow with a higher z-index — scrolls up and covers it.
      // Scrubbed to scroll progress, so it reverses perfectly.
      const panels = gsap.utils.toArray<HTMLElement>("[data-rise]");
      panels.forEach((incoming) => {
        const outgoing = incoming.previousElementSibling as HTMLElement | null;
        if (!outgoing) return;

        gsap.fromTo(
          outgoing,
          { y: 0 },
          {
            y: () => window.innerHeight,
            ease: "none",
            scrollTrigger: {
              trigger: incoming,
              start: "top bottom",
              end: "top top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    });

    // Recalculate once fonts + images have loaded so pin distances are exact.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    if (document.fonts?.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
    ScrollTrigger.refresh();

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", onLoad);
      gsap.ticker.remove(ticker);
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      lenis.destroy();
    };
  }, []);

  return null;
}
