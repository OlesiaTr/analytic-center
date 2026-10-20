import clsx from 'clsx';
import { FC, Fragment, ReactNode } from 'react';

export interface DataTableRow {
  key: string;
  /** Starts a group: a full-width heading row above this one. */
  group?: string;
  label: string;
  value: ReactNode;
}

export interface Props {
  /** Column headings; below 768 they label each stacked cell. */
  columns: [string, string];
  rows: DataTableRow[];
  caption?: string;
  valueClassName?: string;
}

const stackedLabel =
  'max-md:before:mb-1 max-md:before:block max-md:before:text-xs max-md:before:leading-4 max-md:before:font-bold max-md:before:tracking-[0.06em] max-md:before:text-muted max-md:before:uppercase max-md:before:content-[attr(data-label)]';

/** Two-column table that stacks into labelled blocks below 768. */
export const DataTable: FC<Props> = ({
  columns: [labelHead, valueHead],
  rows,
  caption,
  valueClassName,
}) => (
  <div className="overflow-hidden rounded-xl border border-line bg-white">
    <table className="w-full border-collapse text-[15px] leading-6">
      {caption && (
        <caption className="p-5 text-left text-[15px] leading-[22px] font-bold tracking-[0.04em] text-ink uppercase">
          {caption}
        </caption>
      )}
      <thead className="max-md:sr-only">
        <tr>
          {[labelHead, valueHead].map(head => (
            <th
              key={head}
              scope="col"
              className="bg-blue-800 px-5 py-3.5 text-left text-sm font-semibold text-white"
            >
              {head}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(({ key, group, label, value }) => (
          <Fragment key={key}>
            {group && (
              <tr>
                <th
                  colSpan={2}
                  scope="colgroup"
                  className="bg-blue-50 px-4 py-2.5 text-left text-[13px] leading-[18px] font-bold tracking-[0.06em] text-blue-800 uppercase md:px-5"
                >
                  {group}
                </th>
              </tr>
            )}
            <tr className="max-md:block max-md:border-t max-md:border-line max-md:p-4">
              <th
                scope="row"
                data-label={labelHead}
                className={clsx(
                  'text-left align-top font-semibold whitespace-pre-line text-ink max-md:mb-3 max-md:block md:w-[32%] md:border-t md:border-line md:px-5 md:py-4',
                  stackedLabel,
                )}
              >
                {label}
              </th>
              <td
                data-label={valueHead}
                className={clsx(
                  'text-left align-top max-md:block md:border-t md:border-line md:px-5 md:py-4',
                  stackedLabel,
                  valueClassName,
                )}
              >
                {value}
              </td>
            </tr>
          </Fragment>
        ))}
      </tbody>
    </table>
  </div>
);
