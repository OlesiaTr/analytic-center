import { describe, expect, it } from 'vitest';

import en from '../../messages/en.json';
import uk from '../../messages/uk.json';

type Tree = { [key: string]: string | Tree };

/** Every leaf as `path → message`. */
const flatten = (tree: Tree, prefix = ''): Record<string, string> =>
  Object.entries(tree).reduce<Record<string, string>>(
    (acc, [key, value]) =>
      typeof value === 'string'
        ? { ...acc, [prefix + key]: value }
        : { ...acc, ...flatten(value, `${prefix}${key}.`) },
    {},
  );

/** ICU argument names, e.g. {count} and {host}; `#` inside plurals is not one. */
const args = (message: string) =>
  [...message.matchAll(/\{(\w+)[,}]/g)].map(match => match[1]).sort();

describe('messages', () => {
  const ukFlat = flatten(uk);
  const enFlat = flatten(en);

  it('have the same keys in both languages', () => {
    expect(Object.keys(enFlat).sort()).toEqual(Object.keys(ukFlat).sort());
  });

  it('use the same ICU arguments in both languages', () => {
    for (const key of Object.keys(ukFlat)) {
      expect(args(enFlat[key] ?? ''), key).toEqual(args(ukFlat[key]));
    }
  });

  it('have no empty translations', () => {
    expect(Object.entries(enFlat).filter(([, value]) => !value.trim())).toEqual(
      [],
    );
  });
});
