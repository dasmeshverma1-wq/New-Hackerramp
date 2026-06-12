# UI Components (shadcn / React)

This folder holds React components for a **Next.js + TypeScript + Tailwind + shadcn/ui** app, and bundled widgets for static pages.

## Current repo status

| Layer | Status |
|-------|--------|
| Static pages (`women-in-tech.html`, `v2.html`) | Tailwind via CDN, React via CDN in `v2.html` only |
| `components/ui/*.tsx` | TypeScript React source |
| `package.json` | React + framer-motion + esbuild for bundling |
| Full shadcn CLI / Next.js app | **Not scaffolded yet** — see setup below |

### Women in Tech — Text Scramble on headings

Main headings use the bundled `TextScramble` component:

```bash
npm install
npm run build:ui   # → assets/text-scramble.bundle.js
```

Mark up headings with `data-text-scramble`:

```html
<h1 class="h-display hero-title">
  <span data-text-scramble="Women in "></span>
  <span data-text-scramble="Tech" data-scramble-class="gradient-text" data-scramble-delay="350"></span>
</h1>
```

## Full shadcn setup (one-time)

The repo is **not** a shadcn project yet. To run demos and all TSX components natively:

```bash
# Scaffold Next.js with TypeScript + Tailwind
npx create-next-app@latest wit-app --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

cd wit-app

# shadcn/ui (default components path: src/components/ui)
npx shadcn@latest init

# Copy UI from this repo
cp ../components/ui/*.tsx src/components/ui/

npm install framer-motion gsap
```

### Why `components/ui`?

shadcn places primitives (`button`, `card`, etc.) and shared UI in **`components/ui`**. Keeping custom components there:

- Matches `@/components/ui/...` imports used in demos
- Avoids mixing app logic with reusable UI
- Works with shadcn CLI add/update commands

## Files

| File | Purpose |
|------|---------|
| `text-scramble.tsx` | Scramble-reveal text (framer-motion) |
| `text-scramble-demo.tsx` | Basic, hover-trigger, and custom charset demos |
| `heading-scramble-mount.tsx` | Bundled entry for static HTML pages |
| `cosmos-spectrum.tsx` | Scroll-driven spectrum SVG (GSAP) |
| `herowith-logos.tsx` | Bordered hero with CTAs, logo marquee, TextScramble title |
| `herowith-logos-demo.tsx` | Demo usage for Next/shadcn apps |
| `leadership-circle-scroll-mount.tsx` | Sticky scroll section for About / Leadership Circle |
| `scrolling-animation.tsx` | Concentric ring + radiating portraits on scroll |
| `shiny-button.tsx` | Shiny gradient CTA (button or link) |
| `shiny-button-demo.tsx` | Demo for Next/shadcn apps |
| `gradient-bars-background.tsx` | Animated gradient bar background section |
| `gradient-bars-footer-mount.tsx` | WIT footer with purple gradient bars |
| `gradient-bars-background-demo.tsx` | Interactive demo (Next.js + lucide-react) |
| `mini-navbar.tsx` | Floating pill nav with animated links |
| `mini-navbar-mount.tsx` | Bundled entry for `women-in-tech.html` |
| `mini-navbar-demo.tsx` | Demo for Next/shadcn apps |
| `avatar.tsx` | shadcn Avatar primitive (`@radix-ui/react-avatar`) |
| `button.tsx` | shadcn Button primitive (`@radix-ui/react-slot`, CVA) |
| `breadcramb.tsx` | shadcn Breadcrumb primitives (`lucide-react`, `@radix-ui/react-slot`) |
| `page-breadcrumb.tsx` | App-level breadcrumb with Home + trail items |
| `breadcramb-demo.tsx` | Demo for Next/shadcn apps |
| `empty.tsx` | shadcn Empty state layout primitives |
| `not-found-page.tsx` | 404 page with avatar stack + Empty + Button |
| `not-found-page-demo.tsx` | Demo for Next/shadcn apps |
| `not-found-page-mount.tsx` | Bundled entry for `404.html` |
| `hero-with-logos-mount.tsx` | Bundled entry for `women-in-tech.html` |

### 404 page (Not Found)

```bash
npm install
npm run build:ui   # → assets/not-found-page.bundle.js
```

Open `404.html` (e.g. `http://localhost:3030/404.html`). Uses shadcn `Empty`, `Button`, and `Avatar` with Unsplash portraits and a link back to Women in Tech.

### Gradient bars footer (Women in Tech)

```bash
npm run build:ui   # → assets/gradient-bars-footer.bundle.js
```

```html
<div id="gradient-bars-footer-root"></div>
<script src="assets/gradient-bars-footer.bundle.js" defer></script>
```

## TextScramble props

| Prop | Type | Default |
|------|------|---------|
| `children` | `string` | required |
| `duration` | `number` | `0.8` |
| `speed` | `number` | `0.04` |
| `characterSet` | `string` | A–Z, a–z, 0–9 |
| `as` | element type | `'p'` |
| `trigger` | `boolean` | `true` |
| `onScrambleComplete` | `() => void` | — |

## Dependencies

- **clsx** — conditional classes in `herowith-logos.tsx`
- **framer-motion** — motion wrapper for `TextScramble`
- **react** / **react-dom** — component runtime
- **esbuild** — builds `assets/text-scramble.bundle.js` for static HTML
- **gsap** — cosmos spectrum (CDN on static pages; `npm install framer-motion gsap clsx tailwind-merge` for Next)
- **@radix-ui/react-avatar**, **@radix-ui/react-slot**, **class-variance-authority** — shadcn primitives (404 page)
- **lucide-react** — icons on `not-found-page.tsx`

No lucide-react icons required for TextScramble.
