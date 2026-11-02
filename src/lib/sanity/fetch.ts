import { getLocale } from 'next-intl/server';
import type { QueryParams } from 'next-sanity';

import { client } from './client';

/** Daily at most; the Sanity webhook revalidates the tags sooner (commit 5). */
const REVALIDATE_SECONDS = 86_400;

/**
 * Fetch published content in the request's locale (`$locale`), cached by Next
 * and tagged by document type so the webhook can revalidate exactly what
 * changed. Tags stay per type: one publish refreshes both languages.
 */
export const sanityFetch = async <const Query extends string>(
  query: Query,
  { params = {}, tags }: { params?: QueryParams; tags: string[] },
) => {
  // Route handlers (the OG image) can't read the locale: they pass it in params.
  const withLocale: QueryParams = {
    locale: params.locale ?? (await getLocale()),
    ...params,
  };
  return client.fetch(query, withLocale, {
    next: { revalidate: REVALIDATE_SECONDS, tags },
  });
};
