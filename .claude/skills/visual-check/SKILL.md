---
name: visual-check
description:
  Screenshot every route at 375/768/1280 and diff against a baseline built from
  the base branch. Use after any change that could affect layout or styling
  (dependency upgrades, refactors, CSS/Tailwind edits), before opening a PR, or
  when asked to verify there is no visual change.
context: fork
background: false
model: sonnet
effort: medium
allowed-tools:
  - Bash(npm run build)
  - Bash(npm run screenshots*)
  - Bash(npm ci)
  - Bash(npm start*)
  - Bash(npx --yes serve@14 *)
  - Bash(curl -sf http://localhost:*)
  - Bash(git worktree *)
  - Read
---

# Visual check

Intended changes (empty = none expected): $ARGUMENTS

Compares the working tree against the base branch (`develop` unless told
otherwise) with `scripts/screenshots.mts` and `scripts/visual-diff.mts`. All
output goes to `screenshots/` (gitignored — full-page PNGs are ~50 MB).

## 1. Baseline (skip if `screenshots/baseline/` is already from the current base tip)

```bash
git fetch origin
git worktree add --detach ../analytic-center-baseline origin/develop
# already exists: git -C ../analytic-center-baseline switch --detach origin/develop
cd ../analytic-center-baseline && npm ci && npm run build
```

Serve it on port 3001 in the background (see "Serving" below), then from this
repo:

```bash
npm run screenshots -- --base http://localhost:3001 --out screenshots/baseline
```

Stop the server. Keep the worktree for later runs. It is detached so `develop`
stays free to check out in the main repo.

## 2. Current

Build this repo, serve it on port 3000 in the background, then:

```bash
npm run screenshots
npm run screenshots:diff
```

`screenshots:diff` prints `OK` / `CHANGED` / `SIZE` / `MISSING` per file and
writes diff images (changed pixels in red) to `screenshots/current/diff/`.

## 3. Review

For every non-`OK` file, open the baseline, current and diff images and decide:

- **Regression** → report it with the region that changed. Don't edit code; the
  main session fixes it and runs this skill again.
- **Intended** (matches "Intended changes" above) → list it in the report.
- **Noise** (font rendering, live content) → note it.

Stop the servers.

## Report

One table: file, status, % changed, verdict (regression / intended / noise). End
with whether the change is visually safe to merge.

## Serving

- Static export (until PER-6 removes `output: 'export'`):
  `npx --yes serve@14 out -l <port>`
- Otherwise: `npm start -- -p <port>`

Wait until `curl -sf http://localhost:<port>/` succeeds before capturing.

## Notes

- Routes and widths: `ROUTES` / `WIDTHS` in `scripts/routes.mts`. Add new routes
  there.
- `--base <url>` captures any host (e.g. a Vercel preview).
- Default threshold is 0.5% changed pixels:
  `npm run screenshots:diff -- --threshold 1`.
- Two captures of the same build match at 0.00%; anything above that is a real
  difference.
