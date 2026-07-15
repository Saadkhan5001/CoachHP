import type { Metadata } from "next";
import "./mobile-v2.css";
import { ClassicMobileHeader } from "@/components/classic-mobile-v2/ClassicMobileHeader";
import { ClassicMobileStackScene } from "@/components/classic-mobile-v2/ClassicMobileStackScene";
import { MobileHero } from "@/components/classic-mobile-v2/sections/MobileHero";
import { MobileAbout } from "@/components/classic-mobile-v2/sections/MobileAbout";
import { MobileServices } from "@/components/classic-mobile-v2/sections/MobileServices";
import { MobileProcess } from "@/components/classic-mobile-v2/sections/MobileProcess";
import { MobileTransformations } from "@/components/classic-mobile-v2/sections/MobileTransformations";
import { MobileReviews } from "@/components/classic-mobile-v2/sections/MobileReviews";
import { MobilePricing } from "@/components/classic-mobile-v2/sections/MobilePricing";
import { MobileFaq } from "@/components/classic-mobile-v2/sections/MobileFaq";
import { MobileFinalCta } from "@/components/classic-mobile-v2/sections/MobileFinalCta";

export const metadata: Metadata = {
  title: "Coach P — Personal Training (Mobile Preview)",
  description: "Mobile experience laboratory for the Coach P classic landing page.",
  robots: { index: false, follow: false },
};

/**
 * /classic-mobile-v2 — isolated mobile laboratory route.
 *
 * Built from scratch against the physical-phone recording of the reference
 * template (see CLASSIC_MOBILE_V2_REFERENCE.md). Completely independent of
 * the current /classic mobile implementation: no Motion.tsx, no Lenis, no
 * GSAP, no data-rise, none of the previous mobile stack experiments.
 *
 * Page flow mirrors the reference's mobile DOM:
 *   Hero (plain flow)
 *   ┌ stack scene 1: About (held) → dark panel [Services…Reviews] (riser)
 *   ┌ stack scene 2: Pricing (held) → FAQ (riser)
 *   Final CTA + footer (plain flow)
 */
export default function ClassicMobileV2Page() {
  return (
    <div className="classic-mobile-v2">
      <ClassicMobileHeader />
      <main className="relative">
        <MobileHero />

        <ClassicMobileStackScene
          id="about-services-scene"
          held={<MobileAbout />}
          riser={
            <div id="services-panel" data-nav-theme="dark" className="v2-panel-top relative bg-[#0f0f0f] pb-2">
              <MobileServices />
              <MobileProcess />
              <MobileTransformations />
              <MobileReviews />
            </div>
          }
        />

        <ClassicMobileStackScene id="pricing-faq-scene" held={<MobilePricing />} riser={<MobileFaq />} />

        <MobileFinalCta />
      </main>
    </div>
  );
}
