import { ReactNode } from 'react';
import { Montserrat } from 'next/font/google';
import type { Metadata } from 'next';

import { Footer } from '@/layouts';

import meta from '@/data/meta/meta';

import '@/styles/globals.css';

const montserrat = Montserrat({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = meta;

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="uk" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className={`${montserrat.className} antialiased`}>
        {children}

        <Footer />
      </body>
    </html>
  );
}
