import Link from "next/link";
import { NumaLogo } from "@/components/brand/NumaLogo";
import { numa } from "@/content/numa";
import { legalNav, site, whatsappUrl } from "@/content/site";

/** Footer de la landing de NUMA. */
export function NumaFooter() {
  return (
    <footer className="border-t border-charcoal/10 bg-white text-charcoal">
      <div className="container-vink grid gap-10 py-14 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <NumaLogo variant="black" className="h-12 md:h-14" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-charcoal/70">{numa.promise}</p>
          <Link href="/" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-numa hover:text-numa-deep">
            {numa.endorsement} →
          </Link>
        </div>
        <div className="md:col-span-3 md:col-start-7">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-charcoal/50">Contacto</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {site.contact.whatsapp.map((w) => (
              <li key={w.number}>
                <a
                  href={whatsappUrl(w.number, `Hola ${w.name}, quiero información de NUMA Real Estate.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-numa"
                >
                  WhatsApp · {w.name}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${site.contact.email}`} className="hover:text-numa">
                {site.contact.email}
              </a>
            </li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-charcoal/50">Legal</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-numa">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container-vink flex flex-col gap-2 border-t border-charcoal/10 py-6 text-xs text-charcoal/50 sm:flex-row sm:justify-between">
        <p>© 2026 NUMA Real Estate · VINK Creative Studio.</p>
        <p>Los Cabos · Guadalajara</p>
      </div>
    </footer>
  );
}
