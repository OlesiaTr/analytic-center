import { useEffect, useRef, useState } from 'react';

/**
 * Reveals a list `step` items at a time. After each load, focus moves to the
 * first new item: attach `firstNewRef` to the item at `firstNewIndex`.
 */
export const useLoadMore = <T extends HTMLElement = HTMLElement>(
  total: number,
  step: number,
) => {
  const [state, setState] = useState({
    shown: Math.min(step, total),
    firstNewIndex: -1,
  });
  const firstNewRef = useRef<T>(null);
  const { shown, firstNewIndex } = state;

  useEffect(() => {
    if (firstNewIndex >= 0) firstNewRef.current?.focus();
  }, [firstNewIndex]);

  const showMore = () =>
    setState(prev => ({
      shown: Math.min(prev.shown + step, total),
      firstNewIndex: prev.shown,
    }));

  return {
    shown,
    total,
    next: Math.min(step, total - shown),
    hasMore: shown < total,
    showMore,
    firstNewIndex,
    firstNewRef,
  };
};
