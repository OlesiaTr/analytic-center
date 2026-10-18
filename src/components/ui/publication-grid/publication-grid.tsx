import clsx from 'clsx';

import { PublicationCard } from '@/components/ui/publication-card';
import type { PublicationCardVariant } from '@/components/ui/publication-card/publication-card';
import type { Publication } from '@/data/types';

export interface Props {
  list: (Publication & { description?: string })[];
  buttonDownload: string;
  variant?: Extract<PublicationCardVariant, 'cover' | 'library'>;
  headingLevel?: 'h2' | 'h3';
}

/** Responsive grid of publication cards (conferences, monographs, library). */
export const PublicationGrid = ({
  list,
  buttonDownload,
  variant = 'cover',
  headingLevel,
}: Props) => (
  <ul className="mb-6 grid grid-cols-1 justify-items-center gap-8 md:mb-16 md:grid-cols-2 md:gap-20 xl:grid-cols-3">
    {list.map(card => (
      <li
        key={card.id}
        className={clsx(
          'w-82 rounded-lg bg-white shadow md:w-[346px] lg:w-[374px]',
          variant === 'cover' && 'flex flex-col justify-between',
        )}
      >
        <PublicationCard
          card={card}
          buttonDownload={buttonDownload}
          variant={variant}
          headingLevel={headingLevel}
        />
      </li>
    ))}
  </ul>
);
