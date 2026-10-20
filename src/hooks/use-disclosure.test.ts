import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useDisclosure } from './use-disclosure';

describe('useDisclosure', () => {
  it('opens, closes and toggles', () => {
    const { result } = renderHook(() => useDisclosure());
    expect(result.current.isOpen).toBe(false);

    act(() => result.current.open());
    expect(result.current.isOpen).toBe(true);

    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(false);
  });

  it('respects the initial state', () => {
    const { result } = renderHook(() => useDisclosure(true));
    expect(result.current.isOpen).toBe(true);
  });

  it('closes when the reset key changes', () => {
    const { result, rerender } = renderHook(
      ({ path }) => useDisclosure(false, path),
      { initialProps: { path: '/' } },
    );

    act(() => result.current.open());
    expect(result.current.isOpen).toBe(true);

    rerender({ path: '/grants' });
    expect(result.current.isOpen).toBe(false);
  });
});
