import type { Metadata } from 'next';

import { Title } from '@/components/ui';
import {
  AboutAuthors,
  ReleasedConferences,
  UpcomingConferencesExpanded,
} from '@/sections';

import data from '@/data/conferences.json';
import meta from '@/data/meta/meta.json';

export const metadata: Metadata = meta.conferences;

const Page = () => {
  const { title } = data;

  return (
    <main>
      <section className="section">
        <Title title={title} />

        <UpcomingConferencesExpanded />
      </section>

      <AboutAuthors />

      <ReleasedConferences />
    </main>
  );
};

export default Page;
