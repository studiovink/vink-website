import { PillLink, TextLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { specialtiesSection } from "@/content/home";
import { specialtiesDetail } from "@/content/services";
import { serviceHref } from "@/content/site";
import { cn } from "@/lib/cn";

const tones = [
  { card: "bg-white text-charcoal", chip: "bg-cream text-charcoal", icon: "bg-charcoal text-cream", pill: "dark" as const, rule: "border-charcoal/10", muted: "text-charcoal-soft" },
  { card: "bg-charcoal text-cream", chip: "bg-white/10 text-cream", icon: "bg-white/10 text-cream", pill: "light" as const, rule: "border-cream/15", muted: "text-cream/70" },
  { card: "bg-white text-charcoal", chip: "bg-cream text-charcoal", icon: "bg-burgundy text-cream", pill: "burgundy" as const, rule: "border-charcoal/10", muted: "text-charcoal-soft" },
  { card: "bg-burgundy text-cream", chip: "bg-white/10 text-cream", icon: "bg-rose text-burgundy", pill: "light" as const, rule: "border-cream/15", muted: "text-cream/70" },
];

/**
 * Las cuatro especialidades como tarjetas grandes apiladas (sticky) al hacer scroll.
 * Sin precios: "Cotización personalizada".
 */
export function Specialties() {
  return (
    <section className="bg-cream py-24 md:py-36">
      <div className="container-vink">
        <Reveal className="text-center">
          <p className="label text-charcoal">{specialtiesSection.label}</p>
          <h2 className="display mt-3 text-giant text-charcoal">{specialtiesSection.title}</h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-charcoal-soft md:text-lg">{specialtiesSection.sub}</p>
        </Reveal>

        <ol className="mx-auto mt-16 max-w-6xl">
          {specialtiesDetail.map((s, i) => {
            const t = tones[i];
            return (
              <li
                key={s.slug}
                className="mb-6 md:sticky md:top-[var(--stack-top)]"
                style={{ "--stack-top": `${6 + i * 1.25}rem` } as React.CSSProperties}
              >
                <article
                  className={cn(
                    "grid gap-10 rounded-[2rem] p-7 shadow-[0_-20px_60px_-40px_rgba(23,20,22,0.5)] md:grid-cols-2 md:gap-14 md:p-12",
                    t.card,
                  )}
                >
                  <div className="flex flex-col">
                    <span className={cn("display flex size-16 items-center justify-center rounded-2xl text-3xl", t.icon)}>
                      0{i + 1}
                    </span>
                    <h3 className="display mt-6 text-5xl leading-none md:text-6xl">{s.short}</h3>
                    <p className={cn("mt-4 max-w-sm text-base", t.muted)}>{s.tagline}</p>
                    <div className={cn("mt-auto flex justify-between border-t pt-5 text-sm", t.rule, t.muted)}>
                      <span>Modalidad</span>
                      <span className="font-semibold">{s.engagement}</span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <p className="display text-4xl md:text-5xl">{specialtiesSection.quote}</p>
                    <div className={cn("my-6 border-t", t.rule)} />
                    <ul className="space-y-3">
                      {s.offerings.map((o) => (
                        <li key={o} className="flex items-center gap-3">
                          <span aria-hidden className={cn("flex size-8 shrink-0 items-center justify-center rounded-full text-sm", t.chip)}>
                            ✓
                          </span>
                          <span className="display text-lg leading-tight">{o}</span>
                        </li>
                      ))}
                    </ul>
                    {s.addOn && (
                      <p className={cn("mt-5 rounded-2xl border border-dashed p-4 text-sm", t.rule, t.muted)}>
                        <strong className="font-semibold">+ {s.addOn.name}:</strong> {s.addOn.note}
                      </p>
                    )}
                    <div className="mt-8 space-y-4">
                      <PillLink href={`/contact?service=${s.slug}`} variant={t.pill} wide>
                        {s.cta}
                      </PillLink>
                      <TextLink href={serviceHref(s.slug)} className="block text-center">
                        Ver {s.name}
                      </TextLink>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
