# Modernization plan

Living plan and progress log. Update checkboxes and the Lighthouse log as work
lands.

- **Created:** 2026-10-17
- **Status:** Planned
- **Linear:**
  [Analytic Center](https://linear.app/personal-projects-olesia/project/analytic-center-f0a7cb47914b)
  (team `PER`), one issue per phase: PER-5 … PER-11
- **Base branch:** `develop`, one branch + PR per phase
- **Release gate:** `develop` is not merged to `main` (production) until
  `/conferences` mobile CLS is < 0.1 (PER-8, first item)

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
- [x] `.nvmrc` (22) + `engines` in `package.json`
- [x] Add `.claude/settings.local.json` to project `.gitignore` (only ignored
      globally today)
- [x] GitHub Actions CI: format check, lint, types, build
- [x] `.claude/settings.json` (npm script permissions, `.env` read deny,
      Prettier hook on Edit/Write) + `skills/visual-check`
- [x] Baseline: 9 routes × 375/768/1280 via `npm run screenshots` (local,
      gitignored — ~50 MB; regenerated from the base branch) + Lighthouse below

Found while capturing (added to Phase 3):

- At 375px, home (513px), `/grants` (585px) and `/useful-info` (459px) are wider
  than the viewport.
- `/conferences` CLS is 0.408 on mobile (cover images without reserved size).

### 1. Dependency upgrade — PER-6

- [x] Next 14 → 16.4 via `@next/codemod upgrade`; React 19.3 + types
- [x] ESLint 9 flat config (core-web-vitals + TypeScript presets); `next lint` →
      `eslint .`; `fix` script repaired
- [x] TypeScript 5.9, `@types/node` 22, Prettier 3.9 + tailwind plugin 0.8
- [x] Remove dead `upload` script and unused `next-image-export-optimizer`; add
      `sharp` devDep
- [x] Exact version pins (`.npmrc` `save-exact`) + Dependabot into `develop`
- [x] Swiper 14 (kept; hid its injected SVG arrow, restored 10px offset)
- [x] Tailwind 4 (`@tailwindcss/upgrade`) as a separate commit
- [x] `AGENTS.md` (version-matched Next docs) imported from `CLAUDE.md`
- [x] Visual parity vs baseline: 23/27 identical. Home, `/about-center` (768)
      and `/useful-info` (1280) differ by 3–48px because Tailwind 4 keeps the
      written `leading-*` over responsive text sizes — accepted

Carried into Phase 2: 34 Tailwind lint warnings (custom classes like
`.section`); `no-unnecessary-arbitrary-value` and `enforces-canonical-classname`
are off until classes are cleaned up; the v3 line-height shim in `@theme` can go
once components stop mixing scale and arbitrary font sizes.

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
- [ ] Re-enable the two auto-fixing Tailwind lint rules; fix remaining warnings;
      drop the v3 line-height shim

### 3. UI/UX fixes — PER-8

- [ ] **First, blocks release:** `/conferences` CLS < 0.1 — cover `<img>`s in
      `cover-card`, `slide-cover-card` have `height` but no `width`, so no space
      is reserved (covers vary 0.68–0.72 aspect). 0.297 → 0.667 after PER-6
- [ ] `<h1>` on every page
- [ ] `/useful-info` table: semantic `<thead>`/`<th>`, no `valign`, no
      horizontal scroll on mobile
- [ ] No horizontal overflow at 375px on home and `/grants`
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

| Date       | Page                            | Perf  | A11y | SEO | Notes                                                                          |
| ---------- | ------------------------------- | ----- | ---- | --- | ------------------------------------------------------------------------------ |
| 2026-10-17 | `/` (live, mobile)              | 96    | 96   | 100 | Baseline. LCP 2.7 s, CLS 0, TBT 10 ms. Best Practices 100                      |
| 2026-10-17 | `/conferences` (live, mobile)   | 74    | 100  | 100 | Baseline. LCP 3.2 s, **CLS 0.408**, TBT 0 ms. Best Practices 100               |
| 2026-10-17 | `/` (local, develop)            | 83–94 | 96   | 100 | Pre-PER-6 local build, 3 runs. LCP 3.1–4.7 s. JS 177 KB                        |
| 2026-10-17 | `/conferences` (local, develop) | 76    | 100  | 100 | Pre-PER-6, 3 runs. LCP 3.5 s, CLS 0.297                                        |
| 2026-10-17 | `/` (local, PER-6)              | 84–87 | 96   | 100 | Turbopack, 3 runs. LCP 4.0–4.6 s. JS 231 KB (webpack build: 219 KB, LCP 3.4 s) |
| 2026-10-17 | `/conferences` (local, PER-6)   | 63    | 100  | 100 | 3 runs. **CLS 0.667** (cover images, see PER-8); same with webpack             |

Measured with
`npx lighthouse@12 <url> --form-factor=mobile --screenEmulation.mobile` (single
run, headless Chrome for Testing). Local rows: both builds served with
`serve@14` from `out/`, 3 runs each; the Vercel preview is behind Vercel
Authentication. +42 KB JS is the React 19 + Next 16 runtime; Turbopack adds ~12
KB over webpack — kept as the default, re-measure after PER-7 (`next/image`).
