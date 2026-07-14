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
    ScrollTrigger.config({ ignoreMobileResize: true });

    if (reduce) {
      return () => ScrollTrigger.getAll().forEach((t) => t.kill(true));
    }

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(min-width: 769px) and (pointer: fine)", () => {
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

        const panels = gsap.utils.toArray<HTMLElement>("[data-rise]");
        panels.forEach((incoming, index) => {
          const outgoing = incoming.previousElementSibling as HTMLElement | null;
          if (!outgoing) return;

          gsap.fromTo(
            outgoing,
            { y: 0 },
            {
              y: () => window.innerHeight,
              ease: "none",
              scrollTrigger: {
                id: `panel-rise-desktop-${incoming.id || index}`,
                trigger: incoming,
                start: "top bottom",
                end: "top top",
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          );
        });

        const onLoad = () => ScrollTrigger.refresh();
        window.addEventListener("load", onLoad);
        if (document.fonts?.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
        ScrollTrigger.refresh();

        return () => {
          document.removeEventListener("click", onClick);
          window.removeEventListener("load", onLoad);
          gsap.ticker.remove(ticker);
          lenis.destroy();
        };
      });

      // Mobile / touch: deliberately NO scroll-linked JS animation at all.
      //
      // Two approaches were tried and both vibrated on real touch devices:
      //   1. A genuine GSAP `pin` (position:fixed) — fights native touch-scroll's
      //      bursty delta events, causing the pinned element to visibly jitter.
      //   2. A `scrub:true` counter-translate compensating the outgoing section's
      //      `y` by the scroll delta — on touch devices native scroll is handled
      //      by the compositor/GPU thread while GSAP's scrub callback runs on the
      //      main thread. That 1-2 frame desync makes the compensating transform
      //      perpetually chase the compositor's position, snapping back every
      //      frame it catches up — which reads as continuous shaking.
      //
      // Any main-thread transform trying to counteract compositor-driven touch
      // scroll has this problem. So on mobile we do nothing: the `[data-rise]`
      // panels already carry a higher z-index, `.panel-reveal` (top shadow) and
      // `.rounded-panel-top`, so they simply stack in normal document flow and
      // scroll into place with a soft rounded seam — no "frozen outgoing panel"
      // illusion, but perfectly smooth, since there is nothing left to desync.
      mm.add("(max-width: 768px), (pointer: coarse)", () => {
        return () => {};
      });
    });

    return () => {
      mm.revert();
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill(true));
    };
  }, []);

  return null;
}