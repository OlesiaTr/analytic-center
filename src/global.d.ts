import type { routing } from '@/i18n/routing';

import type messages from '../messages/uk.json';

// Typed message keys and locales for next-intl (uk.json is the source of truth).
declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
