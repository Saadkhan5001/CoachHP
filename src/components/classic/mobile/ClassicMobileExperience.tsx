"use client";

import { ClassicMobileHeader } from "./ClassicMobileHeader";
import { ClassicMobileStackScene } from "./ClassicMobileStackScene";
import { MobileHero } from "./sections/MobileHero";
import { MobileAbout } from "./sections/MobileAbout";
import { MobileServices } from "./sections/MobileServices";
import { MobileProcess } from "./sections/MobileProcess";
import { MobileTransformations } from "./sections/MobileTransformations";
import { MobileReviews } from "./sections/MobileReviews";
import { MobilePricing } from "./sections/MobilePricing";
import { MobileFaq } from "./sections/MobileFaq";
import { MobileFinalCta } from "./sections/MobileFinalCta";

/**
 * Approved mobile /classic experience — phone-validated against the actual
 * reference template's mobile recording. Mounted ONLY on mobile /
 * coarse-pointer devices by ClassicResponsiveShell.
 *
 * No Lenis, no GSAP, no scroll-linked JavaScript anywhere in this tree:
 * the section stacking (About→Services, Pricing→FAQ) is browser-native
 * CSS sticky via ClassicMobileStackScene, and reveals are one-shot
 * IntersectionObserver fades.
 *
 * Page flow mirrors the reference's mobile DOM:
 *   Hero (plain flow)
 *   ┌ stack scene 1: About (held) → dark panel [Services…Reviews] (riser)
 *   ┌ stack scene 2: Pricing (held) → FAQ (riser)
 *   Final CTA + footer (plain flow)
 */
export function ClassicMobileExperience() {
  return (
    <div className="classic-mobile">
      <ClassicMobileHeader />
      <main className="relative">
        <MobileHero />

        <ClassicMobileStackScene
          id="about-services-scene"
          held={<MobileAbout />}
          riser={
            <div id="services-panel" data-nav-theme="dark" className="cm-panel-top relative bg-[#0f0f0f] pb-2">
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
