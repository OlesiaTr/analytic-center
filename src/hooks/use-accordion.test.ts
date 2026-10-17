import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useAccordion } from './use-accordion';

describe('useAccordion', () => {
  it('keeps exactly one item active', () => {
    const { result } = renderHook(() => useAccordion());
    expect(result.current.isActive(0)).toBe(true);

    act(() => result.current.setActive(2));
    expect(result.current.active).toBe(2);
    expect(result.current.isActive(0)).toBe(false);
    expect(result.current.isActive(2)).toBe(true);
  });
});
