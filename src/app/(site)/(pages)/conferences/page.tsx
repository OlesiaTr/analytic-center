import type { Metadata } from 'next';

import { PageHead } from '@/components/ui';
import { getPage } from '@/lib/sanity/content';
import { pageMetadata } from '@/lib/sanity/metadata';
import { ReleasedConferences, UpcomingConferencesExpanded } from '@/sections';

export const generateMetadata = (): Promise<Metadata> =>
  pageMetadata('conferencesPage', '/conferences');

const Page = async () => {
  const page = await getPage('conferencesPage');
  return (
    <main id="main" tabIndex={-1} className="focus:outline-none">
      <PageHead title={page?.title ?? ''} lead={page?.lead ?? undefined} />
      <UpcomingConferencesExpanded />
      <ReleasedConferences />
    </main>
  );
};

export default Page;
