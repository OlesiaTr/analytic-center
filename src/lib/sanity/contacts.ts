/** Phone and email from siteSettings, shown in the footer and mobile menu. */
export interface Contacts {
  email: string;
  phone: string;
  phoneLabel: string;
}

export const toContacts = (
  value:
    { email?: string; phone?: string; phoneLabel?: string } | null | undefined,
): Contacts => ({
  email: value?.email ?? '',
  phone: value?.phone ?? '',
  phoneLabel: value?.phoneLabel ?? '',
});
