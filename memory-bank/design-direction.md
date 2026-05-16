# Design Direction — v3

Canonical specification for the visual system. Source of truth for palette, typography, layout patterns, and what we've explicitly rejected. When code disagrees with this file, the code is wrong.

## v2 → v3 — what changed

v2 anchored long-form content (Hero, About, Experience) inside a centered `max-w-5xl` column and pushed Header / Footer chrome to viewport edges. v3 replaces that chrome with a **180px sticky left sidebar** that persists across all routes, carries menu / social / contact / theme, and tracks the active home-page section via scroll position.

What's kept from v2 (still locked): the palette, the Geist Mono base voice + Geist Sans heavy display moments, the no-headshot rule, the "one accent doing real work" discipline, and the motion philosophy. Only the chrome shifted.

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

**Sticky left sidebar (v3, current).** 180px sticky aside on the left edge, full viewport height, right border `0.5px solid var(--border)`. Carries: name (two lines, Geist Sans 800), role + location (mono 10px muted), MENU nav (with `→` accent prefix on the active item), SOCIAL, CONTACT email at the bottom, theme toggle. Persists across all routes. Active state on `/` is scroll-driven (IntersectionObserver, ~40% from viewport top); on dedicated routes it's pathname-driven. Mobile (<768px) collapses to a 48px sticky top bar with a slide-out drawer rendering the same content. The earlier v2 pattern (centered `max-w-5xl` + chrome at viewport edges) is superseded.

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

**Motion — purposeful only.** Scroll-triggered fade-ins on section entry, hover states on nav and cards, subtle page transitions. No parallax, no decorative animation, no particle effects, no entrance choreography.

**Live status indicators may pulse subtly** (at most one per page) — these communicate real-world state (e.g. availability) rather than serve decoration. The pulse must be a continuous, low-amplitude ring expansion and must freeze under `prefers-reduced-motion: reduce`.

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
