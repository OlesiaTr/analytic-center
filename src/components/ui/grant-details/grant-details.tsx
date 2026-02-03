interface GrantDetailsProps {
  title: string;
  description: string;
  date: string;
  linkTo: string;
  descriptionList?: string[] | null;
}

export const GrantDetails = ({
  title,
  description,
  date,
  linkTo,
  descriptionList,
}: GrantDetailsProps) => (
  <div className="rounded-lg bg-accent px-10 py-6">
    <h4 className="text-2xl font-bold uppercase leading-[1.8] tracking-[0.5px]">
      {title}
    </h4>

    <p className="text-2xl font-medium leading-[1.8] tracking-[0.5px]">
      {description}
    </p>

    {descriptionList && (
      <ul className="pl-12">
        {descriptionList.map((item, id) => (
          <li
            key={id}
            className="list-disc text-2xl font-medium leading-[1.8] tracking-[0.5px]"
          >
            {item}
          </li>
        ))}
      </ul>
    )}

    <p className="text-2xl font-medium leading-[1.8] tracking-[0.5px]">
      <span className="font-bold">Tермін подання документів</span> – {date}
    </p>

    <p className="text-2xl font-medium leading-[1.8] tracking-[0.5px]">
      Більш докладно:
    </p>

    <a
      href={linkTo}
      className="text-2xl font-medium leading-[1.8] tracking-[0.5px] underline hover:text-mainBg"
    >
      {linkTo}
    </a>
  </div>
);
