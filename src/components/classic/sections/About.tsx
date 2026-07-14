import { Award, FileBadge2, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "../SectionHeading";
import { PrimaryButton } from "../PrimaryButton";
import { Reveal } from "../../Reveal";
import { SocialIcons } from "../Socials";
import { ABOUT_CREDENTIALS } from "@/lib/classic-data";

const CRED_ICON = { medal: Award, certificate: FileBadge2 };

export function About() {
  return (
    <section
      id="about"
      data-nav-theme="light"
      data-rise
      className="panel-reveal rounded-panel-top relative z-[2] bg-light-bg pb-20 pt-14 text-dark-bg sm:pb-24 sm:pt-20"
    >
      <SectionHeading label="About Me" theme="light" subtitle="This level of progress is driven by custom training, structured programming, and accountability every step of the way.">
        Meet Your Coach
      </SectionHeading>

      <div className="mx-auto mt-10 grid max-w-content-classic gap-3 px-5 sm:mt-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)_minmax(0,1.5fr)] lg:px-6">
        {/* Left column */}
        <Reveal className="flex flex-col gap-3 lg:h-[620px]">
          {ABOUT_CREDENTIALS.map((c) => {
            const Icon = CRED_ICON[c.icon];
            return (
              <div
                key={c.title}
                className="flex flex-1 flex-col justify-between rounded-3xl bg-white p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black/[0.04]">
                  <Icon className="h-5 w-5 text-black/80" strokeWidth={1.8} />
                </span>
                <div>
                  <h3 className="text-[1.15rem] font-semibold">{c.title}</h3>
                  <p className="mt-1 text-[0.9rem] text-black/50">{c.subtitle}</p>
                </div>
              </div>
            );
          })}
          {/* Train-in-person card */}
          <div className="relative flex-1 overflow-hidden rounded-3xl">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url(/images/classic/gym-location.jpg)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40" />
            <div className="relative flex h-full flex-col justify-between p-5">
              <div className="flex items-start justify-between">
                <span className="rounded-full bg-black/60 px-3 py-1 text-[0.72rem] font-medium text-white backdrop-blur-sm">
                  Train in-person
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <div className="text-white">
                <h3 className="text-[1.3rem] font-semibold leading-tight">Private Coaching</h3>
                <p className="text-[0.85rem] text-white/70">Performance Training</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Center portrait */}
        <Reveal delay={0.08} className="lg:h-[620px]">
          <div
            className="h-[360px] w-full sm:h-[520px] overflow-hidden rounded-3xl bg-cover bg-top lg:h-full"
            style={{ backgroundImage: "url(/images/classic/coach.jpg)" }}
            role="img"
            aria-label="Coach P, personal trainer"
          />
        </Reveal>

        {/* Right bio card */}
        <Reveal delay={0.16} className="lg:h-[620px]">
          <div className="flex h-full flex-col justify-between rounded-3xl bg-white p-8 sm:p-10">
            <div>
              <h3 className="text-[2rem] font-semibold tracking-tight">Coach P</h3>
              <p className="mt-5 text-[0.98rem] leading-relaxed text-black/60">
                With over two decades in the game, I specialise in building real
                strength, improving conditioning, and developing athletic
                performance. My coaching is rooted in martial-arts discipline,
                technical precision, and measurable progression, with a clear
                focus on results that last rather than quick fixes.
              </p>
              <p className="mt-4 text-[0.98rem] leading-relaxed text-black/60">
                I prioritise strong fundamentals, progressive overload, and
                purposeful conditioning to build resilient, capable athletes. I
                hold a high standard for the work I deliver, ensuring every
                programme is intentional, progressive, and built around
                continuous improvement.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <PrimaryButton href="#contact">Get in Touch</PrimaryButton>
              <div className="flex items-center gap-3">
                <span className="text-[0.85rem] text-black/50">Follow me:</span>
                <SocialIcons variant="light" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
