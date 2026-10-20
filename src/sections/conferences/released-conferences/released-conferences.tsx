import { PublicationGrid, SectionHead } from '@/components/ui';
import data from '@/data/conferences.json';

export const ReleasedConferences = () => {
  const { title, list, buttonDownload, doneText } = data.upcomingConferences;

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
