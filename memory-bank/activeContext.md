# Active Context

## Current Work Focus

**Phase 2 — v2 Visual Rebuild & Site Structure** (about to begin)

Direction A (editorial dossier) was attempted in early Phase 2 and abandoned — too formal, too classical, didn't match the actual taste once rendered. After reviewing Josh Comeau, Maggie Appleton, and two Dribbble references, Direction v2 (modern-developer with personality, mono-leaning, sage-lime accent) was locked. Visual rebuild now begins.

## Recent Changes

- Direction A attempted and rejected; to be archived on branch `archive/direction-a-editorial`
- Direction v2 locked: palette, typography, IA, and hard constraints all decided
- progress.md rewritten to reflect v2
- design-direction.md to be created as canonical v2 spec
- CLAUDE.md to be established at project root

## Next Steps

1. Audit & reconcile repo state; archive Direction A on branch
2. Theme refit — replace globals.css palette with v2 colors; verify AA contrast
3. Resolve Phase 1 cleanup items (duplicate ThemeToggle, hard-coded Arial font, triple-defined theme vars, unused sass dep)
4. Header + Footer — multi-page nav (Home, Work, Photography), no avatar
5. Home hero — oversized typography (Geist Sans heavy), no headshot
6. Home About + Experience timeline
7. `/work` index + `/work/pixxellent` case study
8. `/photography` masonry gallery
9. Update progress.md at end of session

## Active Decisions & Considerations

**Locked**

- Multi-page IA: `/`, `/work`, `/work/[slug]`, `/photography`
- Palette — Dark: bg #0B0B0C / text #EAEAEA / accent #B5D827 (sage-lime); Light: bg #F8F5EE / text #1A1A1A / accent #4D7619 (moss)
- Typography: Geist Mono (body, nav, labels), Geist Sans heavy (hero + section display). No new fonts.
- No headshot anywhere. Type fills the hero.
- One accent doing real work; decorative elements earned not sprinkled; motion purposeful only.

**Under consideration**

- State management (likely none needed for current scope)
- Animation library (CSS transitions first, Framer Motion only if a specific interaction warrants it)
- Testing strategy
- Analytics integration

## Important Patterns & Preferences

**Code Organization**

- Server Components by default, "use client" only when needed (ThemeToggle)
- PascalCase for components, camelCase for utilities
- Path aliases (@/\*) for clean imports
- Strict TypeScript typing for all props and functions

**Styling Patterns**

- Global CSS in `src/styles/globals.css`
- CSS custom properties for all theme values
- `@theme inline` mapping for Tailwind token integration
- Utility-first Tailwind for layout, custom utility classes for repeated patterns

**Theme System Patterns**

- CSS variables define colors, spacing, shadows
- `html.dark` class overrides for theme switching
- localStorage persistence with system preference fallback
- No-FOUC inline script in layout.tsx
- suppressHydrationWarning for theme class hydration

## Current Challenges

**Content Pending**

- Pixxellent case study content (problem, approach, screenshots)
- Photography assets and any category grouping
- First-person voice copy for About section

**No Active Technical Challenges**

Theme system architecture is sound; palette swap is mechanical. All dev tooling working correctly.

## Context Notes

**Project Readiness**

Ready for Phase 2 visual rebuild. Theme architecture stays; only palette and visual layer change.

**Memory Bank Status**

All files reconciled to v2 direction. design-direction.md is the canonical spec for the visual system; progress.md tracks chunk-level progress.

**Next Session Preparation**

Open a fresh Claude Code session, paste the pivot prompt, work through Steps 1–5 in order. Don't skip pause points.
