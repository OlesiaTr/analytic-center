import { PublicationGrid } from '@/components/ui';
import data from '@/data/common.json';
import { getLibrary } from '@/lib/sanity/content';

const BookCollection = async () => {
  const { buttonDownload, srDownload, kinds } = data.library;
  const list = await getLibrary(kinds);

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
