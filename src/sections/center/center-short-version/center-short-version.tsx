import { getTranslations } from 'next-intl/server';

import Image from 'next/image';

import { Button } from '@/components/ui';
import { getHomePage } from '@/lib/sanity/content';

export const CenterShortVersion = async () => {
  const t = await getTranslations('aboutCenter');
  const title = t('title');
  const button = t('button');
  const redirectionTo = '/about-center';
  const about = (await getHomePage())?.about;

  return (
    <section aria-labelledby="about-title" className="sec">
      <div className="wrap grid items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
        <div className="flex flex-col items-start gap-6">
          <h2 id="about-title" className="sec-title t-h2">
            {title}
          </h2>
          <p className="prose">{about?.text}</p>
          <Button href={redirectionTo}>{button}</Button>
        </div>
        <div className="aspect-4/3 overflow-hidden rounded-xl bg-blue-50">
          {about?.imgSrc && (
            <Image
              src={about.imgSrc}
              alt={about.imgAlt ?? ''}
              width={about.width ?? 0}
              height={about.height ?? 0}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="size-full object-cover"
            />
          )}
        </div>
      </div>
    </section>
  );
};
