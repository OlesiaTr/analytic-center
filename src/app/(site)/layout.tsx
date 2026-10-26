import { ReactNode } from 'react';

import { SiteShell } from '@/layouts';

export default function SiteLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <SiteShell>{children}</SiteShell>;
}
