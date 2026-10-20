import type { Metadata } from 'next';

import { PageHead } from '@/components/ui';
import meta from '@/data/meta/meta.json';
import data from '@/data/monographs.json';
import { ReleasedMonographs, UpcomingMonographsExpanded } from '@/sections';

export const metadata: Metadata = meta.monographs;

const Page = () => (
  <main id="main" tabIndex={-1} className="focus:outline-none">
    <PageHead title={data.title} lead={data.lead} />
    <UpcomingMonographsExpanded />
    <ReleasedMonographs />
  </main>
);

export default Page;
