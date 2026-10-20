export type PluralForms = Partial<Record<Intl.LDMLPluralRule, string>> & {
  other: string;
};

/** «1 програма», «2 програми», «5 програм»: picks the form by the locale's rules. */
export const plural = (count: number, forms: PluralForms, locale = 'uk') => {
  const rule = new Intl.PluralRules(locale).select(count);
  return (forms[rule] ?? forms.other).replace('{count}', String(count));
};
