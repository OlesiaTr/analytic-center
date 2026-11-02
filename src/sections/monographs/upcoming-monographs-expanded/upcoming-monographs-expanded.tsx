import { getTranslations } from 'next-intl/server';

import { EmptyState, PublicationGrid, SectionHead } from '@/components/ui';
import { getUpcomingMonographs } from '@/lib/sanity/content';

export const UpcomingMonographsExpanded = async () => {
  const t = await getTranslations('upcomingMonographs');
  const title = t('title');
  const buttonDownload = t('buttonDownload');
  const srDownload = t('srDownload');
  const empty = {
    title: t('empty.title'),
    text: t('empty.text'),
    link: t('empty.link'),
    href: '/monographs#archive',
  };
  const list = await getUpcomingMonographs();

  return (
    <section aria-labelledby="upcoming-title" className="sec">
      <div className="wrap">
        <SectionHead id="upcoming-title" title={title} />
        {list.length ? (
          <PublicationGrid
            list={list}
            buttonLabel={buttonDownload}
            srLabel={srDownload}
            layout="wide"
          />
        ) : (
          <EmptyState
            title={empty.title}
            text={empty.text}
            link={{ href: empty.href, label: empty.link }}
          />
        )}
      </div>
    </section>
  );
};
