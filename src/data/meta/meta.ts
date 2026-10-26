import { Metadata } from 'next';

import { getSiteSettings } from '@/lib/sanity/content';

const PUBLIC_BASE_URL = 'https://acmhs.in.ua/';

/** Site-wide metadata: SEO text from siteSettings, icons and manifest here. */
export const rootMetadata = async (): Promise<Metadata> => {
  const settings = await getSiteSettings();
  const title = settings?.seo?.title ?? settings?.name ?? undefined;
  const description = settings?.seo?.description ?? undefined;

  return {
    title,
    description,
    keywords: settings?.seo?.keywords ?? undefined,
    metadataBase: new URL(PUBLIC_BASE_URL),
    alternates: { canonical: PUBLIC_BASE_URL },
    manifest: '/meta/site.webmanifest',
    // The images come from app/opengraph-image.tsx (or an editor's override).
    openGraph: {
      title,
      description,
      url: PUBLIC_BASE_URL,
      siteName: settings?.name ?? undefined,
      locale: 'uk_UA',
      type: 'website',
      ...(settings?.seo?.ogImage && {
        images: [
          { url: settings.seo.ogImage, alt: settings.seo.ogImageAlt ?? '' },
        ],
      }),
    },
    twitter: { title, description, card: 'summary_large_image' },
    ...STATIC,
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
