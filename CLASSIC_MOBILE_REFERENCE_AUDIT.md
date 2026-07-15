# `/classic` Mobile Reference Audit

**Reference:** https://curtis.framer.media/ (the live "Curtis" Framer template — the same template `/classic` recreates)
**Method:** Playwright (Chromium, mobile device emulation: `isMobile`, `hasTouch`, mobile Safari UA, DPR 2–3), `data-framer-name` DOM inspection (Framer preserves original layer names as `data-framer-name` attributes, which made it possible to identify structural elements precisely instead of guessing from hashed class names), computed-style sampling at multiple scroll offsets, and screenshot capture at scroll checkpoints.
**Viewports inspected:** 390×844, 393×852, 412×915, 430×932, 768×1024 (portrait), 844×390 (landscape).
**Date:** 2026-07-15.

This document records what was **observed**, not what was inferred from the desktop implementation. Where the underlying Framer CSS uses generated/obfuscated values, this audit calls that out explicitly rather than treating it as a spec to copy verbatim (per the task's explicit instruction not to blindly reproduce generated Framer code).

---

## 1. Overall structure (390×844)

Using `data-framer-name`, the reference's mobile DOM resolves to these top-level landmarks, in order, with pixel offsets at 390×844:

| Layer | Tag | top | bottom | height | Notes |
|---|---|---|---|---|---|
| Hero | `<header>` | 0 | 630 | 630 | **NOT full-screen.** 630px on a 844px-tall viewport = 75% of viewport height. Fixed value, not `100vh`/`100svh`. |
| **About & Services** (wrapper) | `<section>` | 630 | 4226 | 3596 | A single wrapper `<section>` containing both About Me and Services as children. `z-index: 2`. |
| — About Me | `<section>` | 730 | 2459 | 1729 | **`position: sticky`**, `z-index: 1`. Child of the wrapper above. |
| — Services | `<section>` | 2459 | 4226 | 1767 | `position: relative`, `z-index: 2` (higher than About Me — paints over it). Immediately follows About Me in normal flow. |
| Process | `<section>` | 4226 | 6194 | 1967 | Plain, no sticky. |
| Client Stories | `<section>` | 6194 | 7269 | 1075 | Plain, no sticky. `overflow: clip` (carousel). |
| Reviews | `<section>` | 7269 | 8143 | 874 | Plain, no sticky. `overflow: clip` (carousel). |
| **Pricing & FAQ** (wrapper) | `<section>` | 8143 | 10791 | 2648 | Second sticky-pair wrapper. |
| — Pricing | `<section>` | 8143 | 9702 | 1559 | **`position: sticky`**, `z-index: 1`. |
| — FAQ | `<section>` | 9702 | 10791 | 1088 | `position: relative`, `z-index: 4`. Immediately follows Pricing. |
| Mobile Footer | `<footer>` | 10791 | 11455 | 664 | Plain, no sticky. |
| Footer | `<footer>` | 11455 | 11766 | 311 | Plain, no sticky. |

**Key finding: only 2 of the 4 desktop transition boundaries get a "hold" effect on mobile** — About→Services and Pricing→FAQ. Hero→About and FAQ→Footer/Final-CTA are **plain normal document flow** with a rounded top corner on the incoming panel; the outgoing section is not held in place, it just scrolls away at 1× while the incoming panel's rounded top edge becomes visible. This was confirmed visually (screenshots at scroll 400 and 10791 below).

## 2. The sticky-handoff technique (About→Services, confirmed visually)

Screenshot at scrollY=730 (About Me fully visible, just reached sticky point) and scrollY=2300 (mid-handoff) confirm the mechanism:

- At scrollY=2300, the **bottom of the white About Me card** (its "Get in Touch" button and "Follow me:" socials) is still fully visible, pinned near the top of the viewport, directly under the translucent fixed header (text is visible faintly *through* the header's frosted-glass background — the header does not fully occlude sticky content passing behind it).
- Below it, the **black Services panel** has risen up from the bottom, its rounded top-left/top-right corners forming a clean seam, showing its own "Services" pill label.
- This is a textbook CSS `position: sticky` handoff: About Me is the first child of the "About & Services" wrapper and sticks (its own computed `position: sticky`); Services is the second child, flowing normally, with a higher `z-index` so its rounded top edge paints over the (visually stationary) About Me card as normal scrolling carries it upward.
- **No JavaScript is involved.** This is pure browser-compositor behavior — it is structurally impossible for this technique to desync between the compositor and main thread, because there is no main-thread scroll handler at all.

The exact computed `top` offset used by the sticky element (`top: -1000px` on About Me, `top: -650px` on Pricing) is a **Framer-generated implementation artifact**, not a meaningful value to copy. A negative `top` on a sticky element makes it stick at a point *above* the viewport, which means only the tail end of the element's own box (its own height minus the offset) stays visible while it's "stuck" — Framer is using this to fine-tune exactly how much of the tall About Me content (1729px, taller than the 844px viewport) remains visible during the hold, tuned to this specific compiled content height. This is not something to reproduce numerically; the **structural pattern** (sticky first child + normal-flow second child, both inside a shared wrapper whose height defines the hold duration) is the thing to reproduce.

## 3. The Pricing→FAQ handoff (confirmed visually, slightly different in feel)

Screenshot at scrollY=9200 shows a three-layer moment:
1. **Top of viewport:** the bottom of the white pricing card (rounded bottom corners, last feature row) held in place directly under the header.
2. **Middle:** the Pricing section's own dark background image (gym door detail), visible as plain space between the stuck card and the incoming panel — this is simply the remainder of the (taller-than-viewport) sticky Pricing section becoming visible as its "window" scrolls, not a separate hold.
3. **Bottom:** the white FAQ panel rising from the bottom edge with a rounded top corner and its own "FAQ" pill label.

Structurally this is the **same sticky-first-child / normal-flow-second-child pattern** as About→Services; the pricing card simply sits near the top of the (taller) sticky Pricing section, so more of the section's own background is revealed during the hold before FAQ arrives.

## 4. Hero→About (confirmed: no hold, matches current `/classic` mobile behavior already)

Screenshot at scrollY=400: Hero's stat cards and CTA are still visible and moving normally (not held — they've scrolled up along with the rest of Hero), while the white About panel's rounded top corner is already rising into view from below, with the "About Me" pill label visible. This is plain normal-flow stacking with a rounded top corner — **exactly what `/classic`'s mobile already does today** (zero scroll-linked JS, CSS `.rounded-panel-top` + normal flow). No change needed at this boundary.

## 5. FAQ→Final CTA (confirmed: no hold)

Screenshot at scrollY=10791 (start of the Mobile Footer/final-CTA background) shows the CTA background image already filling the full viewport with no white/light card lingering above it — confirms plain flow, no sticky, matching current `/classic` mobile behavior. No change needed at this boundary.

## 6. Header

- The nav (`<nav data-framer-name="Mobile">`) lives inside a `position: fixed` wrapper, pinned to the top of the viewport across the whole scroll, `z-index: 10`. This matches `/classic`'s existing fixed header.
- No evidence of the header changing size/shrinking during scroll on mobile (unlike desktop) — the mobile header holds a stable size. This matches `/classic`'s existing `isMobile` guard in `Header.tsx`, which already forces `p = 0` (no shrink) on coarse-pointer/narrow devices.

## 7. Hero sizing across viewports

| Viewport | Hero height | Viewport height | Ratio |
|---|---|---|---|
| 390×844 | 630px | 844px | 0.75 |
| 393×852 | 630px | 852px | 0.74 |
| 412×915 | 630px | 915px | 0.69 |
| 430×932 | 581px | 932px | 0.62 |
| 768×1024 | 560px | 1024px | 0.55 |
| 844×390 (landscape) | 390px | 390px | 1.00 |

Hero height is a **fixed pixel value per Framer breakpoint**, not a fluid `vh` calculation — it stays flat at 630px through several widths, then steps down at ~428px and again at the tablet breakpoint. In landscape it caps to exactly fill the (short) viewport height. `/classic` currently uses `100svh` for its hero, which is fluid and reasonably close in spirit (stable against address-bar resize, doesn't jump) — full pixel-for-pixel replication of Framer's stepped breakpoint values was judged not worth the added complexity/fragility versus a stable `min-height` approach; see the Hero section of the implementation for the actual values chosen.

## 8. Carousels (Client Stories, Reviews)

Both use `overflow: clip` on their section root (functionally same as `overflow: hidden` for this purpose) — single active card per view, no visible side-peek at 390–430px widths, consistent with `/classic`'s already-simplified (post-fix) Transformations carousel and its existing Reviews carousel mobile behavior.

## 9. Horizontal overflow

Zero horizontal overflow (`scrollWidth === clientWidth`) confirmed at all 6 required viewports on the reference.

## 10. What this means for `/classic`

`/classic`'s mobile already does the right thing at 2 of the 4 transition boundaries (Hero→About, FAQ→FinalCta: plain flow + rounded corner). The gap is specifically the **missing "hold" effect** at the other 2 boundaries (About→Services, Pricing→FAQ), which the reference achieves via a pure-CSS `position: sticky` handoff — no JavaScript, no scroll listener, no per-frame transform, and therefore structurally incapable of the compositor/main-thread desync that caused the original vibration bug. This is the technique implemented for this pass (see the final report for the concrete CSS/markup).
