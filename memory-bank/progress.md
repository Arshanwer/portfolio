# Progress

## v2 Build Chunks

1. ✅ Theme system refit + type scale tokens — `b31a8ff`
2. ✅ Header + Footer + layout shell + `/work` and `/photography` stubs — `6c7573a`
3. ✅ Home Hero — `eea25da`
4. ✅ Home About + Experience timeline + chrome-edge layout — `bfe9b80`
5. ✅ Home Contact strip + footer email sync — `4d2a6ff`
6. ✅ `/work` index — Pixxellent featured card — `e7eae10` + `d77ac2a` (post-review refactor) + `c221cf3` (problem framing + queue specifics)
7. ⏭ `/work/pixxellent` case study — **deferred to Phase 4** (see "Future-Ready"). Card now carries the framing the case study would have duplicated; revisit when there are screenshots and lessons-learned from the live beta worth a dedicated page.
8. ✅ `/photography` gallery — Cloudinary integration + CSS multi-column masonry — `6fe1dd6` + post-credentials fixes (`c8edc0d`, `8e37c1e`): moved Image loader to `next.config.ts` `loaderFile` (was breaking Server→Client serialization), switched fetch from Search API to dedicated `/resources/by_asset_folder` endpoint (Search API has eventual-consistency lag; the basic Listing API silently ignores `asset_folder` and returns all images — `by_asset_folder` is the dynamic-folder-mode endpoint that actually filters)
9. 🟡 Responsive + accessibility pass — code-level a11y audit done + fixes landed (next)
10. 🔲 Polish + motion + final accent audit

## What Works

### Complete & Functional

**Development Environment**

- ✅ Next.js 15.5.4 development server runs successfully on localhost:3210
- ✅ TypeScript compilation works without errors
- ✅ TailwindCSS processing and styling system operational
- ✅ ESLint code linting configured and functional
- ✅ Hot reload and fast refresh working during development

**Core Infrastructure**

- ✅ App Router file structure properly configured
- ✅ Root layout with font optimization (Geist Sans & Mono)
- ✅ Global CSS with TailwindCSS imports
- ✅ TypeScript path aliases (@/\*) configured and working
- ✅ Build process (npm run build) generates production-ready code
- ✅ Static asset serving from /public directory

**Code Quality & Standards**

- ✅ Strict TypeScript mode enforced across project
- ✅ ESLint rules preventing common React and Next.js issues
- ✅ Consistent code formatting and import organization
- ✅ Next.js best practices implemented in initial files

**Documentation Foundation**

- ✅ Complete memory-bank documentation system established
- ✅ Project context, technical details, and patterns documented
- ✅ Clear development roadmap and phase planning
- ✅ Design direction v2 captured in `memory-bank/design-direction.md` (canonical visual spec)
- ✅ `CLAUDE.md` at project root — session protocol, stack, conventions, design-direction pointer

**Theme System Architecture**

- ✅ Tailwind v4 integration with `@import "tailwindcss"` in global CSS
- ✅ CSS custom properties for all theme variables
- ✅ Tailwind @theme inline token mapping for utility classes
- ✅ ThemeToggle component with localStorage persistence
- ✅ System preference detection and manual theme override
- ✅ No-FOUC prevention script in layout.tsx
- ✅ Hydration warning resolution with suppressHydrationWarning

**Design Direction (v2 locked)**

- ✅ References reviewed and synthesized: Josh Comeau, Maggie Appleton, two Dribbble shots (mono-leaning developer + bold-display photographer)
- ✅ Palette locked — Dark: bg #0B0B0C / text #EAEAEA / accent #B5D827 (sage-lime); Light: bg #F8F5EE / text #1A1A1A / accent #4D7619 (moss — swapped from forest #3F5C1C after live review on 2026-05-13; old hue was tonally too muted, new hue is brighter/more vivid at the same family, 4.74:1 contrast)
- ✅ Typography locked — Geist Mono for body/nav/labels/dates; Geist Sans heavy for hero + section display moments. No new fonts.
- ✅ Information architecture locked — multi-page: `/`, `/work`, `/work/[slug]`, `/photography`
- ✅ Hard constraints locked — no headshot, one accent doing real work, decorative elements earned not sprinkled, motion purposeful only

## What's Left to Build

### Phase 2: v2 Visual Rebuild & Site Structure

**Theme System Refit** — Chunk 1 ✅ `b31a8ff`

- ✅ Replaced palette in globals.css with v2 (sage-lime / moss — light-mode accent refined from initial forest #3F5C1C to moss #4D7619 on 2026-05-13)
- ✅ WCAG AA verified — accent on bg: dark ~12.0, light ~7.0; text/muted all pass
- ✅ Typography scale tokens defined — `--display-hero` `clamp(3.5rem, 14vw, 9rem)`, `--display-section` `clamp(2.5rem, 6vw, 4.5rem)`
- ✅ Legacy purge — removed `--primary`/`--secondary`/`--warning`/`--error`/`--success`, `--color-*` aliases, `.card`/`.btn-*`/`.text-gradient`/`.theme-toggle`

**Layout Components** — Chunk 2 ✅ `6c7573a`

- ✅ Header with multi-page nav (home / work / photography), active-route via `usePathname`, moss/sage-lime underline on active, `aria-current="page"` for a11y
- ✅ Footer with email + GitHub + LinkedIn + resume + location + year + "built with Next.js · Geist · sage-lime / moss" credit line
- ✅ Responsive mobile disclosure menu — hamburger → X, `#` accent shown only on active item, auto-closes on link click
- ✅ Layout shell — Header + `<main id="main">` + Footer mounted in `app/layout.tsx`, skip-to-content link added
- ✅ Route stubs — minimal `/work` and `/photography` pages with metadata so nav links don't 404
- ✅ Server-component compatibility — removed orphan `"use client"` from `Icon.tsx` per archived warning (it was breaking server-rendered Footer)
- ✅ Resume PDF wired — `reference/ArshadAnwerResume.pdf` copied to `public/resume.pdf`, served at `/resume.pdf` (200, application/pdf, 153 KB)

**Home Page (`/`)** — Hero ✅ `eea25da` · About + Experience ✅ `bfe9b80` · Contact ✅ `4d2a6ff`

- ✅ Hero — `Arshad Anwer` in Geist Sans 900 at `text-display-hero` clamp(56px → 144px); role + location in Geist Mono; one-line summary with accent underline on "infrastructure" as the earned accent moment; no headshot; type fills the space at all breakpoints (≥1024 the name now wraps to 2 lines inside the shared column — endorsed by design-direction.md "rebalance to two lines if needed", reads as poster-stacked)
- ✅ About — 3 first-person paragraphs (BSc Hons Staffordshire 2013 folded into ¶2), mono prose at `max-w-2xl`
- ✅ Experience timeline — reverse-chrono entries (Totara DevOps, Totara FE, Qijang, SEB) with date column, trimmed outcome bullets, accent dot on the current role, tech chips via new `Chip` component
- ✅ Chrome-edge layout — Hero/About/Experience anchored to centered `max-w-5xl` column; Header + Footer content pushed to viewport edges (`px-6 sm:px-8 lg:px-12`) so chrome frames the document at all sizes
- ✅ Contact strip — `#contact` heading, short tagline, email as primary inline CTA in mono (text-xl → text-3xl, persistent accent underline, hover shifts text color to accent), github/linkedin/resume secondary row, `↘ wellington, nz · open to remote` location label. Footer email reconciled to `contact@arshadanwer.com` per resume.

**Work (`/work`, `/work/[slug]`)** — Index ✅ `e7eae10`

- ✅ `/work` index — `#work` heading + Pixxellent featured card. Card chrome: thin `border-border` rectangle, static (no hover state on the card itself). Body carries two paragraphs (`c221cf3`): problem framing (origin as personal photo showcase → scope expansion into curated stock-asset platform → roadmap past photos into video and other digital asset types) and technical body (Next.js/Fastify/PostgreSQL stack with concrete RabbitMQ queue contents — transactional emails, S3 image tagging, image processing). Stack chips: Next.js, TypeScript, Fastify, PostgreSQL, Redis, RabbitMQ, AWS ECS, GitHub Actions. **Click target is the explicit "visit contributor.pixxellent.com ↗" inline link only** — initially built as a whole-card `<a>` (`e7eae10`) but reverted after visual review (`d77ac2a`) because the all-clickable surface felt heavier than the content warranted and broke text-selection of stack/body. Pattern to apply for future cards: explicit inline link as the call-to-action, not whole-surface. Mono comment-style `// more projects landing through 2026` note below the card.
- ⏭ `/work/pixxellent` case study — deferred. Decided 2026-05-13: with current content (resume bullets + problem framing), a dedicated case study would mostly duplicate the index card. Defer until there's substantive content worth its own route — screenshots from the live site, architectural deep-dives, lessons-learned from production. Tracked under Phase 4 / Future-Ready.

**Photography (`/photography`)** — Gallery ✅ `6fe1dd6` (pending credentials)

- ✅ CSS multi-column masonry (`columns-1 sm:columns-2 lg:columns-3`) — pure CSS, no JS, works everywhere. Reading order is column-down; fine for a photo grid with no captions.
- ✅ Image optimization via `next/image` with a custom Cloudinary `loader` — transformations handled by Cloudinary URL params (`w_{width},q_auto,f_auto,c_limit`). Next.js's built-in optimizer is bypassed entirely, so no platform-specific optimization budget or Lambda invocations on the deploy target.
- ✅ Cloudinary fetch — Server Component reads from Cloudinary's `/resources/search` Admin API, sorted by `created_at` desc, max 100. ISR via `revalidate = 3600` so new uploads appear within an hour without a redeploy.
- ✅ Empty state — when env vars are absent or the API returns nothing, page renders a mono `// gallery wiring up — photos go live once Cloudinary is connected` note instead of an empty grid.
- ✅ Env scaffolding — `.env.local.example` documents required vars. `.gitignore` updated to allow the example file through. `next.config.ts` `remotePatterns` allows `res.cloudinary.com`.
- 🔲 **User setup required before gallery is live:** create Cloudinary account (free tier), upload photos to a folder named `portfolio` (or override via `CLOUDINARY_FOLDER` env var), copy `.env.local.example` → `.env.local`, fill in `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` from Cloudinary console. Set the same env vars on the production host once AWS deployment shape is chosen (chunk 10).
- ⚠ **ISR caveat tied to deployment choice:** `revalidate = 3600` requires a dynamic Node.js host (ECS, App Runner, Amplify SSR, EC2). On pure static export to S3 + CloudFront, ISR is silently no-op and new Cloudinary uploads would only appear after a rebuild + redeploy. Resolve during chunk 10.
- 🔲 Optional category grouping — deferred until photo set warrants it. Cloudinary's search expression supports tag-based filtering, so this is a small follow-up if needed.

### Phase 3: Component Library & Polish

**UI Components**

- 🔲 Button component with variants (primary, ghost, link)
- 🔲 Card component for project showcases
- 🔲 Tech chip component (Geist Mono, subtle)
- 🔲 Typography components for consistent text styling
- 🔲 Image component wrappers with optimization
- 🔲 Form input components (text, email, textarea) — if/when contact form is added

**Decorative System**

- 🔲 Dot grid utility
- 🔲 Bracket-frame component for emphasis blocks
- 🔲 `#section` heading prefix style
- 🔲 Monospace caret accent (used sparingly)

**Motion**

- 🔲 Scroll-triggered fade-ins (purposeful only)
- 🔲 Hover states for nav, links, cards
- 🔲 Subtle page transitions

### Phase 4: Content & Future Growth

**Content Integration**

- 🔲 Resume PDF download link
- 🔲 Project data structure for adding future projects
- 🔲 Verify GitHub handle spelling against resume (`Arshanwer`)
- 🔲 Open Graph + favicon assets

**Future-Ready (not built yet)**

- 🔲 `/writing` route for future essays
- 🔲 `/work/pixxellent` case study — deferred from chunk 7. Build once there's screenshots from the live site + architectural lessons-learned worth a dedicated route.
- 🔲 Additional `/work/[slug]` case studies as projects ship
- 🔲 Contact form with validation (currently using email link)
- 🔲 Search functionality for projects (only if catalog grows)

### Phase 5: Optimization & Deployment

**Performance**

- 🔲 Image optimization and lazy loading audit
- 🔲 Code splitting and bundle size optimization
- 🔲 SEO meta tags and structured data
- 🔲 Performance monitoring
- 🔲 Accessibility audit (WCAG 2.1 AA)
- 🔲 Keyboard navigation verification

**Production Readiness**

- 🔲 Environment configuration for production
- 🔲 Error handling and 404 pages
- 🔲 Sitemap and robots.txt generation
- 🔲 Deployment to AWS with custom domain — architecture TBD (ECS or App Runner are the natural fit given the Pixxellent ECS background and to preserve `/photography` ISR; static export to S3 + CloudFront is the lighter alternative but loses ISR)
- 🔲 SSL certificate and security headers

## Current Status

### Project Phase: **Phase 2 — v2 Visual Rebuild & Site Structure** (in progress — 7 of 10 chunks done; chunk 7 deferred to Phase 4)

**Completion Overview**

- **Infrastructure**: 100% complete
- **Theme System**: 100% complete — palette swapped to v2, type scale tokens in place, legacy purged
- **Documentation**: 100% complete — `CLAUDE.md` + `memory-bank/design-direction.md` written and committed
- **Code Quality**: 100% complete — TypeScript strict, ESLint clean, `npm run build` passes
- **Design Direction**: 100% locked — v2

### Next Immediate Action

**Chunk 9 — Responsive + accessibility pass** (ready to begin)
Systematic sweep across all routes at 375 / 768 / 1024 / 1280 / 1920 in both themes. Keyboard tab-order, focus rings, screen reader landmarks. Confirm moss accent (`#4D7619`, contrast 4.74:1 — thin margin above WCAG AA 4.5:1) still feels right after seeing the whole site polished, or tune.

**User setup required before `/photography` is live:** create Cloudinary account (free tier, 25 GB storage / 25 GB bandwidth), upload photos to a folder named `portfolio`, copy `.env.local.example` → `.env.local`, fill in the three Cloudinary keys. Restart dev server. New uploads appear within an hour via ISR. See chunk 8 entry above for the full setup checklist.

**Verification gaps to address during chunk 9:**
- Automated visual verification at 1920 / 1280 / 768 / 375 in light + dark was not run on any chunk in this session (Playwright lock conflict with a stale browser session). Visual review was done by the user on live preview, which surfaced multiple issues (whole-card-clickable → `d77ac2a`; section padding mismatch → `704fd26`; light accent felt heavy → `20a6577`). Pre-push spot-check at all breakpoints still recommended; chunk 9 is the place to do this systematically.
- Light-mode accent at 4.74:1 contrast is thin — close to the AA floor. Worth re-checking against the final content set during chunk 9 to confirm decorative accent uses (dots, glyphs, borders) still feel intentional rather than washed out.

**Deferred to chunk 10 polish:** dim-on-hover for active experience card.

## Known Issues

### Outstanding Cleanup (from Phase 1 audit)

- ✅ Duplicate `<ThemeToggle>` mount in `app/page.tsx` — resolved in `70d1087`
- ✅ Hard-coded `Arial, Helvetica, sans-serif` — resolved in `70d1087`; body now defaults to Geist Mono per v2
- ✅ Theme tokens — collapsed to single `:root` + `html.dark` pair in `b31a8ff`
- ✅ `sass` in devDependencies — removed in `70d1087`
- 🔲 GitHub handle verification (`Arshanwer`) — tracked under Phase 4 / Content Integration

### No Current Technical Issues

- ✅ All development tools functioning correctly
- ✅ No TypeScript compilation errors
- ✅ No ESLint warnings or errors
- ✅ No dependency conflicts or security vulnerabilities
- ✅ Build process working without issues

### Documentation Status

- ✅ All memory-bank files contain comprehensive v2 project information
- ✅ `memory-bank/design-direction.md` written and committed (`a421ef2`) — canonical v2 visual spec
- ✅ `archive/direction-a-editorial` branch created at the former main HEAD (`74766b7`) — Direction A preserved, recoverable
- ✅ `CLAUDE.md` at project root — session protocol, stack, conventions, v2 direction summary

## Evolution of Project Decisions

### Initial Setup Decisions

**Framework Selection**

- ✅ **Next.js 15**: Chosen for excellent React DX, built-in optimizations, and deployment simplicity
- ✅ **App Router**: Selected over Pages Router for modern patterns and better developer experience
- ✅ **React 19**: Latest stable version with concurrent features and improved performance

**Styling Approach**

- ✅ **TailwindCSS 4**: Selected for utility-first approach with modern `@import "tailwindcss"` syntax
- ✅ **CSS Custom Properties**: Using for design token system (fonts, colors, spacing)
- ✅ **Mobile-First**: Responsive design philosophy established from the start

**Development Tools**

- ✅ **TypeScript**: Strict mode chosen for type safety and better developer experience
- ✅ **ESLint**: Next.js configuration for consistent code quality
- ✅ **Path Aliases**: @/\* mapping for cleaner imports and better file organization

**Documentation Strategy**

- ✅ **Memory-Bank System**: Comprehensive documentation approach for project continuity
- ✅ **Phase-Based Development**: Clear roadmap with defined milestones and deliverables
- ✅ **Session protocol**: End-of-session progress.md update + start-of-session re-read; established for multi-day continuity

### Design Direction History

**Direction A — Editorial Dossier (attempted, abandoned)**

- Attempted: early Phase 2
- Visual language: two-column sticky sidebar, serif hero, dark navy background, mono uppercase nav labels, single amber accent
- Reference: Brittany Chiang sticky-sidebar pattern + editorial typography
- Rejected because: read as too formal and classical for the engineer-with-personality positioning; serif at masthead scale felt magazine-coded rather than modern; cold palette lacked warmth
- Disposition: archived on branch `archive/direction-a-editorial` at `74766b7` (former main HEAD) — preserved, not deleted; lessons captured in `memory-bank/design-direction.md`

**Direction v2 — Modern-Developer with Personality (locked)**

- Selected after reviewing Josh Comeau, Maggie Appleton, and two Dribbble shots
- Visual language: mono-leaning base (Geist Mono body), bold sans display moments (Geist Sans heavy at hero scale), sage-lime accent on warm near-black (dark), moss accent on warm off-white (light) — initially forest #3F5C1C, refined to moss #4D7619 on 2026-05-13 for better tonal balance against the warm cream bg
- Information architecture: multi-page (`/`, `/work`, `/work/[slug]`, `/photography`)
- Hard constraints: no headshot, one accent doing real work, decorative elements earned, motion purposeful only
- Full specification: `memory-bank/design-direction.md` — references, palette, typography, layout patterns, rejected directions

### Locked Decisions

**Design System**

- ✅ Color palette: sage-lime (#B5D827) / moss (#4D7619), warm near-black / warm off-white backgrounds
- ✅ Typography: Geist Mono (body) + Geist Sans heavy (display) — no new fonts
- ✅ Animation approach: CSS transitions + scroll-triggered fades; Framer Motion only if a specific interaction warrants it
- ✅ Information architecture: multi-page (4 routes initial, room to grow)
- ✅ No-headshot rule for hero — type fills the space

### Pending Decisions (To Be Made in Future Phases)

**Technical Architecture**

- 🤔 State management approach (Context API vs Zustand vs none) — likely none needed for current scope
- 🤔 Testing strategy implementation
- 🤔 Analytics and monitoring integration
- 🤔 Content management approach for future projects (MDX vs hardcoded vs CMS)

**Deployment & Performance**

- 🤔 Custom domain and hosting configuration — pivoted from Vercel to AWS on 2026-05-13; specific shape TBD at chunk 10
- 🤔 Performance monitoring and optimization tools
- 🤔 CI/CD pipeline setup for automated deployment

### Success Metrics Tracking

**Development Velocity**

- Strong foundation established in Phase 1
- Clear documentation enabling efficient session-to-session continuity
- Direction A attempt was a useful exercise — surfaced the gap between proposed direction and actual taste before committing further work

**Code Quality**

- 100% TypeScript coverage with strict mode
- Clean, maintainable code structure established
- Best practices implemented from project start

**Project Organization**

- Comprehensive documentation system operational
- Clear phases with specific deliverables
- Session protocol established for multi-day work

## Next Development Session Goals

1.  **Chunk 4 — About + Experience timeline**: first-person About (Education line folded in), reverse-chrono cards (Totara DevOps → Totara FE → Qijang → SEB) with role, dates, outcome bullets, tech chips. Build `Chip` component during this chunk.
2.  **Chunk 5 — Home Contact strip**: email + GitHub + LinkedIn + location above the global footer.
3.  **Chunk 6 — `/work` index**: replace stub with Pixxellent featured card. Set up routing to `/work/pixxellent`.
4.  **End-of-session protocol**: commit chunk → confirm visually → update this file → commit `chore: update progress.md` → stop.
