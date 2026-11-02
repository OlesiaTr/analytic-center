import { getTranslations } from 'next-intl/server';

import {
  Button,
  EmptyState,
  PublicationGrid,
  SectionHead,
} from '@/components/ui';
import { getUpcomingConferences } from '@/lib/sanity/content';

export const UpcomingConferences = async () => {
  const list = await getUpcomingConferences();
  const t = await getTranslations('upcomingConferences');

  return (
    <section aria-labelledby="conferences-title" className="bg-surface sec">
      <div className="wrap">
        <SectionHead
          id="conferences-title"
          title={t('title')}
          action={<Button href="/conferences">{t('button')}</Button>}
        />
        {list.length ? (
          <PublicationGrid
            list={list}
            buttonLabel={t('buttonDownload')}
            srLabel={t('srDownload')}
            layout="wide"
          />
        ) : (
          <EmptyState
            title={t('empty.title')}
            text={t('empty.text')}
            link={{ href: '/conferences#archive', label: t('empty.link') }}
          />
        )}
      </div>
    </section>
  );
};
