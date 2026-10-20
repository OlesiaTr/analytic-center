export interface DateParts {
  /** yyyy-mm-dd for <time dateTime> */
  iso: string;
  day: string;
  /** Genitive month name, e.g. «жовтня» */
  month: string;
  year: string;
}

const FULL_DATE = /^(\d{2})\.(\d{2})\.(\d{4})$/;
const YEAR = /^\d{4}$/;

/** Splits a dd.mm.yyyy date for the wide list; null for any other format. */
export const formatDate = (value: string, locale = 'uk'): DateParts | null => {
  const match = FULL_DATE.exec(value.trim());
  if (!match) return null;

  const [, dd, mm, yyyy] = match;
  const date = new Date(Date.UTC(+yyyy, +mm - 1, +dd));
  if (date.getUTCMonth() !== +mm - 1 || date.getUTCDate() !== +dd) return null;

  // With a day in the pattern, Ukrainian months come out in the genitive.
  const month = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  })
    .formatToParts(date)
    .find(part => part.type === 'month')!.value;

  return { iso: `${yyyy}-${mm}-${dd}`, day: String(+dd), month, year: yyyy };
};

/** Machine-readable value for <time dateTime>: dd.mm.yyyy or a bare year. */
export const toDateTime = (value: string) =>
  YEAR.test(value.trim()) ? value.trim() : formatDate(value)?.iso;
