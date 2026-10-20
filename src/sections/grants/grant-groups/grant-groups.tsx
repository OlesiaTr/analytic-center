import { Accordion, GrantProgram } from '@/components/ui';
import data from '@/data/common.json';
import grantsData from '@/data/grants.json';
import { plural } from '@/utils';

interface Props {
  /** h2 on /grants (the groups aren't headings), h3 under the home section h2. */
  headingLevel?: 'h2' | 'h3';
}

/** Grant groups as <details>, the first one open, each with its programs. */
export const GrantGroups = ({ headingLevel = 'h3' }: Props) => {
  const { list, programCount, moreOn } = data.grants;

  return (
    <div>
      {list.map((group, index) => {
        const { programs } = grantsData.list[index];
        return (
          <Accordion
            key={group.title}
            title={group.title}
            sub={plural(programs.length, programCount)}
            defaultOpen={index === 0}
          >
            {programs.map(program => (
              <GrantProgram
                key={program.title}
                title={program.title}
                description={program.description}
                descriptionList={
                  'descriptionList' in program
                    ? program.descriptionList
                    : undefined
                }
                date={program.date}
                linkTo={program.linkTo}
                dueDateLabel={grantsData.dueDate}
                moreLabel={moreOn}
                headingLevel={headingLevel}
              />
            ))}
          </Accordion>
        );
      })}
    </div>
  );
};
