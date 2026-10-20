import { FC, ReactNode } from 'react';

import { Icon, type IconName } from '@/components/icons';

interface Props {
  children: ReactNode;
  icon?: IconName;
  /** ISO date (yyyy-mm-dd): wraps the label in <time>. */
  dateTime?: string;
}

/** Short non-interactive label, mostly dates: blue-800 on blue-50 (10:1). */
export const Chip: FC<Props> = ({ children, icon, dateTime }) => (
  <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-blue-50 px-2.5 py-[3px] text-[13px] leading-[18px] font-semibold whitespace-nowrap text-blue-800">
    {icon && <Icon name={icon} className="size-3.5" />}
    {dateTime ? <time dateTime={dateTime}>{children}</time> : children}
  </span>
);
