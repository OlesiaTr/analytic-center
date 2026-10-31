import { render, type RenderOptions } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import type { ReactElement } from 'react';

import en from '../../messages/en.json';
import uk from '../../messages/uk.json';

const MESSAGES = { uk, en };

/** Render inside next-intl, Ukrainian by default (the site's default locale). */
export const renderWithIntl = (
  ui: ReactElement,
  { locale = 'uk', ...options }: RenderOptions & { locale?: 'uk' | 'en' } = {},
) =>
  render(
    <NextIntlClientProvider locale={locale} messages={MESSAGES[locale]}>
      {ui}
    </NextIntlClientProvider>,
    options,
  );
