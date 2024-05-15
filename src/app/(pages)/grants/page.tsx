import React, { FC } from 'react';
import type { Metadata } from 'next';

import { Title } from '@/components/ui';
import { GrantsExpendedVersion } from '@/sections';

import data from '@/data/grants.json';
import meta from '@/data/meta/meta.json';

export interface Props {}

export const metadata: Metadata = meta.grants;

const Page: FC<Props> = () => {
  const { title } = data;

  return (
    <main>
      <section className="section">
        <Title title={title} />

        <GrantsExpendedVersion />
      </section>
    </main>
  );
};

export default Page;
