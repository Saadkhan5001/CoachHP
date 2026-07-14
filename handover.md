# Handover

> **⚠️ REBRANDED — read this first.** The codebase was originally built as a recreation of the "Curtis – Personal Trainer" Framer template (documented below). It has since been **rebranded to "Coach P Factory"** — an industrial performance-coaching concept site (Pierrot Massenat, [@coachp_factory](https://www.instagram.com/coachp_factory)) with a new `/academy` concept page. The **engineering** described below (Next.js/GSAP/Lenis architecture, the panel-transition/`data-rise` system, the Motion.tsx mobile-vibration handling, breakpoints) is **still accurate**. The **brand, palette, copy, data, and image paths have changed**:
> - Brand/positioning/palette/tone → see **`BRAND_AUDIT.md`** (verified vs. assumed brand facts).
> - Design tokens are now an industrial dark + molten-orange (`--accent: #ec5b22`) system in `globals.css` / `tailwind.config.ts` (no more neon green).
> - Homepage content lives in `src/lib/data.ts`; Academy concept content in `src/lib/academy-data.ts`.
> - Sections were reworked (About→credibility, Services→Coaching, Process→The Factory Method, Transformations→"From the Work to the Stage", Reviews→"The Factory Standards", Pricing→Coaching Options) and an **Academy preview** + **`/academy` route with a dashboard mockup** were added.
> - Assets moved to **`public/images/coach-p/`** (placeholders — see that folder's `SOURCES.md`). The old `public/images/curtis/` directory was removed.
> - Section anchor IDs changed (`#coaching`, `#method`, `#results`, `#standards`, `#options`, `#academy-preview`). Nav/footer updated accordingly.
>
> Everything below describes the original Curtis build and remains the reference for how the underlying system works.

---

# Curtis — Personal Trainer Website — Handover (original build)

A production-quality, pixel-accurate recreation of the **"Curtis – Personal Trainer"** Framer template, rebuilt as a real, responsive, component-driven website. This document is the single source of truth for anyone (human or AI) picking up the project.

---

## 1. What this project is

- A single-page marketing site for a fictional personal trainer/coach ("Curtis Johnson").
- Rebuilt from reference material (a screen-recording video + 9 full-page screenshots) into semantic HTML/React — **not** a flattened screenshot. Every button, card, link, accordion row, nav item and carousel control is a real interactive DOM element.
- Dark, modern, "grotesk" aesthetic with a signature **neon-green accent (`#8cff00`)** and large rounded overlapping section panels that slide over each other on scroll.

**Reference source files** (not in the repo — they lived in the user's Downloads/Videos):
- `Curtis - Personal Trainer Framer Template ... .mp4` — source of truth for motion (scroll behavior, panel transitions, nav shrink, carousels).
- `1.png` … `9.png` — source of truth for static layout, spacing, colors, typography, crops. Screenshots were ~1902×910 (one viewport each): 1=Hero, 2=About, 3=Services, 4=Process, 5=Transformations, 6=Reviews, 7=Pricing, 8=FAQ, 9=Final CTA/Footer.

---

## 2. Tech stack

| Concern | Choice | Notes |
|---|---|---|
| Framework | **Next.js 15** (App Router) | Static-exported single page (`/`). `reactStrictMode: true`. |
| Language | **TypeScript** (strict) | Path alias `@/*` → `src/*`. |
| UI | **React 19** | |
| Styling | **Tailwind CSS 3.4** + a small `globals.css` | Custom CSS classes for panel radii/reveal helpers where arbitrary values were unreliable. |
| Smooth scroll | **Lenis 1.1** | Desktop/fine-pointer only. |
| Scroll animation | **GSAP 3.12 + ScrollTrigger** | Panel transitions + pinning. |
| Carousels | **Embla Carousel** (`embla-carousel-react` + `embla-carousel-autoplay`) | Transformations + Reviews. |
| Icons | **lucide-react** + a few inline SVGs (X/Twitter, avocado, dumbbell logo, arrow) | |
| Fonts | **Inter** via `next/font/google` | Exposed as CSS var `--font-inter`. |
| Screenshot/QA | **Playwright** (devDependency) | Used during build/validation; `scripts/shots.mjs` remains as a utility. |

There is **no backend, database, or API**. All content is static and lives in `src/lib/data.ts`. All CTAs point to `#contact` (the Final CTA section) — there is no real form yet.

---

## 3. Getting started

```bash
npm install
npm run dev        # dev server (usually http://localhost:3000; picks next free port if busy)
npm run build      # production build (also runs lint + type-check)
npm run start      # serve the production build  (npm run start -- -p 3210 to pick a port)
npm run lint       # eslint (next lint)
npm run typecheck  # tsc --noEmit
```

**Screenshot utility:** `node scripts/shots.mjs` captures each section against a running server. Env vars: `BASE` (default `http://localhost:3000`), `W`/`H` (viewport, default 1440×900). It loads the page with `?nomotion` (see §7) and writes PNGs to `_shots/`.

> ⚠️ **Dev-server gotcha:** After many hot-reloads the Next dev server's Tailwind output can degrade (utilities like `h-screen` / `bg-light-bg` silently stop applying, producing blank/unstyled sections). If you ever see a section render blank or lose its background, **do a clean production build** (`rm -rf .next && npm run build && npm run start`) to confirm — the production output is authoritative. Also watch for zombie servers holding a port from a previous run.

---

## 4. File structure

```
D:\Apolloe\CoachHP\
├─ handover.md                  ← this file
├─ package.json                 scripts + deps
├─ next.config.mjs              reactStrictMode: true
├─ tailwind.config.ts           design tokens (colors, radii, max-widths, font)
├─ postcss.config.mjs           tailwind + autoprefixer
├─ tsconfig.json                strict, @/* alias
├─ scripts/
│  └─ shots.mjs                 Playwright section-screenshot helper
├─ public/images/curtis/        16 cropped photographic assets (see §11)
└─ src/
   ├─ app/
   │  ├─ layout.tsx             <html>, Inter font, <metadata>
   │  ├─ page.tsx               composes all sections + Header + Motion (SECTION ORDER lives here)
   │  └─ globals.css            CSS vars, typography helpers, .rounded-panel-top, .panel-reveal, reveal base
   ├─ lib/
   │  └─ data.ts                ALL copy/content arrays (nav, stats, services, steps, testimonials, reviews, pricing, faqs, footer)
   └─ components/
      ├─ Header.tsx             fixed nav: scroll-linked width shrink + section-based theme + mobile menu
      ├─ Motion.tsx             ⭐ Lenis + GSAP; the section-panel transitions (desktop vs mobile strategies)
      ├─ Logo.tsx               inline dumbbell SVG + "Curtis"
      ├─ PillLabel.tsx          small pill/eyebrow label (dark/light variants)
      ├─ PrimaryButton.tsx      green pill + black arrow-circle CTA (md/lg sizes)
      ├─ StatCard.tsx           glass stat card w/ CountUp (used in Hero)
      ├─ CountUp.tsx            IntersectionObserver-driven number count-up
      ├─ Reveal.tsx             IntersectionObserver fade/rise wrapper (opacity + translateY)
      ├─ SectionHeading.tsx     PillLabel + h2 + subtitle (centered), each wrapped in Reveal
      ├─ Socials.tsx            X / Instagram / Facebook icons (light + footer variants)
      └─ sections/
         ├─ Hero.tsx            #top
         ├─ About.tsx           #about   (light rising panel)
         ├─ Services.tsx        #services (bento; inner content of the dark block)
         ├─ Process.tsx         #process  (bento + count-up stats)
         ├─ Transformations.tsx #stories  (before/after carousel)
         ├─ Reviews.tsx         #reviews  (3-up review carousel)
         ├─ Pricing.tsx         #pricing  (two plans over a dark image)
         ├─ Faq.tsx             #faq      (light rising panel; accordion)
         └─ FinalCta.tsx        #contact  (dark rising panel; CTA + footer overlay)
```

---

## 5. Page composition & DOM order (`src/app/page.tsx`)

The page renders, in order:

```
<Motion />                 ← no visual output; wires Lenis + GSAP (client component)
<Header />                 ← fixed, z-100, above everything
<main>
  <Hero />                       #top            z-1   (dark image)
  <About />                      #about          z-2   light rising panel  [data-rise]
  <section id="services-panel"   data-nav-theme="dark" data-rise  z-3>     ← "the dark block"
     <Services /> <Process /> <Transformations /> <Reviews />
  </section>
  <Pricing />                    #pricing        z-3   (dark image; NOT a rising panel)
  <Faq />                        #faq            z-4   light rising panel  [data-rise]
  <FinalCta />                   #contact        z-5   dark rising panel   [data-rise] (footer inside)
</main>
```

**Why this structure matters:**
- The four **`[data-rise]`** elements (About, the services-panel dark block, FAQ, FinalCta) are the "incoming" panels that slide up over the previous sibling during scroll. Their **previous element sibling is the "outgoing" section** that gets held in place. (About rises over Hero; the dark block rises over About; FAQ rises over Pricing; FinalCta rises over FAQ.)
- **z-index is intentional and ascending (1→5)** so each incoming panel paints over the one it covers; the fixed Header sits at z-100 above all of them.
- **Pricing is a top-level sibling** (deliberately moved out of the dark block) so it can be the clean "outgoing" pin target for the Pricing→FAQ transition. It shares the dark theme so it reads as a continuation of the block above it.
- `data-nav-theme="dark" | "light"` on each section drives the Header's color theme (see §8).

Section anchor IDs (used by nav + smooth scroll): `#top`, `#about`, `#services`, `#process`, `#stories`, `#reviews`, `#pricing`, `#faq`, `#contact`.

---

## 6. Design system

### Color tokens
Defined in **`tailwind.config.ts`** (as Tailwind colors) and mirrored as CSS vars in **`globals.css` `:root`**.

| Token | Value | Usage |
|---|---|---|
| `accent` | `#8cff00` (neon green) | CTAs, accent words in headings, highlights, quote marks. (Hero occasionally uses `#87ff00` to match the reference exactly.) |
| `dark.bg` | `#0f0f0f` | Dark sections background |
| `dark.card` | `#1c1c1c` | Dark cards (e.g. featured pricing header) |
| `dark.card2` | `#141414` | Bento/step/review cards |
| `light.bg` | `#f9f9f9` | About + FAQ panels |
| `light.card` | `#ffffff` | White cards |
| `--muted-dark` | `#9b9b9b` | muted text on dark |
| `--muted-light` | `#565656` | muted text on light |
| body text | `#f2f2f2` on `#0f0f0f` | global default |

### Typography
- Family: **Inter** (`--font-inter`), weights 400/500/600/700.
- Headings use **medium/semibold** weight, **tight negative letter-spacing** (~`-0.04em`), tight line-height.
- Helper classes in `globals.css`:
  - `.h-hero` → `clamp(2.75rem, 6.2vw, 5.1rem)`, `line-height:.98`, `-0.045em`
  - `.h-section` → `clamp(2.1rem, 4.6vw, 3.4rem)`, `1.04`, `-0.04em`
  - `.h-card-lg` → `clamp(1.6rem, 2.4vw, 2rem)`
  - `.text-accent` → neon green
- Some sections (Hero, Transformations, StatCard) use bespoke `text-[..px]` + `tracking-[..]` values tuned pixel-for-pixel against the screenshots rather than the helper classes.

### Radii, spacing, widths
- Pill buttons/labels: `border-radius: 999px`.
- Standard cards: `~22–26px`; large cards `~26–30px`.
- **Big overlapping panels: `.rounded-panel-top`** = `clamp(26px, 4.6vw, 70px)` top-left/right radius only.
- Content max-widths (Tailwind `maxWidth`): `content` = 1080px, `hero` = 1440px, `nav` = 860px. Hero inner and several sections use `w-[min(calc(100%-40px),1120px)]` style clamps.
- Card gaps ~12–16px (`gap-3`). Generous vertical section padding (`pt-24 sm:pt-32`, etc.).

### Custom utility classes (`globals.css`)
- `.rounded-panel-top` — large fluid top corner radius for rising panels.
- `.panel-reveal` — soft top shadow (`box-shadow: 0 -22px 60px -30px rgba(0,0,0,.6)`) + `will-change: transform` for the rising panels.
- `.reveal` — base for the reveal animation (opacity 0 + translateY); reduced-motion overrides it to visible.
- `.no-scrollbar` — hide scrollbars for carousels.
- `::selection` — neon green background.

---

## 7. Motion & animation system ⭐ (`src/components/Motion.tsx`)

This is the most important and subtle part of the site. `Motion` renders nothing; it's a client component that sets everything up in a `useEffect` and cleans up on unmount.

### Global setup
- Registers `ScrollTrigger`, sets `ScrollTrigger.config({ ignoreMobileResize: true })`.
- **Reduced motion / `?nomotion`:** if `prefers-reduced-motion: reduce` OR the URL has `?nomotion`, it skips ALL motion (kills triggers and returns). `?nomotion` exists so screenshot tooling can capture stable static layouts (the continuous rAF loop otherwise prevents some screenshot tools from settling).
- Uses **`gsap.matchMedia()`** to run different strategies per device, wrapped in a `gsap.context()` for Strict-Mode-safe cleanup. On unmount: `mm.revert()`, `ctx.revert()`, kill all ScrollTriggers.

### The panel reveal: desktop-only scroll-linked animation, mobile is plain flow

**A) Desktop / fine-pointer** — `mm.add("(min-width: 769px) and (pointer: fine)", …)`
- Creates a **Lenis** smooth-scroll instance (`duration: 1.05`), pipes `lenis.on('scroll', ScrollTrigger.update)`, drives `lenis.raf` from the GSAP ticker, disables lag smoothing.
- Intercepts clicks on `a[href^="#"]` and does `lenis.scrollTo(target, { offset: -10, duration: 1.2 })` for smooth anchor navigation.
- **Counter-translate technique:** for each `[data-rise]` incoming panel (auto-discovered via `gsap.utils.toArray('[data-rise]')`), animate the **outgoing** (previous sibling) `y: 0 → window.innerHeight`, `scrub: true` (no smoothing lag), `start:"top bottom" end:"top top"`. Translating the outgoing *down* at exactly the scroll rate makes it appear frozen in place while the incoming panel (next in flow, higher z-index) scrolls up over it — a pure function of `scrollY`, no GSAP `pin`, never reflows/blanks, reverses perfectly. Applied to all four rising panels (Hero→About, About→Services, Pricing→FAQ, FAQ→CTA).

**B) Mobile / coarse-pointer** — `mm.add("(max-width: 768px), (pointer: coarse)", …)`
- **Deliberately does nothing.** No Lenis, no ScrollTrigger, no transform of any kind — the callback just returns a no-op cleanup function. Sections rely purely on their existing CSS (`.panel-reveal`, `.rounded-panel-top`, ascending `z-index`) and normal document flow: they stack edge-to-edge and the rounded top corner of each panel reads as a soft seam as it scrolls into view. There is no "frozen outgoing panel" illusion on mobile — the tradeoff was deliberately accepted (see History below).

> **History — two mobile strategies were tried and rejected before landing on "do nothing":**
> 1. **A genuine GSAP `pin`** (`pinSpacing:false`, `scrub:0.45`, plus a manual `stableHeight`-based lift on the incoming panel). Visibly vibrated on touch — `pin` (`position:fixed`) fights native touch-scroll's bursty delta events, and the `0.45` time-smoothing interpolated behind the raw scroll position, overcorrecting on every burst.
> 2. **The same non-pinning counter-translate technique used on desktop**, hoping `scrub:true` (no smoothing) would avoid the issue. It also vibrated. Root cause: on touch devices, native scroll is driven by the **compositor/GPU thread**, decoupled from the **main thread** where GSAP's scrub callback runs. That 1-2 frame desync means the compensating `translateY` perpetually chases the compositor's already-scrolled position, snapping back each frame it catches up — read as continuous shaking. No amount of GSAP parameter tuning fixes this; it's architectural.
>
> Conclusion: **any main-thread transform trying to counteract compositor-driven touch scroll has this problem.** The only fix that structurally cannot vibrate is to apply *no* scroll-linked transform on mobile at all — confirmed via Playwright touch-emulated sweeps (iPhone 13 profile) that every section's computed `transform` stays at identity (`none`) throughout a full scroll, i.e. there is nothing left to desync.

### Other motion pieces (not in Motion.tsx)
- **Reveal** (`Reveal.tsx`): IntersectionObserver adds `opacity 0→1` + `translateY(28px→0)` with a cubic-bezier ease and optional `delay`. One-shot (unobserves after firing). Respects reduced-motion (shows immediately). Runs identically on mobile and desktop (it's not part of the panel-reveal system). Used heavily via `SectionHeading` and around cards.
- **CountUp** (`CountUp.tsx`): IntersectionObserver-triggered number ramp (cubic ease-out) with a green suffix (`%` / `+`). Used in Hero stats (99%, 250+) and Process stats (450+, 95%).
- **Header shrink + theme** — see §8. Note the shrink-on-scroll animation is desktop-only by design (`Header.tsx` forces `y=0`/no shrink under `(max-width:767px), (pointer:coarse)`), independent of this file.
- **Carousels** — see §9.

> **If a transition ever misbehaves:** on desktop, outgoing = `previousElementSibling` of a `[data-rise]` element, translated by GSAP. On mobile there is **no JS motion for the panel reveal at all** — if something looks wrong there, look at the CSS (`.panel-reveal`, `.rounded-panel-top`, z-index) or normal document flow, not `Motion.tsx`. Header must stay above (z-100) on both. Don't reintroduce a GSAP `pin` or scroll-linked transform on mobile without extensive real-device touch testing — see §16.

---

## 8. Header (`src/components/Header.tsx`)

Fixed, `z-100`, above all panels. Client component.

- **Scroll-linked width shrink:** width lerps from `MAX_W_OPEN` (1120px) → `MAX_W_COMPACT` (840px) and height 56→52px over the first `SHRINK_DISTANCE` (260px) of scroll. On mobile/coarse pointer it stays compact (`y` forced to 0 in the calc).
- **Section-based theme:** on scroll it finds which `[data-nav-theme]` section crosses a line ~56px from the top and sets the pill theme:
  - `dark` sections → translucent dark/green-grey glass pill.
  - `light` sections (About, FAQ) → medium-grey translucent pill.
  - Text stays light in both; the green **Get Started** button is constant.
- Uses `requestAnimationFrame`-throttled scroll handler; re-runs on resize.
- **Desktop:** logo left, centered nav links (absolutely centered), Get Started right.
- **Mobile (`< md`):** logo + hamburger toggle; opens a dropdown panel with the links + a green Get Started. Nav links come from `NAV_LINKS` in `data.ts`.

---

## 9. Carousels

Both use Embla with autoplay that pauses on hover/focus, drag/swipe, keyboard arrows, and clickable pagination dots. Card heights are fixed so slide changes don't jump.

**Transformations / "Client Stories"** (`Transformations.tsx`, `#stories`)
- `align:"center"`, `loop`, `containScroll:false` so neighbors peek; **active slide is fully lit, non-active slides get a `bg-black opacity-.58` overlay**.
- Each card = **Before image + After image + testimonial** (quote icon, quote text, name, method/duration). White `Before` pill, green `After` pill.
- Data: a local `STORIES` array in the file = `TRANSFORMATIONS[0]` (David) + a Tom entry + Claudia. (It composes from `TRANSFORMATIONS` in `data.ts` but overrides copy.) Autoplay 5.2s.
- Prev/next circular buttons are positioned with `calc()` to sit just outside the centered card on `xl`, inside on smaller screens. Slide width driven by `--story-slide: 994px` / `min(100vw-40px, …)`.

**Reviews** (`Reviews.tsx`, `#reviews`)
- `align:"start"`, `loop`; shows **3 cards at desktop**, 2 at `sm`, 1 on mobile (`flex-[0_0_100%] sm:50% lg:33.333%`). Autoplay 4.5s.
- Each card = green quote mark, review text, circular avatar, name, training type. Data: `REVIEWS` (5 entries) in `data.ts`.
- Arrows are inside the frame below `xl` and pushed outside (`xl:-left-5/-right-5`) only at `≥1280px` — this prevents horizontal overflow at 1024px (a real bug that was fixed).

---

## 10. Section-by-section content reference

All copy lives in `src/lib/data.ts` unless noted. Accent (green) words are marked **[green]**.

1. **Hero** `#top` — full `100svh`, `hero.jpg` background (athlete, subject right), left/bottom dark gradients. Pill "Personal Coach"; H1 "Meet the **Stronger[green]** Version of You" (forced 2-line break); body copy; **Get Started** CTA; two glass **StatCards** (99% Satisfaction Rate, 250+ Clients Transformed — `%`/`+` green, count-up).
2. **About** `#about` — light rising panel. Heading "About Me" / "Meet Your Coach" / subtitle. 3-column grid: left = two credential cards (Pro Athlete / Certified Coach) + a "Framer Gym / Amsterdam" image card; center = Curtis portrait (`coach.jpg`); right = bio card "Curtis Johnson" (two paragraphs) + **Get in Touch** + "Follow me:" socials.
3. **Services** `#services` — dark bento inside the dark block. Heading "Services" / "Personal Training Designed Around **Your Goals[green]**". Big left card **Build Real Strength** (image); wide **Elite Conditioning** (text left/image right); small **Injury Prevention** (bone icon, solid dark); **Expert Nutrition** (green food image, avocado icon).
4. **Process** `#process` — dark bento. Heading "Process" / "How It Works **Step by Step[green]**". Image/stat card with two glass count-up stats (450+ Custom Plans Built, 95% Consistency Rate) + steps 01–05 (Discovery Call, Personalised Plan, Guided Training, Progress Tracking, Level Up; big muted numbers) + a promo card spanning 2 cols: "This Isn't Motivation. **It's Method.[green]**" / "Start Your Journey!" / **Let's do it!** button.
5. **Transformations** `#stories` — see §9. Heading "Client Stories" / "**Results[green]** Speak for Themselves".
6. **Reviews** `#reviews` — see §9. Heading "Reviews" / "Hear From Clients Who **Took the First Step[green]**".
7. **Pricing** `#pricing` — dark, full-bleed `pricing-bg.jpg` + `#0b0d0e/75` overlay. Heading "Pricing" / "Choose **Your Plan[green]**". Two cards: **Online Training** (light, globe icon, $149/mo) and **In-Person Training** (dark, users icon, $249/mo, offset up on lg, green "⚡ Most Effective" tab, green-highlighted "In-person weekly sessions" feature). Both list 4–5 features + green Get Started.
8. **FAQ** `#faq` — light rising panel. Heading "FAQ" / "Frequently Asked Questions" / subtitle. 6-item accordion (`FAQS`), single-open (`useState<number|null>`, first open by default). Answers animate via CSS `grid-template-rows: 0fr↔1fr` + opacity; the `+` icon rotates 45° to an `×`.
9. **Final CTA + Footer** `#contact` — dark rising panel, `100svh`, `cta-bg.jpg` + dark overlay + bottom gradient. Center: "Ready To Achieve **Your Goals?[green]**" / subtitle / **Start Your Journey**. Bottom footer overlay: socials + divider + links (About, Services, Client Stories, Pricing, FAQ, Contact) on the left; "Created by [J] Jak" on the right.

> The Framer "Made in Framer" watermark and any browser/recording UI from the references are intentionally **not** reproduced.

---

## 11. Images & assets

**There were no original photo assets** — the only sources were the 9 flattened screenshots. Every image in `public/images/curtis/` is a **clean photographic crop** taken from a screenshot with `ffmpeg` (`crop=w:h:x:y`), then real HTML text is layered on top (no baked-in text). CSS `object-position` / `bg-[position]` tunes subject placement.

Files (16): `hero.jpg`, `coach.jpg`, `gym-location.jpg`, `svc-strength.jpg`, `svc-conditioning.jpg`, `svc-nutrition.jpg`, `proc-equip.jpg`, `proc-promo.jpg`, `before-david.jpg`, `after-david.jpg`, `before-mike.jpg`, `pricing-bg.jpg`, `cta-bg.jpg`, `avatar-isabella.jpg`, `avatar-laurie.jpg`, `avatar-michael.jpg`.

**Known asset limitations** (approximations, since originals couldn't be recovered):
- `svc-nutrition.jpg` — the reference had icon+title baked over most of the green-food image, so this is a clean upper green-leaf strip upscaled; framing differs slightly from the original.
- Extra transformation before/after pairs (Tom, Claudia) reuse the recoverable David/Mike crops; only David's pair is exact.
- `pricing-bg.jpg` and `cta-bg.jpg` are cropped from text-free regions of screenshots 7 and 9 and heavily overlaid, so composition is close but not identical to the originals.
- Review avatars are tiny crops from screenshot 6.

To replace any asset: drop a same-named file in `public/images/curtis/` (paths are referenced directly in the section components and `data.ts`).

---

## 12. Responsive behavior

Primary target is desktop (~1440–1920). Verified with 0 horizontal overflow at **390 / 768 / 1024 / 1440**.

- **Tablet:** heading sizes reduce; bento grids collapse to 2 columns; carousels show fewer cards; nav stays compact.
- **Mobile (`< md`):** compact header + hamburger menu; About columns stack; bento cards stack/rearrange; carousels show one primary card; pricing cards stack; FAQ rows full-width; large panel radii shrink (`clamp`). The two required panel transitions still run (via the mobile GSAP-pin strategy).
- Breakpoints are standard Tailwind (`sm` 640, `md` 768, `lg` 1024, `xl` 1280). The motion split is at **769px + pointer type** (see §7).

---

## 13. Accessibility & performance

- Semantic landmarks: `<header>`, `<main>`, `<section>` (with `id`s), `<nav>`, `<footer>`, `<article>` for cards.
- Carousels: `aria-roledescription="carousel"`, labeled controls, `aria-expanded` on FAQ buttons, keyboard arrow support, focus-visible outlines on CTAs.
- `prefers-reduced-motion` fully respected (Motion, Reveal, CountUp all short-circuit to final state).
- Animations use only `transform`/`opacity`; ScrollTriggers and listeners are cleaned up on unmount; `will-change` set on the moving panels.
- Production build is static-prerendered; First Load JS ~168 kB.

---

## 14. Validation status (as last verified)

- ✅ `npm run build` green (lint + type-check pass), page statically prerendered.
- ✅ **0 console errors / 0 hydration warnings** across a full scroll-down-then-up cycle.
- ✅ All four rounded panel transitions: outgoing held still, rounded incoming panel rises over it, reverses cleanly (desktop + mobile).
- ✅ Header shrinks + switches theme correctly per section; stays above panels.
- ✅ FAQ accordion toggles; nav links smooth-scroll to sections.
- ✅ No horizontal overflow at 390/768/1024/1440.

---

## 15. Common "how do I…" tasks

- **Change any copy / add a service, step, review, FAQ, pricing feature:** edit the arrays in `src/lib/data.ts` (Transformations copy is partly overridden inside `Transformations.tsx` — the `STORIES` array).
- **Change the accent color:** `--accent` in `globals.css` **and** `accent` in `tailwind.config.ts` (Hero uses a literal `#87ff00` in a couple of spots — grep for it).
- **Reorder or add a section:** edit `src/app/page.tsx`. If it's a new rounded rising panel, give it `data-rise`, the right ascending `z-[n]`, `panel-reveal rounded-panel-top`, a `data-nav-theme`, and make sure its previous sibling is the section it should cover.
- **Tune a transition's feel (desktop only):** edit the `gsap.fromTo(outgoing, …)` block inside the `(min-width:769px) and (pointer:fine)` branch in `Motion.tsx` (`y: 0 → window.innerHeight`, `scrub: true`). Mobile intentionally has no scroll-linked tween to tune — see §7/§16 before adding one back.
- **Adjust nav shrink/theme:** constants `SHRINK_DISTANCE`, `MAX_W_OPEN`, `MAX_W_COMPACT` and the `barBg` strings in `Header.tsx`.
- **Swap an image:** replace the file in `public/images/curtis/` (same name).

---

## 16. Gotchas / things to know

- **Dev-server CSS degradation** after many HMR cycles (see §3) — verify anything suspicious against a clean production build.
- **Arbitrary Tailwind values** (`z-[2]`, `max-w-[760px]`, etc.) are generally fine, but a couple of spots use inline `style={{ maxWidth: … }}` where JIT generation was flaky. If a class "doesn't apply," try a clean build or an inline style.
- **`?nomotion`** disables all scroll motion — handy for debugging/screenshots, not a user-facing feature.
- **All CTAs go to `#contact`** — there is no real contact form/booking yet; that's the obvious next feature.
- **`scripts/shots.mjs`** and Playwright are dev-only; safe to keep or remove. `_shots/` output is gitignored.
- The site is a single route (`/`). Adding routes means introducing real navigation and revisiting the fixed header logic.
- **No scroll-linked main-thread transform on mobile touch scroll — of any kind.** Two independent approaches were tried and both visibly vibrated on real touch devices: a genuine GSAP `pin`, and the desktop's non-pinning `scrub:true` counter-translate. The root cause is architectural, not tunable: native touch scroll runs on the compositor/GPU thread, while GSAP's scrub callback runs on the main thread; the 1-2 frame desync between them makes any compensating `transform` perpetually chase and snap back. **Mobile now applies zero scroll-linked JS to the panel-reveal sections** (see §7) — the rounded-corner "seam" from normal document flow is the accepted tradeoff. Before reintroducing *any* scroll-driven transform/pin on mobile (even a "simple" one), test on real touch hardware or Playwright touch emulation (`devices['iPhone 13']` + `page.mouse.wheel` bursts) and check the element's computed `transform` stays perfectly monotonic — don't trust desktop-mouse testing, it will not reproduce this class of bug.
