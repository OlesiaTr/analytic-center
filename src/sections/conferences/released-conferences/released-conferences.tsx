import { PublicationGrid, Title } from '@/components/ui';
import data from '@/data/conferences.json';

export const ReleasedConferences = () => {
  const { title, list, buttonDownload, doneText } = data.upcomingConferences;

  return (
    <section id="archive" className="section">
      <Title title={title} />

      <PublicationGrid
        list={list}
        buttonLabel={buttonDownload}
        loadMore={{ doneText }}
      />
    </section>
  );
};
