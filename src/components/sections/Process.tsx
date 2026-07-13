import { SectionHeading } from "../SectionHeading";
import { PrimaryButton } from "../PrimaryButton";
import { Reveal } from "../Reveal";
import { CountUp } from "../CountUp";
import { PROCESS_STEPS } from "@/lib/data";

function StepCard({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <article className="flex min-h-[250px] flex-col justify-between rounded-[22px] bg-dark-card2 p-6 md:min-h-[270px]">
      <span className="text-[2.6rem] font-semibold leading-none text-white/15">
        {number}
      </span>
      <div>
        <h3 className="text-[1.2rem] font-semibold text-white">{title}</h3>
        <p className="mt-2 text-[0.9rem] leading-relaxed text-white/55">{body}</p>
      </div>
    </article>
  );
}

export function Process() {
  return (
    <div id="process" className="mx-auto max-w-content px-5 pt-24 sm:pt-32 lg:px-6">
      <SectionHeading label="Process" subtitle="A step-by-step process designed to get you real, measurable results. From your first consultation to your transformation.">
        How It Works <span className="text-accent">Step by Step</span>
      </SectionHeading>

      <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* Stat / image card */}
        <Reveal>
          <article className="relative flex min-h-[250px] flex-col justify-center gap-3 overflow-hidden rounded-[22px] p-5 md:min-h-[270px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url(/images/curtis/proc-equip.jpg)" }}
            />
            <div className="absolute inset-0 bg-black/45" />
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 backdrop-blur-md">
              <CountUp value={450} suffix="+" className="text-[1.9rem] font-semibold leading-none text-white" />
              <span className="mt-1 block text-[0.85rem] text-white/75">Custom Plans Built</span>
            </div>
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 backdrop-blur-md">
              <CountUp value={95} suffix="%" className="text-[1.9rem] font-semibold leading-none text-white" />
              <span className="mt-1 block text-[0.85rem] text-white/75">Consistency Rate</span>
            </div>
          </article>
        </Reveal>

        {PROCESS_STEPS.slice(0, 3).map((s, i) => (
          <Reveal key={s.number} delay={0.05 * (i + 1)}>
            <StepCard {...s} />
          </Reveal>
        ))}

        {PROCESS_STEPS.slice(3).map((s, i) => (
          <Reveal key={s.number} delay={0.05 * i}>
            <StepCard {...s} />
          </Reveal>
        ))}

        {/* Promo card spans two columns */}
        <Reveal delay={0.1} className="sm:col-span-2 lg:col-span-2">
          <article className="relative flex min-h-[250px] flex-col justify-end overflow-hidden rounded-[22px] p-7 md:min-h-[270px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url(/images/curtis/proc-promo.jpg)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
            <div className="relative">
              <h3 className="text-[1.9rem] font-semibold leading-[1.05] text-white">
                This Isn&rsquo;t Motivation.
                <br />
                <span className="text-accent">It&rsquo;s Method.</span>
              </h3>
              <p className="mt-2 text-[0.95rem] text-white/70">Start Your Journey!</p>
              <div className="mt-5">
                <PrimaryButton href="#contact">Let&rsquo;s do it!</PrimaryButton>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </div>
  );
}
