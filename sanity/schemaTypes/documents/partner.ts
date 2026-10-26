import { LinkIcon } from '@sanity/icons/Link';
import { defineField, defineType } from 'sanity';

import { ukRequired } from '../objects/locale';

export const partner = defineType({
  name: 'partner',
  title: 'Партнер',
  type: 'document',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Назва',
      description: 'Стає назвою посилання для екранних читачів.',
      type: 'localeString',
      ...ukRequired,
    }),
    defineField({
      name: 'logo',
      title: 'Логотип',
      type: 'image',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Сайт',
      type: 'url',
      validation: rule => rule.required(),
    }),
    defineField({ name: 'order', title: 'Порядок', type: 'number' }),
  ],
  orderings: [
    {
      title: 'Порядок',
      name: 'order',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: { select: { title: 'name.uk', subtitle: 'href', media: 'logo' } },
});
