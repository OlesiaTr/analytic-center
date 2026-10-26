import { UserIcon } from '@sanity/icons/User';
import { defineField, defineType } from 'sanity';

import { ukRequired } from '../objects/locale';

export const BOARDS = [
  { value: 'council', title: 'Вчена рада' },
  { value: 'supervisory', title: 'Наглядова рада' },
  { value: 'member', title: 'Члени організації' },
] as const;

export const PROFILE_KEYS = [
  'linkedin',
  'googlescholar',
  'naukovci',
  'orcid',
  'researchgate',
  'scopus',
  'wos',
] as const;

export const person = defineType({
  name: 'person',
  title: 'Людина',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Імʼя',
      type: 'localeString',
      ...ukRequired,
    }),
    defineField({
      name: 'position',
      title: 'Посада, ступінь',
      type: 'localeString',
    }),
    defineField({
      name: 'photo',
      title: 'Фото',
      type: 'image',
      options: { hotspot: true },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'boards',
      title: 'Склад',
      type: 'array',
      of: [{ type: 'string' }],
      options: { list: [...BOARDS] },
      validation: rule => rule.min(1),
    }),
    defineField({
      name: 'profiles',
      title: 'Наукові профілі',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: PROFILE_KEYS.map(key => defineField({ name: key, type: 'url' })),
    }),
    defineField({
      name: 'order',
      title: 'Порядок у раді',
      description: 'Члени організації сортуються за абеткою.',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Порядок',
      name: 'order',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'name.uk', subtitle: 'position.uk', media: 'photo' },
  },
});
