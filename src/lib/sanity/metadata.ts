import type { Metadata } from 'next';

import { getPage } from './content';

/** Title, description and canonical URL of a page singleton, from its SEO fields. */
export const pageMetadata = async (
  id: Parameters<typeof getPage>[0],
  path: string,
): Promise<Metadata> => {
  const page = await getPage(id);
  return {
    title: page?.seo?.title ?? page?.title ?? undefined,
    description: page?.seo?.description ?? page?.lead ?? undefined,
    alternates: { canonical: path },
  };
};
