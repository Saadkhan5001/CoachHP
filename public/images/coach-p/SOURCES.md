# Coach P Factory — Image Sources

> **Instagram media used in this concept remains subject to final client approval and confirmation of website usage rights.**

This directory mixes **one real, verified photo of Coach P** with **technically-suitable placeholder crops** inherited from the original template. Every entry below states clearly which is which. See `VISUAL_ASSET_AUDIT.md` (repo root) for the full research process and `INSTAGRAM_ASSET_REQUEST.md` for exactly what real photography is still needed and from which specific Instagram posts.

**Date accessed (Instagram research):** 2026-07-14.

---

## Real, verified Coach P asset

| Website filename | `coach-p-profile.webp` |
|---|---|
| **Original Instagram source** | Coach P's own profile picture on [instagram.com/coachp_factory](https://www.instagram.com/coachp_factory) |
| **Original creator/account** | @coachp_factory (Pierrot Massenat) — his own account, his own profile photo |
| **Content description** | Coach P at a physique competition, wearing a placement medal, on an NPC-branded stage backdrop |
| **How acquired** | Direct, unauthenticated HTTP GET to Instagram's own public CDN, using the exact signed URL already served to any anonymous visitor of the profile page (no login, no spoofed headers, no internal API access) |
| **Source resolution** | 320×320px (Instagram's "HD" profile picture tier — this is the largest version Instagram serves for a profile photo) |
| **Processing** | Cropped to 248×320 to remove a competitor's shoulder bleeding in from the right edge; converted to WebP (q90); **not upscaled** |
| **Website location(s)** | Small circular/square identity badge in the About/"The Coach" bio card (`About.tsx`), and the two small "CP" avatar badges in the Academy dashboard mockup (`AcademyDashboard.tsx` — top bar + Coach Message card) |
| **Client appears?** | No |
| **Minor appears?** | No |
| **Status** | ✅ Approved-pending-client-confirmation (real, self-owned, lowest-risk asset in this set) |
| **Replacement recommendation** | If Coach P can supply a higher-resolution portrait or headshot directly, replace this file — 320px source is only suitable for small badge/avatar use, not for any hero or large section background |
| **Date accessed** | 2026-07-14 |

---

## Placeholder assets (template-derived, NOT Coach P)

**Status: TEMPORARY PLACEHOLDERS**, unchanged from the prior rebrand pass. No further photographs of Coach P could be acquired at usable resolution in this pass — see `INSTAGRAM_ASSET_REQUEST.md` for the specific real posts identified as replacements, pending direct file transfer from Coach P.

| File | Used for | Origin | Grade | Replace with (see INSTAGRAM_ASSET_REQUEST.md for exact source) |
|---|---|---|---|---|
| `hero.jpg` | Homepage hero background | Template crop (barbell deadlift, concrete) | Industrial regrade | Request #1 or #7 — a wide Coach P training/coaching shot with headline space |
| `coach-portrait.jpg` | About / credibility large portrait | Template crop (seated athlete) | As-is | A real, higher-res portrait of Coach P (see "Also requested" in INSTAGRAM_ASSET_REQUEST.md) |
| `gym-floor.jpg` | About "train in-person" card | Template crop (gym interior) | As-is | Coach P's actual training facility |
| `strength.jpg` | Services — Strength card | Template crop (wrist wraps / lift) | As-is | Request #3 (cable crunch technique post) |
| `conditioning.jpg` | Services — Conditioning card | Template crop (kettlebell/athlete) | As-is | Coach P conditioning/agility content (none identified in the 10 accessible posts — see audit) |
| `athlete.jpg` | Services — Athlete/competition card | Template crop | As-is | Request #5 (athlete check-ins) |
| `method-equip.jpg` | Factory Method — stat panel bg | Template crop (equipment) | As-is | Coach P gym detail shot |
| `method-promo.jpg` | Factory Method — promo card | Template crop (barbell/belt) | As-is | Request #6 (competition results/trophy post) |
| `case-before-1.jpg` / `case-after-1.jpg` | Results — case study visual pair | Template crops | As-is | A REAL, client-approved before/after (only with consent) |
| `case-before-2.jpg` | Results — secondary visual | Template crop | As-is | Real client / athlete footage still |
| `coaching-bg.jpg` | Coaching-options section background | Template crop (rack/equipment) | Industrial regrade | Request #8 (team celebration post) |
| `cta-bg.jpg` | Final CTA background | Template crop (battle ropes) | Industrial regrade | Request #7 (discipline/philosophy reel) |

## TODO — real assets still needed from Coach P
1. **Higher-resolution portrait** of Pierrot Massenat (hero + about) — the one real photo acquired is only 320px source, too small for large placements. Landscape + portrait crops.
2. **Coaching-in-action** shots (correcting form, spotting, cueing) — requested from posts #2–#5 in `INSTAGRAM_ASSET_REQUEST.md`.
3. **His own competition/stage photography** — requested from post #9 (`DYAB40AEU3S`, "From the Work to the Stage," top priority).
4. **Facility/environment wide shots** for backgrounds.
5. **Logo file**, if one exists — the current `Logo` component remains a typographic concept (`CP` / `Coach P Factory`) and intentionally does not claim to be his official mark.
6. **Before/after imagery** must be real and client-consented — the current pair remains a placeholder, clearly labelled "illustrative" in the site's own copy.
7. **Conditioning/agility and martial-arts-specific content** — his bio confirms both specialties (Black Belt Taekwondo & Shotokan; Strength, Conditioning & Agility Coach) but no matching post was found in the 10 posts accessible without login — worth asking him directly for this content.
