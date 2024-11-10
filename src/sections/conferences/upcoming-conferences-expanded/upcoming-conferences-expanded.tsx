'use client';

import { CoverCard, WideCoverCard } from '@/components/ui';
import { VIEWPORT_LG } from '@/constants';
import commonData from '@/data/common.json';
import { useViewportSize } from '@/utils';
import { Conference } from '../types';

export const UpcomingConferencesExpanded = () => {
  const { list, linkDownload, buttonDownload } = commonData.upcomingConferences as {
    list: Conference[];
    linkDownload: string;
    buttonDownload: string;
  };
  const { width } = useViewportSize();

  if (!list.length) return null;

  return (
    <>
      {width !== null && width < VIEWPORT_LG ? (
        <ul className="mb-6 grid grid-cols-1 justify-items-center gap-8 md:mb-16 md:grid-cols-2 md:gap-20 xl:grid-cols-3">
          {list.map(card => (
            <li
              key={card.id}
              className="w-[328px] rounded-lg bg-white shadow md:w-[346px] lg:w-[374px]"
            >
              <CoverCard card={card} buttonDownload={buttonDownload} />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="flex flex-col gap-20">
          {list.map(card => (
            <li key={card.id} className="flex items-start gap-6">
              <WideCoverCard card={card} linkDownload={linkDownload} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
