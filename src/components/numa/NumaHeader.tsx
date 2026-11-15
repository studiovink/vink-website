import Link from "next/link";
import { NumaLogo } from "@/components/brand/NumaLogo";
import { QuoteLink } from "@/components/contact/QuoteLink";

const links = [
  { label: "Para quién", href: "#segments" },
  { label: "Mercados", href: "#markets" },
  { label: "Servicios", href: "#services" },
  { label: "Proceso", href: "#process" },
];

/** Header de la landing de NUMA (blanco, independiente del de VINK). */
export function NumaHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-charcoal/10 bg-white/85 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-numa-deep focus:px-4 focus:py-2 focus:text-numa-light"
      >
        Saltar al contenido
      </a>
      <div className="container-vink flex h-16 items-center justify-between gap-6 md:h-20">
        <div className="flex items-center gap-4">
          <Link href="/numa-real-estate" aria-label="NUMA Real Estate — inicio">
            <NumaLogo variant="black" className="h-6 md:h-7" />
          </Link>
          <Link
            href="/"
            className="hidden border-l border-charcoal/15 pl-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-charcoal/60 transition-colors hover:text-charcoal sm:block"
          >
            by VINK
          </Link>
        </div>
        <nav aria-label="NUMA" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="inline-flex min-h-10 items-center rounded-full px-4 text-[13px] font-medium uppercase tracking-wide text-charcoal/75 transition-colors hover:bg-numa-light hover:text-charcoal"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <QuoteLink service="numa-real-estate" page="/numa-real-estate" variant="numa" className="min-h-10 py-1 pl-4 text-xs">
          Cotizar
        </QuoteLink>
      </div>
    </header>
  );
}
