import { useEffect, useRef, useState } from 'react';

/**
 * Prev/next for a CSS scroll-snap track: attach `trackRef` to the scroller.
 * `atStart` / `atEnd` disable the buttons at the ends.
 */
export const useCarousel = <T extends HTMLElement = HTMLElement>() => {
  const trackRef = useRef<T>(null);
  const [edges, setEdges] = useState({ atStart: true, atEnd: false });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const update = () =>
      setEdges({
        atStart: track.scrollLeft <= 1,
        atEnd: track.scrollLeft + track.clientWidth >= track.scrollWidth - 1,
      });

    // ResizeObserver also fires once on observe, which sets the initial state.
    const observer = new ResizeObserver(update);
    observer.observe(track);
    track.addEventListener('scroll', update, { passive: true });
    return () => {
      observer.disconnect();
      track.removeEventListener('scroll', update);
    };
  }, []);

  /** Scrolls one visible width; CSS decides whether it animates. */
  const scroll = (direction: 1 | -1) => {
    const track = trackRef.current;
    track?.scrollBy({ left: direction * track.clientWidth });
  };

  return {
    trackRef,
    ...edges,
    // The buttons stay focusable at the ends (aria-disabled), so these no-op there.
    prev: () => !edges.atStart && scroll(-1),
    next: () => !edges.atEnd && scroll(1),
  };
};
