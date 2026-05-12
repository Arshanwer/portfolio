# Design Direction — v2

Canonical specification for the visual system. Source of truth for palette, typography, layout patterns, and what we've explicitly rejected. When code disagrees with this file, the code is wrong.

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
| `--accent`     | `#3F5C1C` | Forest. Same hue family as sage-lime, tuned for AA. |

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
- `#section` heading prefixes (Geist Mono `#` before section labels)
- Monospace caret accent (`|` blinking or static, at most once per page)

Rule: at most two distinct decorative patterns visible together. Never all four.

**Motion — purposeful only.** Scroll-triggered fade-ins on section entry, hover states on nav and cards, subtle page transitions. No parallax, no decorative animation, no particle effects, no entrance choreography.

**Mobile-first.** Verify at 375 / 768 / 1280. The hero display type must stay confident at 375 — don't shrink it into ordinariness; let it overhang or rebalance to two lines if needed.

**Semantic HTML, WCAG 2.1 AA, keyboard accessible.** Arshad ships AA professionally — match that bar.

## Information architecture

Multi-page from the start:

- `/` — Home: hero, About, Experience timeline, contact strip, footer.
- `/work` — Projects index. Pixxellent featured, room for future cards.
- `/work/pixxellent` — Long-form case study (problem, approach, stack, screenshots, live link).
- `/photography` — Masonry / mixed-aspect gallery.

Future-ready (don't build yet): `/writing`, additional `/work/[slug]` entries.

## What we explicitly rejected — Direction A (editorial dossier)

**Attempted:** early Phase 2. Visual language: two-column sticky sidebar, Instrument Serif name at masthead scale, dark navy background (`#0F172A`), amber accent (`#C97A3A` / `#F0A96B`), uppercase mono section nav, single-page scroll.

**Why rejected:**

- Serif at masthead scale read magazine-coded, not modern-engineer.
- Dark navy + amber felt cold and corporate, missing the warmth the references called for.
- Sticky-sidebar pattern locked the site into one rhythm — hard to host distinct page types (case study, gallery) without feeling like the same template recycled.
- Overall too formal and classical for the engineer-with-personality positioning.

**Disposition:** archived on branch `archive/direction-a-editorial` (HEAD at `74766b7`). Recoverable, not deleted.

**Lesson kept:** test a direction by rendering it at scale, not by describing it. A direction that reads well in the abstract can still feel wrong once it's on the page. Useful tax, not wasted work.
