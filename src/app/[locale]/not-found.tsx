import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { Button, TextLink } from '@/components/ui';
import { LINKS } from '@/constants';
import { Header, SiteShell } from '@/layouts';

export const generateMetadata = async (): Promise<Metadata> => ({
  title: (await getTranslations('notFound'))('title'),
});

// Where lost visitors most likely meant to go.
const SUGGESTED: readonly string[] = [
  '/conferences',
  '/monographs',
  '/library',
];

export default async function NotFound() {
  const t = await getTranslations();
  const suggested = LINKS.filter(({ linkTo }) => SUGGESTED.includes(linkTo));

  // Rendered in the root layout, so it brings the site shell itself.
  return (
    <SiteShell>
      <Header />

      <main id="main" tabIndex={-1} className="wrap focus:outline-none">
        <div className="flex max-w-160 flex-col items-start gap-5 py-20 lg:py-32">
          <p
            aria-hidden
            className="text-8xl leading-24 font-extrabold tracking-[-0.03em] text-blue-600 lg:text-[160px] lg:leading-[150px]"
          >
            {t('notFound.code')}
          </p>
          <h1 className="t-h1">{t('notFound.title')}</h1>
          <p className="t-lead">{t('notFound.text')}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button href="/">{t('notFound.button')}</Button>
            {suggested.map(({ key, linkTo }) => (
              <TextLink key={linkTo} href={linkTo}>
                {t(`nav.${key}`)}
              </TextLink>
            ))}
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
