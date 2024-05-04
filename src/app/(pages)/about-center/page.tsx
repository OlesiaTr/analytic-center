import { CenterShortVersion } from '@/sections';
import React, { FC } from 'react';

export interface Props {}

const Page: FC<Props> = () => {
  return (
    <main>
      About Center page
      <CenterShortVersion />
      <CenterShortVersion />
      <CenterShortVersion />
      <CenterShortVersion />
    </main>
  );
};

export default Page;
