import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PublicationCard } from './publication-card';

const card = {
  id: '1',
  imgSrc: '/images/conferences/conf.webp',
  width: 572,
  height: 800,
  imgAlt: 'Обкладинка',
  title: 'Харківські політологічні читання',
  date: '30.10.2026',
  linkToDownload: 'https://docs.google.com/uc?export=download&id=1',
};

describe('PublicationCard', () => {
  it('shows the cover, title, date and download link', () => {
    render(<PublicationCard card={card} buttonDownload="Завантажити" />);

    const image = screen.getByRole('img', { name: 'Обкладинка' });
    expect(image).toHaveAttribute('width', '572');
    expect(image).toHaveAttribute('height', '800');
    expect(screen.getByRole('heading', { name: card.title })).toBeVisible();
    expect(screen.getByText('30.10.2026')).toBeVisible();
    expect(screen.getByRole('link', { name: 'Завантажити' })).toHaveAttribute(
      'href',
      card.linkToDownload,
    );
  });

  it('shows the description on cover cards', () => {
    render(
      <PublicationCard
        card={{ ...card, description: '“Нова геополітична картина світу”' }}
        buttonDownload="Завантажити"
      />,
    );
    expect(screen.getByText('“Нова геополітична картина світу”')).toBeVisible();
  });

  it('uses the plain button on library cards', () => {
    render(
      <PublicationCard
        card={card}
        buttonDownload="Завантажити"
        variant="library"
      />,
    );
    expect(screen.getByRole('link').className).toContain('bg-mainBg');
  });
});
