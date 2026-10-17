# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

Linear: team `PER`, project "Analytic Center", base branch `develop`. Plan and
progress: `docs/modernization.md`.

Next.js docs for the installed version (generated, don't edit by hand):
@AGENTS.md

## Build & Development Commands

```bash
npm run dev              # Start development server
npm run build            # Production build (static export)
npm run lint             # Run ESLint
npm run check-types      # TypeScript type checking
npm run format           # Auto-format with Prettier
npm run fix              # Format + lint fix
npm run test-all         # Full validation: format + lint + types + build
```

Pre-commit hooks automatically run `npm run fix` and `npm run test-all` before
each commit.

## Architecture

**Next.js 14 Static Site** - Ukrainian language content site for an analytic
research center. Uses App Router with static export (`next build` generates
static HTML).

### Directory Structure

- `src/app/` - Next.js App Router pages
- `src/sections/` - Large page section components (Hero, News, Grants, etc.)
- `src/components/ui/` - Reusable UI components
- `src/layouts/` - Header and Footer
- `src/data/` - JSON content files (acts as lightweight CMS)
- `src/constants/` - App constants (colors, links, viewport sizes)
- `src/utils/` - Utility functions and hooks

### Path Aliases

- `@/*` → `./src/*`
- `~/*` → `./public/*`

### Data Pattern

Content is stored in JSON files under `src/data/` and imported directly:

```typescript
import data from '@/data/common.json';
```

### Tailwind Custom Colors

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
- Use `'use client'` directive for interactive components
