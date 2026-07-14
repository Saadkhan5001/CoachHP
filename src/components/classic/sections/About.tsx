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
      className="panel-reveal rounded-panel-top relative z-[2] bg-light-bg pb-20 pt-20 text-dark-bg sm:pb-24 sm:pt-[7.2rem]"
    >
      <SectionHeading
        label="About Me"
        theme="light"
        className="classic-about-heading"
        headingStyle={{ fontSize: "clamp(2.1rem, 4.6vw, 3rem)", lineHeight: 1 }}
        subtitleStyle={{ maxWidth: "580px", lineHeight: 1.35 }}
        subtitle="This level of progress is driven by custom training, structured programming, and accountability every step of the way."
      >
        Meet Your Coach
      </SectionHeading>

      <div className="mx-auto mt-10 grid max-w-[1088px] gap-3 px-5 sm:mt-8 lg:h-[clamp(560px,42vw,608px)] lg:grid-cols-[minmax(0,0.61fr)_minmax(0,1fr)_minmax(0,1.12fr)] lg:px-6">
        {/* Left column */}
        <Reveal className="grid min-h-0 gap-3 lg:h-full lg:grid-rows-[repeat(3,minmax(0,1fr))]">
          {ABOUT_CREDENTIALS.map((c) => {
            const Icon = CRED_ICON[c.icon];
            return (
              <div
                key={c.title}
                className="flex min-h-0 min-h-[180px] flex-col justify-between rounded-3xl bg-white p-6 lg:h-full lg:min-h-0"
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
          <div className="relative min-h-[180px] overflow-hidden rounded-3xl lg:h-full lg:min-h-0">
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
        <Reveal delay={0.08} className="min-h-0 lg:h-full">
          <div
            className="h-[360px] w-full overflow-hidden rounded-3xl bg-cover bg-top sm:h-[520px] lg:h-full"
            style={{ backgroundImage: "url(/images/classic/Meet-coach.jpg)" }}
            role="img"
            aria-label="Coach P, personal trainer"
          />
        </Reveal>

        {/* Right bio card */}
        <Reveal delay={0.16} className="min-h-0 lg:h-full">
          <div className="flex h-full flex-col rounded-3xl bg-white p-6">
            <div>
              <h3 className="text-[2.15rem] font-semibold leading-[1.05] tracking-tight">Coach P</h3>
              <p className="mt-4 text-[0.95rem] leading-[1.42] text-black/60">
                With over two decades in the game, I specialise in building real
                strength, improving conditioning, and developing athletic
                performance. My coaching is rooted in martial-arts discipline,
                technical precision, and measurable progression, with a clear
                focus on results that last rather than quick fixes.
              </p>
              <p className="mt-5 text-[0.95rem] leading-[1.42] text-black/60">
                I prioritise strong fundamentals, progressive overload, and
                purposeful conditioning to build resilient, capable athletes. I
                hold a high standard for the work I deliver, ensuring every
                programme is intentional, progressive, and built around
                continuous improvement.
              </p>
            </div>
            <div className="mt-8 flex flex-col items-start gap-5 sm:mt-auto sm:flex-row sm:items-end sm:justify-between">
              <PrimaryButton href="#contact" className="min-h-[42px] min-w-[150px] justify-between">
                Get in Touch
              </PrimaryButton>
              <div className="flex flex-col items-center gap-2 self-center sm:self-auto">
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
