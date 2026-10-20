import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Button } from './button';

describe('Button', () => {
  it('renders an internal route as a client-side link', () => {
    render(<Button href="/conferences">Усі конференції</Button>);
    const link = screen.getByRole('link', { name: 'Усі конференції' });

    expect(link).toHaveAttribute('href', '/conferences');
    expect(link).not.toHaveAttribute('download');
  });

  it('renders a download with its icon and hidden context', () => {
    render(
      <Button
        href="https://docs.google.com/uc?export=download&id=1"
        download
        variant="yellow"
        icon="download"
        srText="інформаційний лист"
      >
        Завантажити
      </Button>,
    );
    const link = screen.getByRole('link', {
      name: 'Завантажити інформаційний лист',
    });

    expect(link).toHaveAttribute('download');
    expect(link.querySelector('svg')).toHaveAttribute('aria-hidden');
    expect(link.className).toContain('bg-yellow-400');
  });

  it('renders an action as a type="button"', async () => {
    const onClick = vi.fn();
    render(
      <Button variant="outline" onClick={onClick}>
        Показати ще 8
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Показати ще 8' });

    expect(button).toHaveAttribute('type', 'button');
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('lets className override base utilities instead of adding duplicates', () => {
    render(
      <Button href="/" className="px-2">
        На головну
      </Button>,
    );
    const { className } = screen.getByRole('link');

    expect(className).toContain('px-2');
    expect(className).not.toContain('px-6');
  });
});
