import React, { FC } from 'react';
import type { Metadata } from 'next';

import { Title } from '@/components/ui';

import data from '@/data/journals.json';
import meta from '@/data/meta/meta.json';

export const metadata: Metadata = meta.journals;

const Page: FC = () => {
  const { title } = data;

  return (
    <main id="main" tabIndex={-1}>
      <section className="section">
        <Title title={title} as="h1" />
      </section>
    </main>
  );
};

export default Page;
