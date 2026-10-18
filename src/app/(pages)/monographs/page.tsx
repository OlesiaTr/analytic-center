import type { Metadata } from 'next';

import { Title } from '@/components/ui';
import { ReleasedMonographs, UpcomingMonographsExpanded } from '@/sections';

import data from '@/data/monographs.json';
import meta from '@/data/meta/meta.json';

export const metadata: Metadata = meta.monographs;

const Page = () => {
  const { title } = data;

  return (
    <main id="main" tabIndex={-1}>
      <section className="section">
        <Title title={title} as="h1" />

        <UpcomingMonographsExpanded />
      </section>

      <ReleasedMonographs />
    </main>
  );
};

export default Page;
