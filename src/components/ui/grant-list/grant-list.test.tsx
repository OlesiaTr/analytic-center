import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import grantsData from '@/data/grants.json';
import { GrantList } from './grant-list';

const list = grantsData.list.map(({ title }) => ({ title }));

describe('GrantList', () => {
  it('expands one group at a time and exposes aria-expanded', async () => {
    render(<GrantList list={list} withAnswers />);
    const [first, second] = screen.getAllByRole('button');

    expect(first).toHaveAttribute('aria-expanded', 'true');
    expect(second).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(second);

    expect(first).toHaveAttribute('aria-expanded', 'false');
    expect(second).toHaveAttribute('aria-expanded', 'true');
    expect(
      document.getElementById(second.getAttribute('aria-controls')!),
    ).toBeInTheDocument();
  });

  it('renders a static list without buttons on the home page', () => {
    render(<GrantList list={list} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(
      list.length,
    );
  });
});
