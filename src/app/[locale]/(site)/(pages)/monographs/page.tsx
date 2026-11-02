import type { Metadata } from 'next';

import { JsonLd, PageHead } from '@/components/ui';
import { getArchivedMonographs, getPage } from '@/lib/sanity/content';
import { ORGANIZATION, pageMetadata } from '@/lib/sanity/metadata';
import { book, graph } from '@/lib/seo/json-ld';
import { ReleasedMonographs, UpcomingMonographsExpanded } from '@/sections';

export const generateMetadata = (): Promise<Metadata> =>
  pageMetadata('monographsPage', '/monographs');

const Page = async () => {
  const [page, published] = await Promise.all([
    getPage('monographsPage'),
    getArchivedMonographs(),
  ]);
  return (
    <main id="main" tabIndex={-1} className="focus:outline-none">
      {/* Upcoming monographs are calls for chapters, not books yet. */}
      <JsonLd
        data={graph(
          published.map(monograph =>
            book(monograph, { publisher: ORGANIZATION }),
          ),
        )}
      />
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
