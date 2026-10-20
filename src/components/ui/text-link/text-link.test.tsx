import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TextLink } from './text-link';

describe('TextLink', () => {
  it('opens external links in a new tab and says so', () => {
    render(
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
    render(<TextLink href="/library">Бібліотека</TextLink>);
    expect(screen.getByRole('link')).not.toHaveAttribute('target');
  });
});
