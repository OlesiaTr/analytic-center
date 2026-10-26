import { BookIcon } from '@sanity/icons/Book';
import { defineField, defineType } from 'sanity';

import { ukRequired } from '../objects/locale';

export const LIBRARY_KINDS = [
  { value: 'textbook', title: 'Підручник' },
  { value: 'studyGuide', title: 'Навчальний посібник' },
  { value: 'monograph', title: 'Монографія' },
] as const;

export const libraryItem = defineType({
  name: 'libraryItem',
  title: 'Книга бібліотеки',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Назва',
      type: 'localeString',
      ...ukRequired,
    }),
    defineField({ name: 'authors', title: 'Автори', type: 'localeString' }),
    defineField({
      name: 'kind',
      title: 'Вид видання',
      type: 'string',
      options: { list: [...LIBRARY_KINDS], layout: 'radio' },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Рік',
      type: 'number',
      validation: rule => rule.required().integer().min(1990).max(2100),
    }),
    defineField({
      name: 'cover',
      title: 'Обкладинка',
      type: 'cover',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'fileUrl',
      title: 'Файл (посилання)',
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
  preview: {
    select: { title: 'title.uk', subtitle: 'year', media: 'cover' },
    prepare: ({ title, subtitle, media }) => ({
      title,
      subtitle: String(subtitle ?? ''),
      media,
    }),
  },
});
