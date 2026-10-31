'use client';

import { useTranslations } from 'next-intl';
import { FC, ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { useLoadMore } from '@/hooks';

export interface Props {
  items: { key: string; node: ReactNode }[];
  /** Class of the <ul>, e.g. the publication grid. */
  listClassName: string;
  /** Shown once everything is visible, e.g. «Це всі збірники архіву.» */
  doneText: string;
  step?: number;
}

/** Long archives, `step` items at a time, with a live count and progress bar. */
export const LoadMore: FC<Props> = ({
  items,
  listClassName,
  doneText,
  step = 8,
}) => {
  const { shown, total, next, hasMore, showMore, firstNewIndex, firstNewRef } =
    useLoadMore<HTMLLIElement>(items.length, step);
  const t = useTranslations('loadMore');

  return (
    <>
      <ul className={listClassName}>
        {items.slice(0, shown).map(({ key, node }, index) => (
          <li
            key={key}
            ref={index === firstNewIndex ? firstNewRef : undefined}
            tabIndex={index === firstNewIndex ? -1 : undefined}
            className="rounded-xl"
          >
            {node}
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-col items-center gap-3 text-center">
        <p aria-live="polite" className="t-sm font-semibold text-muted">
          {t('count', { shown, total })}
        </p>
        <div aria-hidden className="h-1 w-50 max-w-full rounded-xs bg-line">
          <div
            className="h-full rounded-xs bg-blue-600"
            style={{ width: `${(shown / total) * 100}%` }}
          />
        </div>
        {hasMore ? (
          <Button
            variant="outline"
            onClick={showMore}
            className="w-full md:w-auto"
          >
            {t('more', { next })}
          </Button>
        ) : (
          <p className="t-sm text-muted">{doneText}</p>
        )}
      </div>
    </>
  );
};
