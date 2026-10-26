import type { MetadataRoute } from 'next';

import { PUBLIC_BASE_URL } from '@/lib/sanity/metadata';

export default function robots(): MetadataRoute.Robots {
  return {
    // The Studio and the webhook aren't pages.
    rules: { userAgent: '*', allow: '/', disallow: ['/studio', '/api/'] },
    sitemap: new URL('/sitemap.xml', PUBLIC_BASE_URL).toString(),
  };
}
