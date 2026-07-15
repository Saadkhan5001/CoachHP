import { ClassicMobileSectionHeading } from "../ClassicMobileSectionHeading";
import { ClassicMobileButton } from "../ClassicMobileButton";
import { ClassicMobileReveal } from "../ClassicMobileReveal";
import { CountUp } from "@/components/CountUp";
import { PROCESS_STEPS, PROCESS_STATS } from "@/lib/classic-data";

/**
 * Mobile Process, per the reference recording: heading → image stat card
 * (two glass count-up stats) → steps 01–05 as full-width cards → promo
 * card with CTA.
 */
export function MobileProcess() {
  return (
    <div id="process" className="px-5 pb-16" style={{ paddingTop: "56px" }}>
      <ClassicMobileSectionHeading
        label="Process"
        subtitle="A step-by-step process designed to get you real, measurable results. From your first consultation to your transformation."
      >
        How It Works <span className="v2-accent-text">Step by Step</span>
      </ClassicMobileSectionHeading>

      <div className="mt-9 flex flex-col gap-3.5">
        {/* Stat card */}
        <ClassicMobileReveal>
          <article className="relative overflow-hidden rounded-3xl">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url(/images/classic/proc-equip.jpg)" }}
            />
            <div className="absolute inset-0 bg-black/45" />
            <div className="relative flex flex-col gap-3 p-5 py-7">
              {PROCESS_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.09] px-5 py-4 backdrop-blur-md"
                >
                  <CountUp
                    value={Number(stat.value)}
                    suffix={stat.suffix}
                    className="text-[1.9rem] font-semibold leading-none text-white"
                    suffixClassName="text-[#c01d18]"
                  />
                  <p className="mt-1.5 text-[0.85rem] text-white/75">{stat.label}</p>
                </div>
              ))}
            </div>
          </article>
        </ClassicMobileReveal>

        {/* Steps 01–05 */}
        {PROCESS_STEPS.map((step, i) => (
          <ClassicMobileReveal key={step.number} delay={Math.min(i * 40, 160)}>
            <article className="flex min-h-[200px] flex-col justify-between rounded-3xl bg-[#141414] p-6">
              <span className="text-[2.4rem] font-semibold leading-none text-white/15">{step.number}</span>
              <div className="mt-7">
                <h3 className="text-[1.2rem] font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-white/55">{step.body}</p>
              </div>
            </article>
          </ClassicMobileReveal>
        ))}

        {/* Promo card */}
        <ClassicMobileReveal>
          <article className="relative overflow-hidden rounded-3xl">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url(/images/classic/proc-promo.jpg)" }}
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative flex flex-col items-center p-7 py-10 text-center">
              <h3 className="text-[1.6rem] font-semibold leading-tight text-white">
                This Isn&apos;t Motivation. <span className="v2-accent-text">It&apos;s Method.</span>
              </h3>
              <p className="mt-2 text-[0.95rem] text-white/70">Start Your Journey!</p>
              <div className="mt-5">
                <ClassicMobileButton href="#contact">Let&apos;s do it!</ClassicMobileButton>
              </div>
            </div>
          </article>
        </ClassicMobileReveal>
      </div>
    </div>
  );
}
