import { Clock, Shield, Dumbbell, Trophy, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "../SectionHeading";
import { PrimaryButton } from "../PrimaryButton";
import { Reveal } from "../Reveal";
import { SocialIcons } from "../Socials";
import { CREDENTIALS } from "@/lib/data";

const ICONS = { clock: Clock, shield: Shield, dumbbell: Dumbbell, trophy: Trophy };

export function About() {
  return (
    <section
      id="about"
      data-nav-theme="light"
      data-rise
      className="panel-reveal rounded-panel-top relative z-[2] bg-light-bg pb-20 pt-14 text-ink sm:pb-24 sm:pt-20"
    >
      <SectionHeading
        label="The Coach"
        theme="light"
        subtitle="Two decades of hands-on coaching, rooted in martial-arts discipline and built on technique. Coach P doesn't sell motivation — he builds standards."
      >
        The Coach Behind the Factory
      </SectionHeading>

      <div className="mx-auto mt-10 grid max-w-content gap-3 px-5 sm:mt-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)_minmax(0,1.5fr)] lg:px-6">
        {/* Left column */}
        <Reveal className="flex flex-col gap-3 lg:h-[620px]">
          {CREDENTIALS.slice(0, 2).map((c) => {
            const Icon = ICONS[c.icon];
            return (
              <div
                key={c.title}
                className="flex flex-1 flex-col justify-between border border-black/10 bg-white p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center border border-black/10 text-ink">
                  <Icon className="h-5 w-5" strokeWidth={1.7} />
                </span>
                <div>
                  <h3 className="text-[1.1rem] font-bold">{c.title}</h3>
                  <p className="mt-1 text-[0.85rem] text-black/50">{c.subtitle}</p>
                </div>
              </div>
            );
          })}
          {/* Mode card */}
          <div className="relative flex-1 overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url(/images/coach-p/gym-floor.jpg)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/40" />
            <div className="relative flex h-full flex-col justify-between p-5">
              <div className="flex items-start justify-between">
                <span className="stamp bg-black/60 px-3 py-1.5 text-white backdrop-blur-sm">
                  Train Together
                </span>
                <span className="flex h-8 w-8 items-center justify-center bg-accent text-ink">
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} />
                </span>
              </div>
              <div className="text-white">
                <h3 className="text-[1.2rem] font-bold leading-tight">In-Person &amp; Online</h3>
                <p className="text-[0.82rem] text-white/70">Coaching that meets you where you train</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Center portrait */}
        <Reveal delay={0.08} className="lg:h-[620px]">
          <div
            className="h-[360px] w-full overflow-hidden bg-cover bg-top sm:h-[520px] lg:h-full"
            style={{ backgroundImage: "url(/images/coach-p/coach-portrait.jpg)" }}
            role="img"
            aria-label="Coach P (Pierrot Massenat) — placeholder portrait"
          />
        </Reveal>

        {/* Right bio card */}
        <Reveal delay={0.16} className="lg:h-[620px]">
          <div className="flex h-full flex-col justify-between border border-black/10 bg-white p-8 sm:p-10">
            <div>
              <div className="flex items-center gap-3">
                <span
                  className="h-14 w-14 shrink-0 overflow-hidden border border-black/10 bg-cover bg-center"
                  style={{ backgroundImage: "url(/images/coach-p/coach-p-profile.webp)" }}
                  role="img"
                  aria-label="Pierrot Massenat, Coach P, at a physique competition"
                />
                <span className="stamp text-accent">Pierrot “Coach P” Massenat</span>
              </div>
              <h3 className="mt-3 text-[2rem] font-extrabold uppercase leading-none tracking-[-0.02em]">
                Coach P
              </h3>
              <p className="mt-5 text-[0.98rem] leading-relaxed text-black/65">
                Over two decades in the game, Coach P built his coaching the same
                way he builds his athletes — through discipline, repetition and an
                obsession with technique. His foundation in martial arts shows up
                in everything: standards over shortcuts, details over hype.
              </p>
              <p className="mt-4 text-[0.98rem] leading-relaxed text-black/65">
                He coaches strength, conditioning and competition prep — and he
                still steps on stage himself. That&rsquo;s the difference: coaching
                from someone who lives the work, not just prescribes it.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-2">
                {CREDENTIALS.slice(2).map((c) => (
                  <div key={c.title} className="border border-black/10 px-4 py-3">
                    <p className="text-[0.85rem] font-bold leading-tight">{c.title}</p>
                    <p className="mt-0.5 text-[0.72rem] text-black/45">{c.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <PrimaryButton href="#contact" variant="solid">
                Book a Consultation
              </PrimaryButton>
              <div className="flex items-center gap-3">
                <span className="stamp text-black/40">Follow the work</span>
                <SocialIcons variant="light" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
