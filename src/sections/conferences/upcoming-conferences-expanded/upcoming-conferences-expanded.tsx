import { EmptyState, PublicationGrid, SectionHead } from '@/components/ui';
import commonData from '@/data/common.json';
import type { UpcomingConferences } from '@/data/types';

import { AboutAuthors } from '../about-authors';

export const UpcomingConferencesExpanded = () => {
  const upcoming: UpcomingConferences = commonData.upcomingConferences;
  const { title, list, buttonDownload, srDownload, empty } = upcoming;

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
        <div className="mt-10">
          <AboutAuthors />
        </div>
      </div>
    </section>
  );
};
