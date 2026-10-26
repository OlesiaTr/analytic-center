import { RocketIcon } from '@sanity/icons/Rocket';
import { defineArrayMember, defineField, defineType } from 'sanity';

import { ukRequired } from '../objects/locale';

/** A group of programs for one audience; programs live inside the group. */
export const grantGroup = defineType({
  name: 'grantGroup',
  title: 'Група грантів',
  type: 'document',
  icon: RocketIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Для кого',
      type: 'localeString',
      ...ukRequired,
    }),
    defineField({ name: 'order', title: 'Порядок', type: 'number' }),
    defineField({
      name: 'programs',
      title: 'Програми',
      type: 'array',
      validation: rule => rule.min(1),
      of: [
        defineArrayMember({
          name: 'grantProgram',
          title: 'Програма',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Назва',
              type: 'localeString',
              ...ukRequired,
            }),
            defineField({
              name: 'description',
              title: 'Опис',
              type: 'localeText',
              ...ukRequired,
            }),
            defineField({
              name: 'points',
              title: 'Пункти списку',
              type: 'array',
              of: [defineArrayMember({ type: 'localeString' })],
            }),
            defineField({
              name: 'deadline',
              title: 'Термін подання',
              type: 'localeString',
            }),
            defineField({
              name: 'link',
              title: 'Офіційна сторінка',
              type: 'url',
              validation: rule => rule.required(),
            }),
          ],
          preview: { select: { title: 'title.uk', subtitle: 'deadline.uk' } },
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Порядок',
      name: 'order',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: { select: { title: 'title.uk' } },
});
