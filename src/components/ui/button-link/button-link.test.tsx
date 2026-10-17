import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ButtonLink } from './button-link';

describe('ButtonLink', () => {
  it('renders an internal route as a client-side link', () => {
    render(<ButtonLink label="Про центр" href="/about-center" />);
    const link = screen.getByRole('link', { name: 'Про центр' });

    expect(link).toHaveAttribute('href', '/about-center');
    expect(link).not.toHaveAttribute('download');
  });

  it('renders a file as a plain download link', () => {
    render(
      <ButtonLink
        label="Завантажити"
        href="https://docs.google.com/uc?export=download&id=1"
        withIcon
        linkToDownload
      />,
    );
    const link = screen.getByRole('link', { name: 'Завантажити' });

    expect(link).toHaveAttribute('download');
    expect(link.className).toContain('flex');
  });

  it('uses the accent palette when asked', () => {
    render(<ButtonLink label="Детальніше" href="/grants" isAccentBtn />);
    expect(screen.getByRole('link').className).toContain('bg-accent');
  });
});
