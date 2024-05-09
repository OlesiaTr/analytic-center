import { ReactNode } from 'react';
import { Montserrat } from 'next/font/google';

import { Footer } from '@/layouts';

import '@/styles/globals.css';

const montserrat = Montserrat({ subsets: ['latin', 'cyrillic'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ua" className="scroll-smooth ">
      <body className={`${montserrat.className} antialiased`}>
        {children}

        <Footer />
      </body>
    </html>
  );
}
