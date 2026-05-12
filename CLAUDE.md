# Portfolio — Project Context

Personal portfolio for Arshad Anwer (Senior Software Engineer, Wellington NZ).
Single-page, content-driven, design-restrained.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript (strict)
- Tailwind CSS v4 via `@import "tailwindcss"` in `src/styles/globals.css` — NOT v3 config-based
- Icons: lucide-react through `src/components/Icon.tsx` wrapper (never import lucide directly)
- Theme: CSS custom properties + class strategy (`html.dark` / `html:not(.dark)`), no-FOUC script in `app/layout.tsx`
- No animation library yet; add only with approval
- Dev: `npm run dev` (port 3210)

## Source of truth

- Content: `./reference/ArshadAnwerResume.pdf` — when this changes, update affected sections
- Design direction: **v2 — modern-developer with personality.** Mono-leaning body (Geist Mono) with bold sans display moments (Geist Sans heavy), sage-lime / forest accent on warm near-black / warm off-white. Full spec in [`memory-bank/design-direction.md`](memory-bank/design-direction.md). Direction A (editorial dossier) was attempted and rejected; archived on branch `archive/direction-a-editorial`.

## Design principles

- Restraint is the primary tool. Whitespace, type, and one accent do most of the work.
- Structure must support both a 7-second skim and a full read.
- Motion is purposeful or absent. No parallax, no decorative animation.
- The experience timeline is the load-bearing element — design it first, well.

## Conventions

- Components: PascalCase, one per file in `src/components/`
- Section components use Tailwind classes inline; shared utilities live in `globals.css`
- Mobile-first; verify at 375 / 768 / 1280
- Semantic HTML, WCAG 2.1 AA contrast, keyboard accessible (Arshad ships AA professionally — match that bar)
- TypeScript strict; no `any` without a comment explaining why

## Session protocol

- **Start of session**: read this file (`CLAUDE.md`) and `memory-bank/progress.md` end-to-end. Run `git log --oneline -10` and `git status`. Confirm your understanding of the current chunk before writing code.
- **End of session**: stop coding. Commit anything uncommitted (or stash with a clear `wip:` message). Update `memory-bank/progress.md` — mark completed chunks ✅, mark the current chunk 🟡 with what's done / what's next / any open decision, add notes for the next session. Commit the progress update alone as `chore: update progress.md`.
- Resume next session by opening a fresh Claude Code session and pasting: *"resume — follow the session protocol in CLAUDE.md."* Trust the docs, don't try to carry state across sessions.

## Don't

- No new dependencies without asking
- Don't push to remote; don't force-push; don't touch main history
- Don't delete `./reference/`, `./memory-bank/`, or `./.clinerules/`
- Don't change the theme architecture (CSS vars + class strategy) without flagging
- No analytics, tracking, or third-party scripts
- Don't invent content — pull from the resume only
-   - No Claude attribution in commits — no `Co-Authored-By: Claude`, no "Generated with Claude Code" trailer, no emoji in commit messages. Plain conventional commits only (e.g. `feat: add experience timeline`, `chore: remove unused sass dep`).
