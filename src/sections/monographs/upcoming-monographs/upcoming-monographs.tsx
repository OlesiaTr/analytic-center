import { ButtonLink, SliderCoverCard, Title } from '@/components/ui';
import { isProduction } from '@/configs';

import data from '@/data/common.json';

export const UpcomingMonographs = () => {
  const { title, list, button, buttonDownload, redirectionTo } =
    data.upcomingMonographs;

  return (
    <section className="section">
      <Title title={title} />

      <SliderCoverCard slidesList={list} buttonDownload={buttonDownload} />

      <ButtonLink
        label={button}
        styles="min-w-[302px] m-auto"
        href={isProduction() ? `${redirectionTo}.html` : redirectionTo}
      />
    </section>
  );
};
