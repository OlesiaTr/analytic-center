import React, { FC } from 'react';
import type { Metadata } from 'next';

import { Title } from '@/components/ui';

import data from '@/data/journals.json';
import meta from '@/data/meta/meta.json';

export const metadata: Metadata = meta.journals;

const Page: FC = () => {
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
