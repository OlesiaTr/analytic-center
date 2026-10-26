import clsx from 'clsx';
import Image from 'next/image';
import { FC } from 'react';

import { Button } from '@/components/ui/button';
import { Chip } from '@/components/ui/chip';
import type { Publication } from '@/data/types';
import { formatDate, toDateTime } from '@/utils';

export type PublicationCardVariant = 'cover' | 'library';

export interface Props {
  card: Publication & { description?: string };
  buttonLabel: string;
  /** Hidden words after the label, e.g. «інформаційний лист»; the title follows. */
  srLabel?: string;
  /** Library scans are often landscape: 4:3 cover, contained on surface. */
  variant?: PublicationCardVariant;
  /** From 1024: a bordered row with a big date (upcoming items). */
  wide?: boolean;
  /** h2 when the card sits directly under the page h1. */
  headingLevel?: 'h2' | 'h3';
}

/**
 * A row below 768 (96px cover, text beside it), a column from 768 with the
 * button pinned to the bottom. Never give it a fixed height.
 */
export const PublicationCard: FC<Props> = ({
  card,
  buttonLabel,
  srLabel,
  variant = 'cover',
  wide = false,
  headingLevel: Heading = 'h3',
}) => {
  const { imgSrc, width, height, title, description, date, linkToDownload } =
    card;
  const parts = wide ? formatDate(date) : null;

  const actions = (
    <div
      className={clsx(
        // Below 360 the text column is too narrow for the button: span the card.
        'flex items-end max-[359px]:col-span-2 md:mt-auto md:px-1',
        wide && 'lg:col-start-3 lg:mt-3 lg:items-start lg:px-0',
      )}
    >
      <Button
        href={linkToDownload}
        download
        variant="yellow"
        size="sm"
        icon="download"
        srText={srLabel ? `${srLabel}: ${title}` : title}
        className={clsx('md:w-full', wide && 'lg:w-auto')}
      >
        {buttonLabel}
      </Button>
    </div>
  );

  return (
    <article
      className={clsx(
        'grid grid-cols-[96px_minmax(0,1fr)] content-start gap-x-4 gap-y-3 rounded-xl border border-line bg-white p-3 text-text transition-shadow duration-200 hover:shadow-sh-2',
        'md:flex md:h-full md:flex-col md:gap-4 md:pb-4',
        wide &&
          'lg:grid lg:h-auto lg:grid-cols-[136px_168px_minmax(0,1fr)] lg:grid-rows-[auto_1fr] lg:items-start lg:gap-x-8 lg:gap-y-0 lg:rounded-none lg:border-0 lg:bg-transparent lg:px-0 lg:py-8 lg:hover:shadow-none',
      )}
    >
      {parts && (
        <div
          aria-hidden
          className="hidden flex-col text-blue-800 in-[.on-dark]:text-white lg:row-span-2 lg:flex"
        >
          <span className="text-[72px] leading-[72px] font-bold tracking-[-0.02em] text-blue-600 in-[.on-dark]:text-yellow-400">
            {parts.day}
          </span>
          <span className="mt-2 text-[15px] leading-[22px] font-bold tracking-[0.06em] uppercase">
            {parts.month}
          </span>
          <span className="text-[15px] leading-[22px] text-muted in-[.on-dark]:text-on-dark-muted">
            {parts.year}
          </span>
        </div>
      )}

      <div
        className={clsx(
          'row-span-2 overflow-hidden rounded-lg md:flex-none',
          variant === 'library'
            ? 'aspect-4/3 bg-surface p-2'
            : 'aspect-7/10 bg-blue-50',
          wide && 'lg:shadow-sh-1',
        )}
      >
        <Image
          src={imgSrc}
          // The title sits next to the cover, so the image adds nothing.
          alt=""
          width={width}
          height={height}
          // 96px row below 768, a grid column from 768, 168px in the wide list.
          sizes="(min-width: 1024px) 300px, (min-width: 768px) 33vw, 96px"
          className={clsx(
            'size-full',
            variant === 'library' ? 'object-contain' : 'object-cover',
          )}
        />
      </div>

      <div
        className={clsx(
          'flex min-w-0 flex-col gap-2 md:flex-auto md:px-1',
          wide && 'lg:gap-3 lg:p-0',
        )}
      >
        {/* The big date is visual only; the chip keeps the date for screen readers. */}
        <span className={clsx('flex', wide && 'lg:sr-only')}>
          <Chip icon="calendar" dateTime={toDateTime(date)}>
            {date}
          </Chip>
        </span>

        <Heading
          className={clsx(
            'text-[15px] leading-[22px] font-bold wrap-anywhere text-ink',
            wide &&
              'lg:text-[22px] lg:leading-[30px] in-[.on-dark]:lg:text-white',
          )}
        >
          {title}
        </Heading>

        {description && (
          <p
            className={clsx(
              't-sm',
              wide &&
                'lg:text-[17px] lg:leading-[27px] in-[.on-dark]:lg:text-blue-50',
            )}
          >
            {description}
          </p>
        )}
      </div>

      {actions}
    </article>
  );
};
