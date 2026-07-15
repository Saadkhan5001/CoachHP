import { Award, FileBadge2, ArrowUpRight } from "lucide-react";
import { ClassicMobileSectionHeading } from "../ClassicMobileSectionHeading";
import { ClassicMobileButton } from "../ClassicMobileButton";
import { ClassicMobileReveal } from "../ClassicMobileReveal";
import { ABOUT_CREDENTIALS } from "@/lib/classic-data";
import { CLASSIC_BRAND } from "@/lib/classic-data";

const CRED_ICON = { medal: Award, certificate: FileBadge2 };

/**
 * Mobile About, in the reference recording's mobile order (which differs
 * from desktop): heading → portrait → bio card (paragraphs + CTA +
 * socials) → credential cards → gym-location card LAST. That last card is
 * the bottom of the held viewport during the About→Services stack.
 */
export function MobileAbout() {
  return (
    <section
      id="about"
      data-nav-theme="light"
      className="cm-panel-top relative bg-[#f9f9f9] pb-16 text-[#0f0f0f]"
      style={{ paddingTop: "64px" }}
    >
      <ClassicMobileSectionHeading
        label="About Me"
        theme="light"
        subtitle="This level of progress is driven by custom training, structured programming, and accountability every step of the way."
      >
        Meet Your Coach
      </ClassicMobileSectionHeading>

      <div className="mt-9 flex flex-col gap-3.5 px-5">
        {/* Portrait */}
        <ClassicMobileReveal>
          <div
            className="h-[440px] w-full rounded-3xl bg-cover bg-top"
            style={{ backgroundImage: "url(/images/classic/Meet-coach.jpg)" }}
            role="img"
            aria-label="Coach P, personal trainer"
          />
        </ClassicMobileReveal>

        {/* Bio card */}
        <ClassicMobileReveal delay={60}>
          <div className="rounded-3xl bg-white p-6">
            <h3 className="text-[1.9rem] font-semibold leading-tight tracking-tight">Coach P</h3>
            <p className="mt-4 text-[0.95rem] leading-[1.5] text-black/60">
              With over two decades in the game, I specialise in building real strength, improving conditioning, and
              developing athletic performance. My coaching is rooted in martial-arts discipline, technical precision,
              and measurable progression, with a clear focus on results that last rather than quick fixes.
            </p>
            <p className="mt-4 text-[0.95rem] leading-[1.5] text-black/60">
              I prioritise strong fundamentals, progressive overload, and purposeful conditioning to build resilient,
              capable athletes. I hold a high standard for the work I deliver, ensuring every programme is intentional,
              progressive, and built around continuous improvement.
            </p>
            <div className="mt-7">
              <ClassicMobileButton href="#contact">Get in Touch</ClassicMobileButton>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <span className="text-[0.85rem] text-black/50">Follow me:</span>
              <a
                href={CLASSIC_BRAND.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Coach P on Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-black/[0.05] text-black/70"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>
          </div>
        </ClassicMobileReveal>

        {/* Credential cards */}
        {ABOUT_CREDENTIALS.map((c, i) => {
          const Icon = CRED_ICON[c.icon];
          return (
            <ClassicMobileReveal key={c.title} delay={60 + i * 60}>
              <div className="flex min-h-[150px] flex-col justify-between rounded-3xl bg-white p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black/[0.04]">
                  <Icon className="h-5 w-5 text-black/80" strokeWidth={1.8} />
                </span>
                <div className="mt-6">
                  <h3 className="text-[1.15rem] font-semibold">{c.title}</h3>
                  <p className="mt-1 text-[0.9rem] text-black/50">{c.subtitle}</p>
                </div>
              </div>
            </ClassicMobileReveal>
          );
        })}

        {/* Gym / private-coaching card — the last content in the held viewport */}
        <ClassicMobileReveal delay={120}>
          <div className="relative h-[210px] overflow-hidden rounded-3xl">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url(/images/classic/gym-location.jpg)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40" />
            <div className="relative flex h-full flex-col justify-between p-5">
              <div className="flex items-start justify-between">
                <span className="rounded-full bg-black/60 px-3 py-1 text-[0.74rem] font-medium text-white backdrop-blur-sm">
                  Train in-person
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <div className="text-white">
                <h3 className="text-[1.3rem] font-semibold leading-tight">Private Coaching</h3>
                <p className="text-[0.85rem] text-white/70">Performance Training</p>
              </div>
            </div>
          </div>
        </ClassicMobileReveal>
      </div>
    </section>
  );
}
