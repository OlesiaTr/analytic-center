import { PublicationGrid } from '@/components/ui';
import data from '@/data/library.json';

const BookCollection = () => {
  const { list, buttonDownload } = data;

  return (
    <PublicationGrid
      list={list}
      buttonLabel={buttonDownload}
      variant="library"
      headingLevel="h2"
    />
  );
};

export default BookCollection;
