# Design System & User Interface Guide

This document describes the design tokens, typography, color palette, components, and animations used in **Myntra Tech Week 2026** (specifically HackerRamp Edition Six). Other AI models or developers can refer to this to maintain consistent UI/UX styling when adding or updating features.

---

## 1. Color Palette (CSS Custom Variables)
The system uses custom semantic HSL/HEX variables to define background, text, borders, and accent colors. The primary visual style is a **Premium Editorial Light/Dark hybrid** using warm "paper" backdrops contrasted with deep "ink" text and neon accents.

```css
:root {
  /* Core Base Colors */
  --ink: #0A0A0A;         /* Primary deep text */
  --ink-2: #1A1A1A;       /* Standard backgrounds / buttons */
  --ink-3: #2A2A2A;       /* Hover states for dark buttons */
  
  --paper: #FAFAF7;       /* Core page background (warm bone/cream) */
  --paper-2: #F2EFE7;     /* Neutral buttons / subtle borders */
  --paper-3: #E8E4D6;     /* Active/Selected neutral backgrounds */
  --white: #FFFFFF;       /* Pure white (e.g., cards, modal bodies) */

  /* Neutral/Muted Greys */
  --mute-1: #525252;
  --mute-2: #737373;
  --mute-3: #A3A3A3;
  --mute-4: #D4D4D4;

  /* Borders & Lines */
  --line: rgba(10,10,10,0.08);       /* Subtle border */
  --line-2: rgba(10,10,10,0.12);     /* Medium border */
  --line-3: rgba(10,10,10,0.20);     /* Strong/Focused border */
  
  --line-white: rgba(255,255,255,0.10);
  --line-white-2: rgba(255,255,255,0.18);

  /* Primary Accent: Myntra Pink/Rose */
  --accent: #FF3F6C;
  --accent-dim: #E0345C;
  --accent-tint: #FFE8EE;
  --accent-deep: #9F1239;

  /* Theme & Tag Colors */
  --c-purple: #8B5CF6;   --c-purple-tint: #EDE9FE;   --c-purple-deep: #5B21B6;   /* Gen AI */
  --c-blue: #3B82F6;     --c-blue-tint: #DBEAFE;     --c-blue-deep: #1E40AF;     /* SRE / Platform */
  --c-cyan: #06B6D4;     --c-cyan-tint: #CFFAFE;     --c-cyan-deep: #0E7490;     /* Unified Commerce */
  --c-teal: #0D9488;     --c-teal-tint: #CCFBF1;     --c-teal-deep: #115E59;     /* Supply Chain */
  --c-emerald: #10B981;  --c-emerald-tint: #D1FAE5;  --c-emerald-deep: #065F46;  /* Growth / Success */
  --c-amber: #F59E0B;    --c-amber-tint: #FEF3C7;    --c-amber-deep: #92400E;    /* Faster / Ideation */
  --c-orange: #FB923C;   --c-orange-tint: #FFEDD5;   --c-orange-deep: #9A3412;   /* B2B / Wholesale */
  --c-rose: #F43F5E;     --c-rose-tint: #FFE4E6;     --c-rose-deep: #9F1239;     /* Beauty / InfoSec */
  --c-fuchsia: #D946EF;  --c-fuchsia-tint: #FAE8FF;  --c-fuchsia-deep: #86198F;  /* Creator Economy */
}
```

---

## 2. Typography
The portal implements Google Fonts for clear visual hierarchy:
*   **Serif Headings (Fraunces)**: Used for main headers, numbers, and display text (`.h-display`). It delivers an elegant, high-fashion editorial feel.
*   **Sans-Serif Text (Inter Tight)**: Used for body text, form elements, descriptions, and labels. Optimized for high readability.
*   **Monospace Details (JetBrains Mono)**: Used for metadata tags, counters, schedules, status pills, and short technical summaries (`.font-mono`).

### CSS Utility Classes
*   `.h-display`: Uses `Fraunces` with a lighter weight (300) and negative letter-spacing for large text blocks.
*   `.num-display`: Tabular-num layout using `Fraunces` for counting metrics and scoreboard figures.
*   `.eyebrow`: Uppercase, small monospaced tracking headers.

---

## 3. UI Components & Patterns
All elements use clean, sharp corners (typically `rounded-[3px]` or `rounded-none` for an architectural feel, or fully pill-shaped `rounded-full` for dynamic tags).

### Atoms & Modals
1.  **Buttons (`Btn`)**:
    *   `primary`: High contrast, dark ink (`--ink-2`).
    *   `ghost`: Outline-only, using `--line-2` and turns white on hover.
    *   `accent`: Gradient or full accent pink (`--accent`) for high-conversion actions.
    *   `success`/`danger`/`subtle`: Standardized semantic behaviors.
2.  **Input Elements (`Inp`, `Sel`, `Txt`)**:
    *   Inputs, Selects, and Textareas share uniform heights, padding, and focus states.
    *   Focus state transitions into `--accent` or deep `--ink` with a subtle outer glow shadow (`focus:shadow-[0_2px_8px_rgba(0,0,0,0.06)]`).
3.  **Tags & Badges (`Tag`)**:
    *   Used to specify roles, themes, or criteria. Badges use background tints and deeper text colors mapping to their theme (e.g. `--c-emerald-tint` background with `--c-emerald-deep` text).
4.  **Toast Alerts (`Toast`)**:
    *   Slide-in notifications appearing top-right (`.toast-in`) containing a colored status dot and confirmation message.

---

## 4. Layout & Interaction Animations
*   **Fade-Up Animation (`.fade-up`)**: All dynamic templates, modals, and views enter from `translateY(14px)` with opacity starting at `0`, easing smoothly into place over `0.7s` (`cubic-bezier(0.16, 1, 0.3, 1)`).
*   **Dotted Surface & 3D Cards (`WaveCards`)**:
    *   The home page features an interactive canvas simulating Polaroid-style visual cards floating over a dotted grid structure using responsive 3D transforms (`rotate(Xdeg)`, `translateY(Xpx)`).
*   **Animated Search Input (`AnimatedSearchInput`)**:
    *   Used in Idea Bazaar and Team search bars. It simulates keyboard typing by deleting and entering sample search queries dynamically in the placeholder field (e.g., typing *"AI Agents..."*, deleting it, and then typing *"Designer..."*).

---

## 5. Dark Surface Conventions
The app renders **dark-first**. There is a global override `.bg-white { background:#0F0E1C !important; }`, so **never** use light arbitrary-hex utilities (`bg-white`, `bg-gray-50`, `bg-[#f3f4f6]`) for surfaces. Use **translucent white** layered over the dark base instead:

| Purpose | Utility |
|---|---|
| Neutral surface | `bg-white/[0.04]` → `bg-white/[0.07]` |
| Border / divider | `border-white/10` → `border-white/15` (solid, **not** dashed) |
| Accent chip | `bg-[color:var(--accent)]/12 border-[color:var(--accent)]/30 text-[color:var(--accent)]` |
| Status — Open / info | `bg-blue-500/15 text-blue-300 border-blue-400/25` |
| Status — Full / warning | `bg-amber-500/15 text-amber-300 border-amber-400/25` |
| Status — Accepted / success | `bg-emerald-500/15 text-emerald-300 border-emerald-400/25` |
| Status — Rejected / error | `bg-red-500/15 text-red-300 border-red-400/25` |
| Picked (idea claimed) | `rgba(168,85,247,…)` purple tint |

---

## 6. Shared Card & Pagination System (Teams + Idea Bazaar)

### Card skeleton
Both grids share one skeleton so they read as a family:

```
root  (FIXED height via inline style {height:'428px'}, overflow-hidden, flex flex-col)
 ├─ gradient header bar  (ID left, date right, mono uppercase)
 └─ body  (p-6 flex flex-col gap-4 flex-1 min-h-0)
      ├─ meta + title row (+ status / picked tag)
      ├─ sub-line (subtheme / theme)
      ├─ description  (flex-1 min-h-0, overflow-hidden + fade mask)  ← absorbs height variance
      ├─ chips / impact (optional)
      └─ footer  (mt-auto, border-t border-white/10) — pinned to the bottom
```

**Consistent-height rules:**
- Cards use a **fixed inline height** `style={{height:'428px'}}`. Do **NOT** use Tailwind arbitrary height classes (`h-[372px]`) — the Tailwind **CDN does not reliably JIT-generate** them, so they silently no-op.
- The description paragraph is the **flex absorber**: `flex-1 min-h-0` + `overflow:hidden` + a gradient **fade mask** (`maskImage:'linear-gradient(180deg,#000 80%,transparent)'`). Long copy fills the card and fades; short copy leaves a small gap above the footer.
- The footer uses `mt-auto`, so member/upvote summary + CTA **stay pinned at the bottom** and never float up when text is short.

> **Line-clamp gotcha:** inline `style={{display:'-webkit-box', WebkitLineClamp:N}}` **silently fails** here (computed `display` resolves to `flow-root`; full text renders). Use the `flex-1` + `overflow:hidden` + fade-mask approach instead.

### Pagination (identical on both lists)
```
flex items-center justify-between pt-6 border-t border-white/10 flex-wrap gap-3
 ├─ left:  "Showing {start}–{end} of {total} {teams|ideas}"   (text-[12px] text-mute-3)
 └─ right: ← Prev | windowed page numbers (max 7) | Next →
```
- Buttons: `background:rgba(255,255,255,0.06)`, `color:var(--mute-1)`, `rounded-[8px]`.
- **Active page:** `background:var(--accent)`, white text. Disabled Prev/Next: `disabled:opacity-40`.

---

## 7. Recent Updates (changelog)

### Home — Speakers section
New `SPEAKERS` const; full-bleed dark band (`#080612`) between Event Dates and Rewards. Eyebrow "Learn from the best", heading "Speakers & Mentors.", "View all sessions" → `setView('sessions')`. 3-col grid of gradient-ring avatar cards with topic + track pill and optional **Keynote** badge.

### Navigation
**Register** removed from the header (`NAV_ITEMS`); the page still exists in-app, just not a top-level item.

### Idea Bazaar cards
- Removed the green **"Approved"** badge (all listed ideas are approved).
- Removed **"Pick for my team"** — idea picking now lives **only on the Register page** (team admin picks from a dropdown of approved ideas).
- Added a **"Picked · {team}"** tag when an idea is claimed (`teams.find(t=>t.pickedIdeaId===idea.id)`).

### Register — idea picking
Step 1 has a **"Pick an Idea from the Idea Bazaar (optional)"** dropdown of approved ideas (ideas claimed by another team are disabled) + a preview card. `syncPickedIdea(teamId, prevId, nextId)` keeps `idea.pickedBy` / `team.pickedIdeaId` in sync on save.

### "Your submissions" cards
Re-themed to dark, status-tinted (Approved / Pending Review / Not Qualified) and redesigned into a **compact single row**: status icon + title + badge + theme · statement, with **Edit** on the right (hidden once approved). Rejected items show an inline reviewer note.

### Team cards & detail drawer
Re-themed drawer (stat boxes, member rows, "Seeking" label) to dark translucent surfaces; replaced **dashed** dividers with solid `border-white/10`; fixed a white-on-white chip bug.

### Consistent height + pinned footer (Teams + Idea Bazaar)
Both grids now use the fixed `428px` height + `flex-1` fade-mask description + `mt-auto` footer (see §6) so all cards align and footers sit at the bottom.

### Status logic — capacity-based
`isOpen(team)` is now **purely capacity-based**: `team.members.length < capOf(team)`. The legacy `team.open` recruiting flag is no longer used for display. A team is **OPEN** while it has free slots and **FULL** at capacity — there is no "Closed" state for non-full teams. Applied consistently to the card badge, card CTA (`Request to Join` vs `Full`), the **sidebar status filter** ("Open (n)" / "Full (n)"), and the detail-drawer tag.

### Seeking / skill chips — unified
Role chips ("Seeking Hacker", "Seeking Designer") and skill chips ("Machine Learning", etc.) now share **one accent chip style** (`bg-[color:var(--accent)]/12 border-[color:var(--accent)]/30 text-[color:var(--accent)]`). Roles keep the "Seeking" prefix to preserve meaning while staying visually consistent.

---

## 8. Dev / Preview Notes
- The app is a single file: **`v2.html`** (React + Babel standalone CDN + Tailwind CDN). All views, state, and seed data live here.
- The console **always** logs `[BABEL] … deoptimised the styling … exceeds the max of 500KB` and Tailwind CDN warnings — **expected, non-blocking noise**, not real errors.
- Tailwind arbitrary **height** classes are unreliable via the CDN; use inline `style={{height:'…'}}` for fixed card heights.
- SSO login (testing): open "Sign in", pick a user in the `<select>`, then click "Sign in with Google". User state is **not** persisted across reload.
