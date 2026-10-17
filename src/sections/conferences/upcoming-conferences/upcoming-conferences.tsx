import { ButtonLink, CoverCard, Title } from '@/components/ui';

import data from '@/data/common.json';
import type { UpcomingConferences as UpcomingConferencesData } from '@/data/types';

export const UpcomingConferences = () => {
  const upcoming: UpcomingConferencesData = data.upcomingConferences;
  const { title, list, button, buttonDownload, redirectionTo } = upcoming;

  if (!list.length) return null;

  return (
    <section className="section bg-mainBg">
      <Title title={title} isWhite />

      <ul className="mb-6 grid grid-cols-1 justify-items-center gap-8 md:mb-16 md:grid-cols-2 md:gap-20 xl:grid-cols-3">
        {list.map(card => (
          <li
            key={card.id}
            className="flex w-[328px] flex-col justify-between rounded-lg bg-white shadow md:w-[346px] lg:w-[374px]"
          >
            <CoverCard card={card} buttonDownload={buttonDownload} />
          </li>
        ))}
      </ul>

      <ButtonLink
        label={button}
        styles="sm:min-w-[302px] m-auto"
        isAccentBtn
        href={redirectionTo}
      />
    </section>
  );
};
