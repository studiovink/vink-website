import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BeforeAfterSlider } from "@/components/interactive/BeforeAfterSlider";
import { MediaSlot } from "@/components/media/MediaSlot";
import { MaskLines, Reveal } from "@/components/motion/Reveal";
import { PillLink } from "@/components/ui/Button";
import { getProject, productionTypeLabels, visibleProjects } from "@/content/projects";
import { specialties } from "@/content/site";

// Con Cache Components se necesita al menos un parámetro; si aún no hay
// proyectos, el marcador responde 404.
export function generateStaticParams() {
  return visibleProjects.length ? visibleProjects.map((p) => ({ slug: p.slug })) : [{ slug: "__pendiente__" }];
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  return (
    <Suspense fallback={<div data-header="dark" className="min-h-[100svh] bg-burgundy" />}>
      {params.then(({ slug }) => (
        <ProjectContent slug={slug} />
      ))}
    </Suspense>
  );
}

function ProjectContent({ slug }: { slug: string }) {
  const project = getProject(slug);
  if (!project) notFound();

  const index = visibleProjects.indexOf(project);
  const next = visibleProjects[(index + 1) % visibleProjects.length];
  const categories = project.categories.map((c) => specialties.find((s) => s.slug === c)?.name).filter(Boolean);

  return (
    <article>
      <header data-header="dark" className="bg-burgundy pb-16 pt-36 text-cream md:pt-44">
        <div className="container-vink">
          <Link href="/work" className="text-sm text-cream/75 hover:text-cream">
            ← Our Work
          </Link>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.isConcept && (
              <span className="rounded-full bg-cream px-3 py-1 text-xs font-semibold uppercase tracking-wider text-burgundy">
                Proyecto conceptual
              </span>
            )}
            {project.productionTypes?.map((t) => (
              <span key={t} className="rounded-full border border-cream/25 px-3 py-1 text-xs uppercase tracking-wider">
                {productionTypeLabels[t]}
              </span>
            ))}
          </div>
          <h1 className="display mt-6 text-giant">
            <MaskLines lines={[project.title]} />
          </h1>
          <dl className="mt-10 grid gap-6 border-t border-cream/15 pt-6 text-sm md:grid-cols-3">
            <div>
              <dt className="text-cream/60">Marca</dt>
              <dd className="mt-1 text-base">{project.client ?? "Proyecto propio de VINK"}</dd>
            </div>
            <div>
              <dt className="text-cream/60">Especialidad</dt>
              <dd className="mt-1 text-base">{categories.join(", ")}</dd>
            </div>
            {project.whatWeDid.length > 0 && (
              <div>
                <dt className="text-cream/60">Qué hicimos</dt>
                <dd className="mt-1 text-base">{project.whatWeDid.join(", ")}</dd>
              </div>
            )}
          </dl>
        </div>
      </header>

      <div className="container-vink -mt-0 pt-12">
        <Reveal className="overflow-hidden rounded-[2rem]">
          <MediaSlot id={project.cover} priority sizes="100vw" />
        </Reveal>
      </div>

      <section className="container-vink grid gap-10 py-20 md:py-28 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="label text-burgundy">El concepto</p>
        </Reveal>
        <Reveal className="space-y-5 text-lg leading-relaxed text-charcoal-soft lg:col-span-8">
          <p className="display text-title text-charcoal">{project.summary}</p>
          {project.concept && <p>{project.concept}</p>}
        </Reveal>
      </section>

      {project.beforeAfter && (
        <section className="container-vink pb-20 md:pb-28">
          <BeforeAfterSlider
            before={<MediaSlot id={project.beforeAfter.before} sizes="100vw" />}
            after={<MediaSlot id={project.beforeAfter.after} sizes="100vw" quiet />}
            beforeLabel="Material inicial"
            afterLabel="Concepto creativo final"
          />
        </section>
      )}

      {project.gallery.length > 0 && (
        <section className="container-vink grid gap-4 pb-20 md:grid-cols-2 md:pb-28">
          {project.gallery.map((id, i) => (
            <Reveal key={`${id}-${i}`} className="overflow-hidden rounded-[1.75rem]" delay={(i % 2) * 0.08}>
              <MediaSlot id={id} sizes="(min-width: 768px) 50vw, 100vw" />
            </Reveal>
          ))}
        </section>
      )}

      {project.links && project.links.length > 0 && (
        <section className="container-vink flex flex-wrap gap-3 pb-20">
          {project.links.map((l) => (
            <PillLink key={l.url} href={l.url} variant="dark" target="_blank" rel="noopener noreferrer">
              {l.label}
            </PillLink>
          ))}
        </section>
      )}

      <section data-header="dark" className="bg-charcoal py-20 text-cream md:py-28">
        <div className="container-vink flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          {next && next.slug !== project.slug ? (
            <Link href={`/work/${next.slug}`} className="group">
              <p className="text-sm text-cream/60">Siguiente proyecto</p>
              <p className="display mt-2 text-headline transition-colors group-hover:text-rose">{next.title} →</p>
            </Link>
          ) : (
            <p className="display text-headline">¿Tu marca podría ser nuestro próximo proyecto?</p>
          )}
          <PillLink href="/#contact">Hablemos de tu proyecto</PillLink>
        </div>
      </section>
    </article>
  );
}
