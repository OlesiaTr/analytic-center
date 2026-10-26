import { ReactNode } from 'react';
import { Literata, Montserrat } from 'next/font/google';
import type { Metadata } from 'next';

import { rootMetadata } from '@/lib/sanity/metadata';

import '@/styles/globals.css';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-montserrat',
});

// Long-form paragraphs only (the `prose` style)
const literata = Literata({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-literata',
});

export const generateMetadata = (): Promise<Metadata> => rootMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${montserrat.variable} ${literata.variable} motion-safe:scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      {/* The skip link and footer live in (site)/layout so the Studio gets none. */}
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
