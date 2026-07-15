"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

/**
 * The single device boundary for /classic. This is deliberately the exact
 * complement of Motion.tsx's desktop activation query
 * ("(min-width: 769px) and (pointer: fine)"), so the shell and the shared
 * desktop motion system can never disagree about which side a device is on.
 */
const MOBILE_QUERY = "(max-width: 768px), (pointer: coarse)";

/**
 * Route-level boot surface, shown only during hydration and while the
 * active experience's chunk loads. Matches the dark hero background of
 * both experiences (no white flash), holds a full viewport (no layout
 * collapse), and contains no headings, controls or landmarks (no
 * duplicate accessible content).
 */
function ClassicBootSurface() {
  return <div style={{ minHeight: "100svh", background: "#0f0f0f" }} aria-hidden="true" />;
}

// Each experience is its own chunk: mobile never downloads the desktop
// GSAP/Lenis code, desktop never downloads the mobile stack code.
const ClassicDesktopExperience = dynamic(
  () => import("./desktop/ClassicDesktopExperience").then((m) => m.ClassicDesktopExperience),
  { ssr: false, loading: () => <ClassicBootSurface /> }
);
const ClassicMobileExperience = dynamic(
  () => import("./mobile/ClassicMobileExperience").then((m) => m.ClassicMobileExperience),
  { ssr: false, loading: () => <ClassicBootSurface /> }
);

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(MOBILE_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}
function getSnapshot(): boolean {
  return window.matchMedia(MOBILE_QUERY).matches;
}
function getServerSnapshot(): boolean | null {
  return null;
}

/**
 * Responsive shell for /classic: mounts exactly ONE experience tree.
 *
 * - Server render + hydration render both produce the boot surface (the
 *   server snapshot is `null`), so there is no hydration mismatch and no
 *   flash of the wrong experience on either device class.
 * - Immediately after hydration, `useSyncExternalStore` reads the media
 *   query and the correct experience mounts. The store only notifies on
 *   real media-query changes (device rotation / window crossing the
 *   boundary) — there are no resize listeners and no per-resize renders.
 * - Because only one tree is ever in the DOM: no duplicate IDs, no
 *   duplicate landmarks, no double image downloads, no double carousel
 *   instances, and desktop Motion (GSAP/Lenis) simply never mounts on
 *   mobile — and vice versa for the mobile stack scenes.
 */
export function ClassicResponsiveShell() {
  const isMobile = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (isMobile === null) return <ClassicBootSurface />;
  return isMobile ? <ClassicMobileExperience /> : <ClassicDesktopExperience />;
}
