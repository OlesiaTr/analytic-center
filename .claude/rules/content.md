---
paths:
  - sanity/**
  - src/lib/sanity/**
  - src/sections/**
  - src/app/**
---

# Content (Sanity)

- Content lives in Sanity (project `xczp8pdn`, dataset `production`, Studio at
  `/studio`). `src/data/common.json` holds **UI labels only** (buttons, aria
  labels, plural forms, empty states): never put content back into it.
- Every text field is localized: `localeString` / `localeText` / `localeBlock`
  (`{ uk, en }`). Ukrainian is required (`ukRequired`), English arrives with
  PER-10. Queries read `.uk` for now.
- Adding a field or type: schema in `sanity/schemaTypes/`, register it in
  `index.ts` (and `SINGLETONS` if there is one instance), then
  `npm run typegen`. Commit the regenerated `src/lib/sanity/types.ts`.
- Reading content: a `defineQuery` in `src/lib/sanity/queries.ts`, a getter in
  `src/lib/sanity/content.ts` that maps it onto the component props and passes
  `tags: ['<_type>']`. The tag must equal the document type: the webhook
  (`/api/revalidate`) revalidates by `_type`.
- Images: `cover` (with localized alt) or `image`; return `asset->url` plus
  `metadata.dimensions` and render with `next/image` + `sizes`. The custom
  loader resizes on Sanity's CDN; never re-enable Next's optimizer.
- Upcoming vs archive is computed from `date` and which link is set
  (`infoLetterUrl` / `proceedingsUrl`, `callUrl` / `bookUrl`); don't add a
  status field.
- Content edits by agents go through the Sanity MCP server (`.mcp.json`), not
  through code. Writes hit the production dataset: confirm with the user first.
- Secrets (`SANITY_API_*_TOKEN`, `SANITY_REVALIDATE_SECRET`) live in Vercel and
  `.env.local`; never print, log or commit them.
