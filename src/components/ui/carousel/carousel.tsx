'use client';

import clsx from 'clsx';
import { FC, ReactNode } from 'react';

import { IconButton } from '@/components/ui/icon-button';
import { useCarousel } from '@/hooks';

export interface Props {
  items: { key: string; node: ReactNode }[];
  label: string;
  prevLabel: string;
  nextLabel: string;
  /** Every item fits from 1024, so the buttons hide there. */
  fit?: boolean;
}

/** Scroll-snap track: swipe or scroll natively, buttons step one view. */
export const Carousel: FC<Props> = ({
  items,
  label,
  prevLabel,
  nextLabel,
  fit = false,
}) => {
  const { trackRef, atStart, atEnd, prev, next } =
    useCarousel<HTMLUListElement>();

  return (
    <div className="flex flex-col gap-6">
      <ul
        ref={trackRef}
        aria-label={label}
        className="-m-2 flex snap-x snap-mandatory scroll-px-2 scrollbar-none gap-4 overflow-x-auto p-2 motion-safe:scroll-smooth [&::-webkit-scrollbar]:hidden"
      >
        {items.map(({ key, node }) => (
          <li
            key={key}
            className="flex-[0_0_calc((100%-16px)/2.2)] snap-start md:basis-[calc((100%-32px)/3)] lg:basis-[calc((100%-64px)/5)]"
          >
            {node}
          </li>
        ))}
      </ul>
      <div className={clsx('flex justify-end gap-3', fit && 'lg:hidden')}>
        <IconButton
          icon="chevronLeft"
          label={prevLabel}
          aria-disabled={atStart}
          onClick={prev}
        />
        <IconButton
          icon="chevronRight"
          label={nextLabel}
          aria-disabled={atEnd}
          onClick={next}
        />
      </div>
    </div>
  );
};
