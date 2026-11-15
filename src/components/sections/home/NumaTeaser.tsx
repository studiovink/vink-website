import Link from "next/link";
import { NumaLogo } from "@/components/brand/NumaLogo";
import { MediaSlot } from "@/components/media/MediaSlot";
import { Reveal } from "@/components/motion/Reveal";
import { PillLink } from "@/components/ui/Button";
import { numa } from "@/content/numa";

/** Presentación de la submarca NUMA Real Estate dentro de la página principal. */
export function NumaTeaser() {
  return (
    <section id="numa" className="bg-ink-2 py-24 md:py-36">
      <div className="container-vink">
        <Reveal className="flex flex-wrap items-baseline justify-between gap-3 border-b border-cream/15 pb-5">
          <p className="label text-rose">Sub-brand</p>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cream/65">{numa.hero.eyebrow}</p>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-5">
            <p className="display text-3xl text-cream/60">VINK presenta</p>
            <NumaLogo className="mt-4 text-7xl md:text-8xl" />
            <p className="display mt-8 text-title">{numa.hero.statement}</p>
            <p className="mt-5 text-lg leading-relaxed text-cream/75">{numa.hero.sub}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {numa.segments.items.map((s) => (
                <li key={s.key} className="rounded-full border border-cream/20 px-3.5 py-1.5 text-sm">
                  {s.title}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-cream/60">
              {numa.markets.items.map((m) => m.name).join(" · ")}
            </p>
            <div className="mt-8">
              <PillLink href={numa.href} variant="burgundy">
                Conocer NUMA Real Estate
              </PillLink>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.1}>
            <Link href={numa.href} className="group block overflow-hidden rounded-[2rem]" aria-label="Ir a NUMA Real Estate">
              <div className="transition-transform duration-[1000ms] ease-vink group-hover:scale-[1.03] motion-reduce:transition-none">
                <div className="relative aspect-video">
                  <MediaSlot id={numa.hero.media} fill videoMode="preview" sizes="(min-width: 1024px) 58vw, 100vw" />
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
