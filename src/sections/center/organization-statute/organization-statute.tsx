import data from '@/data/about-center.json';

export const OrganizationStatute = () => {
  const { list } = data.organizationStatute;

  return (
    <section className="section bg-accent">
      <ul className="mb-6 flex flex-col gap-8 md:mb-10 lg:mb-16">
        {list.map(({ title, linkToDownload }) => (
          <li key={title} className="group flex rounded-lg bg-white transition">
            <a
              href={linkToDownload}
              className="flex w-full cursor-pointer rounded-lg px-4 py-5 md:py-7"
              download
            >
              <span className="text-sm font-bold text-chocolate uppercase group-hover:text-mainBgDark sm:max-w-[362px] md:max-w-full md:text-base lg:text-xl xl:text-[28px] xl:leading-7">
                {title}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};
