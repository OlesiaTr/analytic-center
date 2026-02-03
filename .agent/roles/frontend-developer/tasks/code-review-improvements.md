# Code Review: Improvement Tasks

**Created:** 2026-02-03
**Status:** Backlog

## High Priority

### Accessibility
- [ ] Fix aria-labels in `src/components/ui/professor-list/professor-list.tsx` - use descriptive text instead of URLs
- [ ] Refactor `src/sections/useful-info/source-description/source-description.tsx` - fix table semantics (add `<thead>`, `<th>`, remove deprecated `valign`)
- [ ] Add focus trapping to `src/components/base/mobile-menu/mobile-menu.tsx`

### Performance
- [ ] Replace `<img>` with Next.js `<Image>` component throughout codebase
- [ ] Replace `useViewportSize()` hook usage with CSS media queries
- [ ] Move Swiper CSS imports to global styles

### Type Safety
- [ ] Fix `any` type in `src/components/ui/slide-component/slide-component.tsx:5`
- [ ] Remove `as` type assertions, use proper typed imports

## Medium Priority

### Code Duplication
- [ ] Consolidate `CoverCard`, `LibraryCard`, `SlideCoverCard` into single component with variants
- [ ] Extract shared button styling from `Button` and `ButtonLink`

### UI/UX
- [ ] Fix `src/components/ui/table/table.tsx` - show Q&A on mobile
- [ ] Add loading states/skeletons for images and sliders
- [ ] Replace `return null` empty states with proper UI components

### SEO
- [ ] Fix OG image alt text in `src/data/meta/meta.ts` (currently mentions wrong company)
- [ ] Add JSON-LD structured data for organization/events/people
- [ ] Add `hreflang` for Ukrainian language

### Configuration
- [ ] Move `PUBLIC_BASE_URL` to environment variable
- [ ] Create `.env.example` file

## Low Priority

### CSS
- [ ] Remove `!important` declarations in `src/styles/globals.css`
- [ ] Extract magic numbers to Tailwind config or design tokens

### Testing & Documentation
- [ ] Add component tests (Jest + Testing Library)
- [ ] Add error boundaries for component failures
- [ ] Consider adding Storybook for component previews
