import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Not the Studio, the webhook, Next/Vercel internals or files (anything with a dot).
  matcher: '/((?!api|studio|_next|_vercel|.*\\..*).*)',
};
