'use client';

import { ButtonLink } from '@/components/ui';

import data from '@/data/common.json';

export const Hero = () => {
  const { title, label, button, redirectionTo } = data.hero;

  return (
    <section className="m-auto min-h-122 max-w-(--breakpoint-xxl) hero px-4 pt-43 pb-14 md:px-14 md:pb-49 lg:pt-69 xl:px-20">
      {/* The hero image is a CSS background, which the browser only discovers after
          the stylesheet is parsed. Preloading it here lets the HTML preload scanner
          start the fetch immediately — it is the LCP element on this page. */}
      <link rel="preload" as="image" href="/images/hero-tab.webp" />
      <h1 className="mb-8 flex flex-col text-[19px] leading-[1.05] font-bold text-white uppercase sm:text-2xl md:text-3xl lg:text-[40px] xl:mb-16 xl:text-6xl xl:leading-none">
        <span className="mb-[9px] xl:mb-6">{title.topLine}</span>

        <span>{title.bottomLine}</span>
      </h1>

      <p className="mb-20 max-w-105 text-xs leading-normal font-semibold tracking-[0.5px] text-white sm:text-base md:max-w-130 md:text-xl lg:max-w-[777px] lg:text-2xl xl:text-2xl xl:leading-snug xl:font-bold">
        {label}
      </p>

      <ButtonLink label={button} href={redirectionTo} />
    </section>
  );
};
