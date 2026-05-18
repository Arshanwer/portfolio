# Patterns

Conventions for writing code in this repo. Agents and humans should consult this before adding components, routes, or utilities. When code disagrees with this file, the code is wrong (or this file is, in which case update it).

## Naming

- Components: `PascalCase`, one component per file, file name matches the component (`Hero.tsx`, not `hero.tsx`).
- Types and interfaces: `PascalCase`.
- Variables and functions: `camelCase`.
- Hooks: `use` prefix (`useActiveSection`).
- Data modules: lowercase noun (`sidebar.ts`, `projects.ts`). Export an `UPPER_SNAKE` constant for the array (`MENU`, `PROJECTS`) and a `PascalCase` type for the row (`MenuItem`, `Project`).
- Slugs: lowercase, hyphenated. Used as URL paths and React keys.

## Server vs client components

- **Server components by default.** Add `"use client"` only when the component needs state, effects, browser APIs, or event handlers.
- Pure presentation components in `src/components/sections/` and `src/components/ui/` should stay server unless they truly need the client (`RevealObserver`, `ThemeToggle`, `TopNavPill`, `MobileMenuOverlay`, `PhotographyGallery` are the current clients).
- Async data fetching belongs in server components (`PhotographyTeaser`, `Photography`, `ProjectPage`) — not in `useEffect`.

## Routing

- App Router only. Routes live in `src/app/<route>/page.tsx`. Layouts live in `src/app/<route>/layout.tsx` if needed.
- Dynamic routes use `generateStaticParams()` so the route is SSG, not on-demand.
- Anchor-only sections of the home page (`#work`, `#projects`, etc.) are not separate routes — they're sections rendered inside `src/app/page.tsx`.

## Theming

- Use the five theme tokens via Tailwind classes: `bg-background`, `text-foreground`, `text-muted`, `border-border`, `text-accent`.
- Do not hardcode hex values in components. If you need a one-off colour, add it to `globals.css` as a token first.
- Dark mode is class-based (`html.dark`). Don't write inverse colour overrides manually — the token swap handles it.

## Tailwind v4 usage

- No `tailwind.config.js`. Configure via `@theme inline` in `src/styles/globals.css`.
- Arbitrary values are fine (`text-[13px]`, `pt-[60px]`) where the design canon calls for specific numbers.
- Prefer named scale tokens (`text-sm`, `px-6`, `gap-4`) for routine spacing/sizing.
- Mobile-first: write base styles for mobile, layer `sm:`, `md:`, `lg:` modifiers up.
- Use `motion-reduce:transition-none` next to any `transition-*` so animations respect `prefers-reduced-motion`.

## Icons

- All icons come through [`src/components/Icon.tsx`](../src/components/Icon.tsx). It wraps `lucide-react` and standardises size and stroke weight.
- **Never import `lucide-react` directly in feature code.** The wrapper is the seam — if we ever swap icon sets, only one file changes.
- Default size 18, stroke 1.75. Override with `size={N}` only when the design calls for it.

## Images

- All raster images use `next/image`. The Cloudinary loader in `src/lib/cloudinary-loader.ts` is wired via `next.config.ts`, so a `<Image src={publicId} ...>` with a Cloudinary public id Just Works.
- Always pass `width` and `height` for masonry/photo content — prevents layout shift.
- Only the first 6 home-teaser images get `priority`. Don't prioritise below-the-fold images.
- Use the `blurDataURL` returned by `fetchPhotos()` for the placeholder.

## Data

- Content lives in `src/data/<noun>.ts`. Components import the constant + helpers, never inline.
- Helpers live next to the data they query (`getProject(slug)` in `src/data/projects.ts`, `resolveActiveLabel(pathname, activeSection)` in `src/data/sidebar.ts`).
- Data modules must be pure — no React, no DOM, no async. They should be trivially unit-testable.

## Hooks

- Custom hooks live in `src/hooks/`, file name = hook name (`useActiveSection.ts` → `useActiveSection`).
- Hooks may import from `src/data/` but not from `src/components/`.

## Component composition

- Server components compose freely.
- Client components should be leaves — keep client boundaries small. Don't make a section a client component just because one button inside it needs `onClick`; lift the button to its own client file and import it.
- Pass server-rendered children through client wrappers via `children` props when you need to combine layers.

## Accessibility (WCAG 2.1 AA is the bar)

- Semantic HTML: `<nav>` for navigation, `<main>` for the primary content, `<section>` per scroll section, `<article>` for self-contained pages.
- Every interactive element must be keyboard focusable. Use `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent` (or equivalent) on links/buttons.
- `aria-current="page"` on active route nav items; `aria-current="location"` on scroll-tracked active sections.
- `aria-label` on icon-only buttons.
- `aria-hidden="true"` on decorative glyphs (the `→`, `↗`, `↘`, `_NN` numbers).
- Image `alt` text comes from Cloudinary metadata; empty `alt=""` is acceptable only when surrounding context already describes the image (e.g. gallery thumbnails inside a labelled gallery).
- Contrast: text 4.5:1, large text and non-text 3:1. Both themes verified.

## Code quality

- TypeScript strict. No `any` without an inline `// reason: …` comment.
- Use early returns to flatten conditional code (Yoda-style nested `if`s are a smell).
- No line-by-line code comments. Comment only when the *why* is non-obvious — a workaround, a constraint, a surprising invariant. Don't restate the *what*.
- No new dependencies without asking. The minimum bar for adding a package is: replaces ≥ 30 lines of project code OR enables something genuinely hard to do natively.
- No analytics, tracking, or third-party scripts.

## Commits

- Plain conventional commits (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`).
- Subject under 80 chars, present tense, lowercase after the colon.
- No Claude attribution: no `Co-Authored-By: Claude`, no "Generated with Claude Code" trailer, no emoji in commit messages.
- Don't push, don't force-push, don't rewrite `main` history.

## Known refactor candidates

Surfaced in the v4 audit. Pick one off when relevant work touches the area; don't refactor speculatively.

1. **NavList primitive.** [`TopNavPill.tsx`](../src/components/layout/TopNavPill.tsx) and [`MobileMenuOverlay.tsx`](../src/components/layout/MobileMenuOverlay.tsx) both walk `MENU.map` with identical active-state + `aria-current` derivation. Extract a shared `<NavItemLink>` or `<NavList>` to `src/components/layout/`.
2. **Social-link primitive.** Same shape — `BottomRailPill` and `MobileMenuOverlay` both walk `SOCIAL.map`. Roll into the same extraction.
3. **PillContainer / pill-chrome utility.** The `rounded-full border border-border bg-background/80 backdrop-blur-md shadow-sm` chrome is repeated across `TopNavPill`, `BottomRailPill`, and the mobile hamburger button. Either a `<PillContainer>` component or a `@layer components { .pill { … } }` utility in `globals.css`.
4. **Small-label / eyebrow primitive.** `font-mono text-[11px] uppercase tracking-[0.14em] text-muted` (and close cousins) recurs in `SectionEyebrow`, sidebar legacy bits, page eyebrows. Consider a `<Label>` micro-primitive.
5. **Test coverage.** Even pure data utilities (`resolveActiveLabel`, `getProject`) have no tests. Start there once Vitest is installed — see [`testing.md`](testing.md).

## Hard constraints

- Don't change the theme architecture (CSS vars + `html.dark` class) without flagging in the design doc first.
- Don't delete `./reference/`, `./memory-bank/`, or `./docs/`.
- Don't touch `next.config.ts` or `postcss.config.mjs` without flagging.
