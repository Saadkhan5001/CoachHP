import type { Metadata } from "next";
import "./classic.css";
import "./mobile.css";
import { ClassicResponsiveShell } from "@/components/classic/ClassicResponsiveShell";

export const metadata: Metadata = {
  title: "Coach P — Personal Training",
  description:
    "A concept personal-training landing page for Coach P, featuring structured coaching, strength development and measurable progress.",
  robots: { index: false, follow: false },
};

/**
 * /classic — template-faithful Coach P landing page.
 *
 * Two fully separate, approved experiences, one mounted at a time by
 * ClassicResponsiveShell:
 *  - Desktop (fine pointer, >768px): src/components/classic/desktop/ —
 *    Lenis + GSAP counter-translate panel transitions (shared Motion.tsx).
 *  - Mobile / coarse pointer: src/components/classic/mobile/ — native
 *    scrolling, IntersectionObserver reveals, browser-native CSS-sticky
 *    section stacking. No GSAP, no Lenis.
 *
 * See CLASSIC_RESPONSIVE_HANDOVER.md for the architecture and QA guide.
 */
export default function ClassicPage() {
  return <ClassicResponsiveShell />;
}
