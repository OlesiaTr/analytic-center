import Image from 'next/image';

import { Button } from '@/components/ui';
import data from '@/data/common.json';

export const CenterShortVersion = () => {
  const { title, imgAlt, description, button, redirectionTo } =
    data.aboutCenter;

  return (
    <section aria-labelledby="about-title" className="sec">
      <div className="wrap grid items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
        <div className="flex flex-col items-start gap-6">
          <h2 id="about-title" className="sec-title t-h2">
            {title}
          </h2>
          <p className="prose">{description}</p>
          <Button href={redirectionTo}>{button}</Button>
        </div>
        <div className="aspect-4/3 overflow-hidden rounded-xl bg-blue-50">
          <Image
            src="/images/about_center-tab.webp"
            alt={imgAlt}
            width={519}
            height={593}
            className="size-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};
