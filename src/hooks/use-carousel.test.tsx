import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useCarousel } from './use-carousel';

const Carousel = () => {
  const { trackRef, atStart, atEnd, prev, next } =
    useCarousel<HTMLUListElement>();
  return (
    <>
      <ul ref={trackRef} aria-label="track" />
      <button type="button" disabled={atStart} onClick={prev}>
        prev
      </button>
      <button type="button" disabled={atEnd} onClick={next}>
        next
      </button>
    </>
  );
};

// jsdom has no layout: fake a 300px track with 900px of content.
beforeEach(() => {
  vi.stubGlobal(
    'ResizeObserver',
    class {
      constructor(private callback: () => void) {}
      observe() {
        this.callback();
      }
      disconnect() {}
    },
  );
  vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(300);
  vi.spyOn(HTMLElement.prototype, 'scrollWidth', 'get').mockReturnValue(900);
  HTMLElement.prototype.scrollBy = vi.fn();
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('useCarousel', () => {
  it('disables the buttons at the ends and scrolls one width', () => {
    render(<Carousel />);
    const track = screen.getByRole('list');
    const prev = screen.getByRole('button', { name: 'prev' });
    const next = screen.getByRole('button', { name: 'next' });
    expect(prev).toBeDisabled();
    expect(next).toBeEnabled();

    fireEvent.click(next);
    expect(track.scrollBy).toHaveBeenCalledWith({ left: 300 });

    act(() => {
      track.scrollLeft = 600;
      fireEvent.scroll(track);
    });
    expect(prev).toBeEnabled();
    expect(next).toBeDisabled();

    fireEvent.click(prev);
    expect(track.scrollBy).toHaveBeenLastCalledWith({ left: -300 });
  });
});
