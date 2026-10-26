import { DocumentIcon } from '@sanity/icons/Document';
import { defineField, defineType, type FieldDefinition } from 'sanity';

import { ukRequired } from '../objects/locale';

/** A page singleton: title, optional lead, SEO, plus page-specific fields. */
export const definePage = (
  name: string,
  title: string,
  fields: FieldDefinition[] = [],
) =>
  defineType({
    name,
    title,
    type: 'document',
    icon: DocumentIcon,
    fields: [
      defineField({
        name: 'title',
        title: 'Заголовок',
        type: 'localeString',
        ...ukRequired,
      }),
      defineField({
        name: 'lead',
        title: 'Вступ під заголовком',
        type: 'localeText',
      }),
      ...fields,
      defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
    ],
    preview: { prepare: () => ({ title }) },
  });
