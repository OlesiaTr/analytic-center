import { ReactNode } from 'react';
import { Montserrat } from 'next/font/google';
import type { Metadata } from 'next';

import { Footer } from '@/layouts';

import meta from '@/data/meta/meta';
import data from '@/data/common.json';

import '@/styles/globals.css';

const montserrat = Montserrat({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = meta;

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className="motion-safe:scroll-smooth lg:scroll-pt-29"
      data-scroll-behavior="smooth"
    >
      <body className={`${montserrat.className} antialiased`}>
        <a
          href="#main"
          className="fixed top-4 left-4 z-50 translate-y-[-200%] rounded-lg bg-accent px-4 py-2 font-semibold text-black transition focus:translate-y-0"
        >
          {data.skipLink}
        </a>

        {children}

        <Footer />
      </body>
    </html>
  );
}
