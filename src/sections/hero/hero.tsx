'use client';

import { ButtonLink } from '@/components/ui';

import data from '@/data/common.json';

export const Hero = () => {
  const { title, label, button, redirectionTo } = data.hero;

  return (
    <section className="hero m-auto min-h-[488px]  max-w-screen-xxl px-4 pb-14 pt-[172px] md:px-14 md:pb-[196px] lg:pt-[276px] xl:px-20">
      <h1 className=" mb-8 flex flex-col text-[19px] font-bold uppercase leading-[1.05] text-white sm:text-2xl md:text-3xl lg:text-[40px] xl:mb-16 xl:text-6xl xl:leading-none">
        <span className=" mb-[9px] xl:mb-6 ">{title.topLine}</span>

        <span>{title.bottomLine}</span>
      </h1>

      <p className="mb-20 max-w-[420px] text-xs font-semibold leading-normal tracking-[0.5px] text-white sm:text-base md:max-w-[520px] md:text-xl lg:max-w-[777px] lg:text-2xl xl:text-2xl xl:font-bold xl:leading-snug">
        {label}
      </p>

      <ButtonLink
        label={button}
        href={redirectionTo}
      />
    </section>
  );
};
