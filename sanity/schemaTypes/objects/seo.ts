import { defineField, defineType } from 'sanity';

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: 'title',
      title: 'Заголовок вкладки',
      type: 'localeString',
    }),
    defineField({
      name: 'description',
      title: 'Опис для пошуку',
      type: 'localeText',
    }),
  ],
});
