import { FC } from 'react';

import { Icon, type IconName } from '@/components/icons';
import { TextLink } from '@/components/ui/text-link';

interface Props {
  title: string;
  text: string;
  icon?: IconName;
  link?: { href: string; label: string };
}

/** Replaces an empty list; the section and its title stay. */
export const EmptyState: FC<Props> = ({
  title,
  text,
  icon = 'calendar',
  link,
}) => (
  <div className="flex flex-col items-center gap-3 rounded-xl border-[1.5px] border-dashed border-line-strong bg-white px-6 py-10 text-center">
    <span className="inline-flex size-14 items-center justify-center rounded-full bg-blue-50 text-blue-800">
      <Icon name={icon} className="size-6" />
    </span>
    <p className="t-h4">{title}</p>
    <p className="max-w-[480px]">{text}</p>
    {link && <TextLink href={link.href}>{link.label}</TextLink>}
  </div>
);
