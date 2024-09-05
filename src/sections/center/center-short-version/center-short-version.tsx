'use client';

import { ButtonLink, Title } from '@/components/ui';
import { isProduction } from '@/configs';
import { VIEWPORT_LG } from '@/constants';
import { useViewportSize } from '@/utils';

import data from '@/data/common.json';

export const CenterShortVersion = () => {
  const { title, imgAlt, description, button, redirectionTo } =
    data.aboutCenter;
  const { width } = useViewportSize();

  return (
    <section className="section">
      <Title title={title} />

      <div className="flex justify-between">
        <div className="hidden max-w-[420px]  lg:block  xl:max-h-[593px] xl:max-w-[519px]">
          <img src="/images/about_center-tab.jpg" alt={imgAlt} />
        </div>

        <div className="flex flex-col justify-around lg:max-w-[420px] xl:max-w-[520px] xl:justify-between xxl:max-w-[628px]">
          <p className=" mb-6 text-sm leading-[1.43] tracking-[0.5px] text-main md:mb-10 md:text-xl lg:mb-16 lg:text-lg xl:text-xl xl:leading-[1.8] xxl:text-2xl xxl:leading-[1.8] ">
            {description}
          </p>

          {width !== null && width < VIEWPORT_LG ? (
            <ButtonLink
              label={button}
              styles="sm:min-w-[302px] m-auto"
              isAccentBtn
              href={isProduction() ? `${redirectionTo}.html` : redirectionTo}
            />
          ) : (
            <ButtonLink
              label={button}
              styles="min-w-[302px]"
              href={isProduction() ? `${redirectionTo}.html` : redirectionTo}
            />
          )}
        </div>
      </div>
    </section>
  );
};
