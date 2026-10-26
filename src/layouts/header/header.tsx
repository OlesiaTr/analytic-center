import { FC } from 'react';

import { toContacts } from '@/lib/sanity/contacts';
import { getSiteSettings } from '@/lib/sanity/content';

import { HeaderView, type Props as HeaderViewProps } from './header-view';

/** Fetches the contacts for the mobile menu, then renders the client header. */
export const Header: FC<Omit<HeaderViewProps, 'contacts'>> = async props => {
  const settings = await getSiteSettings();
  return <HeaderView {...props} contacts={toContacts(settings?.contacts)} />;
};
