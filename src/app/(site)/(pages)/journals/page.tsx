import type { Metadata } from 'next';

import { PageHead } from '@/components/ui';
import { getPage } from '@/lib/sanity/content';
import { pageMetadata } from '@/lib/sanity/metadata';

export const generateMetadata = (): Promise<Metadata> =>
  pageMetadata('journalsPage', '/journals');

const Page = async () => {
  const page = await getPage('journalsPage');
  return (
    <main id="main" tabIndex={-1} className="focus:outline-none">
      <PageHead title={page?.title ?? ''} lead={page?.lead ?? undefined} />
    </main>
  );
};

export default Page;
