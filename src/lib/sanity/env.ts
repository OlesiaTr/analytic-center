// Public by design: the dataset is public-read, the browser and Studio need
// them. The Sanity CLI only exposes SANITY_STUDIO_*, hence the fallback.
const required = (value: string | undefined, name: string) => {
  if (!value) throw new Error(`Missing environment variable ${name}`);
  return value;
};

export const projectId = required(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ??
    process.env.SANITY_STUDIO_PROJECT_ID,
  'NEXT_PUBLIC_SANITY_PROJECT_ID',
);

export const dataset = required(
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? process.env.SANITY_STUDIO_DATASET,
  'NEXT_PUBLIC_SANITY_DATASET',
);

/** Pin the API date so query behaviour doesn't change under us. */
export const apiVersion = '2026-10-01';
