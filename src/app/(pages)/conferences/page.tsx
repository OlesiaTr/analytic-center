import type { Metadata } from 'next';

import { PageHead } from '@/components/ui';
import data from '@/data/conferences.json';
import meta from '@/data/meta/meta.json';
import { ReleasedConferences, UpcomingConferencesExpanded } from '@/sections';

export const metadata: Metadata = meta.conferences;

const Page = () => (
  <main id="main" tabIndex={-1} className="focus:outline-none">
    <PageHead title={data.title} />
    <UpcomingConferencesExpanded />
    <ReleasedConferences />
  </main>
);

export default Page;
