import React, { FC } from 'react';
import type { Metadata } from 'next';

import { Title } from '@/components/ui';

import data from '@/data/library.json';
import meta from '@/data/meta/meta.json';
import { BookCollection } from '@/sections';

export const metadata: Metadata = meta.library;

const Page: FC = () => {
  const { title } = data;

  return (
    <main id="main" tabIndex={-1} className="focus:outline-none">
      <section className="section">
        <Title title={title} as="h1" />

        <BookCollection />
      </section>
    </main>
  );
};

export default Page;
