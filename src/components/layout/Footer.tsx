import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import {
  legalNav,
  mainNav,
  serviceHref,
  site,
  specialties,
  whatsappUrl,
} from "@/content/site";

export function Footer() {
  const connect = [
    { label: `Instagram ${site.contact.instagramHandle}`, href: site.contact.instagram },
    ...site.contact.whatsapp.map((w) => ({ label: `WhatsApp · ${w.name}`, href: whatsappUrl(w.number) })),
    { label: "Email", href: `mailto:${site.contact.email}` },
  ];

  return (
    <footer data-header="dark" className="bg-burgundy-deep text-cream">
      <div className="container-vink pt-20 md:pt-28">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link href="/" aria-label="VINK Creative Studio — inicio" className="inline-block">
              <Logo className="h-10 md:h-12" />
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-cream/70">{site.description}</p>
          </div>

          <FooterColumn title="Explore" className="md:col-span-2 md:col-start-6">
            {mainNav.map((item) => (
              <FooterLink key={item.label} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Services" className="md:col-span-2">
            {specialties.map((s) => (
              <FooterLink key={s.slug} href={serviceHref(s.slug)}>
                {s.short}
              </FooterLink>
            ))}
          </FooterColumn>

          <div className="grid gap-14 sm:grid-cols-2 md:col-span-3 md:grid-cols-1 md:gap-10">
            <FooterColumn title="Connect">
              {connect.map((l) => (
                <FooterLink key={l.label} href={l.href} external={!l.href.startsWith("mailto:")}>
                  {l.label}
                </FooterLink>
              ))}
            </FooterColumn>
            <FooterColumn title="Legal">
              {legalNav.map((l) => (
                <FooterLink key={l.href} href={l.href}>
                  {l.label}
                </FooterLink>
              ))}
            </FooterColumn>
          </div>
        </div>

        <p aria-hidden className="display mt-20 whitespace-nowrap text-center text-[13.5vw] leading-[0.8] text-cream md:mt-28">
          Think with Vink.
        </p>

        <div className="flex flex-col gap-3 border-t border-cream/15 py-6 text-xs text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 VINK Creative Studio. Todos los derechos reservados.</p>
          <a href={`mailto:${site.contact.email}`} className="hover:text-cream">
            {site.contact.email}
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <h2 className="label text-rose">{title}</h2>
      <ul className="mt-5 space-y-1">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  const className =
    "inline-flex min-h-9 items-center text-sm text-cream/80 transition-colors hover:text-cream";
  return (
    <li>
      {external || href.startsWith("mailto:") ? (
        <a
          href={href}
          className={className}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      ) : (
        <Link href={href} className={className}>
          {children}
        </Link>
      )}
    </li>
  );
}
