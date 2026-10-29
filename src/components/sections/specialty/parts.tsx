import type { ReactNode } from "react";
import { QuoteLink } from "@/components/contact/QuoteLink";
import { ServiceAccordion } from "@/components/interactive/ServiceAccordion";
import { MediaSlot } from "@/components/media/MediaSlot";
import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { PillLink } from "@/components/ui/Button";
import type { ServicePage } from "@/content/service-pages";
import { cn } from "@/lib/cn";
import type { Theme } from "./theme";

/** Encabezado común de cada especialidad: número, nombre gigante, intro, CTA y medio principal. */
export function SpecialtyIntro({ page, index, theme }: { page: ServicePage; index: number; theme: Theme }) {
  return (
    <div className="container-vink">
      <Reveal className={cn("flex flex-wrap items-baseline justify-between gap-3 border-b pb-5", theme.rule)}>
        <p className={cn("label", theme.heading)}>
          ({String(index).padStart(2, "0")}) {page.name}
        </p>
        <p className={cn("text-xs font-semibold uppercase tracking-[0.16em]", theme.muted)}>{page.eyebrow}</p>
      </Reveal>

      <Reveal y={60}>
        <h2 className={cn("display mt-8 text-mega", theme.heading)}>{page.short}</h2>
      </Reveal>

      <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className={cn("display text-title", theme.accent)}>{page.headline}</p>
          <div className={cn("mt-6 space-y-4 text-lg leading-relaxed", theme.muted)}>
            {page.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <QuoteLink service={page.slug} variant={theme.dark ? "light" : "dark"}>
              {page.primaryCta}
            </QuoteLink>
            {page.secondaryCta && (
              <PillLink href={page.secondaryCta.href} variant={theme.dark ? "burgundy" : "light"} className="ring-1 ring-current/20">
                {page.secondaryCta.label}
              </PillLink>
            )}
          </div>
        </Reveal>
        <Reveal className="lg:col-span-7" delay={0.1}>
          <div className="overflow-hidden rounded-[2rem]">
            <MediaSlot id={page.heroMedia} sizes="(min-width: 1024px) 58vw, 100vw" />
          </div>
        </Reveal>
      </div>
    </div>
  );
}

/** "¿Qué es…?": frase que se revela con el scroll + texto. */
export function WhatIs({ page, theme }: { page: ServicePage; theme: Theme }) {
  return (
    <div className="container-vink grid gap-6 lg:grid-cols-12">
      <p className={cn("label lg:col-span-3 lg:pt-3", theme.accent)}>{page.whatIs.title}</p>
      <div className="lg:col-span-9">
        <WordReveal text={page.whatIs.statement} className={cn("display text-headline", theme.heading)} />
        <div className={cn("mt-8 grid gap-6 text-base leading-relaxed md:grid-cols-2 md:text-lg", theme.muted)}>
          {page.whatIs.text.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Servicios de la especialidad en lista desplegable. */
export function Offerings({ page, theme }: { page: ServicePage; theme: Theme }) {
  return (
    <div className="container-vink">
      <Reveal>
        <h3 className={cn("display text-giant", theme.heading)}>{page.offeringsTitle}</h3>
      </Reveal>
      <div className="mt-10">
        <ServiceAccordion
          dark={theme.dark}
          items={page.offerings.map((o) => ({
            key: o.title,
            title: o.title,
            subtitle: o.subtitle,
            content: (
              <div className="grid gap-8 lg:grid-cols-2">
                <p className={cn("max-w-xl text-base leading-relaxed md:text-lg", theme.muted)}>{o.text}</p>
                <div>
                  {o.includes && (
                    <>
                      <p className={cn("text-xs font-semibold uppercase tracking-[0.16em]", theme.muted)}>
                        Puede incluir
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {o.includes.map((inc) => (
                          <li key={inc} className={cn("rounded-full border px-3.5 py-1.5 text-sm", theme.chip)}>
                            {inc}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  {o.note && <p className={cn("mt-5 text-sm italic", theme.muted)}>{o.note}</p>}
                </div>
              </div>
            ),
          }))}
        />
      </div>
    </div>
  );
}

/** Tabla necesidad → solución. */
export function Needs({ page, theme }: { page: ServicePage; theme: Theme }) {
  if (!page.needs) return null;
  return (
    <div className="container-vink">
      <Reveal>
        <h3 className={cn("display text-headline", theme.heading)}>{page.needs.title}</h3>
      </Reveal>
      <dl className={cn("mt-10 border-t", theme.rule)}>
        {page.needs.rows.map((r, i) => (
          <Reveal key={r.need} delay={i * 0.04}>
            <div
              className={cn(
                "group grid gap-2 border-b py-5 transition-colors md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8",
                theme.rule,
              )}
            >
              <dt className={cn("text-base md:text-lg", theme.muted)}>“{r.need}”</dt>
              <span
                aria-hidden
                className={cn(
                  "hidden transition-transform duration-500 ease-vink group-hover:translate-x-2 md:block",
                  theme.accent,
                )}
              >
                →
              </span>
              <dd className={cn("display text-xl md:text-2xl", theme.heading)}>{r.solution}</dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </div>
  );
}

/** Pasos del proceso, en fila (escritorio) o carrusel deslizable (celular). */
export function Process({ page, theme }: { page: ServicePage; theme: Theme }) {
  if (!page.process) return null;
  const steps = page.process.steps;
  return (
    <div>
      <div className="container-vink">
        <Reveal>
          <h3 className={cn("display text-headline", theme.heading)}>{page.process.title}</h3>
        </Reveal>
      </div>
      <ol
        className="mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-4 md:px-10 xl:px-14 lg:grid lg:overflow-visible"
        style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
      >
        {steps.map((s, i) => (
          <li key={s.title} className="w-[72vw] max-w-xs shrink-0 snap-start lg:w-auto lg:max-w-none">
            <Reveal delay={i * 0.06} className={cn("flex h-full flex-col rounded-[1.5rem] border p-6", theme.rule)}>
              <span className={cn("display text-5xl", theme.accent)}>0{i + 1}</span>
              <span className={cn("display mt-8 text-2xl leading-none", theme.heading)}>{s.title}</span>
              <span className={cn("mt-3 text-sm leading-relaxed", theme.muted)}>{s.text}</span>
            </Reveal>
          </li>
        ))}
      </ol>
      {page.process.note && (
        <p className={cn("container-vink mt-4 text-sm", theme.muted)}>{page.process.note}</p>
      )}
    </div>
  );
}

/** Cierre de la especialidad con su CTA. */
export function Closing({ page, theme, children }: { page: ServicePage; theme: Theme; children?: ReactNode }) {
  return (
    <div className="container-vink">
      <Reveal className={cn("grid gap-8 border-t pt-12 lg:grid-cols-12 lg:items-end", theme.rule)}>
        <div className="lg:col-span-8">
          <p className={cn("display text-headline", theme.heading)}>{page.closing.title}</p>
          <p className={cn("mt-5 max-w-2xl text-lg leading-relaxed", theme.muted)}>{page.closing.text}</p>
          <p className={cn("display mt-6 text-2xl", theme.accent)}>{page.closing.tagline}</p>
        </div>
        <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
          {children}
          <QuoteLink service={page.slug} variant={theme.dark ? "light" : "dark"}>
            {page.primaryCta}
          </QuoteLink>
        </div>
      </Reveal>
    </div>
  );
}
