import { DocumentList, SectionHead } from '@/components/ui';
import data from '@/data/common.json';
import { getAboutPage } from '@/lib/sanity/content';

export const OrganizationStatute = async () => {
  const { title, button, srLabel } = data.about.statute;
  const list = ((await getAboutPage())?.statute ?? []).map(doc => ({
    title: doc.title ?? '',
    linkToDownload: doc.linkToDownload ?? '',
  }));

  return (
    <section aria-labelledby="statute-title" className="bg-surface sec">
      <div className="wrap">
        <SectionHead id="statute-title" title={title} />
        <DocumentList list={list} buttonLabel={button} srLabel={srLabel} />
      </div>
    </section>
  );
};
