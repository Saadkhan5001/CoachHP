import { Trophy, Zap } from "lucide-react";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";
import { SERVICES } from "@/lib/data";

function ModeTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="stamp inline-flex items-center gap-1.5 text-white/50">
      <span aria-hidden className="h-1 w-1 bg-accent" />
      {children}
    </span>
  );
}

export function Services() {
  const [strength, conditioning, stage, athlete] = SERVICES;
  return (
    <div id="coaching" className="mx-auto max-w-content px-5 pt-20 sm:pt-28 lg:px-6">
      <SectionHeading
        label="Coaching"
        subtitle="Real training, structured around your goals. In-person or online — every plan is built, not templated."
      >
        Coaching Built Around <span className="text-accent">The Work</span>
      </SectionHeading>

      <div className="mt-14 grid gap-3 md:grid-cols-2">
        {/* Big left card — Strength */}
        <Reveal className="md:row-span-2">
          <article className="group relative flex min-h-[360px] flex-col justify-end overflow-hidden border border-white/10 md:min-h-[540px]">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              style={{ backgroundImage: `url(${strength.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/30 to-transparent" />
            <div className="relative p-7 sm:p-9">
              <span className="stamp text-accent">{strength.eyebrow}</span>
              <h3 className="h-card-lg mt-3 text-white">{strength.title}</h3>
              <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-white/75">
                {strength.body}
              </p>
              <div className="mt-4">
                <ModeTag>{strength.mode}</ModeTag>
              </div>
            </div>
          </article>
        </Reveal>

        {/* Wide conditioning card */}
        <Reveal delay={0.06}>
          <article className="relative flex min-h-[300px] items-end overflow-hidden border border-white/10 bg-dark-card2 sm:min-h-[220px] sm:items-center">
            <div
              className="absolute inset-0 bg-cover bg-center sm:inset-y-0 sm:left-auto sm:right-0 sm:w-[52%]"
              style={{ backgroundImage: `url(${conditioning.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-card2 via-dark-card2/80 to-transparent sm:bg-gradient-to-r" />
            <div className="relative max-w-full p-7 sm:max-w-[58%] sm:p-8">
              <span className="stamp text-accent">{conditioning.eyebrow}</span>
              <h3 className="mt-2 text-[1.35rem] font-bold text-white">{conditioning.title}</h3>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-white/65">
                {conditioning.body}
              </p>
              <div className="mt-3">
                <ModeTag>{conditioning.mode}</ModeTag>
              </div>
            </div>
          </article>
        </Reveal>

        {/* Bottom two small cards */}
        <Reveal delay={0.12}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <article className="flex min-h-[220px] flex-col justify-between border border-white/10 bg-dark-card2 p-6">
              <span className="flex h-11 w-11 items-center justify-center border border-white/10 text-accent">
                <Trophy className="h-5 w-5" strokeWidth={1.7} />
              </span>
              <div>
                <span className="stamp text-white/40">{stage.eyebrow}</span>
                <h3 className="mt-1.5 text-[1.15rem] font-bold text-white">{stage.title}</h3>
                <p className="mt-2 text-[0.88rem] leading-relaxed text-white/60">{stage.body}</p>
                <div className="mt-3">
                  <ModeTag>{stage.mode}</ModeTag>
                </div>
              </div>
            </article>

            <article className="relative flex min-h-[220px] flex-col justify-between overflow-hidden border border-white/10 p-6">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${athlete.image})` }}
              />
              <div className="absolute inset-0 bg-black/70" />
              <span className="relative flex h-11 w-11 items-center justify-center border border-white/15 text-accent">
                <Zap className="h-5 w-5" strokeWidth={1.7} />
              </span>
              <div className="relative">
                <span className="stamp text-white/50">{athlete.eyebrow}</span>
                <h3 className="mt-1.5 text-[1.15rem] font-bold text-white">{athlete.title}</h3>
                <p className="mt-2 text-[0.88rem] leading-relaxed text-white/70">{athlete.body}</p>
                <div className="mt-3">
                  <ModeTag>{athlete.mode}</ModeTag>
                </div>
              </div>
            </article>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
