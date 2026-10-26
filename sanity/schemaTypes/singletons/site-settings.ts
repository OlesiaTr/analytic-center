import { CogIcon } from '@sanity/icons/Cog';
import { defineArrayMember, defineField, defineType } from 'sanity';

import { ukRequired } from '../objects/locale';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Налаштування сайту',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Назва організації',
      type: 'localeString',
      ...ukRequired,
    }),
    defineField({
      name: 'contacts',
      title: 'Контакти',
      type: 'object',
      fields: [
        defineField({
          name: 'email',
          title: 'Email',
          type: 'string',
          validation: rule => rule.email(),
        }),
        defineField({
          name: 'phone',
          title: 'Телефон (для посилання tel:)',
          type: 'string',
        }),
        defineField({
          name: 'phoneLabel',
          title: 'Телефон (як показувати)',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO за замовчуванням',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Заголовок',
          type: 'localeString',
        }),
        defineField({ name: 'description', title: 'Опис', type: 'localeText' }),
        defineField({
          name: 'keywords',
          title: 'Ключові слова',
          type: 'array',
          of: [defineArrayMember({ type: 'string' })],
        }),
        defineField({
          name: 'ogImage',
          title: 'Зображення для соцмереж',
          description:
            'Необовʼязково: без нього сайт генерує зображення сам (заголовок і обкладинки). 1200×630.',
          type: 'image',
          fields: [
            defineField({
              name: 'alt',
              title: 'Опис зображення (alt)',
              description:
                'Опишіть, що на зображенні: поруч із ним немає тексту.',
              type: 'localeString',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Налаштування сайту' }) },
});
