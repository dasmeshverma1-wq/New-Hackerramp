# AI Vibe-Coding Migration Guide: Single-File HTML to React + TypeScript

This guide provides step-by-step instructions and copy-paste AI prompts (optimized for Cursor, Claude, or Copilot) to convert the single-file **Myntra Tech Week 2026** codebase (`index (1).html`) into a modern, modular **React + TypeScript + Vite** project.

---

## 1. Project Initialization (Scaffolding)

To set up a fast, clean developer environment, initialize a Vite project in your new project folder:

```bash
# 1. Create a new React-TS Vite project
npx create-vite@latest mtw-react-ts --template react-ts

# 2. Navigate to directory and install dependencies
cd mtw-react-ts
npm install

# 3. Install Tailwind CSS & PostCSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

## 2. Global Type Definitions (`src/types.ts`)

TypeScript is critical for ensuring compile-time safety across components. Run a prompt to generate your types first.

### Vibe-Coding Prompt 1: Generate Types
> Copy-paste this prompt into your AI model:
```text
Review the constants (USERS, INIT_TEAMS, SESSIONS, SCHEDULE, DAILY_EVENTS, INIT_IDEAS, QUIZZES) in our HTML React code. 
Create a file 'src/types.ts' containing all TypeScript interfaces for:
- User (id, name, email, dept, role, tag)
- Team (id, name, theme, subTheme, abstract, members, maxSize, open, depts, scores, skillsNeeded, rolesNeeded, leadName, leadDept)
- Session (id, title, track, status, date, time, speaker, desc)
- Idea (id, title, desc, theme, authorId, authorName, authorDept, status, submittedAt, upvotes)
- Quiz (q, opts, correct, explain)
- ScoreCard (prob, tech, prod, cust, hack, isDraft)
- ScoreDetails (Record of teamId to Record of roundName to ScoreCard)
```

---

## 3. Modular Styling Migration

1.  **Configure Tailwind**: Replace the generated `tailwind.config.js` with code that targets your source files:
    ```javascript
    /** @type {import('tailwindcss').Config} */
    export default {
      content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter Tight', 'sans-serif'],
            serif: ['Fraunces', 'serif'],
            mono: ['JetBrains Mono', 'monospace'],
          }
        },
      },
      plugins: [],
    }
    ```
2.  **Migrate Custom CSS**: Copy the CSS custom variables and animations from the HTML `<style>` block and append them directly to the top of `src/index.css`:
    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    :root {
      --ink: #0A0A0A; --ink-2: #1A1A1A;
      --paper: #FAFAF7; --paper-2: #F2EFE7;
      --accent: #FF3F6C;
      /* Add other CSS custom properties from index (1).html */
    }

    @keyframes fade-up {
      from { opacity: 0; transform: translateY(14px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .fade-up { animation: fade-up 0.7s cubic-bezier(0.16,1,0.3,1) forwards; }
    ```

---

## 4. Component Slicing Blueprint

Split the 4900+ lines of monolithic React code into this folder structure:

```
src/
├── data/
│   └── mockData.ts         # Holds static USERS, INIT_TEAMS constants
├── components/
│   ├── ui/
│   │   ├── Button.tsx      # Btn element mapped to variant options
│   │   ├── Input.tsx       # Inp, Sel, Txt components
│   │   ├── Tag.tsx         # Tag badge element
│   │   └── Modal.tsx       # Modal dialog wrapper
│   ├── WaveCards.tsx       # Three.js 3D polaroid gallery
│   ├── Countdown.tsx       # Standard event countdown timer
│   └── AnimatedSearch.tsx  # Dynamic search bar with placeholder loops
├── views/
│   ├── HomeView.tsx
│   ├── TeamsView.tsx
│   ├── IdeaBazaarView.tsx
│   ├── RegisterView.tsx
│   ├── FunZoneView.tsx
│   ├── CalendarView.tsx
│   ├── SessionsView.tsx
│   └── AdminView.tsx
├── types.ts                # TypeScript interfaces
├── App.tsx                 # Core Routing & Global State Context
└── main.tsx
```

---

## 5. Vibe-Coding Prompts for Components Migration

Once you have your types and folder structure, feed these prompts to your AI assistant to generate modular code.

### Vibe-Coding Prompt 2: Static Mock Data
```text
Create 'src/data/mockData.ts' using the seed constants from the HTML code. Import the types from '../types' and type-check the mock arrays:
export const USERS: User[] = [...];
export const INIT_TEAMS: Team[] = [...];
export const SESSIONS: Session[] = [...];
// Add all arrays. Make sure to export them cleanly.
```

### Vibe-Coding Prompt 3: UI Atoms Migration
```text
Build React TypeScript components for 'Button.tsx', 'Input.tsx', 'Tag.tsx', and 'Modal.tsx' using the definitions in 'index (1).html'. Ensure:
- The props are fully typed.
- Component designs match the HSL variable styling system (Ink & Paper colors).
- Tailwinds class conversions are handled cleanly.
```

### Vibe-Coding Prompt 4: App State & Router Migration
```text
Write our core 'src/App.tsx' component. It needs to:
1. Handle active viewport navigation state ('home', 'teams', 'ideabazaar', etc.).
2. Initialize global React state for user, teams, scoreDetails, ideas, and notifications.
3. Render the Nav header (Nav.tsx) and dynamically render the view panels (HomeView, TeamsView, etc.) based on active viewport state.
4. Pass state updaters down to child views. Ensure TS compilation checks pass.
```

### Vibe-Coding Prompt 5: Individual Views Migration (Run sequentially)
```text
Let's build 'src/views/HomeView.tsx' (or TeamsView, IdeaBazaarView, etc.).
- Convert the inline JSX code from the HTML file.
- Use components from 'src/components/ui/'.
- Strongly type all event handlers (e.g. upvoting ideas, clicking team cards).
- Use mockData exports for initial listings.
```

---

## 6. Testing & Running
Run the development environment locally to compile TypeScript and bundle assets:
```bash
npm run dev
```
If compilation errors occur, mouse-hover over the red lines in Cursor and hit `Cmd+I` (Mac) or `Ctrl+I` (Win) to let the AI auto-resolve missing typings or incorrect imports.
