import clsx from 'clsx';
import { FC } from 'react';

import { LoadMore } from '@/components/ui/load-more';
import {
  PublicationCard,
  type PublicationCardVariant,
} from '@/components/ui/publication-card/publication-card';
import type { Publication } from '@/data/types';

/** grid: 1 / 3 / 4 columns; grid-3: short lists; wide: upcoming items. */
export type PublicationLayout = 'grid' | 'grid-3' | 'wide';

export interface Props {
  list: (Publication & { description?: string })[];
  buttonLabel: string;
  variant?: PublicationCardVariant;
  layout?: PublicationLayout;
  headingLevel?: 'h2' | 'h3';
  /** Long archives: show `pageSize` at a time behind LoadMore. */
  loadMore?: { pageSize?: number; doneText: string };
}

const LAYOUTS: Record<PublicationLayout, string> = {
  grid: 'grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4',
  'grid-3': 'grid-cols-1 gap-4 md:grid-cols-3 md:gap-6',
  // From 1024 the cards become rows divided by lines.
  wide: 'grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-1 lg:gap-0 lg:divide-y lg:divide-line lg:border-y lg:border-line in-[.on-dark]:lg:divide-white/20 in-[.on-dark]:lg:border-white/20',
};

/** Publications (conferences, monographs, library) as a grid or wide list. */
export const PublicationGrid: FC<Props> = ({
  list,
  buttonLabel,
  variant,
  layout = 'grid',
  headingLevel,
  loadMore,
}) => {
  const listClassName = clsx('grid', LAYOUTS[layout]);
  const items = list.map(card => ({
    key: card.id,
    node: (
      <PublicationCard
        card={card}
        buttonLabel={buttonLabel}
        variant={variant}
        wide={layout === 'wide'}
        headingLevel={headingLevel}
      />
    ),
  }));

  if (loadMore && list.length > (loadMore.pageSize ?? 8)) {
    return (
      <LoadMore
        items={items}
        listClassName={listClassName}
        doneText={loadMore.doneText}
        step={loadMore.pageSize}
      />
    );
  }

  return (
    <ul className={listClassName}>
      {items.map(({ key, node }) => (
        <li key={key}>{node}</li>
      ))}
    </ul>
  );
};
