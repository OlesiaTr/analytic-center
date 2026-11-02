import { createNavigation } from 'next-intl/navigation';

import { routing } from './routing';

/** Locale-aware Link and path helpers: `/grants` becomes `/en/grants` on English pages. */
export const { Link, usePathname, useRouter, getPathname, redirect } =
  createNavigation(routing);
