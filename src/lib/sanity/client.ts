import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId } from './env';

/**
 * Read-only client for published content. Next's data cache already caches
 * every query (tagged, see fetch.ts), so skip Sanity's API CDN: after a
 * webhook the re-fetch must see the new version, not a CDN copy that lags.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: 'published',
});
