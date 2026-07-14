# Instagram Asset Request — Coach P Factory

Assets identified as strong, on-brand candidates during research (`VISUAL_ASSET_AUDIT.md`) but that **could not be downloaded at usable resolution** through normal public browsing in this environment. These should be requested directly from Coach P (Pierrot Massenat) as original export files, ideally the original camera/upload files rather than Instagram's compressed re-encodes.

For each: exact source post, what it shows, intended website section, desired export size, and preferred crop.

---

### 1. "From the Work to the Stage" — Coach P's own competition debut ⭐ top priority
- **Post:** [instagram.com/coachp_factory/p/DYAB40AEU3S/](https://www.instagram.com/coachp_factory/p/DYAB40AEU3S/)
- **Shows:** Coach P stepping on a physique competition stage for the first time — a genuine coach-to-competitor moment, and the exact phrase already used as the "Results" section headline on the site.
- **Website section:** Results / "From the Work to the Stage" story card (`STORY_FOCUS[0].stageImage` in `src/lib/data.ts`), and a strong secondary candidate for the Hero background.
- **Desired export:** Original resolution (carousel likely has multiple frames — request the sharpest, best-lit one); landscape or vertical both usable.
- **Preferred crop:** Enough headroom/negative space on one side for a heading to sit over it if used in Hero; otherwise a clean 4:5 or square crop centered on Coach P.
- **Format:** JPEG/HEIC original, not a re-screenshotted Instagram frame.

### 2. Technique/form tutorial — exercise breakdown ⭐ top priority
- **Post:** [instagram.com/coachp_factory/reel/DX995WnC3uk/](https://www.instagram.com/coachp_factory/reel/DX995WnC3uk/)
- **Shows:** Coach P demonstrating exercise technique and form, captioned "Technique and form, are very important in any exercise. Pay attention to details and you'll get better…"
- **Website section:** Academy dashboard "Technique Lesson" video card (`AcademyDashboard.tsx`) and/or The Factory Method section.
- **Desired export:** A single sharp frame (mid-motion, clear form) around 1200–1600px on the long edge, OR the source video file so a clean frame can be selected precisely.
- **Preferred crop:** 16:9 landscape (matches the existing video-card `aspect-video` treatment) or 4:5 if the motion reads better vertically.

### 3. Cable crunch — strength/technique demo
- **Post:** [instagram.com/coachp_factory/reel/DXmTGO1giqN/](https://www.instagram.com/coachp_factory/reel/DXmTGO1giqN/)
- **Shows:** Coach P coaching a cable crunch with correct form, captioned "Cable crunching with the factory….💪🏾🇭🇹🥋 try those with the right form and technique…"
- **Website section:** Coaching → Strength & Muscle card (`SERVICES[0].image`), replacing the current generic wrist-wrap crop.
- **Desired export:** ~1400px long edge, single frame or short clip still.
- **Preferred crop:** Portrait or square, subject positioned to leave room for card text overlay at the bottom (matches current card's bottom-gradient treatment).

### 4. Competition prep — own stage-readiness post
- **Post:** [instagram.com/coachp_factory/p/DYBFUdSApsk/](https://www.instagram.com/coachp_factory/p/DYBFUdSApsk/)
- **Shows:** Coach P's own prep, captioned "SMH, here we go again I'm getting ready for July 11. I'm getting ready so get ready…💪🏾🇭🇹🥋#AllWork"
- **Website section:** Coaching → Physique & Stage Prep card (`SERVICES[2]`, currently has no image at all — icon-only).
- **Desired export:** ~1200–1400px long edge.
- **Preferred crop:** Square or portrait, gym/prep environment visible.

### 5. Team/athlete check-ins (group)
- **Post:** [instagram.com/coachp_factory/p/DaqSEbgDlnl/](https://www.instagram.com/coachp_factory/p/DaqSEbgDlnl/)
- **Shows:** Athlete check-ins for NPC Southern States, Team BlackRose.
- **Website section:** Athlete Development card (`SERVICES[3].image`) or Academy "Who It's For" imagery.
- **Desired export:** ~1200px long edge.
- **⚠️ Consent note:** This shows multiple named clients/athletes. Get explicit confirmation from Coach P that everyone visible consents to appearing on his coaching website before using — public-Instagram-visibility alone is not sufficient consent for repurposing on a commercial site.
- **Preferred crop:** Whichever carousel frame best isolates Coach P coaching, to minimize the number of third parties shown.

### 6. Competition results / trophy moment
- **Post:** [instagram.com/coachp_factory/p/Das_fpKFkmj/](https://www.instagram.com/coachp_factory/p/Das_fpKFkmj/)
- **Shows:** "July 11th CoachP's factory met the goal, mission accomplished, brought home the🏆🏆🏆"
- **Website section:** Method section promo card (`method-promo.jpg` replacement) or Results carousel.
- **Desired export:** ~1400–1800px long edge (this is a candidate for a larger section background).
- **Preferred crop:** Landscape, room for the "We don't chase motivation. We build standards." headline to sit over a darker region.

### 7. Discipline/philosophy reel
- **Post:** [instagram.com/coachp_factory/reel/DatDBK-CZwt/](https://www.instagram.com/coachp_factory/reel/DatDBK-CZwt/)
- **Shows:** "When discipline, focus, determination, and hard work come together 💎💎💎"
- **Website section:** Final CTA background (`cta-bg.jpg` replacement) — needs a wide, moody frame with room for centered white/orange text.
- **Desired export:** ~1600–1920px long edge if possible (largest section on the site).
- **Preferred crop:** Landscape, darker/moodier frame preferred to match the existing CTA gradient treatment.

### 8. Team celebration
- **Post:** [instagram.com/coachp_factory/reel/DZVsEThvMsl/](https://www.instagram.com/coachp_factory/reel/DZVsEThvMsl/)
- **Shows:** "Team work makes the dream work✨💪🏼"
- **Website section:** Coaching Options background (`coaching-bg.jpg` replacement) or Academy "community" feature imagery.
- **Desired export:** ~1400px long edge.
- **Preferred crop:** Landscape, works as a dimmed/overlaid section background.

---

## Also requested (not yet identified from a specific post — general asks)

- **A proper portrait** of Coach P — front-facing, good lighting, not a competition-stage shot — for the About/"The Coach" section, since the only acquired photo is a low-res (320×320) competition thumbnail. Landscape and portrait-orientation crops both useful.
- **A wide facility/gym environment shot** (empty or in-use) for section backgrounds needing negative space (Hero, Coaching Options).
- **Original files, not Instagram re-compressions**, wherever possible — Instagram's own CDN downsamples and compresses everything, so even "successfully downloaded" images from the platform cap out well below print/hero quality.
- **Explicit written confirmation** that Coach P approves using his likeness and any client/athlete likenesses from the above posts on this concept website, per the consent policy in `public/images/coach-p/SOURCES.md`.

## What NOT to do while waiting on these

Per the task's own instructions and `public/images/coach-p/SOURCES.md`: do not upscale the one low-resolution profile picture into a hero background, do not screenshot Instagram's UI as a substitute, and do not generate AI imagery to fill these gaps. The existing graded template placeholders remain in place for every section above until real assets arrive.
