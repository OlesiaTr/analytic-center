import { BookIcon } from '@sanity/icons/Book';
import { defineField, defineType } from 'sanity';

import { ukRequired } from '../objects/locale';

/** Call for chapters while the date is ahead; archived once the book exists. */
export const monograph = defineType({
  name: 'monograph',
  title: 'Монографія',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Назва',
      type: 'localeString',
      ...ukRequired,
    }),
    defineField({
      name: 'date',
      title: 'Дата',
      type: 'date',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'cover',
      title: 'Обкладинка',
      type: 'cover',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'callUrl',
      title: 'Інформаційний буклет (посилання)',
      type: 'url',
    }),
    defineField({
      name: 'bookUrl',
      title: 'Монографія (посилання)',
      type: 'url',
    }),
  ],
  validation: rule =>
    rule.custom(doc =>
      doc?.callUrl || doc?.bookUrl
        ? true
        : 'Додайте буклет або файл монографії, інакше її не видно на сайті',
    ),
  orderings: [
    {
      title: 'Дата, новіші',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title.uk', subtitle: 'date', media: 'cover' },
  },
});
