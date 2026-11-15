import type { Metadata } from "next";
import Link from "next/link";
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
  title: numa.name,
  description: numa.metaDescription,
};

const PAGE = numa.href;

export default function NumaPage() {
  return (
    <div className="bg-ink text-cream">
      {/* Hero */}
      <section aria-label={numa.name} className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
        <MediaSlot id={numa.hero.media} fill priority className="-z-20" />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0)_35%,rgba(0,0,0,0)_55%,rgba(0,0,0,0.75)_100%)]"
        />
        <div className="container-vink flex flex-1 flex-col pb-6 pt-32 md:pb-8 md:pt-40">
          <Reveal className="max-w-md" delay={0.4}>
            <NumaLogo className="text-5xl md:text-6xl" />
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-numa">{numa.hero.eyebrow}</p>
            <p className="display mt-3 text-2xl leading-[1.05] md:text-[1.7rem]">{numa.hero.statement}</p>
            <p className="mt-3 text-sm text-cream/80 md:text-base">{numa.hero.sub}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <QuoteLink service="numa-real-estate" page={PAGE}>
                Cotizar mi propiedad
              </QuoteLink>
              <PillLink href="#services" variant="dark">
                Ver servicios
              </PillLink>
            </div>
          </Reveal>
          <div className="mt-auto pt-16">
            <h1 className="display text-mega">
              <MaskLines lines={["NUMA", <span key="r" className="text-numa">Real Estate</span>]} delay={0.1} />
            </h1>
            <div className="mt-6 flex items-center justify-between text-xs text-cream/75 md:text-sm">
              <Link href="/" className="hover:text-cream">
                {numa.endorsement}
              </Link>
              <a href="#why" className="hover:text-cream">
                (Scroll down)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why NUMA */}
      <section id="why" className="py-24 md:py-36">
        <div className="container-vink grid gap-6 lg:grid-cols-12">
          <p className="label text-numa lg:col-span-2 lg:pt-4">{numa.intro.label}</p>
          <div className="lg:col-span-10">
            <WordReveal
              lead={numa.intro.lead}
              text={numa.intro.rest}
              className="display text-headline"
              leadClassName="text-numa"
              wordClassName="text-cream"
            />
            <Reveal className="mt-10 grid gap-6 text-lg leading-relaxed text-cream/75 md:grid-cols-2">
              {numa.intro.text.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Segmentos: tarjetas interactivas */}
      <section className="bg-numa-surface py-24 md:py-36">
        <div className="container-vink">
          <Reveal>
            <p className="label text-numa">{numa.segments.label}</p>
            <h2 className="display mt-4 max-w-5xl text-giant">{numa.segments.title}</h2>
          </Reveal>
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {numa.segments.items.map((s, i) => (
              <li key={s.key}>
                <Reveal delay={i * 0.06}>
                  <article tabIndex={0} className="group relative overflow-hidden rounded-[1.75rem] bg-numa-deep focus-visible:outline-offset-4">
                    <div className="transition-transform duration-[900ms] ease-vink group-hover:scale-[1.06] group-focus-visible:scale-[1.06] motion-reduce:transition-none">
                      <MediaSlot id={s.media} quiet sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw" />
                    </div>
                    <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
                    <span className="absolute left-5 top-5 text-xs text-cream/80">(0{i + 1})</span>
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <h3 className="display text-3xl leading-[0.95]">{s.title}</h3>
                      <div className="grid grid-rows-[1fr] transition-[grid-template-rows,opacity] duration-500 ease-vink [@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-focus-visible:grid-rows-[1fr] [@media(hover:hover)]:group-focus-visible:opacity-100 [@media(hover:hover)]:group-hover:grid-rows-[1fr] [@media(hover:hover)]:group-hover:opacity-100">
                        <div className="overflow-hidden">
                          <p className="pt-3 text-sm leading-relaxed text-cream/85">{s.text}</p>
                          <ul className="mt-3 space-y-1 text-xs text-cream/70">
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
      <section className="py-24 md:py-36">
        <div className="container-vink">
          <Reveal>
            <p className="label text-numa">{numa.markets.label}</p>
            <h2 className="display mt-4 text-giant">{numa.markets.title}</h2>
          </Reveal>
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {numa.markets.items.map((m, i) => (
              <Reveal key={m.key} delay={i * 0.1}>
                <article className="group">
                  <div className="relative overflow-hidden rounded-[2rem]">
                    <div className="transition-transform duration-[1000ms] ease-vink group-hover:scale-[1.04] motion-reduce:transition-none">
                      <MediaSlot id={m.media} sizes="(min-width: 1024px) 50vw, 100vw" />
                    </div>
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cream/75">{m.region}</p>
                      <h3 className="display text-6xl md:text-7xl">{m.name}</h3>
                    </div>
                  </div>
                  <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/75">{m.text}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {m.tags.map((t) => (
                      <li key={t} className="rounded-full border border-cream/20 px-3.5 py-1.5 text-sm">
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
      <section id="services" className="bg-numa-surface py-24 md:py-36">
        <div className="container-vink">
          <Reveal>
            <p className="label text-numa">{numa.services.label}</p>
            <h2 className="display mt-4 text-giant">{numa.services.title}</h2>
          </Reveal>
          <div className="mt-12">
            <ServiceAccordion
              dark
              items={numa.services.items.map((s) => ({
                key: s.title,
                title: s.title,
                subtitle: s.subtitle,
                content: <p className="max-w-2xl text-base leading-relaxed text-cream/75 md:text-lg">{s.text}</p>,
              }))}
            />
          </div>
        </div>
      </section>

      {/* Showcase */}
      <section className="py-24 md:py-36">
        <div className="container-vink">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="label text-numa">{numa.showcase.label}</p>
              <h2 className="display mt-4 text-headline">{numa.showcase.title}</h2>
            </div>
            <p className="max-w-xs text-sm text-cream/65">Toca cualquier pieza para verla completa.</p>
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

      {/* Virtual staging */}
      <section className="bg-numa-surface py-24 md:py-36">
        <div className="container-vink grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="label text-numa">{numa.staging.label}</p>
            <h2 className="display mt-4 text-headline">{numa.staging.title}</h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-cream/75">{numa.staging.text}</p>
            <p className="mt-4 text-sm text-cream/60">Desliza para comparar · también con las flechas del teclado.</p>
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
            <BeforeAfterSlider
              before={<MediaSlot id="numa.staging.before" sizes="(min-width: 1024px) 45vw, 100vw" />}
              after={<MediaSlot id="numa.staging.after" sizes="(min-width: 1024px) 45vw, 100vw" quiet />}
              beforeLabel={numa.staging.before}
              afterLabel={numa.staging.after}
            />
          </Reveal>
        </div>
      </section>

      {/* Página de propiedad */}
      <section className="py-24 md:py-36">
        <div className="container-vink">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="label text-numa">{numa.listing.label}</p>
            <h2 className="display mt-4 text-headline">{numa.listing.title}</h2>
            <p className="mt-5 text-lg text-cream/75">{numa.listing.text}</p>
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
      <section className="bg-numa-surface py-24 md:py-36">
        <div className="container-vink">
          <Reveal>
            <h2 className="display text-headline">{numa.process.title}</h2>
          </Reveal>
          <ol className="mt-12 grid gap-3 md:grid-cols-5">
            {numa.process.steps.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={i * 0.06} className="flex h-full flex-col rounded-[1.5rem] border border-cream/15 p-6">
                  <span className="display text-5xl text-numa">0{i + 1}</span>
                  <span className="display mt-8 text-2xl leading-none">{s.title}</span>
                  <span className="mt-3 text-sm leading-relaxed text-cream/70">{s.text}</span>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Contacto NUMA */}
      <section id="contact" className="bg-numa-deep py-24 md:py-32">
        <div className="container-vink grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="label text-cream/70">{numa.contact.label}</p>
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
                      <span className="block text-xs uppercase tracking-[0.16em] text-cream/70">WhatsApp · {w.name}</span>
                      <span className="mt-0.5 block text-sm">{w.display}</span>
                    </span>
                    <ArrowDot variant="burgundy" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-cream/60">
              {numa.endorsement} ·{" "}
              <Link href="/" className="underline underline-offset-4 hover:text-cream">
                Conoce VINK
              </Link>
            </p>
          </div>
          <div className="lg:col-span-7">
            <ContactForm defaultService="numa-real-estate" />
          </div>
        </div>
      </section>
    </div>
  );
}
