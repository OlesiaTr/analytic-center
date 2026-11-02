import { getTranslations } from 'next-intl/server';

import { PublicationGrid } from '@/components/ui';
import { getLibrary } from '@/lib/sanity/content';

const BookCollection = async () => {
  const t = await getTranslations('library');
  const buttonDownload = t('buttonDownload');
  const srDownload = t('srDownload');
  const kinds = {
    textbook: t('kinds.textbook'),
    studyGuide: t('kinds.studyGuide'),
    monograph: t('kinds.monograph'),
  };
  const list = await getLibrary(kinds);

  return (
    <PublicationGrid
      list={list}
      buttonLabel={buttonDownload}
      srLabel={srDownload}
      variant="library"
      headingLevel="h2"
    />
  );
};

export default BookCollection;
