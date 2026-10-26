/** Documents with exactly one instance: pinned in the Studio, no create/delete. */
export const SINGLETONS = [
  { type: 'siteSettings', title: 'Налаштування сайту' },
  { type: 'homePage', title: 'Головна' },
  { type: 'aboutPage', title: 'Про центр' },
  { type: 'conferencesPage', title: 'Конференції' },
  { type: 'monographsPage', title: 'Монографії' },
  { type: 'libraryPage', title: 'Бібліотека' },
  { type: 'grantsPage', title: 'Гранти' },
  { type: 'usefulInfoPage', title: 'Корисна інформація' },
  { type: 'journalsPage', title: 'Журнали' },
  { type: 'contactsPage', title: 'Контакти' },
] as const;

export const SINGLETON_TYPES: ReadonlySet<string> = new Set(
  SINGLETONS.map(({ type }) => type),
);
