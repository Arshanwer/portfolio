# Architecture

High-level shape of the portfolio. Read this before adding routes, libraries, or build configuration.

## Stack

| Layer | Choice | Notes |
| ----- | ------ | ----- |
| Framework | Next.js 15.5.4 (App Router) | No Pages Router. Server-first. |
| Runtime | React 19.1 | Concurrent features available. |
| Language | TypeScript 5.9, strict mode | No `any` without an inline rationale comment. |
| Styling | Tailwind CSS 4.x | `@import "tailwindcss"` in `src/styles/globals.css`. **No `tailwind.config.js`** — tokens live in a `@theme inline` block. |
| Icons | `lucide-react` via `src/components/Icon.tsx` wrapper | Never import `lucide-react` directly in feature code. |
| Fonts | Geist Sans + Geist Mono via `next/font/google` | Wired in `src/app/layout.tsx`. |
| Images | `next/image` with Cloudinary loader | Loader at `src/lib/cloudinary-loader.ts`, registered in `next.config.ts`. |
| Animation | CSS only | No motion libraries. Approved primitives: `status-pulse` keyframe, `reveal-on-scroll` IntersectionObserver toggle. |
| Tests | Vitest (planned, not installed) | See [testing.md](testing.md). |
| Lint | ESLint 9 + `eslint-config-next` | `npm run lint`. |

## File layout

```
src/
├── app/                          # App Router routes + root layout
│   ├── layout.tsx                # Root: fonts, no-FOUC theme script, TopNavPill, BottomRailPill, RevealObserver
│   ├── page.tsx                  # Home: composes Hero + Work + Projects + Stack + PhotographyTeaser + ThoughtsTeaser
│   ├── photography/page.tsx      # Full Cloudinary masonry gallery (ISR, revalidate 3600)
│   ├── projects/[slug]/page.tsx  # Dynamic case study (SSG via generateStaticParams)
│   └── thoughts/page.tsx         # Coming-soon page
├── components/
│   ├── Chip.tsx                  # Bordered tech chip with hover
│   ├── Icon.tsx                  # Lucide wrapper (THE only place lucide-react is imported in feature code)
│   ├── PhotographyGallery.tsx    # CSS-columns masonry + lightbox modal (client)
│   ├── ThemeToggle.tsx           # Dark/light toggle (client, localStorage-backed)
│   ├── layout/                   # Persistent chrome
│   │   ├── TopNavPill.tsx        # Fixed top-center pill, hamburger on mobile (client)
│   │   ├── BottomRailPill.tsx    # Fixed bottom-right utility pill, hidden on mobile (server)
│   │   └── MobileMenuOverlay.tsx # Mobile drawer sheet opened by TopNavPill (client)
│   ├── sections/                 # Home-page sections (server unless interactive)
│   │   ├── Hero.tsx              # _01 hello — display name + intro + status pulse + chips + mailto
│   │   ├── Work.tsx              # _02 work — static timeline + single resume CTA
│   │   ├── Projects.tsx          # _03 projects — links to /projects/[slug]
│   │   ├── Stack.tsx             # _04 stack — categorised chip rows
│   │   ├── PhotographyTeaser.tsx # _05 photography — 6-photo masonry + link to /photography
│   │   └── ThoughtsTeaser.tsx    # _06 thoughts — coming-soon teaser
│   └── ui/                       # Reusable primitives
│       ├── MasonryGrid.tsx       # CSS-columns container
│       ├── RevealObserver.tsx    # Single IntersectionObserver for .reveal-on-scroll fade-ins
│       ├── SectionEyebrow.tsx    # _NN <label> mono eyebrow
│       └── StatusPulse.tsx       # Accent dot + label, respects prefers-reduced-motion
├── data/                         # Pure data — no React, no DOM
│   ├── projects.ts               # Project type + PROJECTS array + getProject(slug)
│   ├── sidebar.ts                # MENU + SOCIAL + SECTION_IDS + resolveActiveLabel()
│   ├── stack.ts                  # STACK (categorised tech labels)
│   └── work.ts                   # WORK (role timeline)
├── hooks/
│   └── useActiveSection.ts       # IntersectionObserver hook returning most-in-view section id
├── lib/
│   ├── cloudinary.ts             # fetchPhotos() + RESUME_URL + CloudinaryPhoto type
│   └── cloudinary-loader.ts      # next/image loader (referenced in next.config.ts)
└── styles/
    └── globals.css               # Tailwind import, @theme inline tokens, status-pulse + reveal-on-scroll utilities, prefers-reduced-motion overrides
```

## Routing map

| Route | Generation | Notes |
| ----- | ---------- | ----- |
| `/` | Static | Single scroll: 6 sections with anchor ids `#hello`, `#work`, `#projects`, `#stack`, `#photography`, `#thoughts`. |
| `/photography` | ISR (1h) | Reads `fetchPhotos()` at build/revalidate. |
| `/projects/[slug]` | SSG | `generateStaticParams()` enumerates `PROJECTS`. Each slug renders the case-study layout. `status: 'coming-soon' \| 'published'` controls the bracket-framed banner. |
| `/thoughts` | Static | Coming-soon page. |

There is no `/work` route — it was retired in v3 → v4. Pixxellent lives at `/projects/pixxellent`.

## Data layer

There is no backend, no database, no external API beyond Cloudinary.

- Content is hand-authored in TypeScript modules under `src/data/`. Sections import the arrays they render.
- Cloudinary is read server-side via the Admin API in `src/lib/cloudinary.ts` (`fetchPhotos()`). Returns `CloudinaryPhoto[]` with `blurDataURL` for `next/image`.
- The resume PDF is hosted on Cloudinary too — `RESUME_URL` exports the upload URL (falls back to `/resume.pdf` if `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is not set).

When adding a new piece of content, find the matching `src/data/<name>.ts`. If none fits, create one. Components never inline content arrays.

## Theme system

- Two themes: light (warm cream) and dark (warm near-black). Tokens defined in `src/styles/globals.css` under `:root` and `html.dark`.
- Five tokens: `--bg`, `--text`, `--text-muted`, `--border`, `--accent`. **No other colours are allowed** in product code.
- Mapped to Tailwind classes via `@theme inline` (`bg-background`, `text-foreground`, `text-muted`, `border-border`, `text-accent`).
- Switching is `html.dark` ↔ no class. Toggle via `ThemeToggle` (client, localStorage). Initial state set by an inline `<script>` in `layout.tsx` to prevent FOUC.
- No `tailwind.config.js`. Tailwind v4 reads `@theme` directly from CSS.

If you need a new colour, you're probably wrong — verify with the design canon at [`memory-bank/design-direction.md`](../memory-bank/design-direction.md).

## Env vars

| Var | Used by | Notes |
| --- | ------- | ----- |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | `src/lib/cloudinary.ts` (RESUME_URL + image URLs), `src/lib/cloudinary-loader.ts` | Public, exposed to client. |
| `CLOUDINARY_API_KEY` | `fetchPhotos()` (server only) | Never imported client-side. |
| `CLOUDINARY_API_SECRET` | `fetchPhotos()` (server only) | Same. |
| `CLOUDINARY_FOLDER` | `fetchPhotos()` | Defaults to `portfolio`. |

`.env.local.example` documents the required vars. `.env*` files are git-ignored and explicitly denied for reading/editing in `.claude/settings.local.json`.

## Build + deploy

- `npm run dev` — Next dev server on port 3220.
- `npm run build` — production build. ISR routes (`/`, `/photography`) get prerendered with `revalidate = 3600`.
- `npm run start` — production server.
- Deploy target is **AWS** (not Vercel). Preserve ISR by deploying to a Node host (ECS, App Runner, Amplify SSR, EC2). Static export would silently no-op the photography revalidation.

## Where to look next

- Conventions and patterns: [`patterns.md`](patterns.md)
- Testing setup and conventions: [`testing.md`](testing.md)
- Visual canon (palette, typography, layout patterns): [`../memory-bank/design-direction.md`](../memory-bank/design-direction.md)
- Build history: [`../memory-bank/progress.md`](../memory-bank/progress.md)
