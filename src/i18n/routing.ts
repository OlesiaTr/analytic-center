import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['uk', 'en'],
  defaultLocale: 'uk',
  // Ukrainian at /, English at /en/…
  localePrefix: 'as-needed',
  // No redirects by browser language: English stays opt-in until it launches.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
