import type { Metadata } from 'next';

import { ButtonLink, Title } from '@/components/ui';
import { Header } from '@/layouts';

import data from '@/data/common.json';

export const metadata: Metadata = { title: data.notFound.title };

export default function NotFound() {
  const { title, text, button } = data.notFound;

  return (
    <>
      <Header />

      <main id="main" tabIndex={-1} className="focus:outline-none">
        <section className="section">
          <Title title={title} as="h1" />

          <p className="mb-10 text-main md:text-xl">{text}</p>

          <ButtonLink label={button} href="/" styles="sm:min-w-[302px]" />
        </section>
      </main>
    </>
  );
}
