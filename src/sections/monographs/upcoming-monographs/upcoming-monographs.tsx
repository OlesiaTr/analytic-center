import {
  Button,
  EmptyState,
  PublicationGrid,
  SectionHead,
} from '@/components/ui';
import data from '@/data/common.json';

export const UpcomingMonographs = () => {
  const { title, list, button, buttonDownload, redirectionTo, empty } =
    data.upcomingMonographs;

  return (
    <section
      aria-labelledby="monographs-title"
      className="bg-blue-600 sec on-dark"
    >
      <div className="wrap">
        <SectionHead
          id="monographs-title"
          title={title}
          action={
            <Button href={redirectionTo} variant="yellow">
              {button}
            </Button>
          }
        />
        {list.length ? (
          <PublicationGrid
            list={list}
            buttonLabel={buttonDownload}
            layout="grid-3"
          />
        ) : (
          <EmptyState
            title={empty.title}
            text={empty.text}
            link={{ href: empty.href, label: empty.link }}
          />
        )}
      </div>
    </section>
  );
};
