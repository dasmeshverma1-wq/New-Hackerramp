# Home screen assets (`v2.html`)

Packaged for developers implementing the homepage. Source page: `v2.html` → `HomeView`.

## Folder layout

| Folder | Contents |
|--------|----------|
| `local/` | Files copied from repo (`images/`, `videos/`) with **where-used** names |
| `Prices/` | Prizes & Rewards medals + special-award icons — see [`Prices/README.md`](Prices/README.md) |
| `speakers/` | Speaker card photos (canonical + source filenames) |
| `external/` | Remote URLs + downloaded PNGs (Microsoft Teams emoji, LinkedIn) |
| `inline-svg/` | Inline SVG icons extracted from home markup (stroke icons, not image files in app) |

Original paths in the app are unchanged — this folder is a **handoff bundle**.

---

## Global (nav + footer on home)

| Asset in bundle | Used where | Original path in repo |
|-----------------|------------|------------------------|
| `local/nav-and-footer-logo-mynnovAIte.svg` | Top nav logo, mobile nav, footer brand | `images/Frame 632872.svg` |

---

## Hero — Version A (Women in Tech)

| Asset | Used where |
|-------|------------|
| `local/hero-vA-and-vB-background-video.mp4` | Subtle full-bleed background video |
| *(none)* | Title, tagline, pills, CTAs are **CSS/text** — no image files |
| `inline-svg/cta-arrow-right.svg` | Register CTA arrow |
| `inline-svg/hero-scroll-chevron-down.svg` | “Scroll to Explore” indicator |

---

## Hero — Version B (Wave collage) — default

| Asset in bundle | Used where | Original path |
|-----------------|------------|---------------|
| `local/hero-vA-and-vB-background-video.mp4` | Background video layer | `videos/Desktop 2026.05.19 - 18.38.38.mp4` |
| `local/hero-vB-deco-small.png` | Floating decoration (mouse repulsion) | `images/deco-small.png` |
| `local/hero-vB-deco-large.png` | Floating decoration (mouse repulsion) | `images/deco-large.png` |
| `local/hero-vB-wave-tile-01.png` … `hero-vB-wave-tile-15.png` | 15 wave collage tiles | `images/IMAGE 1.png` … `IMAGE 15.png` |

Register button rings, countdown, blobs: **CSS only** (no image files).

---

## Stats strip

No images — animated numbers + colored bars (CSS).

---

## How it works

| Asset | Used where |
|-------|------------|
| `external/how-it-works-robot-microsoft-teams.png` | Robot above “Five rules…” heading |
| `external/how-it-works-robot-microsoft-teams.url.txt` | Source URL |

Rule cards: **CSS solid colors** only.

---

## TechWeek winners (podium)

| Asset | Used where |
|-------|------------|
| `Prices/medal-1st-place.png` | 1st place card — medal behind copy |
| `Prices/medal-2nd-place.png` | 2nd place card |
| `Prices/medal-3rd-place.png` | 3rd place card |

Loaded via `PODIUM_MEDAL_IMAGES` in `v2.html`.

---

## Ideas carousel

No image files — gradient orbs + text cards (CSS).

Icons: `inline-svg/slider-chevron-left.svg`, `slider-chevron-right.svg`, `cta-arrow-right.svg`

---

## Event dates (schedule strip)

No image files — phase timeline is CSS.

---

## Speakers & mentors

| Asset | Speaker | Used where |
|-------|---------|------------|
| `external/speaker-SPK1-nitesh-jain-photo.url.txt` | Nitesh Jain | Card photo |
| `external/speaker-SPK1-razorpay-logo.url.txt` | Razorpay | Company logo |
| `external/speaker-SPK2-shamik-sharma-photo.url.txt` | Shamik Sharma | Card photo |
| `external/speaker-SPK2-atlassian-logo.url.txt` | Atlassian | Company logo |
| `external/speaker-SPK3-pratyush-kumar-photo.url.txt` | Pratyush Kumar | Card photo |
| `external/speaker-SPK3-sarvam-ai-logo.url.txt` | Sarvam AI | Company logo |
| `speakers/nitesh-jain.jpeg` | Nitesh Jain (SPK1) | Canonical name — also `speakers/1st.jpeg` |
| `speakers/shamik-sharma.jpeg` | Shamik Sharma (SPK2) | also `speakers/2nd.jpeg` |
| `speakers/pratyush-kumar.jpeg` | Pratyush Kumar (SPK3) | also `speakers/3rd.jpeg` |
| `speakers/announced-soon-1.jpeg` | Announced soon (SPK4) | also `speaker-SPK4-announced-soon.jpeg` |
| `speakers/announced-soon-2.jpeg` | Announced soon (SPK5) | also `speaker-SPK5-announced-soon.jpeg` |

Runtime paths in `v2.html` still use `images/speakers/*.jpeg` (copies live in repo `images/speakers/`).

Company logos still load from LinkedIn URLs in `DEFAULT_SPEAKERS`.

---

## Prizes & rewards

| Asset | Used where |
|-------|------------|
| `Prices/medal-1st-place.png` | 1st Place card |
| `Prices/medal-2nd-place.png` | 2nd Place card |
| `Prices/medal-3rd-place.png` | 3rd Place card |
| `Prices/award-best-ui-ux.png` | Best UI/UX award card (blurred right-side wash) |
| `Prices/award-most-innovative.png` | Most Innovative award card |
| `Prices/award-live-implementation.png` | Live Implementation bonus card |

Full mapping: [`Prices/README.md`](Prices/README.md). Loaded via `PODIUM_MEDAL_IMAGES` and `REWARD_AWARD_ICONS` in `v2.html`.

Perk pills and card backgrounds are **CSS/text** — no image files.

**Legacy (not used on home anymore):** `external/rewards-live-implementation-victory-hand-microsoft-teams.png` — replaced by `Prices/award-live-implementation.png`.

---

## Leaderboard

No images — table + theme chips (CSS).

---

## Women in Tech banner

No raster images — dark grid/glow is **CSS**. Arrows: `inline-svg/wit-banner-arrow-right.svg`

Links to `women-in-tech.html` (separate page assets).

---

## Hall of fame

No image files — pastel blobs + text (CSS). Badges: Unicode 🏆 🥈

---

## Inline SVG icons (all home CTAs / sliders)

| File | Used on |
|------|---------|
| `inline-svg/cta-arrow-right.svg` | Section CTAs (agenda, speakers, ideas, leaderboard, hero A) |
| `inline-svg/slider-chevron-left.svg` | Speakers slider, Ideas slider |
| `inline-svg/slider-chevron-right.svg` | Speakers slider, Ideas slider |
| `inline-svg/hero-scroll-chevron-down.svg` | Hero A scroll hint |
| `inline-svg/wit-banner-arrow-right.svg` | Women in Tech banner buttons |

In the app these are embedded `<svg>` in JSX, not loaded from files.

---

## Fonts (referenced on home, not copied here)

`fonts/ParafinaTrial-*.otf` — display headings  
Google Fonts: Inter Tight, JetBrains Mono, Figtree, Silkscreen (loaded in `v2.html`)

---

## Not on home (excluded)

- Meme booth templates / picsum placeholders
- Demo booth images (`IMAGE 6–9` etc.)
- Learn sessions speaker photos (other views)
- `images/bell.svg`, `group.svg`, `logo1–5.svg` — not used on home

---

## Quick share for your developer

Zip this folder:

```bash
cd assets && zip -r home-screen-assets.zip home-screen
```

Or share the repo path: `assets/home-screen/`
