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
    { label: "Instagram", href: site.contact.instagram },
    { label: "WhatsApp", href: whatsappUrl() },
    { label: "Email", href: `mailto:${site.contact.email}` },
  ].filter((l): l is { label: string; href: string } => Boolean(l.href));

  return (
    <footer className="bg-burgundy text-cream">
      <div className="container-vink pb-10 pt-20 md:pt-28">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" aria-label="VINK Creative Studio — inicio" className="inline-block">
              <Logo className="h-12 md:h-16" />
            </Link>
            <p className="eyebrow mt-6 text-rose">Think with Vink.</p>
            <p className="mt-6 max-w-sm font-serif text-2xl leading-snug text-cream/90">
              Ideas humanas. <em>Posibilidades extraordinarias.</em>
            </p>
          </div>

          <FooterColumn title="Explore" className="md:col-span-2">
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

        <div className="mt-20 flex flex-col gap-3 border-t border-cream/15 pt-6 text-xs text-cream/70 sm:flex-row sm:items-center sm:justify-between">
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
      <h2 className="eyebrow text-rose">{title}</h2>
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
    "inline-flex min-h-9 items-center text-sm text-cream/85 transition-colors hover:text-cream";
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
