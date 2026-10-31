import { useTranslations } from 'next-intl';
import { FC, ReactNode } from 'react';

import { Footer } from '@/layouts/footer';

/** Skip link + page + footer for every site route (not the Studio). */
export const SiteShell: FC<{ children: ReactNode }> = ({ children }) => {
  const t = useTranslations();
  return (
    <>
      <a
        href="#main"
        className="fixed top-4 left-4 z-50 translate-y-[-200%] rounded-lg bg-yellow-400 px-4 py-2 font-semibold text-brown-900 transition focus:translate-y-0"
      >
        {t('skipLink')}
      </a>

      {children}

      <Footer />
    </>
  );
};
