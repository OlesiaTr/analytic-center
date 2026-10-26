import { defineArrayMember, defineField } from 'sanity';

import { ukRequired } from '../objects/locale';
import { definePage } from './page';

export const homePage = definePage('homePage', 'Головна', [
  defineField({
    name: 'hero',
    title: 'Перший екран',
    type: 'object',
    fields: [
      defineField({
        name: 'overline',
        title: 'Надзаголовок',
        type: 'localeString',
      }),
      defineField({
        name: 'heading',
        title: 'Заголовок',
        type: 'localeString',
        ...ukRequired,
      }),
      defineField({ name: 'text', title: 'Текст', type: 'localeText' }),
    ],
  }),
  defineField({
    name: 'about',
    title: 'Про центр (коротко)',
    type: 'object',
    fields: [
      defineField({
        name: 'text',
        title: 'Текст',
        type: 'localeText',
        ...ukRequired,
      }),
      defineField({ name: 'image', title: 'Зображення', type: 'cover' }),
    ],
  }),
]);

export const conferencesPage = definePage('conferencesPage', 'Конференції', [
  defineField({
    name: 'authorsForm',
    title: 'Відомості про авторів',
    type: 'object',
    fields: [
      defineField({
        name: 'title',
        title: 'Заголовок',
        type: 'localeString',
        ...ukRequired,
      }),
      defineField({ name: 'sub', title: 'Підпис', type: 'localeString' }),
      defineField({
        name: 'fields',
        title: 'Поля шаблону',
        type: 'array',
        of: [defineArrayMember({ type: 'localeString' })],
      }),
    ],
  }),
]);

export const monographsPage = definePage('monographsPage', 'Монографії');
export const libraryPage = definePage('libraryPage', 'Бібліотека');
export const grantsPage = definePage('grantsPage', 'Гранти');
export const journalsPage = definePage('journalsPage', 'Журнали');
export const contactsPage = definePage('contactsPage', 'Контакти');

export const aboutPage = definePage('aboutPage', 'Про центр', [
  defineField({
    name: 'intro',
    title: 'Текст про організацію',
    type: 'localeBlock',
  }),
  defineField({ name: 'image', title: 'Зображення', type: 'cover' }),
  defineField({
    name: 'statute',
    title: 'Статутні документи',
    type: 'array',
    of: [
      defineArrayMember({
        name: 'statuteDocument',
        type: 'object',
        fields: [
          defineField({
            name: 'title',
            title: 'Назва',
            type: 'localeString',
            ...ukRequired,
          }),
          defineField({
            name: 'fileUrl',
            title: 'Файл (посилання)',
            type: 'url',
            validation: rule => rule.required(),
          }),
        ],
        preview: { select: { title: 'title.uk' } },
      }),
    ],
  }),
  defineField({
    name: 'boardTitles',
    title: 'Заголовки складу',
    type: 'object',
    fields: [
      defineField({
        name: 'council',
        title: 'Вчена рада',
        type: 'localeString',
      }),
      defineField({
        name: 'supervisory',
        title: 'Наглядова рада',
        type: 'localeString',
      }),
      defineField({
        name: 'member',
        title: 'Члени організації',
        type: 'localeString',
      }),
    ],
  }),
]);

export const usefulInfoPage = definePage(
  'usefulInfoPage',
  'Корисна інформація',
  [
    defineField({
      name: 'table',
      title: 'Приклади оформлення',
      type: 'object',
      fields: [
        defineField({
          name: 'caption',
          title: 'Підпис таблиці',
          type: 'localeString',
        }),
        defineField({
          name: 'rows',
          title: 'Рядки',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'sourceRow',
              type: 'object',
              fields: [
                defineField({
                  name: 'group',
                  title: 'Нова група (заголовок над рядком)',
                  type: 'localeString',
                }),
                defineField({
                  name: 'type',
                  title: 'Характеристика джерела',
                  type: 'localeString',
                  ...ukRequired,
                }),
                defineField({
                  name: 'example',
                  title: 'Приклад оформлення',
                  type: 'localeText',
                  ...ukRequired,
                }),
              ],
              preview: { select: { title: 'type.uk', subtitle: 'group.uk' } },
            }),
          ],
        }),
        defineField({
          name: 'footnote',
          title: 'Примітка',
          type: 'localeText',
        }),
      ],
    }),
  ],
);
