// Navigation: the names live in messages/{uk,en}.json under `nav.<key>`.
export const LINKS = [
  { key: 'home', linkTo: '/' },
  { key: 'about', linkTo: '/about-center' },
  { key: 'conferences', linkTo: '/conferences' },
  { key: 'monographs', linkTo: '/monographs' },
  // { key: 'journals', linkTo: '/journals' },
  { key: 'library', linkTo: '/library' },
  { key: 'grants', linkTo: '/grants' },
  { key: 'useful', linkTo: '/useful-info' },
  // { key: 'contacts', linkTo: '/contacts' },
] as const;
