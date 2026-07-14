"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "../SectionHeading";
import { STANDARDS } from "@/lib/data";

export function Reviews() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 4600, stopOnInteraction: false, stopOnMouseEnter: true })]
  );
  const [snaps, setSnaps] = useState<number[]>([]);
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", () => {
      setSnaps(emblaApi.scrollSnapList());
      onSelect();
    });
  }, [emblaApi, onSelect]);

  return (
    <section
      id="standards"
      className="pt-24 sm:pt-32"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") emblaApi?.scrollPrev();
        if (e.key === "ArrowRight") emblaApi?.scrollNext();
      }}
      tabIndex={-1}
      aria-roledescription="carousel"
      aria-label="The Factory Standards"
    >
      <SectionHeading
        label="Standards"
        subtitle="Coaching here runs on principles, not slogans. These are the standards every athlete in the Factory is held to."
      >
        The Factory <span className="text-accent">Standards</span>
      </SectionHeading>

      <div className="relative mx-auto mt-14 max-w-content px-5 lg:px-6">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {STANDARDS.map((s) => (
              <div
                key={s.number}
                className="min-w-0 flex-[0_0_100%] pr-3 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
              >
                <article className="flex h-full min-h-[300px] flex-col border border-white/10 bg-dark-card2 p-8">
                  <span className="text-[2.4rem] font-extrabold leading-none tracking-[-0.04em] text-accent">
                    {s.number}
                  </span>
                  <h3 className="mt-5 text-[1.3rem] font-bold uppercase leading-[1.05] tracking-[-0.01em] text-white">
                    {s.title}
                  </h3>
                  <p className="mt-4 flex-1 text-[1rem] leading-relaxed text-white/60">{s.body}</p>
                </article>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          aria-label="Previous standard"
          className="absolute left-1 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/15 bg-black/40 text-white backdrop-blur-md transition-colors hover:border-accent hover:text-accent xl:-left-5"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          aria-label="Next standard"
          className="absolute right-1 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/15 bg-black/40 text-white backdrop-blur-md transition-colors hover:border-accent hover:text-accent xl:-right-5"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {snaps.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to group ${i + 1}`}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-1.5 transition-all ${
              selected === i ? "w-6 bg-accent" : "w-1.5 bg-white/25"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
