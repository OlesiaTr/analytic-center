import React, { FC } from 'react';
import type { Metadata } from 'next';

import { Title } from '@/components/ui';
import { GrantsExpendedVersion } from '@/sections';

import data from '@/data/grants.json';
import meta from '@/data/meta/meta.json';

export const metadata: Metadata = meta.grants;

const Page: FC = () => {
  const { title } = data;

  return (
    <main id="main" tabIndex={-1}>
      <section className="section">
        <Title title={title} as="h1" />

        <GrantsExpendedVersion />
      </section>
    </main>
  );
};

export default Page;
