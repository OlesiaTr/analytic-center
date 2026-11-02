import type { Metadata } from 'next';

import { getLocale } from 'next-intl/server';

import { JsonLd, PageHead } from '@/components/ui';
import {
  getArchivedConferences,
  getPage,
  getUpcomingConferences,
} from '@/lib/sanity/content';
import { absoluteUrl, ORGANIZATION, pageMetadata } from '@/lib/sanity/metadata';
import { event, graph } from '@/lib/seo/json-ld';
import { ReleasedConferences, UpcomingConferencesExpanded } from '@/sections';

export const generateMetadata = (): Promise<Metadata> =>
  pageMetadata('conferencesPage', '/conferences');

const Page = async () => {
  const [page, upcoming, archived, locale] = await Promise.all([
    getPage('conferencesPage'),
    getUpcomingConferences(),
    getArchivedConferences(),
    getLocale(),
  ]);
  const url = absoluteUrl(locale, '/conferences');
  return (
    <main id="main" tabIndex={-1} className="focus:outline-none">
      <JsonLd
        data={graph(
          [...upcoming, ...archived].map(conference =>
            event(conference, { organizer: ORGANIZATION, url }),
          ),
        )}
      />
      <PageHead
        title={page?.title ?? ''}
        lead={page?.lead ?? undefined}
        lang={page?.lang}
      />
      <UpcomingConferencesExpanded />
      <ReleasedConferences />
    </main>
  );
};

export default Page;
