import { getTranslations } from 'next-intl/server';

import { PublicationGrid, SectionHead } from '@/components/ui';
import { getArchivedMonographs } from '@/lib/sanity/content';

export const ReleasedMonographs = async () => {
  const t = await getTranslations('monographArchive');
  const list = await getArchivedMonographs();

  return (
    <section
      id="archive"
      aria-labelledby="archive-title"
      className="bg-surface sec"
    >
      <div className="wrap">
        <SectionHead
          id="archive-title"
          title={t('title')}
          sub={t('count', { count: list.length })}
        />
        <PublicationGrid
          list={list}
          buttonLabel={t('buttonDownload')}
          srLabel={t('srDownload')}
          loadMore={{ doneText: t('doneText') }}
        />
      </div>
    </section>
  );
};
