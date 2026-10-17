import clsx from 'clsx';
import Image from 'next/image';

import { ButtonLink } from '@/components/ui/button-link';
import type { Publication } from '@/data/types';

export type PublicationCardVariant = 'cover' | 'library' | 'slide';

export interface Props {
  card: Publication & { description?: string };
  buttonDownload: string;
  variant?: PublicationCardVariant;
}

// Class sets carried over unchanged from the former CoverCard, LibraryCard and
// SlideCoverCard, so each variant renders exactly as before.
const VARIANTS = {
  cover: {
    image: undefined,
    body: 'flex flex-col items-center justify-between px-4 pt-4 md:pt-6 md:pb-2',
    date: 'mb-2',
    button: 'max-w-[270px] min-w-[220px] py-4 m-auto',
    isAccentBtn: true,
  },
  library: {
    image: 'm-auto max-h-[200px] w-auto',
    body: 'flex h-[210px] flex-col items-center justify-between p-4 md:py-6',
    date: 'mb-4',
    button: 'max-w-[270px] min-w-[220px] py-4 m-auto',
    isAccentBtn: false,
  },
  slide: {
    image: undefined,
    body: 'm-auto flex h-[205px] max-w-[440px] flex-col items-center justify-between p-4 md:py-6',
    date: undefined,
    button: 'max-w-[270px] min-w-[220px] py-4 mt-4 mx-auto',
    isAccentBtn: true,
  },
} as const;

export const PublicationCard = ({
  card,
  buttonDownload,
  variant = 'cover',
}: Props) => {
  const { imgSrc, width, height, imgAlt, title, description, date } = card;
  const styles = VARIANTS[variant];

  const heading = (
    <h3 className="leading-tight font-bold tracking-[-0.003px] uppercase">
      {title}
    </h3>
  );

  return (
    <>
      <div className="m-auto max-w-[250px] pt-2">
        <Image
          src={imgSrc}
          alt={imgAlt}
          width={width}
          height={height}
          className={styles.image}
        />
      </div>

      <div
        className={clsx(
          styles.body,
          variant === 'cover' && (description ? 'h-[250px]' : 'h-[200px]'),
        )}
      >
        {variant === 'cover' ? (
          <div>
            {heading}

            {description && (
              <p className="text-xs leading-snug font-medium">{description}</p>
            )}
          </div>
        ) : (
          heading
        )}

        <div className="w-full">
          <span
            className={clsx(
              'inline-flex rounded-lg bg-dateBg px-2 text-xs leading-snug font-semibold text-chocolate',
              styles.date,
            )}
          >
            {date}
          </span>

          <ButtonLink
            label={buttonDownload}
            isAccentBtn={styles.isAccentBtn}
            withIcon
            styles={styles.button}
            href={card.linkToDownload}
            linkToDownload
          />
        </div>
      </div>
    </>
  );
};
