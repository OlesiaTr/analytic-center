import { defineCliConfig } from 'sanity/cli';

// The CLI reads SANITY_STUDIO_* from .env.local (pulled from Vercel).
export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET,
  },
  // `npm run typegen`: schema.json + GROQ queries in src → typed results
  typegen: {
    path: './src/**/*.{ts,tsx}',
    schema: './sanity/schema.json',
    generates: './src/lib/sanity/types.ts',
  },
});
