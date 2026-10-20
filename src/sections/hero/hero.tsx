import Image from 'next/image';

import { Button } from '@/components/ui';
import data from '@/data/common.json';
import { HERO_COVERS } from '@/data/images';

export const Hero = () => {
  const { overline, title, label, button, redirectionTo } = data.hero;

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
        {HERO_COVERS.map(({ image, width, height }) => (
          <span
            key={image}
            className="aspect-7/10 overflow-hidden rounded-md bg-blue-800"
          >
            <Image
              src={image}
              alt=""
              width={width}
              height={height}
              className="size-full object-cover"
            />
          </span>
        ))}
      </div>
      <div className="absolute inset-0 hero-scrim" />

      <div className="relative wrap flex min-h-150 flex-col justify-end pt-28 pb-12 md:min-h-130 md:justify-center md:pt-30 md:pb-18 lg:min-h-150 lg:pt-32">
        <div className="flex max-w-160 flex-col items-start gap-4 md:max-w-[470px] lg:max-w-150 lg:gap-5">
          <p className="t-over text-yellow-400">{overline}</p>
          <h1 id="hero-title" className="t-display">
            {`${title.topLine} ${title.bottomLine}`.trim()}
          </h1>
          <p className="t-lead text-blue-50">{label}</p>
          <Button href={redirectionTo} variant="yellow" className="mt-2">
            {button}
          </Button>
        </div>
      </div>
    </section>
  );
};
