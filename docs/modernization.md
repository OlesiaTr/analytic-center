# Modernization plan

Living plan and progress log. Update checkboxes and the Lighthouse log as work
lands.

- **Created:** 2026-10-17
- **Status:** Planned
- **Linear:**
  [Analytic Center](https://linear.app/personal-projects-olesia/project/analytic-center-f0a7cb47914b)
  (team `PER`), one issue per phase: PER-5 … PER-11
- **Base branch:** `develop`, one branch + PR per phase
- **Release gate:** ~~`develop` is not merged to `main` until `/conferences`
  mobile CLS is < 0.1~~ — cleared in PER-7 (CLS 0)

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

- [x] `next/link` for internal links (`ButtonLink` picks `Link` for `/…`);
      mobile menu closes on route change
- [x] `next/image` with real dimensions written to the data by
      `scripts/image-dimensions.mts` (`check-images` in CI) — **fixed the
      release-gate CLS**
- [x] Header stays per route group; state moved to `useDisclosure`
- [x] Delete `useViewportSize`, use CSS breakpoints (`hidden lg:contents`)
- [x] Fix `ORGANIZATION_MEMBERS.sort()` mutation, index keys, `as` casts on JSON
      (`src/data/types.ts`); `naukivci` data typo
- [x] One `PublicationCard` (cover | library | slide) + `PublicationGrid`;
      unused `Button` removed
- [x] Hooks for logic: `useDisclosure`, `useAccordion`
- [x] `@utility` blocks, tokens instead of repeated hex, no `!important`,
      arbitrary values → scale classes (Tailwind warnings 34 → 2)
- [x] Vitest + Testing Library (10 tests); Playwright smoke per route on desktop
      and mobile (20 tests); both in `test-all` and CI
- [x] `.claude/rules/components.md`, `.claude/rules/styling.md`
- Moved: UI copy separation → PER-10, loading states → PER-8, v3 line-height
  shim removal → PER-8. `no-unnecessary-arbitrary-value` stays off (its fix
  breaks unitless `leading-[…]`).

### 3. UI/UX fixes — PER-8

Scope: redesign-proof fixes only (accessibility, mobile breakage, semantics).
Look-and-feel work moved to the Redesign phase (PER-12).

- [x] `/conferences` CLS < 0.1 — done in PER-7 (0.667 → 0)
- [x] One `h1` per page; skip link; 404 page
- [x] Mobile menu: `aria-expanded`/`aria-controls`, labelled nav, focus on open,
      Escape closes and returns focus; `aria-current` on nav links
- [x] No horizontal scroll at 375px on any route (grant details, nested
      sections, `/useful-info`) — e2e-checked
- [x] `/useful-info` rows in JSON; semantic table that stacks on mobile
- [x] Accordions (grants, authors) are `<button aria-expanded>`; authors form
      complete on mobile
- [x] `professor-list` and download links have descriptive accessible names
- [x] Partner logos load eagerly (no empty tile)
- [x] v3 line-height shim removed (no pixel change)
- [x] `ui-reviewer` agent; its in-scope findings fixed — incl. the logo: inline
      SVG wrapping a base64 PNG → `logo.webp` (home HTML 404 → 77 KB)
- [x] Lighthouse a11y 100 on all measured routes (log below)
- Moved to PER-12: header contrast (WCAG blocker), hero contrast, CTA hierarchy,
  card heights, empty/loading states, nav breakpoint

### 4. Sanity CMS — PER-9

- [ ] **Before schemas:** confirm the content model against the Redesign
      (PER-12). Additions it needs: page `lead`, library `kind` (Підручник,
      Навчальний посібник…), required news `date`, partner `name` + `href`,
      grant groups referencing their programs, hero covers from the publications
      (a 200 px thumbnail transform)
- [ ] Schemas: conference, monograph, libraryItem, grant, person, partner, news,
      siteSettings, page singletons (localized fields)
- [ ] Migration script `src/data/*` → Sanity; document counts match
- [ ] GROQ queries + TypeGen in `src/lib/sanity`
- [ ] Studio at `/studio`; webhook → `revalidateTag`
- [ ] Remove migrated content from `src/data`
- [ ] Connect Sanity MCP server for agent content edits

### 5. i18n — PER-10

- [ ] `next-intl` routing, `[locale]` segment, language switcher
- [ ] `messages/{uk,en}.json` for UI copy — includes separating UI copy from
      content in `common.json` (moved from PER-7)
- [ ] AI-translated EN content in Sanity, reviewed before publishing
- [ ] Localized metadata, `hreflang`, `app/sitemap.ts`, `app/robots.ts`

### Redesign — PER-12

Done before CMS and i18n, on the JSON data, so Sanity (PER-9) only swaps the
data layer behind the same components. Source of truth: the ACMHS design system
(https://claude.ai/artifact/Fyoz7cCtsUjiqUH6rqcD5K) and the redesign canvas
(https://claude.ai/artifact/QQgYhgf17r3NbvjSee5Z9w).

- [x] **WCAG blockers fixed:** header on solid `blue-800` (11.55:1); hero text
      on a navy scrim over the center's own covers (Hero B, no stock photo)
- [x] Tokens under the system's names in `@theme`; `t-*` type utilities,
      Montserrat + Literata for prose; 3 px focus ring, yellow on dark grounds
- [x] Section-based CTA hierarchy; downloads always yellow with an icon and a
      unique hidden name
- [x] Components: header, mobile menu, footer, `Button`, `Chip`, `PageHead`,
      `SectionHead`, `PublicationCard` (row / column / wide list / library),
      `PublicationGrid`, `LoadMore`, `Carousel` (scroll-snap), `Accordion` and
      `Panel` (native `<details>`), `DataTable`, `PersonCard`, `DocumentList`,
      `NewsItem`, `EmptyState`, `Skeleton`, 404; `LanguageSwitch` built but
      hidden until PER-10
- [x] Flexible card heights; empty states for empty upcoming lists
- [x] Copy: page leads, sentence case, precise labels, Ukrainian plural counts
- [x] Removed Swiper, `@heroicons/react` and the old tokens/components (JS 198 →
      158 KB)
- [x] No horizontal scroll at 320 and 375 px on any route (e2e)
- [x] `ui-reviewer` findings fixed: date reachable for screen readers in the
      wide list, carousel focus ring and `aria-disabled` buttons, label in name
      on the language switch, one `max-width` per element, leading on arbitrary
      sizes, locale-aware sort, profile names in JSON
- [x] Lighthouse: a11y 100 and CLS 0 on all 5 routes (log below)
- Left: grant groups pair with programs by index (PER-9 makes them references);
  the language switch builds `/en/` for home (fix with routing in PER-10)

### 6. AI-readable + public release — PER-11

- [ ] JSON-LD: Organization, Event, Book, Person
- [ ] `llms.txt`
- [ ] `PUBLIC_BASE_URL` from env; `.env.example`
- [ ] Rewrite `CLAUDE.md` for the new stack (see [Claude setup](#claude-setup))
- [ ] README (stack, architecture, before/after Lighthouse, screenshots),
      LICENSE
- [ ] Repo → public
- [ ] Remove leftover `src/configs/gcp_cors_config.json` (old GCS hosting)

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
| 2026-10-18 | `/` (local, PER-7)              | 86    | 96   | 100 | 3 runs. LCP 4.1 s, CLS 0. JS 239 KB                                            |
| 2026-10-18 | `/conferences` (local, PER-7)   | 88    | 100  | 100 | 3 runs. LCP 3.9 s, **CLS 0** (CSS breakpoints + reserved image space)          |
| 2026-10-18 | `/` (local, PER-8)              | 91–93 | 100  | 100 | 3 runs. LCP 3.2–3.6 s, CLS 0. JS 198 KB (logo out of the client bundle)        |
| 2026-10-18 | `/conferences` (local, PER-8)   | 95    | 100  | 100 | 3 runs. LCP 3.0 s, CLS 0                                                       |
| 2026-10-18 | `/grants` (local, PER-8)        | 99    | 100  | 100 | 3 runs. LCP 2.2 s                                                              |
| 2026-10-18 | `/useful-info` (local, PER-8)   | 97–99 | 100  | 100 | 3 runs. LCP 2.2–2.6 s                                                          |
| 2026-10-20 | `/` (local, PER-12)             | 91–96 | 100  | 100 | 3 runs. LCP 2.7–3.5 s, CLS 0. JS 158 KB (Swiper + heroicons removed)           |
| 2026-10-20 | `/conferences` (local, PER-12)  | 93–98 | 100  | 100 | 3 runs (+1 cold-start outlier: 75, LCP 8.8 s). LCP 2.5–3.3 s, CLS 0            |
| 2026-10-20 | `/monographs` (local, PER-12)   | 93–97 | 100  | 100 | 3 runs. LCP 2.6–3.3 s, CLS 0                                                   |
| 2026-10-20 | `/grants` (local, PER-12)       | 95–98 | 100  | 100 | 3 runs. LCP 2.3–3.0 s, CLS 0                                                   |
| 2026-10-20 | `/useful-info` (local, PER-12)  | 95–98 | 100  | 100 | 3 runs. LCP 2.5–3.0 s, CLS 0                                                   |

Measured with
`npx lighthouse@12 <url> --form-factor=mobile --screenEmulation.mobile` (single
run, headless Chrome for Testing). Local rows: both builds served with
`serve@14` from `out/`, 3 runs each; the Vercel preview is behind Vercel
Authentication. +42 KB JS is the React 19 + Next 16 runtime; Turbopack adds ~12
KB over webpack — kept as the default, re-measure after PER-7 (`next/image`).
