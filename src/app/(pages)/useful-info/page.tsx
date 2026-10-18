import React, { FC } from 'react';
import type { Metadata } from 'next';

import { Title } from '@/components/ui';
import { SourceDescription } from '@/sections';

import data from '@/data/useful-info.json';
import meta from '@/data/meta/meta.json';

export const metadata: Metadata = meta['useful-info'];

const Page: FC = () => {
  const { title } = data;

  return (
    <main id="main" tabIndex={-1}>
      <section className="section">
        <Title title={title} as="h1" />

        <SourceDescription />
      </section>
    </main>
  );
};

export default Page;
