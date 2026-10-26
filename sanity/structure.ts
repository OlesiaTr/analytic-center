import type { StructureResolver } from 'sanity/structure';

import { SINGLETONS } from './lib/singletons';

const COLLECTIONS = [
  'conference',
  'monograph',
  'libraryItem',
  'grantGroup',
  'person',
  'partner',
  'news',
] as const;

/** Pages and settings first (one document each), then the collections. */
export const structure: StructureResolver = S =>
  S.list()
    .title('Вміст')
    .items([
      ...SINGLETONS.map(({ type, title }) =>
        S.listItem()
          .title(title)
          .id(type)
          .child(S.document().schemaType(type).documentId(type)),
      ),
      S.divider(),
      ...S.documentTypeListItems().filter(item =>
        COLLECTIONS.includes(item.getId() as (typeof COLLECTIONS)[number]),
      ),
    ]);
