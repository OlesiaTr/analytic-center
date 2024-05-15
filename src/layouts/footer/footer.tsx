import { PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

import { Logo } from '@/components/svg-icons';
import { Navigation } from '@/components/ui';
import { isProduction } from '@/configs';
import { LINKS } from '@/constants';

import data from '@/data/common.json';

export const Footer = () => {
  const { name, contacts, copyrights } = data.footer;

  return (
    <footer className="m-auto flex max-w-screen-xxl justify-between bg-footerBg p-4 text-white md:px-14 lg:py-20 xl:p-20">
      <div className="hidden max-w-[277px] lg:block">
        <a href={isProduction() ? 'index.html' : LINKS[0].linkTo}>
          <Logo width={190} height={134} />
        </a>

        <p className="mt-12  text-lg font-bold leading-snug tracking-[0.5px] ">
          {name}
        </p>
      </div>

      <div className="m-auto flex items-center gap-9 sm:gap-[74px] lg:m-0 lg:flex-col lg:gap-0">
        <div className="hidden sm:block">
          <Navigation
            links={LINKS}
            linkStyles="!py-1 lg:!pt-0 lg:!pb-[46px]"
            listStyles="flex-col lg:flex-row"
          />
        </div>

        <div className="flex min-h-[120px] flex-col justify-between sm:min-h-[190px]  lg:block lg:min-h-full">
          <div className="lg:flex lg:justify-center">
            <address className="not-italic tracking-[0.5px] lg:mb-[52px]">
              <p className="mb-3 text-sm font-semibold sm:text-base sm:font-bold">
                {contacts.title}
              </p>

              <ul className="font-medium">
                <li className="flex items-center gap-2 text-xs font-semibold transition hover:text-accent active:text-accentLight sm:text-base sm:font-bold">
                  <PhoneIcon className="size-5" />
                  <a href={`tel:+${contacts.phone}`}>{'+' + contacts.phone}</a>
                </li>

                <li className="flex items-center gap-2 text-xs font-semibold transition hover:text-accent active:text-accentLight sm:text-base sm:font-bold">
                  <EnvelopeIcon className="size-5" />
                  <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
                </li>
              </ul>
            </address>
          </div>

          <div className="flex items-center gap-2 lg:block">
            <div className="lg:hidden">
              <Logo width={38} height={27} />
            </div>

            <p className="max-w-[90px] text-center text-[3px] font-medium leading-loose md:max-w-[250px] md:text-xs md:leading-snug lg:max-w-full">
              {copyrights}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
