import { Accordion, Button, GrantProgram, SectionHead } from '@/components/ui';
import data from '@/data/common.json';
import grantsData from '@/data/grants.json';
import { plural } from '@/utils';

export const GrantsShortVersion = () => {
  const { title, list, button, redirectionTo, programCount, moreOn } =
    data.grants;

  return (
    <section aria-labelledby="grants-title" className="sec">
      <div className="wrap">
        <SectionHead
          id="grants-title"
          title={title}
          action={<Button href={redirectionTo}>{button}</Button>}
        />
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
                  />
                ))}
              </Accordion>
            );
          })}
        </div>
      </div>
    </section>
  );
};
