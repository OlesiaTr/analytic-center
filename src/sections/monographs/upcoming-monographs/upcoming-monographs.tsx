import { ButtonLink, PublicationGrid, Title } from '@/components/ui';

import data from '@/data/common.json';

export const UpcomingMonographs = () => {
  const { title, list, button, buttonDownload, redirectionTo } =
    data.upcomingMonographs;

  return (
    <section className="section">
      <Title title={title} />

      <PublicationGrid
        list={list}
        buttonLabel={buttonDownload}
        layout="grid-3"
      />

      <ButtonLink
        label={button}
        styles="sm:min-w-[302px] mx-auto mt-10"
        href={redirectionTo}
      />
    </section>
  );
};
