import { PublicationGrid, SectionHead } from '@/components/ui';
import data from '@/data/common.json';
import { getArchivedConferences } from '@/lib/sanity/content';
import { plural } from '@/utils';

export const ReleasedConferences = async () => {
  const { title, buttonDownload, srDownload, doneText, count } =
    data.conferenceArchive;
  const list = await getArchivedConferences();

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
