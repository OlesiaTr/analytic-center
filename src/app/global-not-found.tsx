import type { Metadata } from 'next';
import Link from 'next/link';

import { fontClassName } from './fonts';

import '@/styles/globals.css';

export const metadata: Metadata = { title: 'Сторінку не знайдено' };

/** Last resort for URLs outside any locale (most 404s render [locale]/not-found). */
export default function GlobalNotFound() {
  return (
    <html lang="uk" className={fontClassName}>
      <body className="font-sans antialiased">
        <main className="wrap flex min-h-dvh flex-col items-start justify-center gap-5 py-20">
          <p className="text-8xl leading-24 font-extrabold text-blue-600">
            404
          </p>
          <h1 className="t-h1">Сторінку не знайдено</h1>
          <Link href="/" className="font-semibold text-blue-600 underline">
            На головну
          </Link>
        </main>
      </body>
    </html>
  );
}
