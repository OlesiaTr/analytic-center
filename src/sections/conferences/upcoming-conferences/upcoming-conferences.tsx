import { ButtonLink, CoverCard, Title } from '@/components/ui';
import { isProduction } from '@/configs';

import data from '@/data/common.json';

      // {
      //   "id": "4",
      //   "imgSrc": "/images/conferences/conf-27-09-24.jpg",
      //   "imgAlt": "Зображення обкладенки конференції від 27 вересня 2024 року: “Українська національна ідея в сучасному міждисциплінарному дискурсі”",
      //   "title": "XXXVII Харківські політологічні читання",
      //   "description": "“Українська національна ідея в сучасному міждисциплінарному дискурсі”",
      //   "date": "27.09.2024",
      //   "day": "27",
      //   "month": "09",
      //   "linkToDownload": "https://docs.google.com/uc?export=download&id=1MeC8dywKICjBhQjjqEwjkRsauQ8_XSI5"
      // }

export const UpcomingConferences = () => {
  const { title, list, button, buttonDownload, redirectionTo } =
    data.upcomingConferences;

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
