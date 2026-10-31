import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithIntl } from '@/test/render';

import { TextLink } from './text-link';

describe('TextLink', () => {
  it('opens external links in a new tab and says so', () => {
    renderWithIntl(
      <TextLink href="https://fulbright.org.ua" external>
        Детальніше на fulbright.org.ua
      </TextLink>,
    );
    const link = screen.getByRole('link', {
      name: 'Детальніше на fulbright.org.ua (відкривається в новій вкладці)',
    });

    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('keeps internal links in the same tab', () => {
    renderWithIntl(<TextLink href="/library">Бібліотека</TextLink>);
    expect(screen.getByRole('link')).not.toHaveAttribute('target');
  });

  it('announces the new tab in English on /en', () => {
    renderWithIntl(
      <TextLink href="https://fulbright.org.ua" external>
        More on fulbright.org.ua
      </TextLink>,
      { locale: 'en' },
    );
    expect(
      screen.getByRole('link', {
        name: 'More on fulbright.org.ua (opens in a new tab)',
      }),
    ).toBeVisible();
  });
});
