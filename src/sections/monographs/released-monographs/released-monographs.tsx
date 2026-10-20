import { PublicationGrid, Title } from '@/components/ui';
import data from '@/data/monographs.json';

export const ReleasedMonographs = () => {
  const { title, list, buttonDownload, doneText } = data.archivedMonographs;

  return (
    <section id="archive" className="section bg-mainBg">
      <Title title={title} isWhite />

      <PublicationGrid
        list={list}
        buttonLabel={buttonDownload}
        loadMore={{ doneText }}
      />
    </section>
  );
};
