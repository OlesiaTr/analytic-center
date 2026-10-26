import type { ImageLoaderProps } from 'next/image';

/**
 * next/image loader: Sanity CDN images are resized and re-encoded by Sanity
 * (no Vercel image transforms); local files (logo, favicons) are served as-is.
 */
export default function sanityImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps) {
  if (!src.startsWith('https://cdn.sanity.io/')) return src;
  const url = new URL(src);
  url.searchParams.set('w', String(width));
  url.searchParams.set('q', String(quality ?? 82));
  url.searchParams.set('auto', 'format');
  url.searchParams.set('fit', 'max');
  return url.toString();
}
