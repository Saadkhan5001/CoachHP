"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Quote } from "lucide-react";
import { ClassicMobileSectionHeading } from "../ClassicMobileSectionHeading";
import { ClassicMobileReveal } from "../ClassicMobileReveal";
import { REVIEWS } from "@/lib/classic-data";

/**
 * Mobile Reviews carousel, per the reference recording: one readable card
 * per view — quote icon, review text, avatar + name + role; dots; swipe.
 */
export function MobileReviews() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 4600, stopOnInteraction: true })]
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
      id="reviews"
      className="px-5 pb-20"
      style={{ paddingTop: "56px" }}
      aria-roledescription="carousel"
      aria-label="Client reviews"
    >
      <ClassicMobileSectionHeading
        label="Reviews"
        subtitle="This level of progress is driven by custom training, structured programming, and accountability every step of the way."
      >
        Hear From Clients Who <span className="v2-accent-text">Took the First Step</span>
      </ClassicMobileSectionHeading>

      <ClassicMobileReveal className="mt-9">
        <div className="v2-embla" ref={emblaRef}>
          <div className="v2-embla-track">
            {REVIEWS.map((review, i) => (
              <div key={review.name} className="v2-embla-slide pr-3" aria-hidden={selected !== i}>
                <article className="flex h-full min-h-[300px] flex-col rounded-3xl bg-[#141414] p-6">
                  <Quote className="h-7 w-7 rotate-180 fill-[#c01d18] text-[#c01d18]" strokeWidth={0} />
                  <p className="mt-4 text-[0.98rem] leading-[1.55] text-white/80">{review.quote}</p>
                  <div className="mt-auto flex items-center gap-3 pt-6">
                    <div
                      className="h-11 w-11 rounded-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${review.avatar})` }}
                      role="img"
                      aria-label={review.name}
                    />
                    <div>
                      <p className="text-[0.95rem] font-semibold text-white">{review.name}</p>
                      <p className="text-[0.78rem] text-white/50">{review.role}</p>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </ClassicMobileReveal>

      <div className="mt-6 flex justify-center gap-1.5">
        {REVIEWS.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to review ${i + 1}`}
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
