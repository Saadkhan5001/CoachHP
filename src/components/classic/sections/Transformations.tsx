"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { PillLabel } from "../PillLabel";
import { TRANSFORMATIONS, type Transformation } from "@/lib/classic-data";

function StoryImage({ src, label, tone }: { src: string; label: string; tone: "light" | "accent" }) {
  return (
    <div className="relative h-[260px] min-w-0 overflow-visible md:h-[360px] xl:h-full">
      <span
        className={`absolute -top-1 left-0 z-10 inline-flex h-[34px] items-center rounded-full px-5 text-[13px] font-medium ${
          tone === "accent" ? "bg-[#c01d18] text-white" : "bg-white text-black"
        }`}
      >
        {label}
      </span>
      <div
        className="h-full w-full rounded-2xl bg-cover bg-center"
        style={{ backgroundImage: `url(${src})` }}
      />
    </div>
  );
}

function StoryCard({ item }: { item: Transformation }) {
  return (
    <article className="grid h-auto xl:h-full grid-cols-1 gap-3 rounded-[28px] bg-[#191919] p-[15px] md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:grid-cols-[285px_285px_minmax(0,1fr)]">
      <StoryImage src={item.before} label="Before" tone="light" />
      <StoryImage src={item.after} label="After" tone="accent" />
      <div className="flex min-w-0 flex-col px-3 pb-3 pt-8 md:col-span-2 xl:col-span-1 xl:px-[25px] xl:pb-6 xl:pl-[30px] xl:pr-[25px]">
        <Quote className="h-9 w-9 rotate-180 fill-[#c01d18] text-[#c01d18]" strokeWidth={0} />
        <p className="mt-[22px] text-[18px] font-normal leading-[1.38] tracking-[-0.015em] text-white/80">
          {item.quote}
        </p>
        <div className="mt-auto pt-8">
          <p className="text-[17px] font-semibold leading-tight text-[#f3f3f3]">{item.name}</p>
          <p className="mt-[5px] text-[12px] leading-tight text-white/50">{item.meta}</p>
        </div>
      </div>
    </article>
  );
}

export function Transformations() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", containScroll: false },
    [Autoplay({ delay: 5200, stopOnInteraction: false, stopOnMouseEnter: true })]
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

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section
      id="stories"
      className="scroll-mt-[110px] overflow-hidden pt-24 pb-20 sm:pt-32"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") scrollPrev();
        if (e.key === "ArrowRight") scrollNext();
      }}
      tabIndex={-1}
      aria-roledescription="carousel"
      aria-label="Client transformations"
    >
      <div className="mx-auto flex w-[min(calc(100%_-_40px),760px)] flex-col items-center text-center">
        <PillLabel theme="dark" className="min-h-[30px] px-4 py-0 text-[13px] leading-none">
          Client Stories
        </PillLabel>
        <h2 className="mt-2 text-[clamp(40px,3vw,50px)] font-medium leading-[1.02] tracking-[-0.04em] text-white">
          <span className="text-[#c01d18]">Results</span> Speak for Themselves
        </h2>
        <p className="mt-2.5 max-w-[600px] text-[15px] leading-[1.35] text-white/60">
          No filters. Just discipline, consistency, and serious results. This is what happens when commitment meets a proven system.
        </p>
      </div>

      <div className="relative mx-auto mt-7 max-w-[994px] touch-pan-y px-2 [--story-slide:994px]">
        <div className="overflow-hidden rounded-[28px]" ref={emblaRef}>
          <div className="flex items-center">
            {TRANSFORMATIONS.map((item, i) => (
              <div
                key={item.name + i}
                className="min-w-0 flex-[0_0_100%]"
                aria-hidden={selected !== i}
              >
                <div className="relative h-auto overflow-hidden rounded-[28px] xl:h-[472px]">
                  <StoryCard item={item} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Previous story"
          className="absolute left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Next story"
          className="absolute right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div className="mt-[30px] flex justify-center gap-1.5">
        {TRANSFORMATIONS.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to story ${i + 1}`}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              selected === i ? "bg-[#c01d18]" : "bg-white/25"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
