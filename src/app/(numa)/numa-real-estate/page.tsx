import type { Metadata } from "next";
import { NumaLogo } from "@/components/brand/NumaLogo";
import { ContactForm } from "@/components/contact/ContactForm";
import { QuoteLink } from "@/components/contact/QuoteLink";
import { ServiceAccordion } from "@/components/interactive/ServiceAccordion";
import { MediaSlot } from "@/components/media/MediaSlot";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowDot, PillLink } from "@/components/ui/Button";
import { numa } from "@/content/numa";
import { site, whatsappUrl } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: `${numa.name} — Property marketing en Los Cabos y Guadalajara` },
  description: numa.metaDescription,
};

const PAGE = numa.href;

/*
 * Landing compacta de NUMA: blanco y negro, con el verde solo en detalles.
 * Inicio con imagen de fondo en tonos rojos y el logo encima.
 */
export default function NumaPage() {
  return (
    <>
      {/* Inicio: imagen roja de fondo + logo */}
      <section aria-label={numa.name} className="relative isolate overflow-hidden text-white">
        <MediaSlot id={numa.hero.media} fill priority className="-z-20" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
        <div className="container-vink flex min-h-[78svh] flex-col justify-end pb-12 pt-24 md:pb-16">
          <Reveal className="max-w-xl">
            <h1>
              <span className="sr-only">{numa.name}</span>
              <NumaLogo variant="white" className="h-12 md:h-16" />
            </h1>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">{numa.hero.eyebrow}</p>
            <p className="display mt-3 text-title">{numa.hero.statement}</p>
            <p className="mt-3 text-base leading-relaxed text-white/85 md:text-lg">{numa.hero.sub}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <QuoteLink service="numa-real-estate" page={PAGE} variant="numaLight">
                Cotizar mi propiedad
              </QuoteLink>
              <PillLink href="#services" variant="numaOutline">
                Ver servicios
              </PillLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Para quién */}
      <section id="segments" className="scroll-mt-24 py-20 md:py-28">
        <div className="container-vink">
          <Reveal>
            <p className="label text-numa">{numa.segments.label}</p>
            <h2 className="display mt-4 max-w-4xl text-headline">{numa.segments.title}</h2>
          </Reveal>
          <ul className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-5">
            {numa.segments.items.map((s, i) => (
              <li key={s.key}>
                <Reveal delay={i * 0.05}>
                  <article
                    tabIndex={0}
                    className="group relative overflow-hidden rounded-xl bg-charcoal text-white focus-visible:outline-offset-4 focus-visible:outline-charcoal"
                  >
                    <div className="transition-transform duration-[900ms] ease-vink group-hover:scale-[1.06] group-focus-visible:scale-[1.06] motion-reduce:transition-none">
                      <MediaSlot id={s.media} quiet sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw" />
                    </div>
                    <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-numa-deep/85 via-numa-deep/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5">
                      <h3 className="display text-lg leading-[0.95] sm:text-2xl xl:text-3xl">{s.title}</h3>
                      <div className="grid grid-rows-[1fr] transition-[grid-template-rows,opacity] duration-500 ease-vink [@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-focus-visible:grid-rows-[1fr] [@media(hover:hover)]:group-focus-visible:opacity-100 [@media(hover:hover)]:group-hover:grid-rows-[1fr] [@media(hover:hover)]:group-hover:opacity-100">
                        <div className="overflow-hidden">
                          <p className="pt-2 text-sm leading-relaxed text-white/85">{s.text}</p>
                        </div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Servicios */}
      <section id="services" className="scroll-mt-24 border-t border-charcoal/10 py-20 md:py-28">
        <div className="container-vink grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="label text-numa">{numa.services.label}</p>
            <h2 className="display mt-4 text-headline">{numa.services.title}</h2>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-charcoal/65">{numa.promise}</p>
          </Reveal>
          <div className="lg:col-span-8">
            <ServiceAccordion
              items={numa.services.items.map((s) => ({
                key: s.title,
                title: s.title,
                subtitle: s.subtitle,
                content: <p className="max-w-2xl text-base leading-relaxed text-charcoal/70">{s.text}</p>,
              }))}
            />
          </div>
        </div>
      </section>

      {/* Mercados */}
      <section id="markets" className="scroll-mt-24 border-t border-charcoal/10 py-20 md:py-28">
        <div className="container-vink">
          <Reveal>
            <p className="label text-numa">{numa.markets.label}</p>
            <h2 className="display mt-4 text-headline">{numa.markets.title}</h2>
          </Reveal>
          <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-5">
            {numa.markets.items.map((m, i) => (
              <Reveal key={m.key} delay={i * 0.08}>
                <article className="group">
                  <div className="relative overflow-hidden rounded-2xl">
                    <div className="transition-transform duration-[1000ms] ease-vink group-hover:scale-[1.04] motion-reduce:transition-none">
                      <MediaSlot id={m.media} sizes="(min-width: 768px) 50vw, 100vw" />
                    </div>
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">{m.region}</p>
                      <h3 className="display text-5xl md:text-6xl">{m.name}</h3>
                    </div>
                  </div>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-charcoal/70">{m.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contact" className="scroll-mt-20 bg-numa-deep py-20 text-numa-light md:py-28">
        <div className="container-vink grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="label text-numa-light/60">{numa.contact.label}</p>
            <h2 className="display mt-4 text-headline">
              {numa.contact.title[0]} <span className="text-cream/50">{numa.contact.title[1]}</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-cream/80">{numa.contact.text}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {site.contact.whatsapp.map((w) => (
                <li key={w.number}>
                  <a
                    href={whatsappUrl(w.number, `Hola ${w.name}, quiero promocionar una propiedad con NUMA Real Estate.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-cream/20 px-4 py-3 transition-colors hover:border-cream/60 hover:bg-white/5"
                  >
                    <span>
                      <span className="block text-xs uppercase tracking-[0.16em] text-cream/65">WhatsApp · {w.name}</span>
                      <span className="mt-0.5 block text-sm">{w.display}</span>
                    </span>
                    <ArrowDot variant="numa" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <ContactForm defaultService="numa-real-estate" brand="numa" />
          </div>
        </div>
      </section>
    </>
  );
}
