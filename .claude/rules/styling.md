---
paths:
  - src/**/*.css
  - src/**/*.tsx
---

# Styling (Tailwind v4)

- Tokens live in `@theme` in `src/styles/globals.css`; there is no
  `tailwind.config.ts`. Add a token there instead of repeating a hex value.
- Prefer scale classes over arbitrary values (`h-104`, not `h-[416px]`) — except
  unitless line-heights, which must stay arbitrary (`leading-[1.8]`); that's why
  `tailwindcss/no-unnecessary-arbitrary-value` is off.
- Reusable class groups are `@utility` blocks (`section`, `hero`), not plain CSS
  classes, so they sort with utilities and the lint plugin knows them.
- No `!important` in CSS. In markup the important modifier is a suffix (`pt-0!`)
  and is a last resort.
- Never put two utilities for the same property on one element (e.g.
  `inline-block` + `flex`); pick one conditionally with `clsx`. Tailwind v4's
  ordering differs from v3, so such pairs break silently.
- Font sizes carry unitless line-heights in v4. When a breakpoint switches to an
  arbitrary size (`xl:text-[28px]`), set its leading too (`xl:leading-7`) —
  otherwise it inherits the previous step's ratio.
- Prettier owns class order — don't reorder by hand.
- Any styling change: run the `visual-check` skill before committing.
