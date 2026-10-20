import { describe, expect, it } from 'vitest';

import { toHost } from './url';

describe('toHost', () => {
  it('strips the protocol, path and www', () => {
    expect(toHost('https://fulbright.org.ua/uk/program/')).toBe(
      'fulbright.org.ua',
    );
    expect(toHost('http://www.kafmvp.hneu.edu.ua')).toBe('kafmvp.hneu.edu.ua');
  });
});
