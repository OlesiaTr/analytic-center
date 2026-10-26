import { defineCliConfig } from 'sanity/cli';

// The CLI reads SANITY_STUDIO_* from .env.local (pulled from Vercel).
export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET,
  },
});
