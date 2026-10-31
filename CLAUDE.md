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
npm run build             # Production build (Next server; reads .env.local)
npm run lint              # ESLint
npm run check-types       # TypeScript
npm run fix               # ESLint --fix, then Prettier
npm test                  # Unit tests (Vitest + Testing Library)
npm run test:e2e          # Playwright smoke tests against `next start` (build first)
npm run typegen           # Sanity schema + GROQ queries → src/lib/sanity/types.ts
npm run test-all          # format + lint + types + unit + build + e2e
```

The pre-commit hook runs `npm run fix` and `npm run test-all`. CI runs the same
checks on every PR. Use the `visual-check` skill for any change that could
affect layout.

## Architecture

**Next.js 16 site on Vercel** (App Router, React 19, Tailwind 4) for a Ukrainian
analytic research center. Content comes from Sanity (Studio at `/studio`,
webhook → `/api/revalidate`); adding English is planned in
`docs/modernization.md`.

### Directory Structure

- `src/app/` - App Router: `[locale]/(site)/` pages (root layout per locale, uk
  at `/`, en at `/en`), `studio/` for Sanity Studio (its own root layout)
- `src/i18n/` - next-intl routing, navigation and request config; `src/proxy.ts`
  (Next 16's middleware) adds the locale
- `sanity/` - Studio schemas; `sanity.config.ts`, `sanity.cli.ts` at the root
- `src/lib/sanity/` - Sanity client and env
- `src/sections/` - Page sections (Hero, News, Grants, ...)
- `src/components/ui/` - Design-system components (`Button`, `PublicationGrid`,
  `Accordion`, `DataTable`, ...); `src/components/icons/` - the `Icon` set;
  `src/components/base/` - mobile menu
- `src/layouts/` - Header and Footer
- `src/hooks/` - State logic (`useDisclosure`, `useLoadMore`, `useCarousel`)
- `src/utils/` - Pure helpers (`formatDate`, `plural`, `toHost`)
- `src/data/common.json` - UI labels only (content is in Sanity)
- `src/constants/` - Navigation links
- `scripts/` - Image tooling, screenshots/visual diff, shared `routes.mts`
- `e2e/` - Playwright smoke tests

Component and styling conventions load from `.claude/rules/` when you touch
those files.

### Path Aliases

- `@/*` → `./src/*`
- `~/*` → `./public/*`

### Data Pattern

Content comes from Sanity through typed getters in `src/lib/sanity/content.ts`
(GROQ in `queries.ts`, cached and tagged by document type). Server components
await them; UI labels still import directly:

```typescript
const list = await getUpcomingConferences();
import data from '@/data/common.json'; // labels
```

Rules for schemas, queries and content edits load from
`.claude/rules/content.md`; adding a publication is the `add-publication` skill.
Agents edit content through the Sanity MCP server (`.mcp.json`).

### Tailwind (v4)

No `tailwind.config.ts`: tokens live in the `@theme` block of
`src/styles/globals.css`, named as in the ACMHS design system
(https://claude.ai/artifact/Fyoz7cCtsUjiqUH6rqcD5K). Type styles (`t-h1`…,
`prose`) and layout (`wrap`, `sec`, `sec-title`) are `@utility` blocks there.
Important modifier is a suffix (`pt-0!`).

```
blue-600: #0065B2   blue-800: #043B65   navy-900: #0E2B42   yellow-400: #FBCD21
ink: #0E2B42        text: #565656       muted: #5E6A77      line: #D3DCE6
surface: #F4F7FA    blue-50: #E6F0F8    brown-900: #442103 (text on yellow)
```

Custom breakpoints: `sm` (480px), `md` (768px), `lg` (1024px), `xl` (1280px),
`xxl` (1440px)

## Code Style

- TypeScript strict mode enabled
- Single quotes, trailing commas, 80 char print width
- Prettier with Tailwind plugin (auto-sorts classes)
- Dependencies are pinned to exact versions (`.npmrc` `save-exact`). Updates
  come as Dependabot PRs into `develop`; run `visual-check` before merging them
