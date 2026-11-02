---
name: release-check
description:
  Release develop to production and verify it. Use when asked to release, ship,
  push to main, or check the live site after a merge ("lets release", "merged,
  verify").
---

# Release check

`develop` → `main` deploys acmhs.in.ua through Vercel. The user merges PRs
themselves unless they say otherwise; never merge or push to `main` without
their word.

## 1. Before the release PR

- `develop` is green in CI and `npm run test-all` passes locally.
- Anything that could change layout went through `visual-check` on its own PR.
- Lighthouse on the changed routes (local `next start`, 3 runs each):

  ```bash
  export CHROME_PATH=$(ls -d ~/Library/Caches/ms-playwright/chromium-*/chrome-mac*/*.app/Contents/MacOS/* | tail -1)
  npx -y lighthouse@12 <url> --form-factor=mobile --screenEmulation.mobile --quiet --output=json --output-path=<scratchpad>/<name>.json --chrome-flags="--headless=new"
  ```

  Lighthouse finds no Chrome on its own here; Playwright's Chromium works. A
  stale `.next/cache/fetch-cache` can serve day-old Sanity data to a local
  build: delete it when content changed today.

## 2. Release PR

`gh pr create --base main --head develop --title "Release: <what>"` with a short
list of what ships and what to check after. Wait for CI, then hand it to the
user to merge.

## 3. After the deploy

Wait for the new build: poll a page for something only the new code renders (in
the background, not with foreground `sleep`). Then:

```bash
B=https://acmhs.in.ua
for p in / /en /about-center /en/conferences /uk/grants /studio /nope /en/nope /sitemap.xml /robots.txt /llms.txt; do
  printf '%-18s %s\n' $p "$(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' $B$p)"
done
curl -s -X POST -o /dev/null -w 'webhook unsigned: %{http_code}\n' $B/api/revalidate
```

Expect 200 everywhere, `/uk/*` → 307 to `/*`, 404 for unknown pages, 401 for the
unsigned webhook. Spot-check `html lang`, canonical, hreflang and the JSON-LD on
one page per language.

- Lighthouse on the live routes, 3 runs each; add rows to the log in
  `docs/modernization.md`.
- Move the Linear issue to Done only when the user confirms; the GitHub
  integration may close it early on a PR that names it, so reopen it if work
  remains.

## Content changes

Sanity delivers webhooks one at a time, about 3 s apart: a bulk publish of 100
documents takes ~5 minutes to show everywhere. Check the Vercel logs
(`vercel logs --environment production --since 30m --query /api/revalidate`)
before assuming one was lost. Each page refreshes on the request after its
revalidation (stale-while-revalidate), so curl twice.
