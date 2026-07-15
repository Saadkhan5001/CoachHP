import type { Metadata } from "next";
import "./classic.css";
import { Header } from "@/components/classic/Header";
import { Motion } from "@/components/Motion";
import { Hero } from "@/components/classic/sections/Hero";
import { About } from "@/components/classic/sections/About";
import { Services } from "@/components/classic/sections/Services";
import { Process } from "@/components/classic/sections/Process";
import { Transformations } from "@/components/classic/sections/Transformations";
import { Reviews } from "@/components/classic/sections/Reviews";
import { Pricing } from "@/components/classic/sections/Pricing";
import { Faq } from "@/components/classic/sections/Faq";
import { FinalCta } from "@/components/classic/sections/FinalCta";
import { ClassicMobileTransitionStage } from "@/components/classic/ClassicMobileTransitionStage";
import { ClassicAboutTerminalView } from "@/components/classic/ClassicAboutTerminalView";
import { ClassicPricingTerminalView } from "@/components/classic/ClassicPricingTerminalView";
import { ClassicStackDebugOverlay } from "@/components/classic/ClassicStackDebugOverlay";

export const metadata: Metadata = {
  title: "Coach P — Personal Training",
  description:
    "A concept personal-training landing page for Coach P, featuring structured coaching, strength development and measurable progress.",
  robots: { index: false, follow: false },
};

export default function ClassicPage() {
  return (
    <div className="classic-site">
      <Motion />
      <Header />
      <ClassicStackDebugOverlay />
      <main className="relative">
        <Hero />
        <About />

        {/*
          Mobile-only pinned "final frame" of About, with the REAL Services
          panel nested alongside it inside the same unclipped stage — see
          ClassicMobileTransitionStage for why (in short: nesting the pin
          inside a section with `overflow: hidden` silently breaks
          `position: sticky`, confirmed by direct measurement; this stage
          lives at the page level instead, never inside a clipped section).
          `data-rise` moved from `#services-panel` onto the stage wrapper —
          the wrapper's rendered box matches `#services-panel`'s box on
          desktop (the pin is `display: none` there), so Motion.tsx's
          `incoming.previousElementSibling` targeting (→ `#about`) and
          ScrollTrigger geometry are unaffected.
        */}
        <ClassicMobileTransitionStage id="about-services-transition" outgoingVisual={<ClassicAboutTerminalView />}>
          <section
            id="services-panel"
            data-nav-theme="dark"
            className="panel-reveal rounded-panel-top relative z-[3] bg-dark-bg pb-4"
          >
            <Services />
            <Process />
            <Transformations />
            <Reviews />
          </section>
        </ClassicMobileTransitionStage>

        <Pricing />

        <ClassicMobileTransitionStage id="pricing-faq-transition" outgoingVisual={<ClassicPricingTerminalView />}>
          <Faq />
        </ClassicMobileTransitionStage>

        <FinalCta />
      </main>
    </div>
  );
}
