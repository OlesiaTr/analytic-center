import { getTranslations } from 'next-intl/server';

import Image from 'next/image';

import { Carousel } from '@/components/ui';
import { getPartners } from '@/lib/sanity/content';

export const Partners = async () => {
  const t = await getTranslations();
  const title = t('partners.title');
  const listLabel = t('partners.listLabel');
  const prev = t('partners.prev');
  const next = t('partners.next');
  const partners = await getPartners();

  const items = partners.map(({ image, width, height, name, href }) => ({
    key: href,
    node: (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex h-34 items-center justify-center rounded-xl border border-line bg-white p-4 transition-[border-color,box-shadow] duration-200 hover:border-blue-600 hover:shadow-sh-1 lg:h-40"
      >
        <Image
          src={image}
          alt={name}
          width={width}
          height={height}
          // Fill the tile's inner box: the files differ in size and padding.
          sizes="(min-width: 1024px) 220px, (min-width: 768px) 30vw, 45vw"
          className="size-full object-contain"
        />{' '}
        <span className="sr-only">{t('a11y.newTab')}</span>
      </a>
    ),
  }));

  return (
    <section aria-labelledby="partners-title" className="sec">
      <div className="wrap flex flex-col gap-6">
        <h2 id="partners-title" className="sec-title t-h2">
          {title}
        </h2>
        <Carousel
          items={items}
          label={listLabel}
          prevLabel={prev}
          nextLabel={next}
          fit
        />
      </div>
    </section>
  );
};
