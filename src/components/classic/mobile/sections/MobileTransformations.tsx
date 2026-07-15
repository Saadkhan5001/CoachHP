"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Quote } from "lucide-react";
import { ClassicMobileSectionHeading } from "../ClassicMobileSectionHeading";
import { ClassicMobileReveal } from "../ClassicMobileReveal";
import { TRANSFORMATIONS } from "@/lib/classic-data";

/**
 * Mobile Client Stories carousel, per the reference recording: one card
 * per view — Before/After images side-by-side on top, quote below, name +
 * meta at the bottom; pagination dots; horizontal swipe (Embla keeps
 * vertical page panning native — no touch-action: none anywhere).
 */
export function MobileTransformations() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 5200, stopOnInteraction: true })]
  );
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section
      id="stories"
      className="px-5 pb-16"
      style={{ paddingTop: "56px" }}
      aria-roledescription="carousel"
      aria-label="Client transformations"
    >
      <ClassicMobileSectionHeading
        label="Client Stories"
        subtitle="No filters. Just discipline, consistency, and serious results. This is what happens when commitment meets a proven system."
      >
        <span className="cm-accent-text">Results</span> Speak for Themselves
      </ClassicMobileSectionHeading>

      <ClassicMobileReveal className="mt-9">
        <div className="cm-embla" ref={emblaRef}>
          <div className="cm-embla-track">
            {TRANSFORMATIONS.map((item, i) => (
              <div key={item.name + i} className="cm-embla-slide pr-3" aria-hidden={selected !== i}>
                <article className="flex h-full flex-col rounded-3xl bg-[#191919] p-3.5">
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { src: item.before, label: "Before", accent: false },
                      { src: item.after, label: "After", accent: true },
                    ].map(({ src, label, accent }) => (
                      <div key={label} className="relative">
                        <span
                          className={`absolute left-2 top-2 z-10 inline-flex items-center rounded-full px-3 py-1 text-[0.72rem] font-medium ${
                            accent ? "bg-[#c01d18] text-white" : "bg-white text-black"
                          }`}
                        >
                          {label}
                        </span>
                        <div
                          className="h-[240px] w-full rounded-2xl bg-cover bg-top"
                          style={{ backgroundImage: `url(${src})` }}
                          role="img"
                          aria-label={`${item.name} — ${label.toLowerCase()}`}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex grow flex-col px-2 pb-3 pt-5">
                    <Quote className="h-7 w-7 rotate-180 fill-[#c01d18] text-[#c01d18]" strokeWidth={0} />
                    <p className="mt-3 text-[0.95rem] leading-[1.5] text-white/80">{item.quote}</p>
                    <div className="mt-auto pt-5">
                      <p className="text-[1rem] font-semibold text-[#f3f3f3]">{item.name}</p>
                      <p className="mt-1 text-[0.78rem] text-white/50">{item.meta}</p>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </ClassicMobileReveal>

      <div className="mt-6 flex justify-center gap-1.5">
        {TRANSFORMATIONS.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to story ${i + 1}`}
            onClick={() => emblaApi?.scrollTo(i)}
            className="flex h-11 w-6 items-center justify-center"
          >
            <span className={`h-1.5 w-1.5 rounded-full ${selected === i ? "bg-[#c01d18]" : "bg-white/25"}`} />
          </button>
        ))}
      </div>
    </section>
  );
}
