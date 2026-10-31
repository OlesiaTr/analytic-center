import { getTranslations } from 'next-intl/server';

import Image from 'next/image';

import { Button } from '@/components/ui';
import { getHeroCovers, getHomePage } from '@/lib/sanity/content';

export const Hero = async () => {
  const t = await getTranslations('hero');
  const button = t('button');
  const redirectionTo = '/about-center';
  const [page, covers] = await Promise.all([getHomePage(), getHeroCovers()]);
  const hero = page?.hero;

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-navy-900 on-dark"
    >
      {/* The center's own covers, tilted, under a navy scrim. */}
      <div
        aria-hidden
        className="absolute -top-15 -right-45 grid w-155 rotate-[-8deg] grid-cols-5 gap-2.5 opacity-90 md:-top-35 md:-right-50 md:w-190 md:gap-3.5 lg:-top-40 lg:-right-55 lg:w-245 lg:gap-4"
      >
        {covers.map(({ image, width, height }) => (
          <span
            key={image}
            className="aspect-7/10 overflow-hidden rounded-md bg-blue-800"
          >
            <Image
              src={image}
              alt=""
              width={width}
              height={height}
              sizes="(min-width: 1024px) 190px, (min-width: 768px) 150px, 120px"
              className="size-full object-cover"
            />
          </span>
        ))}
      </div>
      <div className="absolute inset-0 hero-scrim" />

      <div className="relative wrap flex min-h-150 flex-col justify-end pt-28 pb-12 md:min-h-130 md:justify-center md:pt-30 md:pb-18 lg:min-h-150 lg:pt-32">
        <div className="flex max-w-160 flex-col items-start gap-4 md:max-w-[470px] lg:max-w-150 lg:gap-5">
          <p lang={hero?.lang} className="t-over text-yellow-400">
            {hero?.overline}
          </p>
          <h1 id="hero-title" lang={hero?.lang} className="t-display">
            {hero?.heading}
          </h1>
          <p lang={hero?.lang} className="t-lead text-blue-50">
            {hero?.text}
          </p>
          <Button href={redirectionTo} variant="yellow" className="mt-2">
            {button}
          </Button>
        </div>
      </div>
    </section>
  );
};
