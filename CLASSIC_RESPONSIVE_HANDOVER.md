# `/classic` — Responsive Architecture Handover

**Route:** `/classic` (noindex/nofollow). Two fully separate, individually approved experiences; exactly one mounts per device.

## Architecture

```
src/app/classic/
  page.tsx        server component: metadata + renders ClassicResponsiveShell
  classic.css     desktop tokens/typography, scoped under .classic-site
  mobile.css      mobile tokens/stacking/reveals, scoped under .classic-mobile

src/components/classic/
  ClassicResponsiveShell.tsx      the device switch (client)
  desktop/                        approved desktop experience
    ClassicDesktopExperience.tsx  composition (Motion + Header + sections)
    Header/Logo/PillLabel/PrimaryButton/SectionHeading/StatCard/Socials
    sections/ (Hero…FinalCta)
  mobile/                         approved, phone-validated mobile experience
    ClassicMobileExperience.tsx   composition (header + stack scenes + sections)
    ClassicMobileHeader/Button/SectionHeading/Reveal/StackScene
    sections/ (MobileHero…MobileFinalCta)

Shared: src/lib/classic-data.ts (all copy/data), src/components/{Reveal,CountUp}.tsx
        (desktop uses both; mobile uses CountUp + its own ClassicMobileReveal),
        public/images/classic/* + public/images/CoachP-logo.png (both experiences).
```

## Responsive switch (`ClassicResponsiveShell`)

- **Boundary:** `(max-width: 768px), (pointer: coarse)` → mobile; otherwise desktop.
  This is deliberately the exact complement of `Motion.tsx`'s desktop query
  `(min-width: 769px) and (pointer: fine)` — never change one without the other.
- `useSyncExternalStore` over `matchMedia` — reacts only to real media-query changes
  (rotation / crossing the boundary), no resize listeners, no per-resize renders.
- Server + hydration render a dark `100svh` boot surface (matches both heroes → no
  white flash, no wrong-experience flash, no hydration mismatch, no duplicate
  accessible content). The correct experience mounts immediately after hydration.
- Each experience is a `next/dynamic` chunk: **mobile never downloads GSAP/Lenis;
  desktop never downloads the mobile stack code.** Only one tree is ever in the DOM,
  so there are no duplicate IDs/landmarks/carousels/image downloads by construction.

## Why mobile has no GSAP/Lenis

On touch devices native scroll runs on the compositor thread; any main-thread,
scroll-linked transform (GSAP pin or scrub, Lenis, rAF counter-translation)
desyncs by 1–2 frames and reads as vibration. This was reproduced repeatedly on
real hardware before the current architecture. Mobile therefore uses **zero
scroll-linked JavaScript**.

## Mobile stacking technique (approved — do not "simplify")

`ClassicMobileStackScene` implements the reference template's own mechanism:

- The **real outgoing section** (About / Pricing) is `position: sticky` with
  `top: min(0px, calc(100svh - var(--held-h)))` — a negative top equal to
  `-(sectionHeight − viewportHeight)`. Sticky physically cannot engage until the
  section's **bottom** reaches the viewport bottom, so every card/CTA (including
  the full $1,499 pricing card) is seen before the hold, and the frozen surface
  is the true final viewport (no replicas, no duplicated content).
- The incoming panel (Services panel / FAQ) is the next sibling with higher
  z-index and rises a full viewport over the frozen section in plain flow.
- `--held-h` is written by a **ResizeObserver** only when layout changes (mount,
  image load, orientation) — never on scroll. `svh` resolution stays inside the
  CSS engine, so address-bar movement can't cause jumps. Without JS the fallback
  keeps sticky disengaged → plain flow, all content readable. Reduced motion
  disables the hold entirely.

**Sticky ancestor restriction (critical):** the scene wrapper (`.cm-stack`) and
its two children (`.cm-stack-held`, `.cm-stack-riser`) must NEVER gain
`overflow` (hidden/clip/auto/scroll), `transform`, `filter`, `perspective` or
`contain` — any of those silently defeats sticky while `getComputedStyle`
still reports `position: sticky`. This exact failure shipped once; the QA
script now measures real rendered geometry instead of trusting computed styles.

## Mobile reveals

`ClassicMobileReveal`: one-shot IntersectionObserver, opacity + 22px rise,
~600ms. Hidden state lives behind `@media (scripting: enabled)` (no-JS visitors
see content immediately); reduced-motion shows instantly. Reveals wrap interior
content only — never the stack wrappers (a transformed ancestor breaks sticky).

## Desktop (unchanged, approved)

Lenis smooth scroll + GSAP counter-translate panel transitions via the shared
`Motion.tsx` (`[data-rise]` panels animate their `previousElementSibling`; keep
sibling order in `ClassicDesktopExperience` intact). Header shrink + section
theme switching in `desktop/Header.tsx`.

## Testing locally

```bash
npm run typecheck
npm run build
npx next start -H 0.0.0.0 -p 4100      # bind to LAN for phone testing
# phone on same Wi-Fi: http://<machine-LAN-IP>:4100/classic

BASE=http://127.0.0.1:4100 node scripts/classic-responsive-qa.mjs
BASE=http://127.0.0.1:4100 node scripts/classic-mobile-stack-qa.mjs
```

- `classic-responsive-qa.mjs` — routes 200 / overflow / console at desktop
  widths, one-tree-mounted assertions both sides, GSAP-alive check on desktop.
- `classic-mobile-stack-qa.mjs` — Chromium + WebKit mobile: viewport sweep,
  content reachability (incl. $1,499 card), real frozen-hold + full-viewport
  riser-travel geometry both scroll directions, FAQ/menu/carousel interactions,
  no-Lenis/no-GSAP assertions, duplicate-ID check.
- `shots.mjs` — general section screenshot utility (`?nomotion` supported).

## Files that should not be casually changed

- `ClassicMobileStackScene.tsx` + the `.cm-stack*` rules in `mobile.css`
  (stacking geometry; see ancestor restriction above)
- `ClassicResponsiveShell.tsx` (device boundary ↔ Motion.tsx coupling)
- `Motion.tsx` (shared with nothing else on this route, but its desktop query
  must stay the complement of the shell's mobile query)
- Sibling order inside `ClassicDesktopExperience.tsx` (GSAP targeting)
