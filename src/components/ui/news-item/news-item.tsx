import Image from 'next/image';
import { FC, useId } from 'react';

import { Chip } from '@/components/ui/chip';
import { TextLink } from '@/components/ui/text-link';
import { toDateTime } from '@/utils';

export interface Props {
  text: string;
  date: string;
  linkTo: string;
  imgSrc: string;
  width: number;
  height: number;
  moreLabel: string;
}

/** News row: thumbnail, date chip (only for real dates), text and link. */
export const NewsItem: FC<Props> = ({
  text,
  date,
  linkTo,
  imgSrc,
  width,
  height,
  moreLabel,
}) => {
  const textId = useId();
  const dateTime = toDateTime(date);

  return (
    <article className="grid h-full grid-cols-[72px_minmax(0,1fr)] items-start gap-4 rounded-xl border border-line bg-white p-4 md:grid-cols-[112px_minmax(0,1fr)] md:gap-5 md:p-5">
      <Image
        src={imgSrc}
        alt=""
        width={width}
        height={height}
        sizes="112px"
        className="size-18 rounded-lg bg-blue-50 object-cover md:size-28"
      />
      <div className="flex min-w-0 flex-col gap-2">
        {dateTime && (
          <Chip icon="calendar" dateTime={dateTime}>
            {date}
          </Chip>
        )}
        <p id={textId} className="text-[15px] leading-6 wrap-anywhere">
          {text}
        </p>
        {linkTo !== '#' && (
          <TextLink
            href={linkTo}
            external
            describedBy={textId}
            className="self-start t-sm"
          >
            {moreLabel}
          </TextLink>
        )}
      </div>
    </article>
  );
};
