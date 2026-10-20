import type { Metadata } from 'next';

import { Button, TextLink } from '@/components/ui';
import { LINKS } from '@/constants';
import data from '@/data/common.json';
import { Header } from '@/layouts';

export const metadata: Metadata = { title: data.notFound.title };

export default function NotFound() {
  const { code, title, text, button } = data.notFound;
  const links: string[] = data.notFound.links;
  const suggested = LINKS.filter(({ linkTo }) => links.includes(linkTo));

  return (
    <>
      <Header />

      <main id="main" tabIndex={-1} className="wrap focus:outline-none">
        <div className="flex max-w-160 flex-col items-start gap-5 py-20 lg:py-32">
          <p
            aria-hidden
            className="text-8xl leading-24 font-extrabold tracking-[-0.03em] text-blue-600 lg:text-[160px] lg:leading-[150px]"
          >
            {code}
          </p>
          <h1 className="t-h1">{title}</h1>
          <p className="t-lead">{text}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button href="/">{button}</Button>
            {suggested.map(({ name, linkTo }) => (
              <TextLink key={linkTo} href={linkTo}>
                {name}
              </TextLink>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
