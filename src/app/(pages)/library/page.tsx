import React, { FC } from 'react';
import type { Metadata } from 'next';

import { Title } from '@/components/ui';

import data from '@/data/library.json';
import meta from '@/data/meta/meta.json';
import { BookCollection } from '@/sections';

export interface Props {}

export const metadata: Metadata = meta.library;

const Page: FC<Props> = () => {
  const { title } = data;

  return (
    <main>
      <section className="section">
        <Title title={title} />

        <BookCollection />
      </section>
    </main>
  );
};

export default Page;
