import { describe, expect, it } from 'vitest';

import sanityImageLoader from './image-loader';

describe('sanityImageLoader', () => {
  it('asks the Sanity CDN for the rendered width', () => {
    const url = new URL(
      sanityImageLoader({
        src: 'https://cdn.sanity.io/images/p/production/abc-868x1206.webp',
        width: 384,
      }),
    );
    expect(url.searchParams.get('w')).toBe('384');
    expect(url.searchParams.get('q')).toBe('82');
    expect(url.searchParams.get('auto')).toBe('format');
  });

  it('leaves local files alone', () => {
    expect(sanityImageLoader({ src: '/images/logo.webp', width: 96 })).toBe(
      '/images/logo.webp',
    );
  });
});
