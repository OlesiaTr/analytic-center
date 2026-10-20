import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useLoadMore } from './use-load-more';

describe('useLoadMore', () => {
  it('reveals the list step by step', () => {
    const { result } = renderHook(() => useLoadMore(22, 8));
    expect(result.current).toMatchObject({
      shown: 8,
      next: 8,
      hasMore: true,
      firstNewIndex: -1,
    });

    act(() => result.current.showMore());
    expect(result.current).toMatchObject({ shown: 16, next: 6 });
    expect(result.current.firstNewIndex).toBe(8);

    act(() => result.current.showMore());
    expect(result.current).toMatchObject({
      shown: 22,
      next: 0,
      hasMore: false,
      firstNewIndex: 16,
    });
  });

  it('shows short lists in full', () => {
    const { result } = renderHook(() => useLoadMore(5, 8));
    expect(result.current).toMatchObject({ shown: 5, hasMore: false });
  });
});
