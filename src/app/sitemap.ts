import type { MetadataRoute } from 'next';

import { ENGLISH_PUBLIC, LINKS } from '@/constants';
import { getPathname } from '@/i18n/navigation';
import { PUBLIC_BASE_URL } from '@/lib/sanity/metadata';

const url = (locale: 'uk' | 'en', href: string) =>
  new URL(getPathname({ locale, href }), PUBLIC_BASE_URL).toString();

/** The pages in the navigation; English joins once it is public. */
export default function sitemap(): MetadataRoute.Sitemap {
  return LINKS.flatMap(({ linkTo }) => {
    const entry = {
      changeFrequency: 'weekly' as const,
      priority: linkTo === '/' ? 1 : 0.8,
    };
    if (!ENGLISH_PUBLIC) return [{ url: url('uk', linkTo), ...entry }];

    const languages = { uk: url('uk', linkTo), en: url('en', linkTo) };
    return (['uk', 'en'] as const).map(locale => ({
      url: url(locale, linkTo),
      alternates: { languages },
      ...entry,
    }));
  });
}
