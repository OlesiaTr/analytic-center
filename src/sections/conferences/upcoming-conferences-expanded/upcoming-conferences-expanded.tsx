import { PublicationGrid, WideCoverCard } from '@/components/ui';
import commonData from '@/data/common.json';
import type { UpcomingConferences } from '@/data/types';

export const UpcomingConferencesExpanded = () => {
  const upcoming: UpcomingConferences = commonData.upcomingConferences;
  const { list, linkDownload, buttonDownload } = upcoming;

  if (!list.length) return null;

  return (
    <>
      <div className="contents lg:hidden">
        <PublicationGrid list={list} buttonDownload={buttonDownload} />
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
