import { PublicationGrid, Title } from '@/components/ui';
import data from '@/data/monographs.json';

export const ReleasedMonographs = () => {
  const { title, list, buttonDownload } = data.archivedMonographs;

  return (
    <section className="section bg-mainBg">
      <Title title={title} isWhite />

      <PublicationGrid list={list} buttonDownload={buttonDownload} />
    </section>
  );
};
