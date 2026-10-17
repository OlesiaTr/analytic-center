import { ButtonLink, PublicationGrid, Title } from '@/components/ui';

import data from '@/data/common.json';
import type { UpcomingConferences as UpcomingConferencesData } from '@/data/types';

export const UpcomingConferences = () => {
  const upcoming: UpcomingConferencesData = data.upcomingConferences;
  const { title, list, button, buttonDownload, redirectionTo } = upcoming;

  if (!list.length) return null;

  return (
    <section className="section bg-mainBg">
      <Title title={title} isWhite />

      <PublicationGrid list={list} buttonDownload={buttonDownload} />

      <ButtonLink
        label={button}
        styles="sm:min-w-[302px] m-auto"
        isAccentBtn
        href={redirectionTo}
      />
    </section>
  );
};
