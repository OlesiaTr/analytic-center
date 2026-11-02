import { getLocale } from 'next-intl/server';
import { ReactNode } from 'react';

import { JsonLd } from '@/components/ui';
import { SiteShell } from '@/layouts';
import { getSiteSettings } from '@/lib/sanity/content';
import {
  absoluteUrl,
  ORGANIZATION,
  PUBLIC_BASE_URL,
} from '@/lib/sanity/metadata';
import { graph, organization } from '@/lib/seo/json-ld';

export default async function SiteLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [settings, locale] = await Promise.all([
    getSiteSettings(),
    getLocale(),
  ]);

  return (
    <SiteShell>
      <JsonLd
        data={graph([
          organization({
            id: ORGANIZATION['@id'],
            name: settings?.name ?? '',
            description: settings?.seo?.description ?? undefined,
            url: absoluteUrl(locale, '/'),
            logo: new URL('meta/android-chrome-512x512.png', PUBLIC_BASE_URL)
              .href,
            email: settings?.contacts?.email ?? undefined,
            phone: settings?.contacts?.phone ?? undefined,
          }),
        ])}
      />
      {children}
    </SiteShell>
  );
}
