import { describe, expect, it } from 'vitest';

import { plural } from './plural';

const forms = {
  one: '{count} програма',
  few: '{count} програми',
  many: '{count} програм',
  other: '{count} програми',
};

describe('plural', () => {
  it('follows Ukrainian plural rules', () => {
    expect(plural(1, forms)).toBe('1 програма');
    expect(plural(2, forms)).toBe('2 програми');
    expect(plural(5, forms)).toBe('5 програм');
    expect(plural(11, forms)).toBe('11 програм');
    expect(plural(21, forms)).toBe('21 програма');
    expect(plural(22, forms)).toBe('22 програми');
  });

  it('falls back to the other form', () => {
    expect(plural(1, { other: '{count} items' }, 'en')).toBe('1 items');
  });
});
