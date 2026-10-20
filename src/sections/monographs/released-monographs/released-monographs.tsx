import { PublicationGrid, SectionHead } from '@/components/ui';
import data from '@/data/monographs.json';

export const ReleasedMonographs = () => {
  const { title, list, buttonDownload, doneText } = data.archivedMonographs;

  return (
    <section
      id="archive"
      aria-labelledby="archive-title"
      className="bg-surface sec"
    >
      <div className="wrap">
        <SectionHead id="archive-title" title={title} />
        <PublicationGrid
          list={list}
          buttonLabel={buttonDownload}
          loadMore={{ doneText }}
        />
      </div>
    </section>
  );
};
