# Modernization plan

Living plan and progress log. Update checkboxes and the Lighthouse log as work
lands.

- **Created:** 2026-10-17
- **Status:** Planned
- **Linear:**
  [Analytic Center](https://linear.app/personal-projects-olesia/project/analytic-center-f0a7cb47914b)
  (team `PER`), one issue per phase: PER-5 … PER-11
- **Base branch:** `develop`, one branch + PR per phase

## Goal

Modernize the site, move content to Sanity, add English alongside Ukrainian,
make the repo agent-friendly and the site AI-readable, then make the repo public
as a portfolio project.

## Decisions

- **CMS:** Sanity (free tier), field-level i18n (`{ uk, en }`), Studio at
  `/studio`, webhook → `revalidateTag`.
- **Hosting:** Vercel (already linked). Drop `output: 'export'`.
- **i18n:** `next-intl`, `app/[locale]`, `localePrefix: 'as-needed'` (uk at `/`,
  en at `/en`). EN content is an AI draft, reviewed before publishing.
- **Agent docs:** follow the
  [`.claude` directory layout](https://code.claude.com/docs/en/claude-directory)
  — no roles or SOP folders. See [Claude setup](#claude-setup).
- **AI-readable site:** JSON-LD, `llms.txt`, semantic HTML. No runtime AI
  feature.

## Phases

### 0. Setup — PER-5, `feature/per-5-modernization-setup`

- [x] Linear: project + 7 phase issues; `Linear:` line in `CLAUDE.md`
- [x] `develop` branch from `main`
- [x] This plan in `docs/`
- [ ] `.nvmrc` (22) + `engines` in `package.json`
- [ ] Add `.claude/settings.local.json` to project `.gitignore` (only ignored
      globally today)
- [ ] GitHub Actions CI: format check, lint, types, build
- [ ] `.claude/settings.json` + `skills/visual-check`
- [ ] Baseline: screenshots of 8 routes at 375/768/1280 + Lighthouse (home,
      conferences)

### 1. Dependency upgrade — PER-6

- [ ] Next 14 → 15 → 16 via `@next/codemod`; React 19 + types
- [ ] ESLint 9 flat config; replace `next lint` with `eslint .`
- [ ] TypeScript 5.9, `@types/node` 22, Prettier + tailwind plugin 0.8
- [ ] Remove dead `upload` script; add `sharp` devDep
- [ ] Swiper 14 or replace with Embla / CSS scroll-snap
- [ ] Tailwind 4 (`@tailwindcss/upgrade`) as a separate commit
- [ ] Visual parity vs baseline

### 2. Code cleanup (no visual change) — PER-7

- [ ] `next/link` for internal links; `next/image` for images
- [ ] Header into root layout (server) + client menu island
- [ ] Delete `useViewportSize`, use CSS breakpoints
- [ ] Fix `ORGANIZATION_MEMBERS.sort()` mutation, `key={idx}`, `any` in
      `slide-component`, `as` casts on JSON
- [ ] Merge card components into one with variants; share button styles
- [ ] Design tokens instead of magic values; remove `!important`s
- [ ] Separate UI copy from content
- [ ] Error boundary (`error.tsx`) and image/slider loading states
- [ ] Vitest + Testing Library; Playwright smoke test per route

### 3. UI/UX fixes — PER-8

- [ ] `<h1>` on every page
- [ ] `/useful-info` table: semantic `<thead>`/`<th>`, no `valign`, no
      horizontal scroll on mobile
- [ ] `/conferences` authors table: values visible on mobile
- [ ] `professor-list`: descriptive `aria-label`s instead of URLs
- [ ] Hero text contrast; gap under hero at tablet width
- [ ] Nav breakpoint around 768–1024px
- [ ] One CTA hierarchy (primary / secondary)
- [ ] Partners slider empty tile
- [ ] Flexible cover card heights; real empty states instead of `return null`
- [ ] `not-found.tsx`, skip-link, mobile menu a11y (Escape, focus trap,
      `aria-expanded`)
- [ ] Lighthouse before/after logged below

### 4. Sanity CMS — PER-9

- [ ] Schemas: conference, monograph, libraryItem, grant, person, partner, news,
      siteSettings, page singletons (localized fields)
- [ ] Migration script `src/data/*` → Sanity; document counts match
- [ ] GROQ queries + TypeGen in `src/lib/sanity`
- [ ] Studio at `/studio`; webhook → `revalidateTag`
- [ ] Remove migrated content from `src/data`
- [ ] Connect Sanity MCP server for agent content edits

### 5. i18n — PER-10

- [ ] `next-intl` routing, `[locale]` segment, language switcher
- [ ] `messages/{uk,en}.json` for UI copy
- [ ] AI-translated EN content in Sanity, reviewed before publishing
- [ ] Localized metadata, `hreflang`, `app/sitemap.ts`, `app/robots.ts`

### 6. AI-readable + public release — PER-11

- [ ] JSON-LD: Organization, Event, Book, Person
- [ ] `llms.txt`
- [ ] `PUBLIC_BASE_URL` from env; `.env.example`
- [ ] Rewrite `CLAUDE.md` for the new stack (see [Claude setup](#claude-setup))
- [ ] README (stack, architecture, before/after Lighthouse, screenshots),
      LICENSE
- [ ] Repo → public

## Claude setup

Modeled on the
[`.claude` directory guide](https://code.claude.com/docs/en/claude-directory).
Each piece is added in the phase where the thing it describes exists.

```
analytic-center/
├── CLAUDE.md               # every session; <200 lines: commands, architecture, conventions
├── .mcp.json               # Sanity MCP server, token via ${SANITY_API_TOKEN}
├── .worktreeinclude        # copy .env.local into new worktrees
├── docs/                   # plans + progress logs (this file)
└── .claude/
    ├── settings.json       # committed: allowed npm scripts, format-on-edit hook
    ├── settings.local.json # gitignored: personal overrides
    ├── rules/              # path-scoped, load only when matching files are touched
    │   ├── components.md   # paths: src/components/**, src/sections/**
    │   ├── styling.md      # paths: **/*.css, tailwind tokens
    │   ├── content.md      # paths: src/lib/sanity/**, sanity/**
    │   └── i18n.md         # paths: messages/**, src/app/[locale]/**
    ├── skills/             # repeatable workflows, invoked as /name
    │   ├── visual-check/
    │   ├── add-publication/
    │   ├── translate/
    │   └── release-check/
    └── agents/
        └── ui-reviewer.md  # read-only (Read, Grep, Glob): a11y + design-token review
```

| Piece                                                     | Phase | Purpose                                                      |
| --------------------------------------------------------- | ----- | ------------------------------------------------------------ |
| `settings.json`                                           | 0     | Allow `npm run *` checks; PostToolUse hook runs Prettier     |
| `skills/visual-check`                                     | 0     | Screenshots all routes at 3 widths, diffs vs baseline        |
| `rules/components.md`                                     | 2     | Server by default, hooks for logic, `next/link`/`next/image` |
| `rules/styling.md`                                        | 2     | Tailwind tokens only, no magic values or `!important`        |
| `agents/ui-reviewer.md`                                   | 3     | Isolated review of a11y and design consistency               |
| `.mcp.json`, `rules/content.md`, `skills/add-publication` | 4     | Sanity schemas, GROQ conventions, add a conference/monograph |
| `.worktreeinclude`                                        | 4     | Sanity env vars available in worktrees                       |
| `rules/i18n.md`, `skills/translate`                       | 5     | Message keys, localized fields; draft EN for review          |
| `skills/release-check`                                    | 6     | `test-all`, Lighthouse, log scores in this doc               |
| `CLAUDE.md` rewrite                                       | 6     | Final stack; move anything task-specific into rules/skills   |

Guidance vs enforcement: rules and `CLAUDE.md` are guidance; anything that must
always happen (formatting, blocked commands) goes in `settings.json` hooks or
permissions.

## Verification

- `npm run test-all` green in CI
- Visual parity screenshots vs baseline (375 / 768 / 1280)
- Lighthouse perf / a11y / SEO before & after
- Phase 4: publish in Studio updates preview without redeploy
- Phase 5: `/` and `/en` render, switcher keeps path, `hreflang` present

## Lighthouse log

| Date | Page | Perf | A11y | SEO | Notes |
| ---- | ---- | ---- | ---- | --- | ----- |
