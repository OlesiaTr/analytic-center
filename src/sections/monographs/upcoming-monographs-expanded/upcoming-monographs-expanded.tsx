import { PublicationGrid } from '@/components/ui';
import commonData from '@/data/common.json';

export const UpcomingMonographsExpanded = () => {
  const { list, linkDownload } = commonData.upcomingMonographs;

  return (
    <PublicationGrid
      list={list}
      buttonLabel={linkDownload}
      layout="wide"
      headingLevel="h2"
    />
  );
};
