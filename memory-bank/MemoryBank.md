## Theme System

### Design Tokens

**Dark Mode:**

- Background: #0B0B0C (warm near-black)
- Text: #EAEAEA
- Text Muted: #888888
- Border: #1A1A1C
- Accent: #B5D827 (sage-lime)

**Light Mode:**

- Background: #F8F5EE (warm off-white)
- Text: #1A1A1A
- Text Muted: #5C5C5C
- Border: #E8E2D4
- Accent: #4D7619 (moss)

### Theme Implementation Strategy

**CSS Variables + Tailwind v4 Integration:**

- CSS custom properties define all theme values
- `@theme inline` block maps variables to Tailwind tokens
- `html.dark` class overrides for manual theme switching
- System preference detection with localStorage persistence
- No-FOUC inline script prevents theme flash on load

**Typography:**

- Geist Mono — body, nav, labels, dates, tech chips (default state)
- Geist Sans, weight 700–900 — hero name + section display only (clamp 56px → 144px)
- No new fonts beyond what's already loaded

**Hard Design Constraints:**

- No headshot anywhere; type fills the hero
- One accent doing real work; never sprinkled
- Decorative elements (dot grids, bracket frames, # prefixes) earned, not stacked
- Motion purposeful or absent; no parallax
