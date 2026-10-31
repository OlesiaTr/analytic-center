import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

import { routing } from '@/i18n/routing';
import { rootMetadata } from '@/lib/sanity/metadata';

import { fontClassName } from '../fonts';

import '@/styles/globals.css';

export const generateStaticParams = () =>
  routing.locales.map(locale => ({ locale }));

export const generateMetadata = (): Promise<Metadata> => rootMetadata();

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <html
      lang={locale}
      className={`${fontClassName} motion-safe:scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      {/* The skip link and footer live in (site)/layout; the Studio has its own root layout. */}
      <body className="font-sans antialiased">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
