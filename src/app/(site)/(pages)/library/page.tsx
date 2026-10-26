import type { Metadata } from 'next';

import { PageHead } from '@/components/ui';
import data from '@/data/library.json';
import meta from '@/data/meta/meta.json';
import { BookCollection } from '@/sections';

export const metadata: Metadata = meta.library;

const Page = () => (
  <main id="main" tabIndex={-1} className="focus:outline-none">
    <PageHead title={data.title} lead={data.lead} />
    <section aria-label={data.listLabel} className="sec">
      <div className="wrap">
        <BookCollection />
      </div>
    </section>
  </main>
);

export default Page;
