import type { Metadata } from 'next';

import { PageHead } from '@/components/ui';
import { getPage } from '@/lib/sanity/content';
import { pageMetadata } from '@/lib/sanity/metadata';
import { GrantsExpendedVersion } from '@/sections';

export const generateMetadata = (): Promise<Metadata> =>
  pageMetadata('grantsPage', '/grants');

const Page = async () => {
  const page = await getPage('grantsPage');
  return (
    <main id="main" tabIndex={-1} className="focus:outline-none">
      <PageHead title={page?.title ?? ''} lead={page?.lead ?? undefined} />
      <GrantsExpendedVersion />
    </main>
  );
};

export default Page;
