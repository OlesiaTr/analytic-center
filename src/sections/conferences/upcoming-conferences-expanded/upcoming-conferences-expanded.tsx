import { CoverCard, WideCoverCard } from '@/components/ui';
import commonData from '@/data/common.json';
import type { UpcomingConferences } from '@/data/types';

export const UpcomingConferencesExpanded = () => {
  const upcoming: UpcomingConferences = commonData.upcomingConferences;
  const { list, linkDownload, buttonDownload } = upcoming;

  if (!list.length) return null;

  return (
    <>
      <div className="contents lg:hidden">
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
      </div>
      <div className="hidden lg:contents">
        <ul className="flex flex-col gap-20">
          {list.map(card => (
            <li key={card.id} className="flex items-start gap-6">
              <WideCoverCard card={card} linkDownload={linkDownload} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
