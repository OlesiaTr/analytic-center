import { PublicationGrid, Title } from '@/components/ui';
import data from '@/data/conferences.json';

export const ReleasedConferences = () => {
  const { title, list, buttonDownload } = data.upcomingConferences;

  return (
    <section className="section">
      <Title title={title} />

      <PublicationGrid list={list} buttonDownload={buttonDownload} />
    </section>
  );
};
