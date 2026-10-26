---
paths:
  - src/components/**
  - src/sections/**
  - src/layouts/**
  - src/app/**
---

# Components

- Server components by default. Add `'use client'` only to the component that
  holds state or browser APIs, and keep it small (e.g. `Header`, `LoadMore`,
  `Carousel`).
- Logic goes in hooks (`src/hooks/`), components only render. Reuse
  `useDisclosure` (open/close; pass `resetKey` to auto-close, e.g. on pathname),
  `useLoadMore` and `useCarousel` before writing new state. Open/close content
  uses native `<details>` (`Accordion`, `Panel`), not state.
- Responsive differences are CSS, never JS: render both variants and toggle with
  `lg:hidden` / `hidden lg:contents` (`contents` keeps the child in its flex or
  grid parent). Don't measure the viewport.
- Internal links: `next/link` (`Button` and `TextLink` pick `Link` for `/…`
  hrefs). Files and external sites stay `<a>`.
- Images: `next/image` with the `width`/`height` that the GROQ query returns
  from `asset->metadata.dimensions`, plus `sizes`. The custom loader resizes on
  Sanity's CDN.
- Publication lists (conferences, monographs, library) use `PublicationGrid` /
  `PublicationCard` (`variant`, `layout`); don't copy card markup.
- Icons come from `Icon` (`src/components/icons`); icon-only controls use
  `IconButton` with a `label`. Download buttons get hidden text (`srText`,
  `srLabel`) so every name is unique.
- Content types come from TypeGen (`src/lib/sanity/types.ts`) through the
  getters in `content.ts`; never `as`.
- Keys come from a stable field (`id`, `title`, `linkTo`), not the index.
- Inline SVGs with internal `id`s (e.g. `Logo`) must not be rendered twice on
  one page — size one instance with classes instead.
- New behavior gets a colocated `*.test.tsx` (Vitest + Testing Library); a new
  route goes into `scripts/routes.mts` so screenshots and e2e cover it.
