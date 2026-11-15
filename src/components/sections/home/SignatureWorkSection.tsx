import { MediaSlot } from "@/components/media/MediaSlot";
import { Reveal } from "@/components/motion/Reveal";
import { PillLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WorkCard } from "@/components/work/WorkCard";
import { work } from "@/content/home";
import { visibleProjects } from "@/content/projects";

/** 10 — Our Work: "Latest Works" con cuadrícula de proyectos. */
export function SignatureWorkSection() {
  const featured = visibleProjects.filter((p) => p.featured).slice(0, 4);
  const highlights = featured.length ? featured : visibleProjects.slice(0, 4);
  const hasProjects = highlights.length > 0;

  return (
    <section id="work" className="bg-ink py-24 md:py-32">
      <div className="container-vink">
        <SectionLabel index={10}>Works &amp; projects</SectionLabel>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <h2 className="display text-giant">
              Latest
              <br />
              Works
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:pt-4">
            <p className="display text-title">{work.title}</p>
            <p className="mt-4 max-w-lg text-base text-cream/65">
              {hasProjects ? "Different brands. Different ideas. Made with Vink." : work.empty}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {hasProjects && (
                <PillLink href="/work" variant="dark">
                  View all work
                </PillLink>
              )}
              <PillLink href="/#contact" variant="light">
                {work.cta}
              </PillLink>
            </div>
          </Reveal>
        </div>

        {hasProjects ? (
          <ul className="mt-16 grid gap-5 md:grid-cols-2">
            {highlights.map((p, i) => (
              <li key={p.slug}>
                <Reveal delay={(i % 2) * 0.08}>
                  <WorkCard project={p} />
                </Reveal>
              </li>
            ))}
          </ul>
        ) : (
          <Reveal className="mt-16">
            <div className="relative aspect-[16/8] overflow-hidden rounded-xl">
              <MediaSlot id="work.signature" fill videoMode="preview" sizes="100vw" />
              <span className="absolute right-4 top-4 rounded-full bg-cream px-3 py-1 text-[11px] uppercase tracking-[0.03em] text-charcoal">
                Próximamente
              </span>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
