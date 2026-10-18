import { SliderCoverCard, WideCoverCard } from '@/components/ui';
import commonData from '@/data/common.json';

export const UpcomingMonographsExpanded = () => {
  const { list, linkDownload, buttonDownload } = commonData.upcomingMonographs;

  return (
    <>
      <div className="contents lg:hidden">
        <SliderCoverCard
          slidesList={list}
          buttonDownload={buttonDownload}
          headingLevel="h2"
        />
      </div>
      <div className="hidden lg:contents">
        <ul className="flex flex-col gap-20">
          {list.map(card => (
            <li key={card.id} className="flex items-start gap-6">
              <WideCoverCard
                card={card}
                linkDownload={linkDownload}
                headingLevel="h2"
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
