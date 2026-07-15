import { PrimaryButton } from "../PrimaryButton";
import { Reveal } from "@/components/Reveal";
import { SocialIcons } from "../Socials";
import { FOOTER_LINKS } from "@/lib/classic-data";

export function FinalCta() {
  return (
    <section
      id="contact"
      data-nav-theme="dark"
      data-rise
      className="panel-reveal rounded-panel-top relative z-[5] flex min-h-[100svh] flex-col overflow-hidden bg-dark-bg"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/classic/cta-bg.jpg)" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
      <div
        className="absolute inset-x-0 bottom-0 h-2/3"
        style={{
          background:
            "linear-gradient(0deg, rgba(8,10,10,0.96) 0%, rgba(8,10,10,0) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Centered CTA */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-5 py-20 text-center sm:px-6 sm:py-0">
        <Reveal>
          <h2 className="h-section max-w-2xl text-white">
            Ready To Achieve <span className="text-[#c01d18]">Your Goals?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-5 max-w-md text-[1rem] leading-relaxed text-white/75">
            Built through structured training and consistent work. Proven by
            measurable progress and real client results.
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-8">
            <PrimaryButton size="lg" href="#top">
              Start Your Journey
            </PrimaryButton>
          </div>
        </Reveal>
      </div>

      {/* Footer overlay */}
      <footer className="relative border-t border-white/10 px-6 py-6 sm:px-10">
        <div className="mx-auto flex max-w-hero flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-x-5 sm:gap-y-3">
            <SocialIcons variant="footer" />
            <span className="hidden h-4 w-px bg-white/15 sm:block" />
            <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {FOOTER_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-[0.88rem] text-white/70 transition-colors hover:text-white"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="text-[0.82rem] font-medium text-white/70">
            Coach&nbsp;P — Personal Training
          </div>
        </div>
      </footer>
    </section>
  );
}
