import { FC } from 'react';

import { Icon } from '@/components/icons';
import { TextLink } from '@/components/ui/text-link';

export interface Props {
  title: string;
  description: string;
  descriptionList?: string[];
  date: string;
  linkTo: string;
  dueDateLabel: string;
  /** e.g. «Детальніше на fulbright.org.ua» */
  moreLabel: string;
  headingLevel?: 'h2' | 'h3' | 'h4';
}

/** One grant program: prose, optional list, deadline and the official link. */
export const GrantProgram: FC<Props> = ({
  title,
  description,
  descriptionList,
  date,
  linkTo,
  dueDateLabel,
  moreLabel,
  headingLevel: Heading = 'h3',
}) => (
  <div className="flex flex-col gap-3 rounded-xl bg-surface p-5 lg:px-8 lg:py-7">
    <Heading className="t-h4">{title.replace(/:\s*$/, '')}</Heading>
    <p className="font-serif text-base leading-[27px]">{description}</p>
    {descriptionList && (
      <ul className="flex list-disc flex-col gap-2 pl-[22px] font-serif text-base leading-[27px]">
        {descriptionList.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    )}
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
      <span className="inline-flex items-start gap-2 t-sm text-ink">
        <Icon name="calendar" className="mt-px size-5 text-blue-600" />
        <span>
          {dueDateLabel}:{' '}
          <b className="font-bold">{date.trim().replace(/\.$/, '')}</b>
        </span>
      </span>
      <TextLink href={linkTo} external>
        {moreLabel}
      </TextLink>
    </div>
  </div>
);
