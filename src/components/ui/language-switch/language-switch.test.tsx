import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { usePathname } from '@/i18n/navigation';
import { renderWithIntl } from '@/test/render';

import { LanguageSwitch } from './language-switch';

describe('LanguageSwitch', () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue('/grants');
  });

  it('links to the current page in each language', () => {
    renderWithIntl(<LanguageSwitch />);

    expect(screen.getByRole('link', { name: /УКР/ })).toHaveAttribute(
      'href',
      '/grants',
    );
    expect(screen.getByRole('link', { name: /ENG/ })).toHaveAttribute(
      'href',
      '/en/grants',
    );
  });

  it('links home without a trailing slash', () => {
    vi.mocked(usePathname).mockReturnValue('/');
    renderWithIntl(<LanguageSwitch />);

    expect(screen.getByRole('link', { name: /ENG/ })).toHaveAttribute(
      'href',
      '/en',
    );
  });

  it('marks the current language and each link’s own language', () => {
    renderWithIntl(<LanguageSwitch />, { locale: 'en' });
    const uk = screen.getByRole('link', { name: 'УКР Українська' });
    const en = screen.getByRole('link', { name: 'ENG English' });

    expect(en).toHaveAttribute('aria-current', 'true');
    expect(uk).not.toHaveAttribute('aria-current');
    expect(uk).toHaveAttribute('lang', 'uk');
    expect(en).toHaveAttribute('lang', 'en');
  });

  it('labels the group in the page language', () => {
    renderWithIntl(<LanguageSwitch />);
    expect(screen.getByRole('group', { name: 'Мова сайту' })).toBeVisible();

    renderWithIntl(<LanguageSwitch />, { locale: 'en' });
    expect(screen.getByRole('group', { name: 'Site language' })).toBeVisible();
  });
});
