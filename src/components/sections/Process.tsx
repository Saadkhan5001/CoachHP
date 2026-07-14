import { SectionHeading } from "../SectionHeading";
import { PrimaryButton } from "../PrimaryButton";
import { Reveal } from "../Reveal";
import { CountUp } from "../CountUp";
import { METHOD_STEPS, METHOD_STATS } from "@/lib/data";

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
    <article className="flex min-h-[210px] flex-col justify-between border border-white/10 bg-dark-card2 p-6 md:min-h-[270px]">
      <span className="text-[2.6rem] font-extrabold leading-none tracking-[-0.04em] text-white/12">
        {number}
      </span>
      <div>
        <h3 className="text-[1.15rem] font-bold uppercase tracking-[-0.01em] text-white">
          {title}
        </h3>
        <p className="mt-2 text-[0.9rem] leading-relaxed text-white/55">{body}</p>
      </div>
    </article>
  );
}

export function Process() {
  return (
    <div id="method" className="mx-auto max-w-content px-5 pt-24 sm:pt-32 lg:px-6">
      <SectionHeading
        label="The Method"
        subtitle="Results aren't produced by hype. They're manufactured — assessed, built, trained, refined and performed. This is how the Factory works."
      >
        The Factory <span className="text-accent">Method</span>
      </SectionHeading>

      <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* Stat / image card */}
        <Reveal>
          <article className="relative flex min-h-[250px] flex-col justify-center gap-3 overflow-hidden border border-white/10 p-5 md:min-h-[270px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url(/images/coach-p/method-equip.jpg)" }}
            />
            <div className="absolute inset-0 bg-black/55" />
            {METHOD_STATS.map((s) => (
              <div key={s.label} className="relative border border-white/10 bg-white/[0.05] px-5 py-4 backdrop-blur-md">
                <CountUp
                  value={s.value}
                  suffix={s.suffix}
                  className="text-[1.9rem] font-extrabold leading-none tracking-[-0.03em] text-white"
                  suffixClassName="text-accent"
                />
                <span className="mt-1 block text-[0.78rem] font-medium uppercase tracking-[0.1em] text-white/70">
                  {s.label}
                </span>
              </div>
            ))}
          </article>
        </Reveal>

        {METHOD_STEPS.slice(0, 3).map((s, i) => (
          <Reveal key={s.number} delay={0.05 * (i + 1)}>
            <StepCard {...s} />
          </Reveal>
        ))}

        {METHOD_STEPS.slice(3).map((s, i) => (
          <Reveal key={s.number} delay={0.05 * i}>
            <StepCard {...s} />
          </Reveal>
        ))}

        {/* Promo card spans two columns */}
        <Reveal delay={0.1} className="sm:col-span-2 lg:col-span-2">
          <article className="relative flex min-h-[240px] flex-col justify-end overflow-hidden border border-white/10 p-7 md:min-h-[270px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url(/images/coach-p/method-promo.jpg)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/20" />
            <div className="relative">
              <h3 className="text-[1.9rem] font-extrabold uppercase leading-[1.02] tracking-[-0.02em] text-white">
                We don&rsquo;t chase motivation.
                <br />
                <span className="text-accent">We build standards.</span>
              </h3>
              <p className="mt-3 text-[0.95rem] text-white/70">Put in the work. Raise the standard.</p>
              <div className="mt-5">
                <PrimaryButton href="#contact">Enter the Factory</PrimaryButton>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </div>
  );
}
