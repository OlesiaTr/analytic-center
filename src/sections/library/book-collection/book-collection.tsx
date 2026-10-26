import { PublicationGrid } from '@/components/ui';
import common from '@/data/common.json';
import data from '@/data/library.json';
import { getLibrary } from '@/lib/sanity/content';

const BookCollection = async () => {
  const { buttonDownload, srDownload } = data;
  const list = await getLibrary(common.libraryKinds);

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
