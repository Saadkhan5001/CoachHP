import { Bone } from "lucide-react";
import { ClassicMobileSectionHeading } from "../ClassicMobileSectionHeading";
import { ClassicMobileReveal } from "../ClassicMobileReveal";
import { SERVICES } from "@/lib/classic-data";

function AvocadoIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M12 22c-4 0-7-3.2-7-7.5C5 9 8 3 12 2c4 1 7 7 7 12.5 0 4.3-3 7.5-7 7.5Z" />
      <circle cx="12" cy="15" r="2.6" />
    </svg>
  );
}

/**
 * Mobile Services, per the reference recording: full-width stacked cards —
 * Build Real Strength dominant (tall image), Elite Conditioning secondary
 * (image with text at bottom), then Injury Prevention (plain dark card,
 * centered icon) and Expert Nutrition (image card, centered icon).
 */
export function MobileServices() {
  const [strength, conditioning, injury, nutrition] = SERVICES;
  return (
    <div id="services" className="px-5 pb-16" style={{ paddingTop: "64px" }}>
      <ClassicMobileSectionHeading
        label="Services"
        subtitle="This level of progress is driven by custom training, structured programming, and accountability every step of the way."
      >
        Personal Training Designed Around <span className="v2-accent-text">Your Goals</span>
      </ClassicMobileSectionHeading>

      <div className="mt-9 flex flex-col gap-3.5">
        {/* Dominant card */}
        <ClassicMobileReveal>
          <article className="relative flex min-h-[430px] flex-col justify-end overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${strength.image})` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
            <div className="relative p-6 text-center">
              <h3 className="text-[1.55rem] font-semibold text-white">{strength.title}</h3>
              <p className="mx-auto mt-2.5 max-w-[30ch] text-[0.92rem] leading-relaxed text-white/70">{strength.body}</p>
            </div>
          </article>
        </ClassicMobileReveal>

        {/* Secondary image card */}
        <ClassicMobileReveal delay={60}>
          <article className="relative flex min-h-[330px] flex-col justify-end overflow-hidden rounded-3xl bg-[#141414]">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${conditioning.image})` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="relative p-6 text-center">
              <h3 className="text-[1.35rem] font-semibold text-white">{conditioning.title}</h3>
              <p className="mx-auto mt-2 max-w-[32ch] text-[0.9rem] leading-relaxed text-white/70">{conditioning.body}</p>
            </div>
          </article>
        </ClassicMobileReveal>

        {/* Supporting cards */}
        <ClassicMobileReveal delay={60}>
          <article className="flex min-h-[240px] flex-col items-center justify-center rounded-3xl bg-[#141414] p-6 text-center">
            <span className="mb-4 flex h-11 w-11 items-center justify-center">
              <Bone className="h-7 w-7 text-white" strokeWidth={1.6} />
            </span>
            <h3 className="text-[1.2rem] font-semibold text-white">{injury.title}</h3>
            <p className="mt-2 max-w-[30ch] text-[0.9rem] leading-relaxed text-white/60">{injury.body}</p>
          </article>
        </ClassicMobileReveal>

        <ClassicMobileReveal delay={60}>
          <article className="relative flex min-h-[260px] flex-col items-center justify-center overflow-hidden rounded-3xl p-6 text-center">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${nutrition.image})` }} />
            <div className="absolute inset-0 bg-black/55" />
            <span className="relative mb-4 flex h-11 w-11 items-center justify-center">
              <AvocadoIcon className="h-7 w-7 text-white" />
            </span>
            <h3 className="relative text-[1.2rem] font-semibold text-white">{nutrition.title}</h3>
            <p className="relative mt-2 max-w-[30ch] text-[0.9rem] leading-relaxed text-white/70">{nutrition.body}</p>
          </article>
        </ClassicMobileReveal>
      </div>
    </div>
  );
}
