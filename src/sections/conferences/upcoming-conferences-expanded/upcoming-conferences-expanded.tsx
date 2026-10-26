import { EmptyState, PublicationGrid, SectionHead } from '@/components/ui';
import commonData from '@/data/common.json';
import type { UpcomingConferences } from '@/data/types';
import { getUpcomingConferences } from '@/lib/sanity/content';

import { AboutAuthors } from '../about-authors';

export const UpcomingConferencesExpanded = async () => {
  const upcoming: UpcomingConferences = commonData.upcomingConferences;
  const { title, buttonDownload, srDownload, empty } = upcoming;
  const list = await getUpcomingConferences();

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
