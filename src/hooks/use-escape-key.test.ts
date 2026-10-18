import { fireEvent, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useEscapeKey } from './use-escape-key';

describe('useEscapeKey', () => {
  it('calls the handler on Escape while active', () => {
    const onEscape = vi.fn();
    renderHook(() => useEscapeKey(true, onEscape));

    fireEvent.keyDown(document, { key: 'Enter' });
    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onEscape).toHaveBeenCalledTimes(1);
  });

  it('ignores Escape while inactive', () => {
    const onEscape = vi.fn();
    renderHook(() => useEscapeKey(false, onEscape));

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onEscape).not.toHaveBeenCalled();
  });
});
