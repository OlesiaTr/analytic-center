import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId } from './env';

/** Read-only client for published content, served from Sanity's CDN. */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
});
