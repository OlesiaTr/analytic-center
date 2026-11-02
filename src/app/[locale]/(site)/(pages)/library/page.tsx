import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { JsonLd, PageHead } from '@/components/ui';
import { getLibrary, getPage } from '@/lib/sanity/content';
import { ORGANIZATION, pageMetadata } from '@/lib/sanity/metadata';
import { book, graph } from '@/lib/seo/json-ld';
import { BookCollection } from '@/sections';

export const generateMetadata = (): Promise<Metadata> =>
  pageMetadata('libraryPage', '/library');

const Page = async () => {
  const [page, books, t] = await Promise.all([
    getPage('libraryPage'),
    getLibrary({}),
    getTranslations('library'),
  ]);
  return (
    <main id="main" tabIndex={-1} className="focus:outline-none">
      <JsonLd
        data={graph(books.map(item => book(item, { publisher: ORGANIZATION })))}
      />
      <PageHead
        title={page?.title ?? ''}
        lead={page?.lead ?? undefined}
        lang={page?.lang}
      />
      <section aria-label={t('listLabel')} className="sec">
        <div className="wrap">
          <BookCollection />
        </div>
      </section>
    </main>
  );
};

export default Page;
