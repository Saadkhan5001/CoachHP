import { PillLabel } from "../PillLabel";
import { PrimaryButton } from "../PrimaryButton";
import { StatCard } from "../StatCard";
import { Reveal } from "../Reveal";
import { HERO_STATS } from "@/lib/data";

export function Hero() {
  return (
    <section
      id="top"
      data-nav-theme="dark"
      className="relative z-[1] min-h-[100svh] w-full overflow-hidden bg-[#151d1f]"
    >
      {/* Photographic background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/images/curtis/hero.jpg)" }}
        aria-hidden="true"
      />
      {/* Left legibility gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(8,20,20,0.53) 0%, rgba(8,20,20,0.31) 34%, rgba(8,20,20,0.07) 65%, rgba(8,20,20,0.07) 100%)",
        }}
        aria-hidden="true"
      />
      {/* Bottom gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 52%, rgba(0,0,0,0.10) 72%, rgba(0,0,0,0.45) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto min-h-[100svh] w-[min(calc(100%_-_48px),1120px)] pt-[138px]">
        <div className="w-full" style={{ maxWidth: 760 }}>
          <Reveal delay={0.05}>
            <PillLabel theme="dark" className="min-h-6 px-3 py-0 text-[13px] leading-none text-white/[0.95] bg-[rgba(112,129,125,0.58)] border-white/[0.07]">Personal Coach</PillLabel>
          </Reveal>
          <Reveal delay={0.12}>
            <h1 className="mt-[28px] max-w-[672px] text-[72px] font-medium leading-none tracking-[-0.045em] text-[#f3f4f2]">
              Meet the <span className="text-[#87ff00]">Stronger</span><br />Version of You
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-[28px] max-w-[520px] text-[16px] font-normal leading-[1.3] tracking-[-0.015em] text-white/[0.91]">
              Expert coaching built on proven methods to help you move better,
              build real strength, and create lasting, measurable progress.
            </p>
          </Reveal>
          <Reveal delay={0.28}>
            <div className="mt-[39px]">
              <PrimaryButton size="lg" href="#contact" className="h-[42px] w-[146px] gap-2 border border-[#071007] py-0 pl-[18px] pr-1 text-[16px] font-medium leading-none shadow-[0_0_0_1px_rgba(255,255,255,0.32),0_4px_14px_rgba(0,0,0,0.12)] [&>span:last-child]:h-8 [&>span:last-child]:w-8 [&>span:last-child]:text-[#87ff00]">
                Get Started
              </PrimaryButton>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.4} className="absolute bottom-[102px] left-0">
          <div className="flex flex-wrap gap-[14px]">
            {HERO_STATS.map((s) => (
              <StatCard
                key={s.label}
                value={Number(s.value)}
                suffix={s.suffix}
                label={s.label}
                className={s.label === "Satisfaction Rate" ? "w-[168px]" : "w-[191px]"}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
