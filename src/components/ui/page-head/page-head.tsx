import { FC } from 'react';

interface Props {
  title: string;
  lead?: string;
}

/** Inner-page title band: the page's h1 on surface, with an optional lead. */
export const PageHead: FC<Props> = ({ title, lead }) => (
  <div className="border-b border-line bg-surface py-10 lg:py-16">
    <div className="wrap">
      <h1 className="sec-title t-h1">{title}</h1>
      {lead && <p className="mt-3 max-w-[720px] t-lead">{lead}</p>}
    </div>
  </div>
);
