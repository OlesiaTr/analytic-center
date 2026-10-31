import type { Metadata } from 'next';

import { PageHead } from '@/components/ui';
import { getPage } from '@/lib/sanity/content';
import { pageMetadata } from '@/lib/sanity/metadata';

export const generateMetadata = (): Promise<Metadata> =>
  pageMetadata('contactsPage', '/contacts');

const Page = async () => {
  const page = await getPage('contactsPage');
  return (
    <main id="main" tabIndex={-1} className="focus:outline-none">
      <PageHead
        title={page?.title ?? ''}
        lead={page?.lead ?? undefined}
        lang={page?.lang}
      />
    </main>
  );
};

export default Page;
