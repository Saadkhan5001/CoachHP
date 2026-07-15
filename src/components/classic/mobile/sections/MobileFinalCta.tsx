import { ClassicMobileButton } from "../ClassicMobileButton";
import { ClassicMobileReveal } from "../ClassicMobileReveal";
import { FOOTER_LINKS, CLASSIC_BRAND } from "@/lib/classic-data";

/**
 * Mobile Final CTA + footer, per the reference recording: dark image
 * panel with heading, paragraph and CTA; footer below with socials row,
 * nav links stacked vertically, then the credit line. Plain-flow entrance
 * (no stack scene at this boundary — confirmed from the recording).
 */
export function MobileFinalCta() {
  return (
    <section id="contact" data-nav-theme="dark" className="cm-panel-top relative flex flex-col overflow-hidden bg-[#0f0f0f]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/classic/cta-bg.jpg)" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent" aria-hidden="true" />

      <div className="relative flex flex-col items-center px-5 pt-24 text-center" style={{ minHeight: "62svh" }}>
        <ClassicMobileReveal>
          <h2 className="cm-h-section text-white">
            Ready To Achieve <span className="cm-accent-text">Your Goals?</span>
          </h2>
        </ClassicMobileReveal>
        <ClassicMobileReveal delay={70}>
          <p className="mt-4 max-w-[36ch] text-[0.95rem] leading-relaxed text-white/70">
            Built through structured training and consistent work. Proven by measurable progress and real client
            results.
          </p>
        </ClassicMobileReveal>
        <ClassicMobileReveal delay={140}>
          <div className="mt-6">
            <ClassicMobileButton href="#top">Start Your Journey</ClassicMobileButton>
          </div>
        </ClassicMobileReveal>
      </div>

      {/* Footer */}
      <footer className="relative px-5 pb-6 pt-14" style={{ paddingBottom: "calc(24px + var(--cm-safe-bottom))" }}>
        <div className="flex justify-center">
          <a
            href={CLASSIC_BRAND.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Coach P on Instagram"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white/80"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
            </svg>
          </a>
        </div>
        <div className="mx-auto mt-6 h-px max-w-sm bg-white/10" />
        <nav aria-label="Footer navigation" className="mt-6">
          <ul className="flex flex-col items-center gap-1">
            {FOOTER_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="block px-4 py-2 text-[0.95rem] text-white/70 active:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="mt-6 text-center text-[0.85rem] text-white/45">Coach P — Personal Training</p>
      </footer>
    </section>
  );
}
