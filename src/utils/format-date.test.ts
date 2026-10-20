import { describe, expect, it } from 'vitest';

import { formatDate, toDateTime } from './format-date';

describe('formatDate', () => {
  it('splits dd.mm.yyyy into day, genitive month and year', () => {
    expect(formatDate('30.10.2026')).toEqual({
      iso: '2026-10-30',
      day: '30',
      month: 'жовтня',
      year: '2026',
    });
    expect(formatDate('05.03.2025')?.day).toBe('5');
    expect(formatDate('05.03.2025')?.month).toBe('березня');
  });

  it('rejects other formats and impossible dates', () => {
    expect(formatDate('2021')).toBeNull();
    expect(formatDate('Більш докладно за посиланням')).toBeNull();
    expect(formatDate('31.02.2026')).toBeNull();
  });
});

describe('toDateTime', () => {
  it('accepts full dates and bare years', () => {
    expect(toDateTime('30.10.2026')).toBe('2026-10-30');
    expect(toDateTime('2021')).toBe('2021');
    expect(toDateTime('скоро')).toBeUndefined();
  });
});
