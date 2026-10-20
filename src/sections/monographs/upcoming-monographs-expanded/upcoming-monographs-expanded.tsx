import { EmptyState, PublicationGrid, SectionHead } from '@/components/ui';
import commonData from '@/data/common.json';

export const UpcomingMonographsExpanded = () => {
  const { title, list, buttonDownload, srDownload, empty } =
    commonData.upcomingMonographs;

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
