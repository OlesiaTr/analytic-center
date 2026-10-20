import { FC, ReactNode } from 'react';

import { Icon, type IconName } from '@/components/icons';

export interface Props {
  id?: string;
  title: string;
  sub?: string;
  icon?: IconName;
  defaultOpen?: boolean;
  children: ReactNode;
}

/** Bordered <details> for long optional content, e.g. the authors form. */
export const Panel: FC<Props> = ({
  id,
  title,
  sub,
  icon = 'document',
  defaultOpen = false,
  children,
}) => (
  <details
    id={id}
    open={defaultOpen}
    className="group rounded-xl border border-line bg-white"
  >
    <summary className="flex min-h-18 cursor-pointer list-none items-center gap-4 rounded-xl p-5 group-open:rounded-b-none group-open:border-b group-open:border-line [&::-webkit-details-marker]:hidden">
      <span className="inline-flex size-11 flex-none items-center justify-center rounded-lg bg-blue-50 text-blue-800">
        <Icon name={icon} />
      </span>
      <span className="min-w-0 flex-auto">
        <span className="block t-h4">{title}</span>
        {sub && <span className="block t-sm text-muted">{sub}</span>}
      </span>
      <span className="inline-flex size-10 flex-none items-center justify-center rounded-full border-2 border-blue-600 text-blue-600 transition-[transform,background-color] duration-200 group-open:rotate-180 group-open:bg-blue-600 group-open:text-white">
        <Icon name="chevronDown" />
      </span>
    </summary>
    <div className="grid gap-4 p-5">{children}</div>
  </details>
);
