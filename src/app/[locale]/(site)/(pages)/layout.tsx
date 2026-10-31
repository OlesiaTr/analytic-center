import { Header } from '@/layouts';
import { ReactNode } from 'react';

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Header />

      {children}
    </>
  );
}
