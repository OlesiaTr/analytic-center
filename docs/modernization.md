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

Sanity project `xczp8pdn` (dataset `production`), provisioned through the Vercel
Marketplace; Studio embedded at `/studio`. The static export is gone: the site
is a Next app on Vercel, every page prerendered and revalidated by tag.

- [x] **Content model** confirmed against the Redesign: page `lead`, library
      `kind` + `authors`, news `date` (a warning until the dates are filled in),
      partner `name` + `href`, grant groups with their programs nested inside,
      hero covers from the newest publications at `w=200` on the CDN
- [x] Schemas (`sanity/schemaTypes/`): conference, monograph, libraryItem,
      grantGroup, person (boards, profiles), partner, news, siteSettings and
      nine page singletons; every text field `{ uk, en }`, Ukrainian required
- [x] Migration (one-off, in git at 4865c6d): 115 documents and 103 images,
      counts matched the JSON; `sanity documents validate` 0 errors. Found and
      fixed a broken LinkedIn URL (`ttps://`) that is also broken on the old
      site
- [x] GROQ queries (`defineQuery`) + TypeGen in `src/lib/sanity`; `content.ts`
      maps results onto the existing component props, so the components stayed
      the same. Upcoming vs archive comes from `date` and the links
- [x] Images on Sanity's CDN through a custom `next/image` loader with `sizes`
      (no Vercel image transforms); generated `opengraph-image` in the site's
      look, the Studio image is an optional override
- [x] Webhook → `/api/revalidate` (signature checked, `revalidateTag(_type)`);
      verified locally: a published edit shows ~1.5 s later. The client skips
      Sanity's API CDN, since Next caches every query
- [x] Removed `src/data` content, 117 local images, the image scripts and
      `sharp`; `common.json` keeps UI labels only; `app/sitemap.ts` and
      `app/robots.ts` replace the static files
- [x] Agent setup: Sanity MCP (`.mcp.json`, OAuth), `rules/content.md`,
      `skills/add-publication`, `.worktreeinclude`
- Left: news dates and English text (with PER-10); the webhook targets
  acmhs.in.ua, so publishing without a deploy works on production only after the
  release (preview URLs are behind Vercel Authentication)

### 5. i18n — PER-10

- [x] `next-intl` 4 routing: uk at `/`, en at `/en` (`as-needed`, no locale
      detection); `app/[locale]` root layout, Studio its own root layout,
      `global-not-found`; `proxy.ts` (Next 16's middleware)
- [x] `messages/{uk,en}.json` for UI labels with typed keys and ICU plurals
      (replaces `src/data/common.json` and `utils/plural`); a test keeps keys
      and arguments in sync
- [x] Queries take `$locale` (`l()` in `queries.ts`) and fall back to Ukrainian,
      marked `lang="uk"`; one cache tag per type refreshes both languages
- [x] Localized metadata, canonical, OG locale and OG image; `hreflang` and the
      `/en` sitemap entries behind `ENGLISH_PUBLIC`, `/en` noindex until then
- [x] Language switch keeps the page (`/en` for home), shown once
      `ENGLISH_PUBLIC` is on
- [x] English content as Sanity drafts (`scripts/sanity-translations.mts`,
      `skills/translate`, `rules/i18n.md`): 280 fields in 115 drafts on
      2026-11-02, plus Ukrainian fixes (Latin numerals in conference titles,
      stray `{' '}` in references); bibliographic examples stay Ukrainian
- [x] Lighthouse: a11y 100 and CLS 0 on 5 routes per language (log below)
- Left: review and publish the drafts in Studio; then flip `ENGLISH_PUBLIC`
  (PER-11). News dates are still missing

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
  the language switch builds `/en/` for home (fixed in PER-10)

### 6. AI-readable + public release — PER-11

- [x] English launched: `ENGLISH_PUBLIC` on (switch, hreflang, /en indexed,
      sitemap with alternates); /en SEO 69 → 100 (log below)
- [x] JSON-LD: Organization on every page, Event, Book, Person (`src/lib/seo`)
- [x] `llms.txt` from Sanity, in English with the Ukrainian pages linked
- [x] `PUBLIC_BASE_URL` from `NEXT_PUBLIC_SITE_URL`; `.env.example`
- [x] `CLAUDE.md` updated for the final stack; `skills/release-check`
- [x] README (stack, architecture, before/after Lighthouse, screenshots), MIT
      LICENSE for the code
- [ ] Repo → public
- [x] Removed `src/configs/gcp_cors_config.json` (old GCS hosting)
- English name fixed to "Analytical Center of Modern Humanitarian Studies"
  (ACMHS) in code and Sanity

## Claude setup

Modeled on the
[`.claude` directory guide](https://code.claude.com/docs/en/claude-directory).
Each piece is added in the phase where the thing it describes exists.

```
analytic-center/
├── CLAUDE.md               # every session; <200 lines: commands, architecture, conventions
├── .mcp.json               # Sanity MCP server (mcp.sanity.io, OAuth)
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

| Date       | Page                             | Perf  | A11y | SEO | Notes                                                                          |
| ---------- | -------------------------------- | ----- | ---- | --- | ------------------------------------------------------------------------------ |
| 2026-10-17 | `/` (live, mobile)               | 96    | 96   | 100 | Baseline. LCP 2.7 s, CLS 0, TBT 10 ms. Best Practices 100                      |
| 2026-10-17 | `/conferences` (live, mobile)    | 74    | 100  | 100 | Baseline. LCP 3.2 s, **CLS 0.408**, TBT 0 ms. Best Practices 100               |
| 2026-10-17 | `/` (local, develop)             | 83–94 | 96   | 100 | Pre-PER-6 local build, 3 runs. LCP 3.1–4.7 s. JS 177 KB                        |
| 2026-10-17 | `/conferences` (local, develop)  | 76    | 100  | 100 | Pre-PER-6, 3 runs. LCP 3.5 s, CLS 0.297                                        |
| 2026-10-17 | `/` (local, PER-6)               | 84–87 | 96   | 100 | Turbopack, 3 runs. LCP 4.0–4.6 s. JS 231 KB (webpack build: 219 KB, LCP 3.4 s) |
| 2026-10-17 | `/conferences` (local, PER-6)    | 63    | 100  | 100 | 3 runs. **CLS 0.667** (cover images, see PER-8); same with webpack             |
| 2026-10-18 | `/` (local, PER-7)               | 86    | 96   | 100 | 3 runs. LCP 4.1 s, CLS 0. JS 239 KB                                            |
| 2026-10-18 | `/conferences` (local, PER-7)    | 88    | 100  | 100 | 3 runs. LCP 3.9 s, **CLS 0** (CSS breakpoints + reserved image space)          |
| 2026-10-18 | `/` (local, PER-8)               | 91–93 | 100  | 100 | 3 runs. LCP 3.2–3.6 s, CLS 0. JS 198 KB (logo out of the client bundle)        |
| 2026-10-18 | `/conferences` (local, PER-8)    | 95    | 100  | 100 | 3 runs. LCP 3.0 s, CLS 0                                                       |
| 2026-10-18 | `/grants` (local, PER-8)         | 99    | 100  | 100 | 3 runs. LCP 2.2 s                                                              |
| 2026-10-18 | `/useful-info` (local, PER-8)    | 97–99 | 100  | 100 | 3 runs. LCP 2.2–2.6 s                                                          |
| 2026-10-20 | `/` (local, PER-12)              | 91–96 | 100  | 100 | 3 runs. LCP 2.7–3.5 s, CLS 0. JS 158 KB (Swiper + heroicons removed)           |
| 2026-10-20 | `/conferences` (local, PER-12)   | 93–98 | 100  | 100 | 3 runs (+1 cold-start outlier: 75, LCP 8.8 s). LCP 2.5–3.3 s, CLS 0            |
| 2026-10-20 | `/monographs` (local, PER-12)    | 93–97 | 100  | 100 | 3 runs. LCP 2.6–3.3 s, CLS 0                                                   |
| 2026-10-20 | `/grants` (local, PER-12)        | 95–98 | 100  | 100 | 3 runs. LCP 2.3–3.0 s, CLS 0                                                   |
| 2026-10-20 | `/useful-info` (local, PER-12)   | 95–98 | 100  | 100 | 3 runs. LCP 2.5–3.0 s, CLS 0                                                   |
| 2026-10-20 | `/` (live, PER-12)               | 97    | 100  | 100 | 3 runs. LCP 2.6 s, CLS 0, TBT 10–20 ms. Best Practices 100. JS 161 KB          |
| 2026-10-20 | `/conferences` (live, PER-12)    | 98–99 | 100  | 100 | 3 runs. LCP 2.0–2.5 s, **CLS 0** (baseline 0.408). Best Practices 100          |
| 2026-10-20 | `/monographs` (live, PER-12)     | 96–97 | 100  | 100 | 3 runs. LCP 2.6 s, CLS 0                                                       |
| 2026-10-20 | `/grants` (live, PER-12)         | 97–98 | 100  | 100 | 3 runs. LCP 2.4–2.6 s, CLS 0                                                   |
| 2026-10-20 | `/useful-info` (live, PER-12)    | 98–99 | 100  | 100 | 3 runs. LCP 2.0–2.4 s, CLS 0                                                   |
| 2026-10-26 | `/` (local, PER-9)               | 94–97 | 100  | 100 | 3 runs, `next start`. LCP 2.6–3.1 s, CLS 0. JS 159 KB; images 424–464 KB (CDN) |
| 2026-10-26 | `/conferences` (local, PER-9)    | 94–97 | 100  | 100 | 3 runs. LCP 2.6–3.1 s, CLS 0. Images 173 KB (CDN, sized by `sizes`)            |
| 2026-10-26 | `/monographs` (local, PER-9)     | 94–97 | 100  | 100 | 3 runs. LCP 2.6–3.1 s, CLS 0. Images 220 KB                                    |
| 2026-10-26 | `/grants` (local, PER-9)         | 95–98 | 100  | 100 | 3 runs. LCP 2.5–3.0 s, CLS 0                                                   |
| 2026-10-26 | `/useful-info` (local, PER-9)    | 94–97 | 100  | 100 | 3 runs. LCP 2.6–3.1 s, CLS 0. Best Practices 100 on all PER-9 runs             |
| 2026-11-02 | `/` (local, PER-10)              | 92–96 | 100  | 100 | 3 runs (+1 cold-start outlier: 79, LCP 5.7 s). LCP 2.7–3.3 s, CLS 0            |
| 2026-11-02 | `/conferences` (local, PER-10)   | 92–96 | 100  | 100 | 3 runs. LCP 2.7–3.3 s, CLS 0. Best Practices 100 on all PER-10 runs            |
| 2026-11-02 | `/monographs` (local, PER-10)    | 92–96 | 100  | 100 | 3 runs. LCP 2.7–3.3 s, CLS 0                                                   |
| 2026-11-02 | `/grants` (local, PER-10)        | 93–97 | 100  | 100 | 3 runs. LCP 2.6–3.2 s, CLS 0                                                   |
| 2026-11-02 | `/useful-info` (local, PER-10)   | 92–96 | 100  | 100 | 3 runs. LCP 2.7–3.3 s, CLS 0                                                   |
| 2026-11-02 | `/en` (local, PER-10)            | 92–96 | 100  | 69  | 3 runs. LCP 2.7–3.3 s, CLS 0. SEO: only `noindex` fails until `ENGLISH_PUBLIC` |
| 2026-11-02 | `/en/conferences` (local)        | 92–96 | 100  | 69  | 3 runs. LCP 2.7–3.3 s, CLS 0. Same `noindex`                                   |
| 2026-11-02 | `/en/monographs` (local)         | 92–96 | 100  | 69  | 3 runs. LCP 2.7–3.3 s, CLS 0                                                   |
| 2026-11-02 | `/en/grants` (local)             | 94    | 100  | 69  | 3 runs. LCP 3.1 s, CLS 0                                                       |
| 2026-11-02 | `/en/useful-info` (local)        | 92–96 | 100  | 69  | 3 runs. LCP 2.7–3.3 s, CLS 0                                                   |
| 2026-11-02 | `/en` (live, PER-11)             | 88–96 | 100  | 100 | 3 runs. LCP 2.8–3.6 s, CLS 0. Indexed: SEO 69 → 100. Best Practices 100        |
| 2026-11-02 | `/en/conferences` (live, PER-11) | 89–98 | 100  | 100 | 3 runs. LCP 2.3–3.5 s, CLS 0                                                   |
| 2026-11-02 | `/en/monographs` (live, PER-11)  | 92–99 | 100  | 100 | 3 runs. LCP 2.2–3.3 s, CLS 0                                                   |
| 2026-11-02 | `/en/grants` (live, PER-11)      | 95–99 | 100  | 100 | 3 runs. LCP 2.2–2.8 s, CLS 0                                                   |
| 2026-11-02 | `/en/useful-info` (live, PER-11) | 89–99 | 100  | 100 | 3 runs. LCP 2.2–3.6 s, CLS 0                                                   |

Measured with
`npx lighthouse@12 <url> --form-factor=mobile --screenEmulation.mobile` (single
run, headless Chrome for Testing). Local rows: served with `serve@14` from
`out/` until PER-9, with `next start` since; 3 runs each; the Vercel preview is
behind Vercel Authentication. +42 KB JS is the React 19 + Next 16 runtime;
Turbopack adds ~12 KB over webpack — kept as the default, re-measure after PER-7
(`next/image`).
