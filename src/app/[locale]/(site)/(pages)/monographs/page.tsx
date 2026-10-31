import type { Metadata } from 'next';

import { PageHead } from '@/components/ui';
import { getPage } from '@/lib/sanity/content';
import { pageMetadata } from '@/lib/sanity/metadata';
import { ReleasedMonographs, UpcomingMonographsExpanded } from '@/sections';

export const generateMetadata = (): Promise<Metadata> =>
  pageMetadata('monographsPage', '/monographs');

const Page = async () => {
  const page = await getPage('monographsPage');
  return (
    <main id="main" tabIndex={-1} className="focus:outline-none">
      <PageHead
        title={page?.title ?? ''}
        lead={page?.lead ?? undefined}
        lang={page?.lang}
      />
      <UpcomingMonographsExpanded />
      <ReleasedMonographs />
    </main>
  );
};

export default Page;
