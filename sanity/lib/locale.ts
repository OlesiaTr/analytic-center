/** Languages of the site; Ukrainian is required, English comes with PER-10. */
export const LOCALES = [
  { id: 'uk', title: 'Українська' },
  { id: 'en', title: 'English' },
] as const;

export type Locale = (typeof LOCALES)[number]['id'];

const isFilled = (value: unknown) =>
  Array.isArray(value)
    ? value.length > 0
    : typeof value === 'string'
      ? value.trim().length > 0
      : value != null;

/** Validation message when the Ukrainian text is missing, otherwise true. */
export const requireUk = (value: unknown): true | string =>
  typeof value === 'object' &&
  value !== null &&
  'uk' in value &&
  isFilled(value.uk)
    ? true
    : 'Заповніть українською';
