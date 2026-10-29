import { LightboxGallery } from "@/components/interactive/Lightbox";
import { MediaSlot } from "@/components/media/MediaSlot";
import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";
import type { AssetId } from "@/content/assets";
import { getServicePage } from "@/content/service-pages";
import { cn } from "@/lib/cn";
import { Closing, Needs, Offerings, Process, SpecialtyIntro, WhatIs } from "./parts";
import { themes } from "./theme";

const gallery: { id: AssetId; label: string }[] = [
  { id: "social.item.1", label: "Reel" },
  { id: "social.item.2", label: "Carrusel" },
  { id: "social.item.3", label: "Post" },
  { id: "social.item.4", label: "Reel" },
  { id: "social.item.5", label: "Carrusel" },
  { id: "social.item.6", label: "Reel" },
];

/** 09 — Social & Content: servicio mensual personalizado + Meta Ads opcional. */
export function SocialContentSection() {
  const page = getServicePage("social-content")!;
  const t = themes.creamDeep;
  const approach = page.approach!;
  const addOn = page.addOn!;

  return (
    <section id="social-content" className={cn("space-y-24 py-24 md:space-y-36 md:py-36", t.bg, t.text)}>
      <SpecialtyIntro page={page} index={9} theme={t} />
      <WhatIs page={page} theme={t} />

      {/* Our approach */}
      <div data-header="dark" className="bg-charcoal py-20 text-cream md:py-28">
        <div className="container-vink">
          <p className="label text-rose">{approach.eyebrow}</p>
          <WordReveal text={approach.title} className="display mt-5 text-giant" />
          <div className="mt-12 grid gap-12 lg:grid-cols-12">
            <Reveal className="space-y-4 text-lg leading-relaxed text-cream/75 lg:col-span-5">
              {approach.text.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p className="pt-2 text-sm text-cream/60">{approach.note}</p>
            </Reveal>
            <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
              {approach.aspects.map((a, i) => (
                <li key={a.title}>
                  <Reveal delay={i * 0.06} className="h-full rounded-[1.5rem] bg-white/[0.06] p-6">
                    <p className="display text-2xl text-rose">{a.title}</p>
                    <p className="mt-2 text-sm text-cream/75">{a.text}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Offerings page={page} theme={t} />

      {/* Galería de contenido */}
      <div className="container-vink">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <h3 className="display text-headline">Contenido en movimiento.</h3>
          <p className={cn("max-w-xs text-sm", t.muted)}>
            Reels, carruseles y publicaciones creadas por VINK. Toca cualquier pieza para verla completa.
          </p>
        </Reveal>
        <Reveal className="mt-10" delay={0.08}>
          <LightboxGallery
            className="columns-2 gap-3 md:columns-3 md:gap-4 [&>li]:mb-3 [&>li]:break-inside-avoid md:[&>li]:mb-4"
            items={gallery.map((g, i) => ({
              key: `${g.id}-${i}`,
              label: g.label,
              thumb: <MediaSlot id={g.id} videoMode="preview" quiet sizes="(min-width: 768px) 30vw, 50vw" />,
              full: <MediaSlot id={g.id} sizes="28rem" />,
            }))}
          />
        </Reveal>
      </div>

      <Needs page={page} theme={t} />
      <Process page={page} theme={t} />

      {/* Meta Ads: servicio adicional, separado del mensual */}
      <div className="container-vink">
        <Reveal className="grid gap-8 rounded-[2rem] bg-burgundy p-8 text-cream md:grid-cols-12 md:p-12">
          <div className="md:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rose">{addOn.eyebrow}</p>
            <h3 className="display mt-3 text-5xl md:text-6xl">{addOn.title}</h3>
          </div>
          <div className="md:col-span-7">
            {addOn.text.map((p) => (
              <p key={p} className="mt-3 first:mt-0 text-base leading-relaxed text-cream/80">
                {p}
              </p>
            ))}
            <ul className="mt-6 flex flex-wrap gap-2">
              {addOn.tags.map((tag) => (
                <li key={tag} className="rounded-full border border-cream/25 px-3.5 py-1.5 text-xs">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <Closing page={page} theme={t} />
    </section>
  );
}
