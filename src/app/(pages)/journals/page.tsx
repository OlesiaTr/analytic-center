import type { Metadata } from 'next';

import { PageHead } from '@/components/ui';
import data from '@/data/journals.json';
import meta from '@/data/meta/meta.json';

export const metadata: Metadata = meta.journals;

const Page = () => (
  <main id="main" tabIndex={-1} className="focus:outline-none">
    <PageHead title={data.title} />
  </main>
);

export default Page;
