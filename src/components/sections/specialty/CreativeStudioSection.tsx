import { BeforeAfterSlider } from "@/components/interactive/BeforeAfterSlider";
import { MediaSlot } from "@/components/media/MediaSlot";
import { Reveal } from "@/components/motion/Reveal";
import { transformation } from "@/content/home";
import { getServicePage } from "@/content/service-pages";
import { cn } from "@/lib/cn";
import { Closing, Needs, Offerings, Process, SpecialtyIntro, WhatIs } from "./parts";
import { themes } from "./theme";

/** 06 — Creative Studio: producción visual, campañas y Before/After. */
export function CreativeStudioSection() {
  const page = getServicePage("creative-studio")!;
  const t = themes.burgundy;

  return (
    <section id="creative-studio" data-header="dark" className={cn("space-y-24 py-24 md:space-y-36 md:py-36", t.bg, t.text)}>
      <SpecialtyIntro page={page} index={6} theme={t} />
      <WhatIs page={page} theme={t} />
      <Offerings page={page} theme={t} />

      {/* Antes / después */}
      <div className="container-vink grid items-center gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className={cn("label", t.accent)}>{transformation.label}</p>
          <h3 className="display mt-5 text-headline">{transformation.title}</h3>
          <p className={cn("mt-6 max-w-md text-lg leading-relaxed", t.muted)}>{transformation.text}</p>
          <p className={cn("mt-6 text-sm", t.muted)}>Desliza para comparar · también con las flechas del teclado.</p>
        </Reveal>
        <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
          <BeforeAfterSlider
            before={<MediaSlot id="creative.before" sizes="(min-width: 1024px) 45vw, 100vw" />}
            after={<MediaSlot id="creative.after" sizes="(min-width: 1024px) 45vw, 100vw" quiet />}
            beforeLabel={transformation.before}
            afterLabel={transformation.after}
          />
        </Reveal>
      </div>

      {/* Producción presencial y dron */}
      <div className="container-vink">
        <Reveal>
          <h3 className="display text-headline">Producción real, en locación.</h3>
          <p className={cn("mt-4 max-w-2xl text-lg", t.muted)}>
            La IA no tiene que formar parte de todos los proyectos. También capturamos contenido real en negocios,
            exteriores y locaciones, con tomas aéreas cuando el proyecto lo requiere.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-5">
          <Reveal className="group relative overflow-hidden rounded-[1.75rem] md:col-span-2">
            <MediaSlot id="creative.on-location" sizes="(min-width: 768px) 40vw, 100vw" />
            <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-charcoal">
              Grabación en locación
            </span>
          </Reveal>
          <Reveal className="group relative overflow-hidden rounded-[1.75rem] md:col-span-3" delay={0.08}>
            <div className="relative aspect-video">
              <MediaSlot id="creative.drone" fill videoMode="preview" sizes="(min-width: 768px) 60vw, 100vw" />
            </div>
            <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-charcoal">
              Tomas con dron
            </span>
          </Reveal>
        </div>
        {page.notes && (
          <ul className={cn("mt-8 grid gap-3 text-sm md:grid-cols-3", t.muted)}>
            {page.notes.map((n) => (
              <li key={n} className={cn("rounded-2xl border p-4", t.rule)}>
                {n}
              </li>
            ))}
          </ul>
        )}
      </div>

      <Needs page={page} theme={t} />
      <Process page={page} theme={t} />
      <Closing page={page} theme={t} />
    </section>
  );
}
