import { describe, expect, it } from 'vitest';

import { requireUk } from './locale';

describe('requireUk', () => {
  it('accepts filled Ukrainian text or blocks', () => {
    expect(requireUk({ uk: 'Конференції' })).toBe(true);
    expect(requireUk({ uk: [{ _type: 'block' }] })).toBe(true);
  });

  it('rejects missing, blank or English-only values', () => {
    expect(requireUk(undefined)).toBe('Заповніть українською');
    expect(requireUk({ uk: '   ' })).toBe('Заповніть українською');
    expect(requireUk({ en: 'Conferences' })).toBe('Заповніть українською');
    expect(requireUk({ uk: [] })).toBe('Заповніть українською');
  });
});
