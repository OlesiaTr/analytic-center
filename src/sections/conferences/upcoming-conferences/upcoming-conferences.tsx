import {
  Button,
  EmptyState,
  PublicationGrid,
  SectionHead,
} from '@/components/ui';
import data from '@/data/common.json';
import type { UpcomingConferences as UpcomingConferencesData } from '@/data/types';

export const UpcomingConferences = () => {
  const upcoming: UpcomingConferencesData = data.upcomingConferences;
  const { title, list, button, linkDownload, redirectionTo, empty } = upcoming;

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
            buttonLabel={linkDownload}
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
