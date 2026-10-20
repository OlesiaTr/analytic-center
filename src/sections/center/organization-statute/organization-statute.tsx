import { DocumentList, SectionHead } from '@/components/ui';
import data from '@/data/about-center.json';

export const OrganizationStatute = () => {
  const { title, button, srLabel, list } = data.organizationStatute;

  return (
    <section aria-labelledby="statute-title" className="bg-surface sec">
      <div className="wrap">
        <SectionHead id="statute-title" title={title} />
        <DocumentList list={list} buttonLabel={button} srLabel={srLabel} />
      </div>
    </section>
  );
};
