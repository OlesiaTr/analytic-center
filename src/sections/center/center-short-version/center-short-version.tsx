import Image from 'next/image';
import { ButtonLink, Title } from '@/components/ui';

import data from '@/data/common.json';

export const CenterShortVersion = () => {
  const { title, imgAlt, description, button, redirectionTo } =
    data.aboutCenter;

  return (
    <section className="section">
      <Title title={title} />

      <div className="flex justify-between">
        <div className="hidden max-w-105 lg:block xl:max-h-[593px] xl:max-w-[519px]">
          <Image
            src="/images/about_center-tab.webp"
            alt={imgAlt}
            width={519}
            height={593}
          />
        </div>

        <div className="flex flex-col justify-around lg:max-w-105 xl:max-w-130 xl:justify-between xxl:max-w-157">
          <p className="mb-6 text-sm leading-[1.43] tracking-[0.5px] text-main md:mb-10 md:text-xl lg:mb-16 lg:text-lg xl:text-xl xl:leading-[1.8] xxl:text-2xl xxl:leading-[1.8]">
            {description}
          </p>

          <div className="contents lg:hidden">
            <ButtonLink
              label={button}
              styles="sm:min-w-[302px] m-auto"
              isAccentBtn
              href={redirectionTo}
            />
          </div>
          <div className="hidden lg:contents">
            <ButtonLink
              label={button}
              styles="min-w-[302px]"
              href={redirectionTo}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
