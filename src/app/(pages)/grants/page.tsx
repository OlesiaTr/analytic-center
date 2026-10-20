import type { Metadata } from 'next';

import { PageHead } from '@/components/ui';
import data from '@/data/grants.json';
import meta from '@/data/meta/meta.json';
import { GrantsExpendedVersion } from '@/sections';

export const metadata: Metadata = meta.grants;

const Page = () => (
  <main id="main" tabIndex={-1} className="focus:outline-none">
    <PageHead title={data.title} />
    <GrantsExpendedVersion />
  </main>
);

export default Page;
