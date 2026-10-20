import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { PublicationGrid } from './publication-grid';

const list = Array.from({ length: 22 }, (_, i) => ({
  id: String(i),
  imgSrc: `/images/conferences/${i}.webp`,
  width: 572,
  height: 800,
  imgAlt: '',
  title: `Збірник ${i + 1}`,
  date: '30.10.2026',
  linkToDownload: `https://example.org/${i}`,
}));

describe('PublicationGrid', () => {
  it('renders short lists in full', () => {
    render(
      <PublicationGrid list={list.slice(0, 3)} buttonLabel="Завантажити" />,
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('loads long archives 8 at a time and focuses the first new item', async () => {
    const user = userEvent.setup();
    render(
      <PublicationGrid
        list={list}
        buttonLabel="Завантажити"
        loadMore={{ doneText: 'Це всі збірники архіву.' }}
      />,
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(8);
    expect(screen.getByText('Показано 8 з 22')).toBeVisible();

    await user.click(screen.getByRole('button', { name: 'Показати ще 8' }));
    expect(screen.getAllByRole('listitem')).toHaveLength(16);
    expect(screen.getAllByRole('listitem')[8]).toHaveFocus();

    await user.click(screen.getByRole('button', { name: 'Показати ще 6' }));
    expect(screen.getAllByRole('listitem')).toHaveLength(22);
    expect(screen.getByText('Показано 22 з 22')).toBeVisible();
    expect(screen.getByText('Це всі збірники архіву.')).toBeVisible();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
