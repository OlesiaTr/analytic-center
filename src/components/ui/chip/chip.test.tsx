import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Chip } from './chip';

describe('Chip', () => {
  it('wraps dates in <time>', () => {
    render(<Chip dateTime="2026-10-30">30.10.2026</Chip>);
    expect(screen.getByText('30.10.2026').tagName).toBe('TIME');
    expect(screen.getByText('30.10.2026')).toHaveAttribute(
      'datetime',
      '2026-10-30',
    );
  });
});
