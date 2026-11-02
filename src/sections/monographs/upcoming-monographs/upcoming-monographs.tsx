import { getTranslations } from 'next-intl/server';

import {
  Button,
  EmptyState,
  PublicationGrid,
  SectionHead,
} from '@/components/ui';
import { getUpcomingMonographs } from '@/lib/sanity/content';

export const UpcomingMonographs = async () => {
  const list = await getUpcomingMonographs();
  const t = await getTranslations('upcomingMonographs');

  return (
    <section
      aria-labelledby="monographs-title"
      className="bg-blue-600 sec on-dark"
    >
      <div className="wrap">
        <SectionHead
          id="monographs-title"
          title={t('title')}
          action={
            <Button href="/monographs" variant="yellow">
              {t('button')}
            </Button>
          }
        />
        {list.length ? (
          <PublicationGrid
            list={list}
            buttonLabel={t('buttonDownload')}
            srLabel={t('srDownload')}
            layout="grid-3"
          />
        ) : (
          <EmptyState
            title={t('empty.title')}
            text={t('empty.text')}
            link={{ href: '/monographs#archive', label: t('empty.link') }}
          />
        )}
      </div>
    </section>
  );
};
