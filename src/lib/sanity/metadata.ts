import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

import { ENGLISH_PUBLIC } from '@/constants';
import { getPathname } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

import { getPage, getSiteSettings } from './content';

export const PUBLIC_BASE_URL = 'https://acmhs.in.ua/';

const OG_LOCALES: Record<Locale, string> = { uk: 'uk_UA', en: 'en_US' };

/** Canonical URL in this locale; hreflang alternates once English is public. */
const alternates = (locale: Locale, href: string): Metadata['alternates'] => ({
  canonical: getPathname({ locale, href }),
  ...(ENGLISH_PUBLIC
    ? {
        languages: {
          uk: getPathname({ locale: 'uk', href }),
          en: getPathname({ locale: 'en', href }),
          'x-default': getPathname({ locale: 'uk', href }),
        },
      }
    : {}),
});

/** Title, description and canonical URL of a page singleton, from its SEO fields. */
export const pageMetadata = async (
  id: Parameters<typeof getPage>[0],
  path: string,
): Promise<Metadata> => {
  const [page, locale] = await Promise.all([getPage(id), getLocale()]);
  return {
    title: page?.seo?.title ?? page?.title ?? undefined,
    description: page?.seo?.description ?? page?.lead ?? undefined,
    alternates: alternates(locale, path),
  };
};

/** Site-wide metadata: SEO text from siteSettings, icons and manifest here. */
export const rootMetadata = async (locale: Locale): Promise<Metadata> => {
  const settings = await getSiteSettings();
  const title = settings?.seo?.title ?? settings?.name ?? undefined;
  const description = settings?.seo?.description ?? undefined;

  return {
    title,
    description,
    keywords: settings?.seo?.keywords ?? undefined,
    metadataBase: new URL(PUBLIC_BASE_URL),
    alternates: alternates(locale, '/'),
    manifest: '/meta/site.webmanifest',
    // The images come from app/[locale]/opengraph-image.tsx (or an editor's override).
    openGraph: {
      title,
      description,
      url: getPathname({ locale, href: '/' }),
      siteName: settings?.name ?? undefined,
      locale: OG_LOCALES[locale],
      type: 'website',
      ...(settings?.seo?.ogImage && {
        images: [
          { url: settings.seo.ogImage, alt: settings.seo.ogImageAlt ?? '' },
        ],
      }),
    },
    twitter: { title, description, card: 'summary_large_image' },
    ...STATIC,
    // English stays out of search engines until it is public.
    ...(locale === 'en' && !ENGLISH_PUBLIC
      ? { robots: { index: false, follow: true } }
      : {}),
  };
};

const STATIC: Metadata = {
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
  icons: {
    icon: [
      {
        url: '/meta/favicon.ico',
      },
      {
        url: '/meta/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/meta/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/meta/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/meta/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    shortcut: {
      url: '/meta/favicon.ico',
    },
    apple: {
      url: '/meta/apple-touch-icon.png',
    },

    other: {
      url: '/meta/apple-touch-icon.png',
    },
  },
};
