'use client';

import { SliderCoverCard, WideCoverCard } from '@/components/ui';
import { VIEWPORT_LG } from '@/constants';
import commonData from '@/data/common.json';
import { useViewportSize } from '@/utils';

export const UpcomingMonographsExpanded = () => {
  const { list, linkDownload, buttonDownload } = commonData.upcomingMonographs;
  const { width } = useViewportSize();

  return (
    <>
      {width !== null && width < VIEWPORT_LG ? (
        <SliderCoverCard slidesList={list} buttonDownload={buttonDownload} />
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
