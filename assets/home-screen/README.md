# Home screen assets (`v2.html`)

Packaged for developers implementing the homepage. Source page: `v2.html` → `HomeView`.

## Folder layout

| Folder | Contents |
|--------|----------|
| `local/` | Files copied from repo (`images/`, `videos/`) with **where-used** names |
| `speakers/` | Local speaker placeholder photos |
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

No image files — medal characters are **Unicode emoji** in code: 🥇 🥈 🥉

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
| `images/speakers/nitesh-jain.jpeg` | Nitesh Jain (SPK1) | Card photo — from `assets/home-screen/speakers/1st.jpeg` |
| `images/speakers/shamik-sharma.jpeg` | Shamik Sharma (SPK2) | from `assets/.../2nd.jpeg` |
| `images/speakers/pratyush-kumar.jpeg` | Pratyush Kumar (SPK3) | from `assets/.../3rd.jpeg` |
| `images/speakers/announced-soon-1.jpeg` | Announced soon (SPK4) | from `assets/.../speaker-SPK4-announced-soon.jpeg` |
| `images/speakers/announced-soon-2.jpeg` | Announced soon (SPK5) | from `assets/.../speaker-SPK5-announced-soon.jpeg` |

Company logos still load from LinkedIn URLs in `DEFAULT_SPEAKERS`.

---

## Prizes & rewards

| Asset | Used where |
|-------|------------|
| `external/rewards-live-implementation-victory-hand-microsoft-teams.png` | Live Implementation Prize billboard |
| `external/rewards-victory-hand-microsoft-teams.url.txt` | Source URL |

Reward tier medals/pills use **Unicode emoji** in code: 🥇 🥈 🥉 🎨 💡 🔥 💎 🌟 ✨ ⚡ 🚀

Card backgrounds: **CSS gradients** (no PNG).

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
