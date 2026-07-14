import { PrimaryButton } from "../PrimaryButton";
import { Reveal } from "../Reveal";
import { SocialIcons } from "../Socials";
import { FOOTER_LINKS, BRAND } from "@/lib/data";

export function FinalCta() {
  return (
    <section
      id="contact"
      data-nav-theme="dark"
      data-rise
      className="panel-reveal rounded-panel-top relative z-[5] flex min-h-[100svh] flex-col overflow-hidden bg-ink"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/coach-p/cta-bg.jpg)" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-ink/62" aria-hidden="true" />
      <div className="factory-grid absolute inset-0 opacity-30" aria-hidden="true" />
      <div
        className="absolute inset-x-0 bottom-0 h-2/3"
        style={{
          background: "linear-gradient(0deg, rgba(9,9,10,0.97) 0%, rgba(9,9,10,0) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Centered CTA */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-5 py-20 text-center sm:px-6 sm:py-0">
        <Reveal>
          <span className="stamp inline-flex items-center gap-2 text-white/70">
            <span aria-hidden className="h-1.5 w-1.5 bg-accent" />
            No Shortcuts. Just the Work.
          </span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="h-section display mt-6 max-w-3xl text-white">
            Ready to Put in <span className="text-accent">the Work?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-5 max-w-md text-[1rem] leading-relaxed text-white/75">
            Built through structured training and consistent effort. Proven by real
            work — not hype. Reach out and let&rsquo;s build your standard.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <PrimaryButton size="lg" variant="solid" href={BRAND.instagram}>
              Enter the Factory
            </PrimaryButton>
            <PrimaryButton size="lg" variant="outline" href="/academy" showArrow={false}>
              Explore the Academy
            </PrimaryButton>
          </div>
        </Reveal>
      </div>

      {/* Footer overlay */}
      <footer className="relative border-t border-white/10 px-6 py-7 sm:px-10">
        <div className="mx-auto flex max-w-hero flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-x-5">
            <SocialIcons variant="footer" />
            <span className="hidden h-4 w-px bg-white/15 sm:block" />
            <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {FOOTER_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-white/60 transition-colors hover:text-white"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex flex-col items-center gap-1 sm:items-end">
            <span className="text-[0.8rem] font-bold uppercase tracking-[0.06em] text-white/80">
              Coach&nbsp;P Factory
            </span>
            <span className="stamp text-white/30">Concept presentation · {BRAND.instagramHandle}</span>
          </div>
        </div>
      </footer>
    </section>
  );
}
