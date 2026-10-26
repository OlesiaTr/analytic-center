// Public by design: the dataset is public-read, the browser and Studio need them.
const required = (value: string | undefined, name: string) => {
  if (!value) throw new Error(`Missing environment variable ${name}`);
  return value;
};

export const projectId = required(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'NEXT_PUBLIC_SANITY_PROJECT_ID',
);

export const dataset = required(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'NEXT_PUBLIC_SANITY_DATASET',
);

/** Pin the API date so query behaviour doesn't change under us. */
export const apiVersion = '2026-10-01';
