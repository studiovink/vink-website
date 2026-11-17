import type { Metadata } from "next";
import { NumaLogo } from "@/components/brand/NumaLogo";
import { ContactForm } from "@/components/contact/ContactForm";
import { FocusCarousel } from "@/components/interactive/FocusCarousel";
import { ServiceAccordion } from "@/components/interactive/ServiceAccordion";
import { MediaSlot } from "@/components/media/MediaSlot";
import { ParallaxMedia } from "@/components/motion/ParallaxMedia";
import { MaskLines, Reveal } from "@/components/motion/Reveal";
import { ExpandingFrame } from "@/components/numa/ExpandingFrame";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { numa } from "@/content/numa";
import { site, whatsappUrl } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: `${numa.name} — Property marketing en Los Cabos y Guadalajara` },
  description: numa.metaDescription,
};

/*
 * Landing de NUMA, estilo editorial blanco y negro con el verde como detalle.
 * Inicio a pantalla completa: la foto se expande desde un encuadre (ExpandingFrame);
 * carrusel con foco central.
 */
export default function NumaPage() {
  const [hotels, , sale, land] = numa.segments.items;

  return (
    <>
      {/* Inicio */}
      <section aria-label={numa.name} className="relative isolate overflow-hidden bg-charcoal text-white">
        <ExpandingFrame>
          <MediaSlot id={numa.hero.media} fill priority />
        </ExpandingFrame>
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/60 via-black/10 to-black/30" />
        <div className="container-vink grid min-h-[100svh] grid-rows-[1fr_auto] pb-8 pt-28 md:pb-12">
          <div className="flex flex-col justify-center gap-10 md:flex-row md:items-end md:justify-between">
            <h1>
              <span className="sr-only">{numa.name}</span>
              <Reveal y={40}>
                <NumaLogo variant="white" className="h-14 md:h-20" />
              </Reveal>
              <span aria-hidden className="display mt-3 block text-2xl uppercase md:text-4xl">
                <MaskLines lines={["Real Estate."]} delay={0.2} />
              </span>
            </h1>
            <Reveal delay={0.3} className="text-[12px] font-medium uppercase tracking-[0.06em] text-white/80">
              Los Cabos <span className="mx-2 text-white/40">{"//"}</span> Guadalajara
            </Reveal>
          </div>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal delay={0.4} className="max-w-sm text-sm leading-relaxed text-white/85">
              {numa.hero.sub}
            </Reveal>
            <Reveal delay={0.5}>
              <a href="#selected" className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.06em] hover:opacity-80">
                Ver segmentos <span aria-hidden>↓</span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* About us */}
      <section id="about" className="scroll-mt-20 bg-numa-soft py-24 md:py-32">
        <div className="container-vink grid gap-12 lg:grid-cols-12">
          <div className="grid grid-cols-3 gap-2 lg:col-span-4 lg:grid-cols-1">
            {[hotels, sale, land].map((s, i) => (
              <Reveal key={s.key} delay={i * 0.08} className="overflow-hidden">
                <ParallaxMedia fill distance={12} className="relative aspect-[4/3]">
                  <MediaSlot id={s.media} fill quiet sizes="(min-width: 1024px) 30vw, 33vw" />
                </ParallaxMedia>
              </Reveal>
            ))}
          </div>
          <div className="flex flex-col justify-end lg:col-span-7 lg:col-start-6">
            <p className="label text-numa">{numa.about.label}</p>
            <Reveal>
              <p className="display mt-6 text-headline">{numa.about.statement}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-charcoal/65">{numa.about.text}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Segmentos: carrusel con foco central */}
      <section id="selected" className="scroll-mt-20 bg-charcoal py-24 text-white md:py-32">
        <div className="container-vink">
          <SectionLabel index={1} dotClass="bg-numa text-white">{numa.segments.label}</SectionLabel>
          <Reveal>
            <h2 className="display mt-8 max-w-4xl text-headline">{numa.segments.title}</h2>
          </Reveal>
        </div>
        <div className="mt-16">
          <FocusCarousel
            items={numa.segments.items.map((s) => ({
              key: s.key,
              title: s.title,
              text: s.text,
              media: <MediaSlot id={s.media} fill quiet sizes="(min-width: 768px) 30rem, 62vw" />,
            }))}
          />
        </div>
      </section>

      {/* Servicios */}
      <section id="services" className="scroll-mt-20 bg-white py-24 md:py-32">
        <div className="container-vink">
          <SectionLabel index={2} tone="light" dotClass="bg-numa text-white">
            {numa.services.label}
          </SectionLabel>
          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <h2 className="display text-headline">{numa.services.title}</h2>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-charcoal/60">{numa.promise}</p>
            </Reveal>
            <div className="lg:col-span-8">
              <ServiceAccordion
                items={numa.services.items.map((s) => ({
                  key: s.title,
                  title: s.title,
                  subtitle: s.subtitle,
                  content: <p className="max-w-2xl text-base leading-relaxed text-charcoal/65">{s.text}</p>,
                }))}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mercados */}
      <section id="markets" className="scroll-mt-20 bg-numa-soft py-24 md:py-32">
        <div className="container-vink">
          <SectionLabel index={3} tone="light" dotClass="bg-numa text-white">
            {numa.markets.label}
          </SectionLabel>
          <Reveal>
            <h2 className="display mt-10 text-headline">{numa.markets.title}</h2>
          </Reveal>
          <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-4">
            {numa.markets.items.map((m, i) => (
              <Reveal key={m.key} delay={i * 0.08}>
                <article className="group">
                  <div className="overflow-hidden">
                    <div className="transition-transform duration-[1200ms] ease-vink group-hover:scale-[1.03] motion-reduce:transition-none">
                      <ParallaxMedia distance={20}>
                        <MediaSlot id={m.media} sizes="(min-width: 768px) 50vw, 100vw" />
                      </ParallaxMedia>
                    </div>
                  </div>
                  <div className="mt-5 flex items-baseline justify-between gap-4">
                    <h3 className="display text-3xl uppercase">{m.name}</h3>
                    <p className="text-[11px] uppercase tracking-[0.06em] text-charcoal/50">{m.region}</p>
                  </div>
                  <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-charcoal/65">{m.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contact" className="scroll-mt-20 bg-charcoal py-24 text-white md:py-32">
        <div className="container-vink grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel index={4} dotClass="bg-numa text-white">{numa.contact.label}</SectionLabel>
            <Reveal>
              <h2 className="display mt-10 text-giant">Let&apos;s work together.</h2>
            </Reveal>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/70">{numa.contact.text}</p>
            <ul className="mt-10 space-y-3 border-t border-white/15 pt-6 text-sm">
              {site.contact.whatsapp.map((w) => (
                <li key={w.number} className="flex justify-between gap-4">
                  <span className="uppercase tracking-[0.04em] text-white/55">WhatsApp · {w.name}</span>
                  <a
                    href={whatsappUrl(w.number, `Hola ${w.name}, quiero promocionar una propiedad con NUMA Real Estate.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-numa-light"
                  >
                    {w.display} ↗
                  </a>
                </li>
              ))}
              <li className="flex justify-between gap-4">
                <span className="uppercase tracking-[0.04em] text-white/55">Email</span>
                <a href={`mailto:${site.contact.email}`} className="hover:text-numa-light">
                  {site.contact.email}
                </a>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-12">
            <ContactForm defaultService="numa-real-estate" brand="numa" />
          </div>
        </div>
      </section>
    </>
  );
}
