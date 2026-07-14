"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PillLabel } from "../PillLabel";
import { STORY_FOCUS, type StoryFocus } from "@/lib/data";

function StoryImage({ src, label, tone }: { src: string; label: string; tone: "work" | "stage" }) {
  return (
    <div className="relative h-[240px] min-w-0 overflow-hidden sm:h-[360px] xl:h-full">
      <span
        className={`stamp absolute left-0 top-0 z-10 inline-flex h-[30px] items-center px-4 text-black ${
          tone === "stage" ? "bg-accent" : "bg-white"
        }`}
      >
        {label}
      </span>
      <div
        className="h-full w-full bg-cover bg-center grayscale-[0.15]"
        style={{ backgroundImage: `url(${src})` }}
        role="img"
        aria-label={`${label} — illustrative placeholder`}
      />
    </div>
  );
}

function StoryCard({ item }: { item: StoryFocus }) {
  return (
    <article className="grid h-auto grid-cols-1 gap-3 border border-white/10 bg-dark-card2 p-[15px] md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:h-full xl:grid-cols-[275px_275px_minmax(0,1fr)]">
      <StoryImage src={item.workImage} label="The Work" tone="work" />
      <StoryImage src={item.stageImage} label="The Stage" tone="stage" />
      <div className="flex min-w-0 flex-col justify-center px-3 pb-4 pt-6 md:col-span-2 xl:col-span-1 xl:px-6">
        <span className="stamp text-accent">{item.tag}</span>
        <h3 className="mt-3 text-[1.5rem] font-extrabold uppercase leading-[1.02] tracking-[-0.02em] text-white">
          {item.title}
        </h3>
        <p className="mt-4 text-[1rem] leading-relaxed text-white/70">{item.body}</p>
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
      id="results"
      className="scroll-mt-[110px] overflow-hidden pt-24 pb-20 sm:pt-32"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") scrollPrev();
        if (e.key === "ArrowRight") scrollNext();
      }}
      tabIndex={-1}
      aria-roledescription="carousel"
      aria-label="Coaching focuses"
    >
      <div className="mx-auto flex w-[min(calc(100%-40px),760px)] flex-col items-center text-center">
        <PillLabel theme="dark">Results</PillLabel>
        <h2 className="h-section mt-4 text-white">
          From the Work to <span className="text-accent">the Stage</span>
        </h2>
        <p className="mt-3 max-w-[600px] text-[15px] leading-relaxed text-white/60">
          No filters, no fabricated numbers. Just the process that turns disciplined
          work into real performance — the same one Coach P uses to prep competitors
          and step on stage himself.
        </p>
      </div>

      <div className="relative mt-8 touch-pan-y [--story-slide:980px]">
        <div className="overflow-hidden xl:overflow-visible" ref={emblaRef}>
          <div className="flex items-center">
            {STORY_FOCUS.map((item, i) => (
              <div
                key={item.tag + i}
                className="min-w-0 flex-[0_0_min(calc(100vw-40px),var(--story-slide))] px-2"
                aria-hidden={selected !== i}
              >
                <div className="relative overflow-hidden xl:h-[456px]">
                  <StoryCard item={item} />
                  <div
                    className={`pointer-events-none absolute inset-0 bg-black transition-opacity duration-500 ${
                      selected === i ? "opacity-0" : "opacity-[0.58]"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Previous"
          className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-white/15 bg-black/40 text-white backdrop-blur-md transition-colors hover:border-accent hover:text-accent xl:left-[calc(50%-(min(calc(100vw-44px),var(--story-slide))/2)-28px)]"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Next"
          className="absolute right-4 top-1/2 z-20 flex h-12 w-12 translate-x-1/2 -translate-y-1/2 items-center justify-center border border-white/15 bg-black/40 text-white backdrop-blur-md transition-colors hover:border-accent hover:text-accent xl:right-[calc(50%-(min(calc(100vw-44px),var(--story-slide))/2)-28px)]"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div className="mt-7 flex justify-center gap-1.5">
        {STORY_FOCUS.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-1.5 transition-all ${
              selected === i ? "w-6 bg-accent" : "w-1.5 bg-white/25"
            }`}
          />
        ))}
      </div>

      <p className="mx-auto mt-6 max-w-[600px] px-5 text-center text-[11px] uppercase tracking-[0.14em] text-white/30">
        Imagery illustrative — real client results shown only with consent
      </p>
    </section>
  );
}
