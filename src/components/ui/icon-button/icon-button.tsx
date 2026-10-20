import { ComponentProps, FC } from 'react';

import { Icon, type IconName } from '@/components/icons';

interface Props extends Omit<ComponentProps<'button'>, 'children'> {
  icon: IconName;
  /** Required: icon-only buttons need an accessible name. */
  label: string;
}

/** 44×44 round icon-only button. */
export const IconButton: FC<Props> = ({
  icon,
  label,
  type = 'button',
  ...rest
}) => (
  <button
    type={type}
    aria-label={label}
    className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border-2 border-blue-600 bg-white text-blue-600 hover:bg-blue-600 hover:text-white disabled:cursor-not-allowed disabled:border-line-strong disabled:bg-white disabled:text-line-strong in-[.on-dark]:border-white in-[.on-dark]:bg-transparent in-[.on-dark]:text-white"
    {...rest}
  >
    <Icon name={icon} />
  </button>
);
