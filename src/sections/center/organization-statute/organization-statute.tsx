import { getTranslations } from 'next-intl/server';

import { DocumentList, SectionHead } from '@/components/ui';
import { getAboutPage } from '@/lib/sanity/content';

export const OrganizationStatute = async () => {
  const t = await getTranslations('about.statute');
  const list = ((await getAboutPage())?.statute ?? []).map(doc => ({
    title: doc.title ?? '',
    linkToDownload: doc.linkToDownload ?? '',
  }));

  return (
    <section aria-labelledby="statute-title" className="bg-surface sec">
      <div className="wrap">
        <SectionHead id="statute-title" title={t('title')} />
        <DocumentList
          list={list}
          buttonLabel={t('button')}
          srLabel={t('srLabel')}
        />
      </div>
    </section>
  );
};
