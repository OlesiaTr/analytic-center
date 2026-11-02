// Every page of the site; shared by the screenshot script and the e2e smoke tests.
export const ROUTES = [
  '/',
  '/about-center',
  '/conferences',
  '/monographs',
  '/library',
  '/grants',
  '/useful-info',
  '/journals',
  '/contacts',
];
// The same pages in English (Ukrainian has no prefix).
export const EN_ROUTES = ROUTES.map(route =>
  route === '/' ? '/en' : `/en${route}`,
);
export const WIDTHS = [375, 768, 1280];
