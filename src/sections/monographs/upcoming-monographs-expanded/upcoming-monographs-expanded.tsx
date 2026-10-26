import { EmptyState, PublicationGrid, SectionHead } from '@/components/ui';
import commonData from '@/data/common.json';
import { getUpcomingMonographs } from '@/lib/sanity/content';

export const UpcomingMonographsExpanded = async () => {
  const { title, buttonDownload, srDownload, empty } =
    commonData.upcomingMonographs;
  const list = await getUpcomingMonographs();

  return (
    <section aria-labelledby="upcoming-title" className="sec">
      <div className="wrap">
        <SectionHead id="upcoming-title" title={title} />
        {list.length ? (
          <PublicationGrid
            list={list}
            buttonLabel={buttonDownload}
            srLabel={srDownload}
            layout="wide"
          />
        ) : (
          <EmptyState
            title={empty.title}
            text={empty.text}
            link={{ href: empty.href, label: empty.link }}
          />
        )}
      </div>
    </section>
  );
};
