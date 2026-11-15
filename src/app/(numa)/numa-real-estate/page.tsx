import type { Metadata } from "next";
import { NumaLogo } from "@/components/brand/NumaLogo";
import { ContactForm } from "@/components/contact/ContactForm";
import { QuoteLink } from "@/components/contact/QuoteLink";
import { BeforeAfterSlider } from "@/components/interactive/BeforeAfterSlider";
import { DeviceToggle } from "@/components/interactive/DeviceToggle";
import { LightboxGallery } from "@/components/interactive/Lightbox";
import { ServiceAccordion } from "@/components/interactive/ServiceAccordion";
import { MediaSlot } from "@/components/media/MediaSlot";
import { MaskLines, Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { ArrowDot, PillLink } from "@/components/ui/Button";
import { numa } from "@/content/numa";
import { site, whatsappUrl } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: `${numa.name} — Property marketing en Los Cabos y Guadalajara` },
  description: numa.metaDescription,
};

const PAGE = numa.href;

/** Overlay verde del manual de NUMA: Vintage Green en multiply sobre fotografía. */
function GreenOverlay() {
  return <div aria-hidden className="pointer-events-none absolute inset-0 bg-numa/45 mix-blend-multiply" />;
}

export default function NumaPage() {
  return (
    <>
      {/* Hero blanco */}
      <section aria-label={numa.name} className="pb-16 pt-10 md:pb-24 md:pt-16">
        <div className="container-vink">
          <Reveal className="flex flex-wrap items-baseline justify-between gap-3 border-b border-charcoal/10 pb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-numa">{numa.hero.eyebrow}</p>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/50">Los Cabos · Guadalajara</p>
          </Reveal>

          <h1 className="mt-10 md:mt-14">
            <span className="sr-only">{numa.name}</span>
            <Reveal y={50}>
              <NumaLogo variant="black" className="h-auto w-full" />
            </Reveal>
            <span aria-hidden className="display mt-3 block text-right text-title tracking-[0.4em] text-numa md:mt-5">
              <MaskLines lines={["Real Estate"]} delay={0.2} />
            </span>
          </h1>

          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-5">
              <p className="display text-title">{numa.hero.statement}</p>
              <p className="mt-4 text-lg leading-relaxed text-charcoal/70">{numa.hero.sub}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <QuoteLink service="numa-real-estate" page={PAGE} variant="numa">
                  Cotizar mi propiedad
                </QuoteLink>
                <PillLink href="#services" variant="numaOutline">
                  Ver servicios
                </PillLink>
              </div>
            </Reveal>
            <Reveal className="lg:col-span-7" delay={0.1}>
              <div className="relative aspect-video overflow-hidden rounded-[2rem]">
                <MediaSlot id={numa.hero.media} fill priority sizes="(min-width: 1024px) 58vw, 100vw" />
                <GreenOverlay />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why NUMA */}
      <section id="why" className="bg-numa-light py-24 md:py-36">
        <div className="container-vink grid gap-6 lg:grid-cols-12">
          <p className="label text-numa lg:col-span-2 lg:pt-4">{numa.intro.label}</p>
          <div className="lg:col-span-10">
            <WordReveal
              lead={numa.intro.lead}
              text={numa.intro.rest}
              className="display text-headline"
              leadClassName="text-numa"
              wordClassName="text-charcoal"
            />
            <Reveal className="mt-10 grid gap-6 text-lg leading-relaxed text-charcoal/70 md:grid-cols-2">
              {numa.intro.text.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Tarjeta de autoridad (manual: fondo Bluebird Morning, mensaje corto) */}
      <section aria-label="Postura de NUMA" className="bg-numa-sky py-20 md:py-28">
        <Reveal className="container-vink text-center">
          <p className="display text-giant text-numa-deep">
            {numa.authority[0]} <br className="hidden md:block" />
            {numa.authority[1]}
          </p>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-numa-deep/70">Así de simple.</p>
        </Reveal>
      </section>

      {/* Segmentos */}
      <section id="segments" className="scroll-mt-24 py-24 md:py-36">
        <div className="container-vink">
          <Reveal>
            <p className="label text-numa">{numa.segments.label}</p>
            <h2 className="display mt-4 max-w-5xl text-giant">{numa.segments.title}</h2>
          </Reveal>
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {numa.segments.items.map((s, i) => (
              <li key={s.key}>
                <Reveal delay={i * 0.06}>
                  <article
                    tabIndex={0}
                    className="group relative overflow-hidden rounded-[1.75rem] bg-numa text-white focus-visible:outline-offset-4 focus-visible:outline-numa-deep"
                  >
                    <div className="transition-transform duration-[900ms] ease-vink group-hover:scale-[1.06] group-focus-visible:scale-[1.06] motion-reduce:transition-none">
                      <MediaSlot id={s.media} quiet sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw" />
                    </div>
                    <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-numa-deep/90 via-numa-deep/20 to-transparent" />
                    <span className="absolute left-5 top-5 text-xs text-white/80">(0{i + 1})</span>
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <h3 className="display text-3xl leading-[0.95]">{s.title}</h3>
                      <div className="grid grid-rows-[1fr] transition-[grid-template-rows,opacity] duration-500 ease-vink [@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-focus-visible:grid-rows-[1fr] [@media(hover:hover)]:group-focus-visible:opacity-100 [@media(hover:hover)]:group-hover:grid-rows-[1fr] [@media(hover:hover)]:group-hover:opacity-100">
                        <div className="overflow-hidden">
                          <p className="pt-3 text-sm leading-relaxed text-white/90">{s.text}</p>
                          <ul className="mt-3 space-y-1 text-xs text-white/75">
                            {s.produce.map((p) => (
                              <li key={p}>— {p}</li>
                            ))}
                          </ul>
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

      {/* Mercados */}
      <section id="markets" className="scroll-mt-24 bg-numa-light py-24 md:py-36">
        <div className="container-vink">
          <Reveal>
            <p className="label text-numa">{numa.markets.label}</p>
            <h2 className="display mt-4 text-giant">{numa.markets.title}</h2>
          </Reveal>
          <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-6">
            {numa.markets.items.map((m, i) => (
              <Reveal key={m.key} delay={i * 0.1}>
                <article className="group">
                  <div className="relative overflow-hidden rounded-[2rem]">
                    <div className="transition-transform duration-[1000ms] ease-vink group-hover:scale-[1.04] motion-reduce:transition-none">
                      <MediaSlot id={m.media} sizes="(min-width: 1024px) 50vw, 100vw" />
                    </div>
                    <GreenOverlay />
                    <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">{m.region}</p>
                      <h3 className="display text-6xl md:text-7xl">{m.name}</h3>
                    </div>
                  </div>
                  <p className="mt-6 max-w-xl text-lg leading-relaxed text-charcoal/70">{m.text}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {m.tags.map((t) => (
                      <li key={t} className="rounded-full border border-numa/40 px-3.5 py-1.5 text-sm text-numa-deep">
                        {t}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="services" className="scroll-mt-24 py-24 md:py-36">
        <div className="container-vink">
          <Reveal>
            <p className="label text-numa">{numa.services.label}</p>
            <h2 className="display mt-4 text-giant">{numa.services.title}</h2>
          </Reveal>
          <div className="mt-12">
            <ServiceAccordion
              items={numa.services.items.map((s) => ({
                key: s.title,
                title: s.title,
                subtitle: s.subtitle,
                content: <p className="max-w-2xl text-base leading-relaxed text-charcoal/70 md:text-lg">{s.text}</p>,
              }))}
            />
          </div>
        </div>
      </section>

      {/* Showcase */}
      <section className="bg-numa-light py-24 md:py-36">
        <div className="container-vink">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="label text-numa">{numa.showcase.label}</p>
              <h2 className="display mt-4 text-headline">{numa.showcase.title}</h2>
            </div>
            <p className="max-w-xs text-sm text-charcoal/60">Toca cualquier pieza para verla completa.</p>
          </Reveal>
          <Reveal className="mt-10" delay={0.08}>
            <LightboxGallery
              className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4"
              items={numa.showcase.items.map((it) => ({
                key: it.id,
                label: it.label,
                className: it.className,
                thumb: <MediaSlot id={it.id} videoMode="preview" quiet sizes="(min-width: 768px) 33vw, 50vw" />,
                full: <MediaSlot id={it.id} sizes="28rem" />,
              }))}
            />
          </Reveal>
        </div>
      </section>

      {/* Ambientación digital */}
      <section className="py-24 md:py-36">
        <div className="container-vink grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="label text-numa">{numa.staging.label}</p>
            <h2 className="display mt-4 text-headline">{numa.staging.title}</h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-charcoal/70">{numa.staging.text}</p>
            <p className="mt-4 text-sm text-charcoal/55">Desliza para comparar · también con las flechas del teclado.</p>
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
            <BeforeAfterSlider
              before={<MediaSlot id="numa.staging.before" sizes="(min-width: 1024px) 45vw, 100vw" />}
              after={<MediaSlot id="numa.staging.after" sizes="(min-width: 1024px) 45vw, 100vw" quiet />}
              beforeLabel={numa.staging.before}
              afterLabel={numa.staging.after}
              afterLabelClass="bg-numa-deep text-numa-light"
            />
          </Reveal>
        </div>
      </section>

      {/* Página de propiedad (bloque Fresh-Cut) */}
      <section className="bg-numa-deep py-24 text-numa-light md:py-36">
        <div className="container-vink">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="label text-numa-sky">{numa.listing.label}</p>
            <h2 className="display mt-4 text-headline">{numa.listing.title}</h2>
            <p className="mt-5 text-lg text-numa-light/80">{numa.listing.text}</p>
          </Reveal>
          <Reveal className="mt-10" delay={0.1}>
            <DeviceToggle
              desktop={<MediaSlot id="numa.listing.desktop" sizes="(min-width: 1024px) 64rem, 100vw" />}
              mobile={<MediaSlot id="numa.listing.mobile" sizes="20rem" quiet />}
            />
          </Reveal>
        </div>
      </section>

      {/* Proceso */}
      <section id="process" className="scroll-mt-24 py-24 md:py-36">
        <div className="container-vink">
          <Reveal>
            <h2 className="display text-headline">{numa.process.title}</h2>
          </Reveal>
          <ol className="mt-12 grid gap-3 md:grid-cols-5">
            {numa.process.steps.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={i * 0.06} className="flex h-full flex-col rounded-[1.5rem] border border-charcoal/12 p-6">
                  <span className="display text-5xl text-numa">0{i + 1}</span>
                  <span className="display mt-8 text-2xl leading-none">{s.title}</span>
                  <span className="mt-3 text-sm leading-relaxed text-charcoal/65">{s.text}</span>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Contacto (Vintage Green, color dominante de NUMA) */}
      <section id="contact" className="scroll-mt-20 bg-numa py-24 text-white md:py-32">
        <div className="container-vink grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <NumaLogo variant="white" className="h-12 md:h-14" />
            <p className="label mt-10 text-white/80">{numa.contact.label}</p>
            <h2 className="display mt-4 text-headline">
              {numa.contact.title[0]} <span className="text-numa-deep">{numa.contact.title[1]}</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/90">{numa.contact.text}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {site.contact.whatsapp.map((w) => (
                <li key={w.number}>
                  <a
                    href={whatsappUrl(w.number, `Hola ${w.name}, quiero promocionar una propiedad con NUMA Real Estate.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-white/30 px-4 py-3 transition-colors hover:border-white hover:bg-white/10"
                  >
                    <span>
                      <span className="block text-xs uppercase tracking-[0.16em] text-white/80">WhatsApp · {w.name}</span>
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
