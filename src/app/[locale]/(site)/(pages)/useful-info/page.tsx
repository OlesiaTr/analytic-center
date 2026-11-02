import type { Metadata } from 'next';

import { PageHead } from '@/components/ui';
import { getPage } from '@/lib/sanity/content';
import { pageMetadata } from '@/lib/sanity/metadata';
import { SourceDescription } from '@/sections';

export const generateMetadata = (): Promise<Metadata> =>
  pageMetadata('usefulInfoPage', '/useful-info');

const Page = async () => {
  const page = await getPage('usefulInfoPage');
  return (
    <main id="main" tabIndex={-1} className="focus:outline-none">
      <PageHead
        title={page?.title ?? ''}
        lead={page?.lead ?? undefined}
        lang={page?.lang}
      />
      <SourceDescription />
    </main>
  );
};

export default Page;
