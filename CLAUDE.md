# Portfolio — Project Context

Personal portfolio for Arshad Anwer (Senior Software Engineer, Wellington NZ). Content-driven, design-restrained, single-page-leaning with a few dedicated routes.

## Quick start

```bash
npm run dev      # next dev on port 3220
npm run build    # production build
npm run lint     # eslint
```

## Where things live

- **Code:** `src/app/`, `src/components/`, `src/data/`, `src/hooks/`, `src/lib/`, `src/styles/`
- **Architecture (stack, file layout, routing, theme):** [`docs/architecture.md`](docs/architecture.md)
- **Patterns + conventions + known refactor candidates:** [`docs/patterns.md`](docs/patterns.md)
- **Testing setup + what to cover:** [`docs/testing.md`](docs/testing.md)
- **Visual canon (v4 — palette, typography, layout, motion):** [`memory-bank/design-direction.md`](memory-bank/design-direction.md)
- **Progress log:** [`memory-bank/progress.md`](memory-bank/progress.md)
- **Resume source:** `./reference/ArshadAnwerResume.pdf`

## Specialist subagents

Delegate via the `Agent` tool with `subagent_type=<name>`. Definitions in [`.claude/agents/`](.claude/agents/).

| Agent | When |
| ----- | ---- |
| `architect` | Plan an implementation, evaluate a trade-off, pick a dependency, decide where something lives. Read-only. |
| `designer` | Visual + a11y review against the v4 canon, responsive verification at the breakpoints. Pairs with Playwright. |
| `dev` | Implement features, refactor, write/edit code. Default for "do X" work. |
| `qa` | Audit for bugs, anti-patterns, performance regressions, code duplication. Reports findings. |
| `test-writer` | Vitest unit/integration tests for components, data utilities, hooks. |
| `doc-keeper` | Maintain `memory-bank/progress.md`, `docs/`, `design-direction.md`. End-of-session protocol owner. |

## Session protocol

- **Start:** read this file + `memory-bank/progress.md`. Run `git log --oneline -10` and `git status`. Confirm the current chunk before writing code.
- **End:** stop coding. Commit anything uncommitted (or stash with `wip:`). Delegate progress.md update to `doc-keeper`. Commit progress.md alone as `chore: update progress.md`.
- **Resume next session:** open a fresh Claude Code session and paste *"resume — follow the session protocol in CLAUDE.md."* Trust the docs; don't carry state across sessions.

## Don't

- No new dependencies without asking.
- No push, no force-push, no `main` history rewrites.
- No Claude attribution in commits (no `Co-Authored-By: Claude`, no "Generated with Claude Code" trailer, no emoji). Plain conventional commits only.
- No analytics, tracking, or third-party scripts.
- No invented content — pull from the resume.
- Don't change theme architecture (CSS vars + `html.dark` class) without flagging.
- Don't delete `./reference/`, `./memory-bank/`, or `./docs/`.
