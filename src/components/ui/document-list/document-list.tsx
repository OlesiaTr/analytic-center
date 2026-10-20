import { FC } from 'react';

import { Icon } from '@/components/icons';
import { Button } from '@/components/ui/button';

export interface Props {
  list: { title: string; linkToDownload: string }[];
  /** Visible button text, e.g. «PDF». */
  buttonLabel: string;
  /** Hidden prefix, e.g. «Завантажити»: the name reads «PDF Завантажити: Статут». */
  srLabel: string;
}

/** Downloadable documents as rows: icon, title, yellow button. */
export const DocumentList: FC<Props> = ({ list, buttonLabel, srLabel }) => (
  <ul className="grid grid-cols-[minmax(0,1fr)] gap-3 lg:grid-cols-2 lg:gap-4">
    {list.map(({ title, linkToDownload }) => (
      <li
        key={title}
        className="flex items-center gap-4 rounded-xl border border-line bg-white p-4"
      >
        <span className="inline-flex size-11 flex-none items-center justify-center rounded-lg bg-blue-50 text-blue-800">
          <Icon name="document" />
        </span>
        <span className="min-w-0 flex-auto text-[15px] leading-[22px] font-semibold wrap-break-word text-ink">
          {title}
        </span>
        <Button
          href={linkToDownload}
          download
          variant="yellow"
          size="sm"
          icon="download"
          srText={`${srLabel}: ${title}`}
        >
          {buttonLabel}
        </Button>
      </li>
    ))}
  </ul>
);
