import { defineField, defineType } from 'sanity';

/** Image with a localized alt text; hotspot lets editors pick the crop. */
export const cover = defineType({
  name: 'cover',
  title: 'Зображення',
  type: 'image',
  options: { hotspot: true },
  fields: [
    defineField({
      name: 'alt',
      title: 'Опис зображення (alt)',
      description:
        'Порожньо, якщо поруч уже є назва (обкладинка біля заголовка).',
      type: 'localeString',
    }),
  ],
});
