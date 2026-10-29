import Link from "next/link";
import { MediaSlot } from "@/components/media/MediaSlot";
import { ArrowDot } from "@/components/ui/Button";
import { productionTypeLabels, type Project } from "@/content/projects";
import { specialties } from "@/content/site";
import { cn } from "@/lib/cn";

/** Tarjeta de proyecto: se acerca al pasar el cursor y reproduce su vista previa. */
export function WorkCard({ project, wide = false }: { project: Project; wide?: boolean }) {
  const categories = project.categories
    .map((c) => specialties.find((s) => s.slug === c)?.short)
    .filter(Boolean)
    .join(" · ");
  const types = project.productionTypes?.map((t) => productionTypeLabels[t]).join(" · ");

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block focus-visible:outline-offset-4"
      aria-label={`${project.title}${project.isConcept ? " (proyecto conceptual)" : ""} — ${categories}`}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-[1.75rem] bg-burgundy",
          wide ? "aspect-[4/5] md:aspect-[16/10]" : "aspect-[4/5]",
        )}
      >
        <div className="absolute inset-0 transition-transform duration-[900ms] ease-vink group-hover:scale-[1.05] group-focus-visible:scale-[1.05] motion-reduce:transition-none">
          <MediaSlot id={project.cover} fill quiet sizes={wide ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 100vw"} />
          {project.previewVideo && <MediaSlot id={project.previewVideo} fill quiet videoMode="preview" />}
        </div>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="absolute inset-x-0 top-0 flex flex-wrap gap-2 p-4">
          {project.isConcept && (
            <span className="rounded-full bg-cream/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-burgundy">
              Proyecto conceptual
            </span>
          )}
          {project.devExample && (
            <span className="rounded-full bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white backdrop-blur">
              Ejemplo de desarrollo
            </span>
          )}
        </div>

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-cream">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rose">{categories}</p>
            <h3 className="display mt-1 text-3xl leading-none md:text-4xl">{project.title}</h3>
            {types && <p className="mt-1 text-xs text-cream/75">{types}</p>}
          </div>
          <ArrowDot
            variant="dark"
            className="transition-all duration-500 [@media(hover:hover)]:translate-y-2 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:translate-y-0 [@media(hover:hover)]:group-focus-visible:opacity-100"
          />
        </div>
      </div>
    </Link>
  );
}
