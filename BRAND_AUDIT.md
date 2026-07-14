# Brand Audit — Coach P Factory

**Purpose:** Inform the concept-presentation rebrand of the existing "Curtis" fitness template into a tailored **Coach P Factory** site. This audit separates **verified** signals (observed on the live public Instagram profile on the research date) from **assumptions** that require client confirmation before any public claim is made.

**Primary source:** [instagram.com/coachp_factory](https://www.instagram.com/coachp_factory) — profile header, full bio text, and 10 recent post/reel captions read via the accessibility tree and the page's own natural (unmodified) network response during normal browsing. Screenshots of the grid could not be captured (Instagram's renderer times out in this environment), and anonymous/logged-out viewing caps the visible grid at 10 posts (Instagram's own pagination limit for logged-out visitors — not a research shortcut), so **exact brand colors still could not be sampled** — see §4 and §10.

> **Update (second research pass):** the full profile bio is now confirmed verbatim (see below), which resolves the previously-flagged martial-arts assumption. One real photograph (his profile picture) was also acquired directly from Instagram's public CDN — see `public/images/coach-p/SOURCES.md` and `VISUAL_ASSET_AUDIT.md`.

---

## 1. Brand positioning

**Verified:** A hands-on, results-driven personal training brand run by a long-tenured coach who also competes himself. The account brands the coaching operation as a **"factory"** — a place where work is put in and results (competition placements, physique transformations) are manufactured. Recurring self-references: *"CoachP's factory,"* *"When coachP factory cook,"* *"met the goal, mission accomplished."* The "Factory" metaphor is **genuinely his**, not an invention of this project.

Positioning statement (derived): *Performance coaching where disciplined, technical work is turned into measurable results — for clients and competitors alike.*

## 2. Target audiences

**Verified / strongly implied from content:**
- Physique & bodybuilding **competitors** (NPC athletes; he preps a team — `#TeamBlackRose`, `@black_rose_fitness`, NPC Southern States).
- General personal-training **clients** (dedicated "Clients" story highlight).
- People who value **discipline and technique** over hype.

**Assumption (needs confirmation):** youth/athlete development and martial-arts practitioners are plausible secondary audiences (see §3) but were not explicitly evidenced in the sampled posts.

## 3. Coaching specialties

**Verified:**
- Personal fitness training (bio: *"Personal Fitness Trainer"*).
- **Physique & competition preparation** (repeated trophy wins, athlete check-ins, coaching a competition team).
- **Technique / exercise-form education** (reel: *"Technique and form, are very important in any exercise. Pay attention to details and you'll get better…"*).
- **Coach + active competitor** (reel: *"COACH P STEPPED ON STAGE FOR THE FIRST TIME"* — a genuine coach-to-competitor storyline).

**Now fully verified (full bio text confirmed via the profile's own public data):**
- **"Black Belt in Taekwondo & Shotokan🥋"** — confirmed verbatim. No longer an assumption.
- **"Strength, Conditioning & Agility Coach 🏀⚽️🎾🏈"** — confirmed verbatim as his own stated specialty line (with sport emoji suggesting he also works with team-sport athletes: basketball, soccer, tennis, football). No longer an assumption.

Full verbatim bio: *"Personal Fitness Trainer 💪🏽 / Over Two Decades of Training Experience 🏅 / Black Belt in Taekwondo & Shotokan🥋 / Strength, Conditioning & Agility Coach 🏀⚽️🎾🏈"*

## 4. Repeated visual colors

**Not reliably verifiable** — the profile grid could not be screenshotted. Observed contextually: competition-stage photography (dark backgrounds, warm stage lighting), gym environments, trophies (gold), Haitian identity (🇭🇹 = blue/red). **No confirmed brand hex palette.** The palette in §10 is therefore a *designed* industrial system, not a sampled one, and is explicitly an assumption pending real brand assets.

## 5. Typography characteristics

**Not verifiable** from captions (Instagram uses its own system font). No custom wordmark/logo font could be confirmed. Recommendation in §10 is a design decision, not an observation.

## 6. Photography style

**Verified (from captions/context):** competition stage shots, athlete check-ins, training/technique clips, team celebration with trophies. High-effort, real-training content rather than polished lifestyle/wellness imagery. Supports a high-contrast, editorial, "real work" photographic direction.

## 7. Repeated verbal language (verified — quoted/paraphrased from captions)

- **"factory" / "CoachP's factory" / "When coachP factory cook"** — core brand metaphor.
- **"discipline, focus, determination, and hard work"** (verbatim, one reel).
- **"#AllWork"**, **"YOUR DEDICATION"**, **"the work"**, **"FROM THE WORK TO THE STAGE"**.
- **"met the goal, mission accomplished"**, **"Team work makes the dream work"**.
- **"Stay up!!!"** (story highlight = a motto).
- Emojis: 🏆 (trophies/wins), 💪🏽/💪🏾 (strength), 🥋 (martial arts), 💎 (discipline/quality), 🇭🇹 (Haitian pride).

This is a strong, coherent lexicon — the site copy is built from **these real words**, summarized into original site prose (not copied verbatim in bulk).

## 8. Trust signals & credentials

**Verified:**
- **"Over Two Decades of Training Experience"** (bio, verbatim) → "20+ years" is safe to state.
- **Real competition results with his athletes** (publicly posted first-place / trophy wins, NPC Southern States, Team BlackRose) → can reference *his athletes' publicly shown placements*, kept distinct from his own.
- **He competes himself** (first time on stage) → the coach-to-competitor story is real.
- **Haitian heritage** (🇭🇹) → part of identity, usable if tasteful.

**Must NOT be fabricated / omitted unless client-confirmed:** specific certifications, martial-arts style/rank, exact years, client counts, satisfaction %, prices, location, awards beyond publicly shown athlete placements, gym ownership, nutrition qualifications.

## 9. Recommended website tone

Industrial, disciplined, technical, coach-led, grounded. Masculine but inclusive. Confident without hype or fake proof. Short, declarative, uppercase micro-labels; plain-spoken body copy about *the work* and *the system*. Lean into the **Factory** metaphor as an operating philosophy (assess → build → train → refine → perform), not as grunge decoration.

## 10. Recommended design tokens (design decision — NOT sampled; assumption)

Controlled industrial system (from the brief's fallback, since no palette could be sampled):

| Token | Value | Role |
|---|---|---|
| `--ink` (bg) | `#0b0b0c` | Near-black industrial base |
| `--graphite` | `#141517` | Panels / cards |
| `--gunmetal` | `#1c1e22` | Raised surfaces |
| `--steel` | `#2a2d33` | Borders / hairlines |
| `--bone` (light bg) | `#f4f2ee` | Warm off-white light sections |
| `--accent` | `#ec5b22` | **Single energetic accent — "molten/forge" orange.** On-concept with "Factory" (forge heat) + champion energy; differentiated from the template's neon green. |
| `--accent-deep` | `#c8460f` | Accent hover/press |
| text muted (dark) | `#8b8f96` | |

- **Firmer geometry:** small radii (2–14px), squared cards, solid authoritative buttons, hairline "technical" borders, oversized section numbering (01–05), uppercase stamped labels. Retain the existing rounded **section-transition** panels (engineering-sensitive) but tighten card corners inside them.
- **Type:** keep **Inter** for body/UI (already wired). Add a **condensed/wide grotesk display** treatment for hero/section numerals via tight tracking + uppercase (no new font dependency required; if a display face is later desired, that's a follow-up).

> ⚠️ The accent color and type direction are **design proposals**, not brand facts. If Coach P has an existing logo/palette, swap `--accent` and the display treatment to match — the system is token-driven so this is a one-file change.

## 11. Verified vs. assumptions summary

**Verified (safe to use):**
- Name **Pierrot Massenat**, Haitian (🇭🇹); handle @coachp_factory; brand "Coach P Factory".
- Personal fitness trainer; **20+ years experience**.
- **Physique/competition coaching**; real athlete placements (NPC, Team BlackRose); **coach who also competes**.
- **Technique/form education** content.
- The **"Factory" concept and the discipline/"the work"/"Stay up" language** are genuinely his.

**Assumptions requiring client sign-off (used only as neutral/"concept" wording, never as hard claims):**
- Youth/athlete-development and martial-arts-athlete audiences (plausible given the sport emoji in his bio and team names like "Team BlackRose," but not explicitly labelled as youth-specific).
- **Entire visual palette, accent color, and typography** (no brand assets could be sampled).
- Any **location, prices, certifications, client numbers** → intentionally omitted from the site.

**The Academy ("Coach P Factory Academy")** is a **forward-looking concept** for the pitch — clearly labelled "Concept Preview / Coming Soon" throughout, with demo-only data.
