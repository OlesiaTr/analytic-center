import { ButtonLink, CoverCard, Title } from '@/components/ui';
import { isProduction } from '@/configs';

import data from '@/data/common.json';
import { Conference } from '../types';

      interface UpcomingConferencesDataProps {
        title: string;
        list: Conference[];
        button: string;
        buttonDownload: string;
        redirectionTo: string;
      }

export const UpcomingConferences = () => {
  const { title, list, button, buttonDownload, redirectionTo } =
    data.upcomingConferences as UpcomingConferencesDataProps;

    if(!list.length) return null;

  return (
    <section className="section bg-mainBg">
      <Title title={title} isWhite />

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

      <ButtonLink
        label={button}
        styles="sm:min-w-[302px] m-auto"
        isAccentBtn
        href={isProduction() ? `${redirectionTo}.html` : redirectionTo}
      />
    </section>
  );
};
