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
  // Text styles are set once here and inherited; sizes from lg up are unchanged.
  <div className="rounded-lg bg-accent px-4 py-6 text-base leading-[1.8] font-medium tracking-[0.5px] md:px-10 md:text-xl lg:text-2xl">
    <h4 className="font-bold uppercase">{title}</h4>

    <p>{description}</p>

    {descriptionList && (
      <ul className="pl-6 md:pl-12">
        {descriptionList.map(item => (
          <li key={item} className="list-disc">
            {item}
          </li>
        ))}
      </ul>
    )}

    <p>
      <span className="font-bold">Термін подання документів</span> – {date}
    </p>

    <p>Більш докладно:</p>

    <a href={linkTo} className="wrap-break-word underline hover:text-mainBg">
      {linkTo}
    </a>
  </div>
);
