import { ProcessTimeline } from "@/components/interactive/ProcessTimeline";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { philosophy } from "@/content/home";

/* Íconos de línea fina para los cuatro pilares */
const icons = [
  // Human Creativity — flor / chispa
  <svg key="a" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.25" className="size-11">
    {Array.from({ length: 8 }).map((_, i) => (
      <ellipse key={i} cx="24" cy="13" rx="4" ry="10" transform={`rotate(${i * 22.5} 24 24)`} />
    ))}
    <circle cx="24" cy="24" r="3" />
  </svg>,
  // Creative Technology — círculos que se cruzan
  <svg key="b" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.25" className="size-11">
    <circle cx="24" cy="17" r="9" />
    <circle cx="17" cy="29" r="9" />
    <circle cx="31" cy="29" r="9" />
  </svg>,
  // Strategic Thinking — diálogo
  <svg key="c" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.25" className="size-11">
    <path d="M6 8h24v16H16l-6 5v-5H6z" />
    <path d="M18 28v6h14l6 5v-5h4V18h-8" />
  </svg>,
  // Real Connection — indicador
  <svg key="d" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.25" className="size-11">
    <path d="M6 34a18 18 0 1 1 36 0" />
    <path d="M24 34l8-10" />
    <circle cx="24" cy="34" r="2.5" />
    <path d="M10 34h-4M42 34h-4M24 12v4M12 20l3 2M36 20l-3 2" />
  </svg>,
];

/** 04 — Our Philosophy: pilares en columnas + proceso de trabajo. */
export function Philosophy() {
  return (
    <section className="bg-ink py-24 text-cream md:py-32">
      <div className="container-vink">
        <SectionLabel index={3}>{philosophy.label}</SectionLabel>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <h2 className="display text-giant uppercase">
              {philosophy.lead} <span className="text-cream/40">{philosophy.rest}</span>
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
            <p className="text-base leading-relaxed text-cream/70">{philosophy.sub}</p>
          </Reveal>
        </div>

        <ul className="mt-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {philosophy.pillars.map((p, i) => (
            <li key={p.n}>
              <Reveal delay={i * 0.08}>
                <div className="flex items-center gap-4 text-cream">
                  {icons[i]}
                  <h3 className="display text-xl leading-tight">
                    {p.title}
                    <span className="block text-sm font-normal tracking-normal text-cream/55">{p.subtitle}</span>
                  </h3>
                </div>
                <p className="mt-6 text-[15px] leading-relaxed text-cream/70">{p.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-28">
          <SectionLabel>{philosophy.process.label}</SectionLabel>
          <Reveal>
            <h3 className="display mt-8 max-w-4xl text-headline uppercase">{philosophy.process.title}</h3>
          </Reveal>
          <ProcessTimeline steps={philosophy.process.steps} />
          <p className="mt-6 text-sm text-cream/55">{philosophy.process.note}</p>
        </div>
      </div>
    </section>
  );
}
