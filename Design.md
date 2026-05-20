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
