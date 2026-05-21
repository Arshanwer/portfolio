# Design Direction — v4

Canonical specification for the visual system. Source of truth for palette, typography, layout patterns, and what we've explicitly rejected. When code disagrees with this file, the code is wrong.

## v3 → v4 — what changed

v3 used a **180px sticky left sidebar** for primary nav + identity + social + theme. Live review found that even after dropping the name and bumping the menu, the sidebar still read as heavy chrome for a content-driven portfolio. v4 replaces it with two restrained floating elements: a **top-center nav pill** carrying the six text labels, and a **bottom-right utility pill** carrying social icons + mailto + theme. Both have thin borders, semi-transparent backgrounds, and `backdrop-blur` so content scrolls behind them — chrome whispers, content speaks.

Reference: [sawad.framer.website](https://sawad.framer.website/) for the floating top-center pill position. Sawad uses icons-only; v4 uses Geist Mono text labels in lowercase to preserve engineer-readability and WCAG AA legibility.

## v2 → v3 — what changed (superseded by v4)

v2 anchored long-form content (Hero, About, Experience) inside a centered `max-w-5xl` column and pushed Header / Footer chrome to viewport edges. v3 replaced that chrome with a 180px sticky left sidebar. Retained for history; the chrome direction is now v4.

## References

### Josh Comeau — joshwcomeau.com

Permission to be warm and expressive on a developer's personal site. His blog reads like a writer's home, not an agency template — confident color where it earns its place, generous spacing, mixed type voices (serif for prose, sans for UI), and motion used to reward attention rather than perform. **What we take from him:** the accent can be loud where it matters; restraint applies to *how many* accents we use, not to whether the one we have shows up boldly. Personality without sacrificing readability.

### Maggie Appleton — maggieappleton.com

Earnestness over polish. Warm paper-toned backgrounds, hand-feel illustration marginalia, an unhurried type-driven layout that respects the reader. The "digital garden" tone — work-in-progress, honest, personal. **What we take from her:** the warm off-white background in light mode (`#F8F5EE`) and the voice direction — first-person, present-tense, no agency speak.

### Dribbble — mono-leaning developer shot

A folio-style layout built almost entirely in monospace at body scale, with section labels prefixed `#name` and tech chips in restrained borders. Engineering credibility without performing rigidity. **What we take from it:** Geist Mono as the default body voice, and the `#section` prefix pattern as one of several earned decorative options.

### Dribbble — bold-display photographer shot

The hero is **type, not photo** — name set in heavy sans at display-poster scale (well into 100px+), with whitespace doing the framing that a portrait would normally do. **What we take from it:** the no-headshot rule, and the Geist Sans heavy display moment that anchors the home hero.

## Palette (locked)

### Dark mode

| Token          | Value     | Role                                                |
| -------------- | --------- | --------------------------------------------------- |
| `--bg`         | `#0B0B0C` | Warm near-black, not pure black                     |
| `--text`       | `#EAEAEA` | Primary text                                        |
| `--text-muted` | `#888888` | Secondary text, dates, mono labels                  |
| `--border`     | `#1A1A1C` | Section dividers, chip borders                      |
| `--accent`     | `#B5D827` | Sage-lime. Single accent.                           |

### Light mode

| Token          | Value     | Role                                                |
| -------------- | --------- | --------------------------------------------------- |
| `--bg`         | `#F8F5EE` | Warm off-white (Maggie-coded paper tone)            |
| `--text`       | `#1A1A1A` | Primary text                                        |
| `--text-muted` | `#5C5C5C` | Secondary text                                      |
| `--border`     | `#E8E2D4` | Section dividers, chip borders                      |
| `--accent`     | `#4D7619` | Moss. Same hue family as sage-lime, brightened to feel less dead against the warm cream while still passing WCAG AA (4.74:1). Original forest `#3F5C1C` (6.88:1) was tonally too muted — replaced 2026-05-13 after live review. |

Hue chosen so both modes feel like the same site. Verify accent against `--bg` in both modes before shipping — target ≥ 4.5:1 for text-on-bg, ≥ 3:1 for non-text uses (decorative marks, icons, borders carrying meaning).

## Typography (locked)

No new fonts. Both Geist variants are already loaded via `next/font`.

| Use                                            | Family     | Weight  | Scale                                |
| ---------------------------------------------- | ---------- | ------- | ------------------------------------ |
| Hero name (home)                               | Geist Sans | 800–900 | `clamp(56px, 14vw, 144px)`           |
| Major section display headers (e.g. `#about`)  | Geist Sans | 700–800 | `clamp(40px, 6vw, 72px)`             |
| Body prose                                     | Geist Mono | 400     | 15–16px, line-height 1.6             |
| Nav, labels, dates, tech chips                 | Geist Mono | 400     | 12–14px, often uppercase tracked     |
| Captions, fine print                           | Geist Mono | 400     | 11–12px                              |

Geist Mono is the **default voice**. Geist Sans heavy interrupts it intentionally — hero, section openings, and (selectively) a key emphasis word. Mono-leaning, not mono-only. The contrast between mono body and heavy-sans display is what gives this direction personality versus Direction A's uniform editorial serif.

## Layout patterns

**Floating top-center nav pill + bottom-right utility pill (v4, current).** Two restrained floating chrome elements, both pill-shaped (`rounded-full`, thin border on `--border`, `bg-background/80` with `backdrop-blur-md`):

- **TopNavPill** — `fixed left-1/2 top-5 -translate-x-1/2`. Carries the six menu items as Geist Mono lowercase text labels (home, work, projects, stack, photography, thoughts). Active state is accent text color only (no heavy pill background). Active resolution: scroll-driven on `/` via `useActiveSection` IntersectionObserver, pathname-driven on dedicated routes via `resolveActiveLabel` with prefix matching. On `< md` the pill collapses to a single hamburger button that toggles `MobileMenuOverlay` (a sheet containing menu + social + email + theme).
- **BottomRailPill** — `fixed bottom-5 right-5`. Carries social icons (github, linkedin), a mail icon (mailto), a divider, and the theme toggle. Hidden on `< md` (mobile users get the same controls inside `MobileMenuOverlay`).

Pages reserve top padding (`pt-28` baseline, `pt-32`/`pt-36` at larger breakpoints) to clear the pill on initial load; on scroll, content passes behind the pill's blurred background. Page sections are centered with `mx-auto max-w-6xl` since the sidebar no longer flanks them. The v3 sticky-left-sidebar layout is superseded.

**No headshot anywhere.** The home hero is filled by oversized typography. A face on the page would override every typographic decision and pull the site toward generic agency aesthetic. This is a hard rule, not a preference.

**Mono-leaning base.** Body, nav, labels, dates, captions all default to Geist Mono. This is the engineer-voice baseline. Geist Sans heavy is the deliberate interruption.

**One accent doing real work.** Accent appears on:

- Active nav link
- Underline of important inline links (`text-decoration-color: var(--accent)`, thick, generous offset)
- Emphasis on a key word in a sentence (sparingly)
- Small graphic marks — mono carets, `#` prefixes, list bullets, section indicators

Don't sprinkle. If two unrelated things on the same view are both using accent, ask which one earns it more and demote the other.

**Decorative elements — earned, not stacked.** Allowed:

- Dot grids (small fields used as spatial anchors near hero or section breaks)
- Bracket frames (`[ ]` around emphasis blocks, callouts)
- Section eyebrow prefixes — either `#section` or `_NN section` (numbered, co-equal). The numbered form is used on the home page (`_01 hello` … `_06 thoughts`) so the sidebar can mirror the scroll position; the `#` form remains valid on standalone routes.
- Monospace caret accent (`|` blinking or static, at most once per page)

Rule: at most two distinct decorative patterns visible together. Never all four.

**Motion — purposeful only.** Scroll-triggered fade-ins on section entry, hover states on nav and cards, subtle page transitions. No parallax, no decorative animation, no particle effects, no entrance choreography on subsequent loads or on any non-home route.

**Live status indicators may pulse subtly** (at most one per page) — these communicate real-world state (e.g. availability) rather than serve decoration. The pulse must be a continuous, low-amplitude ring expansion and must freeze under `prefers-reduced-motion: reduce`.

**Exception — first-visit-per-session interactive reveal (home only).** On the first visit to `/` in a browser tab, a black greeting overlay shows a large accent-coloured `HELLO.` plus a small "[ click anywhere to enter ]" prompt; click or any keypress triggers a sage-lime tile grid that flips outward from centre to unveil the home page. Gated by `sessionStorage('introShown')` so subsequent loads in the same tab skip it. Under `prefers-reduced-motion: reduce` the greeting still shows but the trigger plays a 250ms opacity fade instead of the tile flip. The greeting hardcodes the dark-theme accent (`#B5D827`) regardless of the user's selected theme — this is the only context where the accent token is overridden, because the greeting bg is always black and the dark-theme value reads more vividly than the light-theme moss. Implementation: `src/components/ui/IntroReveal.tsx` + `.intro-overlay` rules in `globals.css`.

**Mobile-first.** Verify at 375 / 768 / 1280. The hero display type must stay confident at 375 — don't shrink it into ordinariness; let it overhang or rebalance to two lines if needed.

**Semantic HTML, WCAG 2.1 AA, keyboard accessible.** Arshad ships AA professionally — match that bar.

## Information architecture

Multi-page, sidebar-persistent:

- `/` — Home: scrolling editorial document with numbered sections `_01 hello` (hero, with bio folded in), `_02 work` (timeline), `_03 projects` (linking out to case studies), `_04 stack`, `_05 photography` (teaser), `_06 thoughts` (teaser).
- `/projects/[slug]` — Long-form case studies. Dynamic route with a coming-soon template until each writeup is published (`status: 'coming-soon' | 'published'` per entry in `src/data/projects.ts`).
- `/photography` — Full masonry gallery (Cloudinary-backed).
- `/thoughts` — Blog landing. Coming-soon for v1; becomes the listing once posts ship.

Superseded: the `/work` and `/work/[slug]` routes from v2. Pixxellent moved to `/projects/pixxellent`.

## What we explicitly rejected — Direction A (editorial dossier)

**Attempted:** early Phase 2. Visual language: two-column sticky sidebar, Instrument Serif name at masthead scale, dark navy background (`#0F172A`), amber accent (`#C97A3A` / `#F0A96B`), uppercase mono section nav, single-page scroll.

**Why rejected:**

- Serif at masthead scale read magazine-coded, not modern-engineer.
- Dark navy + amber felt cold and corporate, missing the warmth the references called for.
- Overall too formal and classical for the engineer-with-personality positioning.

(An earlier note here flagged the sticky sidebar itself as problematic. On closer reading the "template recycling" risk came from the *full package* — serif + dark navy + amber + sidebar — not from the sidebar in isolation. v3 reintroduces the sidebar paired with the warm v2 palette and the Geist Mono + Geist Sans heavy type stack, and it reads as engineering-editorial rather than agency-formal.)

**Disposition:** archived on branch `archive/direction-a-editorial` (HEAD at `74766b7`). Recoverable, not deleted.

**Lesson kept:** test a direction by rendering it at scale, not by describing it. A direction that reads well in the abstract can still feel wrong once it's on the page. Useful tax, not wasted work.
