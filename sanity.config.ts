import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import { apiVersion, dataset, projectId } from './src/lib/sanity/env';
import { schemaTypes } from './sanity/schemaTypes';

export default defineConfig({
  name: 'acmhs',
  title: 'Аналітичний центр сучасної гуманітаристики',
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
  schema: { types: schemaTypes },
});
