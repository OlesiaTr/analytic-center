import { PublicationGrid } from '@/components/ui';
import commonData from '@/data/common.json';
import type { UpcomingConferences } from '@/data/types';

export const UpcomingConferencesExpanded = () => {
  const upcoming: UpcomingConferences = commonData.upcomingConferences;
  const { list, linkDownload } = upcoming;

  if (!list.length) return null;

  return (
    <PublicationGrid
      list={list}
      buttonLabel={linkDownload}
      layout="wide"
      headingLevel="h2"
    />
  );
};
