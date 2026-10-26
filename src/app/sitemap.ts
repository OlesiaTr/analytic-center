import type { MetadataRoute } from 'next';

import { LINKS } from '@/constants';
import { PUBLIC_BASE_URL } from '@/lib/sanity/metadata';

/** The pages in the navigation (PER-10 adds the English alternates). */
export default function sitemap(): MetadataRoute.Sitemap {
  return LINKS.map(({ linkTo }) => ({
    url: new URL(linkTo, PUBLIC_BASE_URL).toString(),
    changeFrequency: 'weekly',
    priority: linkTo === '/' ? 1 : 0.8,
  }));
}
