# Portfolio — Arshad Anwer

Personal portfolio for Arshad Anwer, Senior Software Engineer based in Wellington, NZ. Single-page, content-driven, design-restrained.

## Stack

- **Framework** — Next.js 15 (App Router) + React 19 + TypeScript (strict)
- **Styling** — Tailwind CSS v4 (`@import "tailwindcss"` in globals.css, no v3 config file)
- **Icons** — `lucide-react` via a thin `<Icon>` wrapper
- **Theme** — CSS custom properties + class strategy (`html.dark` / `html:not(.dark)`), no-FOUC inline script
- **Photography** — Cloudinary REST API, fetched server-side with ISR (3600 s revalidation). Each photo is enriched with a base64 LQIP for native `next/image` blur-up placeholders.
- **Hosting** — AWS Amplify Hosting (CloudFront CDN bundled)

## Run locally

```bash
git clone https://github.com/<username>/portfolio.git
cd portfolio
npm install
cp .env.local.example .env.local   # then fill in Cloudinary creds
npm run dev                         # http://localhost:3220
```

## Environment variables

| Key                                 | Purpose                                     | Public?     |
| ----------------------------------- | ------------------------------------------- | ----------- |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name (part of image URLs)  | yes         |
| `CLOUDINARY_API_KEY`                | Read API key for the listing call           | server-only |
| `CLOUDINARY_API_SECRET`             | Read API secret for the listing call        | server-only |
| `CLOUDINARY_FOLDER`                 | Asset folder name (defaults to `portfolio`) | server-only |

The server-only keys have no `NEXT_PUBLIC_` prefix, so they never reach the browser bundle. In production they live in Amplify's environment variable config, not in the repo.

## Deployment

Deployed to **AWS Amplify Hosting**. Pushes to `main` auto-deploy. Build uses the default Next.js preset; the photography page is regenerated through ISR every hour.

## AI-assisted development

This project is built in collaboration with [Claude Code](https://claude.com/claude-code) (Anthropic). My role on each iteration:

- **Direction & taste** — I choose the aesthetic, the tone, and the constraints. Claude proposes variations against that brief.
- **Architecture decisions** — I pick the trade-offs (e.g. ISR vs. fully-static, lightbox approach, focus management strategy). Claude scaffolds and explains alternatives.
- **Code review** — I read every diff, push back on over-engineering, and reject implementations that don't match the design or accessibility bar.
- **A11y & UX verification** — I keyboard-test, check screen reader output, and verify mobile breakpoints (375 / 768 / 1280) before merging.

A few places I deliberately overrode the AI's first pass:

- **Rejected an editorial-dossier layout** (Direction A) after side-by-side review and pivoted to a developer-personality direction. The archived branch is preserved at `archive/direction-a-editorial`.
- **Reverted whole-card-clickable** on `/work` after live testing; content-rich cards now use inline links only.
- **Pinned all dependency versions exactly** instead of `^` ranges, for reproducible installs across environments.
- **Reworked the masonry modal placeholder** when the initial implementation collapsed the `<img>` box to 0×0 pre-load and hid the blur preview.

Commits are plain conventional-commits without AI attribution trailers — the workflow is documented here rather than in commit metadata.

## Project notes

Working documents live under [`memory-bank/`](memory-bank/):

- [`design-direction.md`](memory-bank/design-direction.md) — current visual direction and reasoning
- [`progress.md`](memory-bank/progress.md) — chunk-by-chunk progress log

## License

All rights reserved. Code and content © Arshad Anwer.
