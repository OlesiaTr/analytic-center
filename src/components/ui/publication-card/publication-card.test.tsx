import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithIntl } from '@/test/render';

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
  lang: 'uk' as const,
};

describe('PublicationCard', () => {
  it('shows the cover, date, title and download button', () => {
    const { container } = renderWithIntl(
      <PublicationCard card={card} buttonLabel="Завантажити" />,
    );

    // The cover is decorative: the title sits right next to it.
    const image = container.querySelector('img');
    expect(image).toHaveAttribute('alt', '');
    expect(image).toHaveAttribute('width', '572');
    expect(screen.getByRole('heading', { name: card.title })).toBeVisible();
    expect(screen.getByText('30.10.2026')).toHaveAttribute(
      'datetime',
      '2026-10-30',
    );
    // The hidden title keeps screen-reader link lists unique.
    expect(
      screen.getByRole('link', { name: `Завантажити ${card.title}` }),
    ).toHaveAttribute('href', card.linkToDownload);
  });

  it('shows the description as a subtitle', () => {
    renderWithIntl(
      <PublicationCard
        card={{ ...card, description: '“Нова геополітична картина світу”' }}
        buttonLabel="Завантажити"
      />,
    );
    expect(screen.getByText('“Нова геополітична картина світу”')).toBeVisible();
  });

  it('adds the big date in the wide layout', () => {
    renderWithIntl(
      <PublicationCard card={card} buttonLabel="Завантажити" wide />,
    );
    expect(screen.getByText('жовтня')).toBeInTheDocument();
    expect(screen.getByText('30', { exact: true })).toBeInTheDocument();
  });

  it('keeps bare years as the chip date', () => {
    renderWithIntl(
      <PublicationCard
        card={{ ...card, date: '2021' }}
        buttonLabel="Завантажити"
        variant="library"
        headingLevel="h2"
      />,
    );
    expect(screen.getByText('2021')).toHaveAttribute('datetime', '2021');
    expect(screen.getByRole('heading', { level: 2 })).toBeVisible();
  });

  it('finishes the button name with the hidden label and title', () => {
    renderWithIntl(
      <PublicationCard
        card={card}
        buttonLabel="Завантажити"
        srLabel="інформаційний лист"
      />,
    );
    expect(
      screen.getByRole('link', {
        name: `Завантажити інформаційний лист: ${card.title}`,
      }),
    ).toBeVisible();
  });

  it('shows the English month on /en', () => {
    renderWithIntl(
      <PublicationCard card={card} buttonLabel="Download" wide />,
      { locale: 'en' },
    );
    expect(screen.getByText('October')).toBeInTheDocument();
  });
});
