"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { SectionHeading } from "../SectionHeading";
import { REVIEWS } from "@/lib/data";

export function Reviews() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true })]
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
      id="reviews"
      className="pt-24 sm:pt-32"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") emblaApi?.scrollPrev();
        if (e.key === "ArrowRight") emblaApi?.scrollNext();
      }}
      tabIndex={-1}
      aria-roledescription="carousel"
      aria-label="Client reviews"
    >
      <SectionHeading label="Reviews" subtitle="This level of progress is driven by custom training, strategic nutrition, and accountability every step of the way.">
        Hear From Clients Who <span className="text-accent">Took the First Step</span>
      </SectionHeading>

      <div className="relative mx-auto mt-14 max-w-content px-5 lg:px-6">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {REVIEWS.map((r, i) => (
              <div
                key={r.name + i}
                className="min-w-0 flex-[0_0_100%] pr-3 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
              >
                <article className="flex h-full min-h-[380px] flex-col rounded-[26px] bg-dark-card2 p-8">
                  <Quote className="h-9 w-9 rotate-180 fill-accent text-accent" />
                  <p className="mt-6 flex-1 text-[1.1rem] leading-relaxed text-white/85">
                    {r.quote}
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <span
                      className="h-11 w-11 shrink-0 rounded-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${r.avatar})` }}
                    />
                    <div>
                      <p className="text-[1rem] font-semibold text-white">{r.name}</p>
                      <p className="text-[0.82rem] text-white/50">{r.role}</p>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          aria-label="Previous review"
          className="absolute left-1 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 xl:-left-5"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          aria-label="Next review"
          className="absolute right-1 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 xl:-right-5"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {snaps.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to review group ${i + 1}`}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-2 rounded-full transition-all ${
              selected === i ? "w-6 bg-accent" : "w-2 bg-white/25"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
