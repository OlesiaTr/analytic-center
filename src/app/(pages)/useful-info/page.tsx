import React, { FC } from 'react';
import type { Metadata } from 'next';

import { Title } from '@/components/ui';

import data from '@/data/useful-info.json';
import meta from '@/data/meta/meta.json';

export interface Props {}

export const metadata: Metadata = meta['useful-info'];

const Page: FC<Props> = () => {
  const { title } = data;

  return (
    <main>
      <section className="section">
        <Title title={title} />
      </section>
    </main>
  );
};

export default Page;
