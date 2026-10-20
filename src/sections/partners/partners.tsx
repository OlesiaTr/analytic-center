import Image from 'next/image';

import { Carousel } from '@/components/ui';
import data from '@/data/common.json';
import { PARTNERS_IMAGES } from '@/data/images';

export const Partners = () => {
  const { title, listLabel, prev, next } = data.partners;

  const items = PARTNERS_IMAGES.map(
    ({ image, width, height, alt, linkTo }) => ({
      key: linkTo,
      node: (
        <a
          href={linkTo}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex h-34 items-center justify-center rounded-xl border border-line bg-white p-4 transition-[border-color,box-shadow] duration-200 hover:border-blue-600 hover:shadow-sh-1 lg:h-40"
        >
          <Image
            src={image}
            alt={alt}
            width={width}
            height={height}
            className="max-h-24 w-auto max-w-full object-contain"
          />{' '}
          <span className="sr-only">{data.a11y.newTab}</span>
        </a>
      ),
    }),
  );

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
