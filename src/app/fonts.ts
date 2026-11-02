import { Literata, Montserrat } from 'next/font/google';

export const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-montserrat',
});

// Long-form paragraphs only (the `prose` style)
export const literata = Literata({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-literata',
});

export const fontClassName = `${montserrat.variable} ${literata.variable}`;
