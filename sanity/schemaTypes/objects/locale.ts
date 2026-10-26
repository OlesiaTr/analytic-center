import { defineField, defineType, type Rule } from 'sanity';

import { LOCALES, requireUk } from '../../lib/locale';

const fieldsOf = (type: 'string' | 'text') =>
  LOCALES.map(({ id, title }) =>
    defineField({
      name: id,
      title,
      type,
      ...(type === 'text' && { rows: 4 }),
    }),
  );

/** `{ uk, en }` short text; Ukrainian required, English optional until PER-10. */
export const localeString = defineType({
  name: 'localeString',
  title: 'Текст (uk / en)',
  type: 'object',
  fields: fieldsOf('string'),
  options: { columns: 2 },
});

export const localeText = defineType({
  name: 'localeText',
  title: 'Довгий текст (uk / en)',
  type: 'object',
  fields: fieldsOf('text'),
});

/** Rich text (bold, links) per language, for prose such as the About intro. */
export const localeBlock = defineType({
  name: 'localeBlock',
  title: 'Форматований текст (uk / en)',
  type: 'object',
  fields: LOCALES.map(({ id, title }) =>
    defineField({
      name: id,
      title,
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Абзац', value: 'normal' }],
          lists: [],
          marks: {
            decorators: [{ title: 'Жирний', value: 'strong' }],
          },
        },
      ],
    }),
  ),
});

/** Use on a localized field to make the Ukrainian value required. */
export const ukRequired = {
  validation: (rule: Rule) => rule.custom(requireUk),
};
