import { DocumentTextIcon } from '@sanity/icons/DocumentText';
import { defineField, defineType } from 'sanity';

import { ukRequired } from '../objects/locale';

export const news = defineType({
  name: 'news',
  title: 'Новина',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'text',
      title: 'Текст',
      type: 'localeText',
      ...ukRequired,
    }),
    defineField({
      name: 'date',
      title: 'Дата',
      type: 'date',
      // A warning for now: the migrated news have no dates yet.
      validation: rule =>
        rule.required().warning('Додайте дату — без неї новина без мітки часу'),
    }),
    defineField({
      name: 'image',
      title: 'Зображення',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'href', title: 'Детальніше (посилання)', type: 'url' }),
  ],
  orderings: [
    {
      title: 'Дата, новіші',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: { select: { title: 'text.uk', subtitle: 'date', media: 'image' } },
});
