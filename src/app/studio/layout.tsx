import { ReactNode } from 'react';

// The Studio is its own root layout: no site styles, fonts or locale.
export default function StudioLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="uk">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
