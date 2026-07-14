"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function measureStableViewport() {
  const probe = document.createElement("div");
  probe.style.cssText =
    "position:fixed;left:-9999px;top:0;width:1px;height:100svh;pointer-events:none;visibility:hidden;";
  document.body.appendChild(probe);
  const height = Math.round(probe.getBoundingClientRect().height || window.innerHeight);
  probe.remove();
  return height;
}

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

      mm.add("(max-width: 768px), (pointer: coarse)", () => {
        let stableHeight = measureStableViewport();
        let previousWidth = window.innerWidth;
        let resizeTimer: number | null = null;
        const timelines: gsap.core.Timeline[] = [];

        const buildMobileTransition = (incoming: HTMLElement, id: string) => {
          const outgoing = incoming.previousElementSibling as HTMLElement | null;
          if (!outgoing) return;

          ScrollTrigger.getById(id)?.kill(true);
          gsap.set(incoming, { clearProps: "transform" });
          gsap.set(incoming, { willChange: "transform", force3D: true });

          const tl = gsap.timeline({
            scrollTrigger: {
              id,
              trigger: incoming,
              start: "top bottom",
              end: `+=${stableHeight}`,
              pin: outgoing,
              pinSpacing: false,
              scrub: 0.45,
              anticipatePin: 1,
              fastScrollEnd: true,
              invalidateOnRefresh: false,
            },
          });

          tl.fromTo(
            incoming,
            { y: stableHeight * 0.18 },
            { y: 0, ease: "none" }
          );

          timelines.push(tl);
        };

        const setup = async () => {
          await document.fonts?.ready;
          buildMobileTransition(
            document.getElementById("services-panel") as HTMLElement,
            "about-services-mobile"
          );
          buildMobileTransition(
            document.getElementById("faq") as HTMLElement,
            "pricing-faq-mobile"
          );
          ScrollTrigger.refresh();
        };
        void setup();

        const onResize = () => {
          if (resizeTimer) window.clearTimeout(resizeTimer);
          resizeTimer = window.setTimeout(() => {
            const currentWidth = window.innerWidth;
            if (Math.abs(currentWidth - previousWidth) > 2) {
              previousWidth = currentWidth;
              stableHeight = measureStableViewport();
              ScrollTrigger.refresh();
            }
          }, 220);
        };
        window.addEventListener("resize", onResize, { passive: true });
        window.addEventListener("orientationchange", onResize, { passive: true });

        return () => {
          window.removeEventListener("resize", onResize);
          window.removeEventListener("orientationchange", onResize);
          if (resizeTimer) window.clearTimeout(resizeTimer);
          timelines.forEach((tl) => {
            tl.scrollTrigger?.kill(true);
            tl.kill();
          });
          gsap.set(["#services-panel", "#faq"], { clearProps: "transform,willChange" });
        };
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