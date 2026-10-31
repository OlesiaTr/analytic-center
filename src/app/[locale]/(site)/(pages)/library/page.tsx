import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { PageHead } from '@/components/ui';
import { getPage } from '@/lib/sanity/content';
import { pageMetadata } from '@/lib/sanity/metadata';
import { BookCollection } from '@/sections';

export const generateMetadata = (): Promise<Metadata> =>
  pageMetadata('libraryPage', '/library');

const Page = async () => {
  const page = await getPage('libraryPage');
  const t = await getTranslations('library');
  return (
    <main id="main" tabIndex={-1} className="focus:outline-none">
      <PageHead title={page?.title ?? ''} lead={page?.lead ?? undefined} />
      <section aria-label={t('listLabel')} className="sec">
        <div className="wrap">
          <BookCollection />
        </div>
      </section>
    </main>
  );
};

export default Page;
