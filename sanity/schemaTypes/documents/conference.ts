import { CalendarIcon } from '@sanity/icons/Calendar';
import { defineField, defineType } from 'sanity';

import { ukRequired } from '../objects/locale';

/** Upcoming while the date is ahead and there is an info letter; archived once proceedings exist. */
export const conference = defineType({
  name: 'conference',
  title: 'Конференція',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Назва',
      type: 'localeString',
      ...ukRequired,
    }),
    defineField({ name: 'subtitle', title: 'Тема', type: 'localeString' }),
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
      name: 'infoLetterUrl',
      title: 'Інформаційний лист (посилання)',
      type: 'url',
    }),
    defineField({
      name: 'proceedingsUrl',
      title: 'Збірник матеріалів (посилання)',
      type: 'url',
    }),
  ],
  validation: rule =>
    rule.custom(doc =>
      doc?.infoLetterUrl || doc?.proceedingsUrl
        ? true
        : 'Додайте інформаційний лист або збірник, інакше конференцію не видно на сайті',
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
