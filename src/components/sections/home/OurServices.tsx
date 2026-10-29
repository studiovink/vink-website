import Link from "next/link";
import { MediaSlot } from "@/components/media/MediaSlot";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowDot } from "@/components/ui/Button";
import { services } from "@/content/home";
import { specialtiesDetail } from "@/content/services";
import { serviceHref } from "@/content/site";

/**
 * 05 — Our Services: cuatro tarjetas interactivas.
 * Con cursor: la imagen se acerca y la descripción sube al pasar o enfocar.
 * En pantallas táctiles la descripción está siempre visible.
 */
export function OurServices() {
  return (
    <section id="services" className="bg-cream py-24 md:py-36">
      <div className="container-vink">
        <Reveal>
          <p className="label text-charcoal">{services.label}</p>
          <div className="mt-3 flex flex-wrap items-end gap-x-6 gap-y-3">
            <h2 className="display text-giant text-charcoal">{services.title}</h2>
            <p className="max-w-[16rem] pb-3 text-sm text-charcoal-soft">{services.aside}</p>
          </div>
        </Reveal>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {specialtiesDetail.map((s, i) => (
            <li key={s.slug}>
              <Reveal delay={i * 0.08}>
                <Link
                  href={serviceHref(s.slug)}
                  className="group relative block overflow-hidden rounded-[1.75rem] bg-burgundy text-cream focus-visible:outline-offset-4"
                >
                  <div className="transition-transform duration-[900ms] ease-vink group-hover:scale-[1.06] group-focus-visible:scale-[1.06] motion-reduce:transition-none">
                    <MediaSlot id={s.image} videoMode="preview" quiet sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
                  </div>
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/10"
                  />

                  <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
                    <span className="text-xs text-cream/80">(0{i + 1})</span>
                    <span className="rounded-full bg-cream/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider backdrop-blur">
                      {s.engagement}
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rose">VINK</p>
                    <h3 className="display mt-1 text-4xl leading-[0.9] xl:text-5xl">{s.short}</h3>
                    <div className="grid transition-[grid-template-rows,opacity] duration-500 ease-vink [@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:grid-rows-[1fr] [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:grid-rows-[1fr] [@media(hover:hover)]:group-focus-visible:opacity-100 grid-rows-[1fr]">
                      <div className="overflow-hidden">
                        <p className="pt-3 text-sm leading-relaxed text-cream/85">{s.tagline}</p>
                        <p className="mt-2 text-xs text-cream/70">{s.offerings.slice(0, 3).join(" · ")}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm font-medium">Explorar</span>
                      <ArrowDot variant="dark" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-charcoal/15 pt-8 md:flex-row md:items-center">
          <p className="display text-2xl text-charcoal md:text-3xl">
            Cada marca es diferente. <span className="text-burgundy">Nuestra forma de trabajar también.</span>
          </p>
          <p className="max-w-md text-sm text-charcoal-soft">
            Contrata un servicio específico, el servicio mensual de redes o un proyecto completamente personalizado.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
