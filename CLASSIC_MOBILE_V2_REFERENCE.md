# `/classic-mobile-v2` — Mobile Reference Audit

**Primary source of truth:** the physical-phone screen recording of the actual Curtis template supplied by the user
(`WhatsApp Video 2026-07-15 at 11.23.46 PM.mp4`, 69.3s, 576×1280, ~24fps), analyzed via ffmpeg frame extraction:
1fps overview of the full recording + 10fps dense extraction around both stack transitions
(frames in `_mobile_v2_ref/video_frames/`).
Supporting: the live site https://curtis.framer.media/ (Playwright, Chromium + WebKit mobile emulation) and the
`data-framer-name` DOM audit performed earlier — re-verified against the recording; where they disagreed, the
recording won.

## 1. The stack-transition mechanism (decisive finding)

The dense frame sheets show, for **About → Services** (≈14–20s) and **Pricing → FAQ** (≈57–62s):

1. The outgoing section scrolls **completely normally** — every card, CTA, and feature passes through the viewport.
2. The instant the section's **bottom edge reaches the viewport bottom** (i.e., its final viewport is exactly on
   screen), the section **freezes in place — the real content, not a substitute**. For About that final viewport is:
   "Follow me" socials → credential cards → gym-location card. For Pricing it is: the In-Person ($1,499-class)
   card with its feature list over the dark background image.
3. The incoming panel (dark Services / white FAQ) rises from the viewport bottom with rounded top corners and
   travels a **full viewport** over the frozen content, directly following the finger.
4. Reverse scrolling replays the sequence exactly backwards.
5. The header pill never moves or resizes.

This matches the live-DOM audit exactly: the reference makes the **real outgoing section** `position: sticky` with a
**negative `top` equal to `-(sectionHeight − viewportHeight)`** (measured: `-1000px` on About, `-650px` on Pricing at
390×844) inside a wrapper that also contains the incoming section (higher z-index). The negative top is the key:
sticky cannot engage until the section's *bottom* hits the viewport bottom, so all content is seen first, and the
frozen surface is the true final viewport — perfect visual continuity with zero duplicated content.

**v2 implementation:** identical structure. The only JS is a `ResizeObserver` that writes the outgoing section's
measured height to a CSS custom property (`--held-h`) when *layout* changes (mount, image load, orientation) — never
on scroll. CSS derives the offset natively: `top: min(0px, calc(100svh - var(--held-h)))`, so viewport resolution
(including address-bar behavior, via `svh`) stays entirely inside the CSS engine. Zero scroll-linked JavaScript.

## 2. Transitions that do NOT hold (confirmed in recording)

- **Hero → About:** plain flow. The white About panel's rounded edge is already peeking below the ~75%-height hero
  and simply scrolls up; hero content moves normally the whole time.
- **FAQ → Final CTA:** plain flow. FAQ items keep moving up as the dark CTA panel enters from below.

## 3. Mobile section composition (from recording, in order)

| Section | Mobile layout observed |
|---|---|
| **Header** | Fixed glass pill, full-width minus margins, constant size, logo left + hamburger circle right. Never shrinks/moves. |
| **Hero** | ≈75% viewport height image (subject right, text left-aligned); pill label, 3-line heading, paragraph, CTA, then **two glass stat cards side-by-side**; white rounded About edge peeks below. |
| **About** | Light panel: heading block → **portrait** → **bio card** (name, paragraphs, Get-in-Touch CTA, "Follow me" socials) → **credential cards** → **gym-location card** *(portrait/bio come first on mobile — different from desktop's columns)*. |
| **Services** | Dark panel: heading → full-width stacked cards: Build Real Strength (tall image, dominant) → Elite Conditioning (image, text overlaid at bottom) → Injury Prevention (plain dark card, icon centered) → Expert Nutrition (image card, icon centered). |
| **Process** | Heading → image stat card (two glass count-up stats) → steps 01–05 as full-width cards (large ghost number, title, body) → promo card ("It's Method." + CTA). |
| **Client Stories** | Heading → one-card carousel: **Before/After images side-by-side (2-up) on top, quote below, name + meta at bottom**; pagination dots; swipe. |
| **Reviews** | Heading → one-card carousel: quote icon, review text, avatar + name + role; dots; swipe. |
| **Pricing** | Dark bg image + overlay behind everything; heading → **Online Training card (white, full-width)** → **In-Person Training card (black, "Most Effective" badge, full-width)**; every feature row visible; cards reveal (fade/rise) as they enter. |
| **FAQ** | White panel: heading → full-width accordion rows (first item open by default). |
| **Final CTA** | Dark image panel: heading, paragraph, CTA; footer below: socials row, **nav links stacked vertically**, credit line. |

## 4. Reveals (from recording)

Interior content (cards, headings) fades in and rises ~20px as it enters the viewport; one-time; no bounce; no
scroll-linked progress. Stat numbers count up once when visible (one frame caught 88+/11% mid-count).

## 5. Viewports verified on the live site (supporting)

390×844, 393×852, 412×915, 430×932, 768×1024, 844×390 landscape — zero horizontal overflow at all of them; hero uses
stepped fixed heights per breakpoint (~75% portrait, 100% landscape-height-capped); the sticky-hold pattern is present
at every portrait size and the tablet size.

## 6. Physical-device status

A genuine physical-phone recording of the **reference** exists and was used as the primary motion source (above).
No physical-device recording of the **v2 implementation** exists yet — emulation results must not be treated as
physical-device equivalence. The user's physical-phone review of `/classic-mobile-v2` is a mandatory approval gate
before any integration into `/classic`.
