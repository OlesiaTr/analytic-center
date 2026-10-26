import Link from 'next/link';

import { Icon } from '@/components/icons';
import { Logo } from '@/components/svg-icons';
import { LINKS } from '@/constants';
import data from '@/data/common.json';
import { toContacts } from '@/lib/sanity/contacts';
import { getSiteSettings } from '@/lib/sanity/content';

const footerLink =
  'inline-flex min-h-9 items-center gap-2.5 font-medium text-white no-underline hover:text-yellow-400 hover:underline hover:underline-offset-3';

export const Footer = async () => {
  const { navTitle, navLabel, rights } = data.footer;
  const settings = await getSiteSettings();
  const name = settings?.name ?? data.footer.name;
  const contacts = {
    title: data.footer.contacts.title,
    ...toContacts(settings?.contacts),
  };

  return (
    <footer className="bg-navy-900 on-dark text-on-dark-muted">
      <div className="wrap grid gap-10 py-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)] md:py-16">
        <Link
          href={LINKS[0].linkTo}
          aria-label={data.header.logoLabel}
          className="flex max-w-[360px] items-center gap-4 self-start font-bold text-white no-underline"
        >
          <Logo className="h-14 w-auto flex-none" />
          <span aria-hidden>{name}</span>
        </Link>

        <nav aria-label={navLabel}>
          <h2 className="mb-4 t-over text-yellow-400">{navTitle}</h2>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-1">
            {LINKS.map(({ name: label, linkTo }) => (
              <li key={linkTo}>
                <Link href={linkTo} className={footerLink}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* min-w-0: the email can't wrap, so let the column shrink instead */}
        <div className="min-w-0">
          <h2 className="mb-4 t-over text-yellow-400">{contacts.title}</h2>
          <ul className="grid gap-1">
            <li>
              <a href={`tel:${contacts.phone}`} className={footerLink}>
                <Icon name="phone" />
                {contacts.phoneLabel}
              </a>
            </li>
            <li>
              <a href={`mailto:${contacts.email}`} className={footerLink}>
                <Icon name="mail" className="size-5 flex-none" />
                <span className="min-w-0 wrap-anywhere">{contacts.email}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/14 py-5 text-[13px] leading-5">
        {/* Year comes from the build, not hard-coded */}
        <p className="wrap">
          © {new Date().getFullYear()} {name}. {rights}
        </p>
      </div>
    </footer>
  );
};
