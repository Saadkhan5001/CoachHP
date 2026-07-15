"use client";

import { Header } from "./Header";
import { Motion } from "@/components/Motion";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Services } from "./sections/Services";
import { Process } from "./sections/Process";
import { Transformations } from "./sections/Transformations";
import { Reviews } from "./sections/Reviews";
import { Pricing } from "./sections/Pricing";
import { Faq } from "./sections/Faq";
import { FinalCta } from "./sections/FinalCta";

/**
 * Approved desktop /classic experience: Lenis smooth scroll + GSAP
 * counter-translate panel transitions via the shared Motion component.
 * Mounted ONLY on fine-pointer/desktop devices by ClassicResponsiveShell —
 * the mobile experience (ClassicMobileExperience) is a fully separate tree
 * with its own CSS-sticky stacking and no GSAP/Lenis.
 *
 * `[data-rise]` panels are transitioned by Motion.tsx against their
 * `previousElementSibling` (About→services-panel, Pricing→Faq) — keep the
 * sibling order below intact when editing.
 */
export function ClassicDesktopExperience() {
  return (
    <div className="classic-site">
      <Motion />
      <Header />
      <main className="relative">
        <Hero />
        <About />

        {/* Dark block — rises over the light About panel */}
        <section
          id="services-panel"
          data-nav-theme="dark"
          data-rise
          className="panel-reveal rounded-panel-top relative z-[3] bg-dark-bg pb-4"
        >
          <Services />
          <Process />
          <Transformations />
          <Reviews />
        </section>

        {/* Pricing — held while FAQ rises over it */}
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
    </div>
  );
}
