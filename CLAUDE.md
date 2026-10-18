# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

Linear: team `PER`, project "Analytic Center", base branch `develop`. Plan and
progress: `docs/modernization.md`.

Next.js docs for the installed version (generated, don't edit by hand):
@AGENTS.md

## Build & Development Commands

```bash
npm run dev               # Development server (Turbopack)
npm run build             # Production build (static export to out/)
npm run lint              # ESLint
npm run check-types       # TypeScript
npm run fix               # ESLint --fix, then Prettier
npm test                  # Unit tests (Vitest + Testing Library)
npm run test:e2e          # Playwright smoke tests against out/ (build first)
npm run images:dimensions # Write width/height for images in src/data
npm run test-all          # format + lint + types + images + unit + build + e2e
```

The pre-commit hook runs `npm run fix` and `npm run test-all`. CI runs the same
checks on every PR. Use the `visual-check` skill for any change that could
affect layout.

## Architecture

**Next.js 16 static site** (App Router, `output: 'export'`, React 19,
Tailwind 4) for a Ukrainian analytic research center. Moving to Sanity + Vercel
and adding English is planned in `docs/modernization.md`.

### Directory Structure

- `src/app/` - App Router pages (`(pages)/` group shares the sticky header)
- `src/sections/` - Page sections (Hero, News, Grants, ...)
- `src/components/ui/` - Reusable UI (`PublicationCard`, `PublicationGrid`,
  `ButtonLink`, ...); `src/components/base/` - mobile menu
- `src/layouts/` - Header and Footer
- `src/hooks/` - State logic (`useDisclosure`, `useAccordion`)
- `src/data/` - Content JSON (lightweight CMS) + `types.ts`
- `src/constants/` - Navigation links
- `scripts/` - Image tooling, screenshots/visual diff, shared `routes.mts`
- `e2e/` - Playwright smoke tests

Component and styling conventions load from `.claude/rules/` when you touch
those files.

### Path Aliases

- `@/*` → `./src/*`
- `~/*` → `./public/*`

### Data Pattern

Content is stored in JSON files under `src/data/` and imported directly:

```typescript
import data from '@/data/common.json';
```

### Tailwind (v4)

No `tailwind.config.ts`: tokens live in the `@theme` block of
`src/styles/globals.css` (colors, breakpoints, shadows). Important modifier is a
suffix (`pt-0!`).

```
main: #565656        accent: #FBCD21      mainBg: #0065B2
footerBg: #0E2B42    accentLight: #F9DA66  mainBgDark: #043B65
```

Custom breakpoints: `sm` (480px), `md` (768px), `lg` (1024px), `xl` (1280px),
`xxl` (1440px)

## Code Style

- TypeScript strict mode enabled
- Single quotes, trailing commas, 80 char print width
- Prettier with Tailwind plugin (auto-sorts classes)
- Dependencies are pinned to exact versions (`.npmrc` `save-exact`). Updates
  come as Dependabot PRs into `develop`; run `visual-check` before merging them
