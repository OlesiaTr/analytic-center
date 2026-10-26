import type { QueryParams } from 'next-sanity';

import { client } from './client';

/** Daily at most; the Sanity webhook revalidates the tags sooner (commit 5). */
const REVALIDATE_SECONDS = 86_400;

/**
 * Fetch published content, cached by Next and tagged by document type so the
 * webhook can revalidate exactly what changed.
 */
export const sanityFetch = <const Query extends string>(
  query: Query,
  { params = {}, tags }: { params?: QueryParams; tags: string[] },
) =>
  client.fetch(query, params, {
    next: { revalidate: REVALIDATE_SECONDS, tags },
  });
