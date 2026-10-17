import { PublicationGrid } from '@/components/ui';
import data from '@/data/library.json';

const BookCollection = () => {
  const { list, buttonDownload } = data;

  return (
    <PublicationGrid
      list={list}
      buttonDownload={buttonDownload}
      variant="library"
    />
  );
};

export default BookCollection;
