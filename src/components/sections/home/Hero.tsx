import Link from "next/link";
import { LiveClock } from "@/components/interactive/LiveClock";
import { MediaSlot } from "@/components/media/MediaSlot";
import { MaskLines, Reveal } from "@/components/motion/Reveal";
import { hero } from "@/content/home";
import { serviceHref, specialties } from "@/content/site";

/**
 * Inicio editorial: foto/video a pantalla completa con tinte vino que se
 * funde en negro, "VINK®" y "STUDIO" escalonados, servicios y hora local.
 */
export function Hero() {
  return (
    <section aria-label="VINK Creative Studio" className="relative isolate overflow-hidden bg-ink text-cream">
      <MediaSlot id="hero.video" fill priority className="-z-30" />
      {/* Tinte vino sobre la imagen */}
      <div aria-hidden className="absolute inset-0 -z-20 bg-burgundy/60 mix-blend-multiply" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-black/30 via-transparent via-55% to-ink" />

      <div className="container-vink flex min-h-[100svh] flex-col pb-10 pt-32 md:pb-14 md:pt-40">
        <h1 className="display uppercase leading-[0.82]">
          <span className="sr-only">{hero.title}</span>
          <span aria-hidden className="block text-mega">
            <MaskLines
              lines={[
                <span key="v">
                  VINK<span className="ml-1 align-super text-[0.3em]">®</span>
                </span>,
              ]}
              delay={0.1}
            />
          </span>
          <span aria-hidden className="mt-2 block text-right text-mega md:-mt-2">
            <MaskLines lines={["Studio"]} delay={0.25} />
          </span>
        </h1>

        <div className="mt-auto grid gap-10 pt-14 md:grid-cols-2 md:items-end">
          <Reveal delay={0.5}>
            <p className="max-w-sm text-sm text-cream/75">{hero.statement}</p>
            <ul className="display mt-5 text-2xl uppercase leading-[1.05] md:text-[2rem]">
              {specialties.map((s) => (
                <li key={s.slug}>
                  <Link href={serviceHref(s.slug)} className="transition-colors hover:text-rose">
                    {s.short}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.6} className="md:text-right">
            <p className="label text-cream/55">Los Cabos · Hora local</p>
            <LiveClock timeZone="America/Mazatlan" className="display mt-2 text-2xl uppercase leading-[1.1] md:text-[2rem]" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
