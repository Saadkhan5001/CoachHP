# `/classic-mobile-v2` — Build Notes

**Date:** 2026-07-15 · **Branch:** `main` · **Baseline build:** clean (all 4 routes prerender; `/` 173 kB, `/academy` 162 kB, `/classic` 172 kB First Load JS).

## Why a from-scratch mobile lab route

The `/classic` mobile experience went through four transition architectures:

1. **v1 — sticky on the whole outgoing section (`top: 0`).** Froze the *first* viewport of tall sections; the $1,499 Pricing card was unreachable. Content bug.
2. **v2 — content-first tail (padding-bottom + matching negative margin).** Content fully accessible, but no visible hold at all — the "pin" was gone.
3. **v3 — pinned terminal-visual stage nested inside the outgoing section.** `overflow: hidden` on `#pricing` silently defeated the sticky behavior (measured: pin's rect.top moved 1:1 with scrollY while computed `position` still said `sticky`).
4. **v4 — stage as page-level sibling, real incoming section nested inside it, decorative terminal views.** Passed geometry QA in both engines, but the *simplified terminal views* do not visually continue the real section, and the physical-phone recording shows the reference holds the **real final content**, not a replica.

The user supplied a physical-phone recording of the actual Curtis template (`WhatsApp Video 2026-07-15 at 11.23.46 PM.mp4`, 69s, 576×1280). Frame extraction (1fps overview + 10fps around both transitions) is the **primary motion source of truth** — see `CLASSIC_MOBILE_V2_REFERENCE.md`. It shows the reference pins the *real* outgoing section at its *final* viewport. Combined with the earlier live-DOM audit (About sticky `top:-1000px`, Pricing sticky `top:-650px` — exactly `-(sectionHeight − viewportHeight)`), the correct architecture is now unambiguous.

## Old mobile files deliberately NOT reused by the v2 route

- `src/components/classic/ClassicMobileTransitionStage.tsx`
- `src/components/classic/ClassicAboutTerminalView.tsx`
- `src/components/classic/ClassicPricingTerminalView.tsx`
- `src/components/classic/ClassicStackDebugOverlay.tsx`
- `src/components/Motion.tsx` (desktop Lenis/GSAP — not imported at all)
- `src/components/Reveal.tsx` (replaced by a new v2-scoped reveal)
- All `.classic-mobile-transition-*` / historical `.classic-stack` CSS in `classic.css`
- `data-rise` behavior (not used on the v2 route)

These files stay in place untouched (they still power the current `/classic` mobile rendering) until the user approves v2 and an integration pass replaces them.

## Reused safely

- `src/lib/classic-data.ts` — all copy/data (nav, hero stats, about, services, process, transformations, reviews, pricing, FAQs, footer).
- `public/images/classic/*` + `public/images/CoachP-logo.png` — same image assets, no duplicates added.
- `src/components/CountUp.tsx` — shared IO-driven one-shot count-up (no transforms on ancestors, no scroll linkage).
- `embla-carousel-react` + autoplay (existing deps), configured specifically for one-card mobile views.

## New route/tree (all additive)

- `src/app/classic-mobile-v2/page.tsx` (+ `mobile-v2.css`, all styles scoped under `.classic-mobile-v2`)
- `src/components/classic-mobile-v2/` — header, menu, button, section heading, reveal, stack scene, and `sections/` (9 section components)

Route metadata: `robots: noindex, nofollow`; no navigation links to it anywhere.

## Baseline captures

Baseline screenshots of `/`, `/academy`, `/classic` (desktop + mobile) captured during the QA pass (`_mobile_v2_ref/baseline/`); `git status` before work showed only the previously-reported `/classic` mobile files as modified — no shared or root-route files.
