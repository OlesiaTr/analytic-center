import { PublicationGrid } from '@/components/ui';
import data from '@/data/library.json';

const BookCollection = () => {
  const { list, buttonDownload, srDownload } = data;

  return (
    <PublicationGrid
      list={list}
      buttonLabel={buttonDownload}
      srLabel={srDownload}
      variant="library"
      headingLevel="h2"
    />
  );
};

export default BookCollection;
