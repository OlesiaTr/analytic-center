import {
  Button,
  EmptyState,
  PublicationGrid,
  SectionHead,
} from '@/components/ui';
import data from '@/data/common.json';
import type { UpcomingConferences as UpcomingConferencesData } from '@/data/types';
import { getUpcomingConferences } from '@/lib/sanity/content';

export const UpcomingConferences = async () => {
  const upcoming: UpcomingConferencesData = data.upcomingConferences;
  const list = await getUpcomingConferences();
  const { title, button, buttonDownload, srDownload, redirectionTo, empty } =
    upcoming;

  return (
    <section aria-labelledby="conferences-title" className="bg-surface sec">
      <div className="wrap">
        <SectionHead
          id="conferences-title"
          title={title}
          action={<Button href={redirectionTo}>{button}</Button>}
        />
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
