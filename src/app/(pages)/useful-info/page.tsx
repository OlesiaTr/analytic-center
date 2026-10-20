import type { Metadata } from 'next';

import { PageHead } from '@/components/ui';
import meta from '@/data/meta/meta.json';
import data from '@/data/useful-info.json';
import { SourceDescription } from '@/sections';

export const metadata: Metadata = meta['useful-info'];

const Page = () => (
  <main id="main" tabIndex={-1} className="focus:outline-none">
    <PageHead title={data.title} lead={data.lead} />
    <SourceDescription />
  </main>
);

export default Page;
