import { getTranslations } from 'next-intl/server';

import { Accordion, GrantProgram } from '@/components/ui';
import { getGrantGroups } from '@/lib/sanity/content';
import { toHost } from '@/utils';

interface Props {
  /** h2 on /grants (the groups aren't headings), h3 under the home section h2. */
  headingLevel?: 'h2' | 'h3';
}

/** Grant groups as <details>, the first one open, each with its programs. */
export const GrantGroups = async ({ headingLevel = 'h3' }: Props) => {
  const t = await getTranslations('grants');
  const groups = await getGrantGroups();

  return (
    <div>
      {groups.map(({ id, title, lang, programs }, index) => {
        return (
          <Accordion
            key={id}
            title={title}
            lang={lang}
            sub={t('programCount', { count: programs.length })}
            defaultOpen={index === 0}
          >
            {programs.map(program => (
              <GrantProgram
                key={program.title}
                title={program.title}
                description={program.description}
                descriptionList={program.descriptionList}
                date={program.date}
                linkTo={program.linkTo}
                dueDateLabel={t('dueDate')}
                moreLabel={t('moreOn', { host: toHost(program.linkTo) })}
                headingLevel={headingLevel}
                lang={program.lang}
              />
            ))}
          </Accordion>
        );
      })}
    </div>
  );
};
