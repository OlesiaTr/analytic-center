import type { Metadata } from 'next';

import { Title } from '@/components/ui';
import { ReleasedMonographs, UpcomingMonographsExpanded } from '@/sections';

import data from '@/data/monographs.json';
import meta from '@/data/meta/meta.json';

export const metadata: Metadata = meta.monographs;

const Page = () => {
  const { title } = data;

  return (
    <main>
      <section className="section">
        <Title title={title} />

        <UpcomingMonographsExpanded />
      </section>

      <ReleasedMonographs />
    </main>
  );
};

export default Page;
