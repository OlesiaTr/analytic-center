import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import NextLink from 'next/link';
import { afterEach, vi } from 'vitest';

afterEach(cleanup);

// Components render outside a locale request in unit tests: the locale-aware
// helpers behave like the Ukrainian (default, unprefixed) locale.
vi.mock('@/i18n/navigation', () => ({
  Link: NextLink,
  usePathname: () => '/',
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  getPathname: ({ href }: { href: string }) => href,
  redirect: vi.fn(),
}));
