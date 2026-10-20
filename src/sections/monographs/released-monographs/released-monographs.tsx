import { PublicationGrid, SectionHead } from '@/components/ui';
import data from '@/data/monographs.json';
import { plural } from '@/utils';

export const ReleasedMonographs = () => {
  const { title, list, buttonDownload, srDownload, doneText, count } =
    data.archivedMonographs;

  return (
    <section
      id="archive"
      aria-labelledby="archive-title"
      className="bg-surface sec"
    >
      <div className="wrap">
        <SectionHead
          id="archive-title"
          title={title}
          sub={plural(list.length, count)}
        />
        <PublicationGrid
          list={list}
          buttonLabel={buttonDownload}
          srLabel={srDownload}
          loadMore={{ doneText }}
        />
      </div>
    </section>
  );
};
