"use client";

import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { productionTypeLabels, type ProductionType, type Project } from "@/content/projects";
import { specialties, type ServiceSlug } from "@/content/site";
import { cn } from "@/lib/cn";
import { WorkCard } from "./WorkCard";

type Filter = "all" | ServiceSlug;
type SubFilter = "all" | ProductionType;

const isFilter = (v: string | null): v is ServiceSlug => specialties.some((s) => s.slug === v);
const isSub = (v: string | null): v is ProductionType => !!v && v in productionTypeLabels;

/** Lee los filtros de la URL (?category=…&type=…) para que se puedan compartir. */
export function WorkBrowser({ projects }: { projects: Project[] }) {
  const params = useSearchParams();
  const c = params.get("category");
  const t = params.get("type");
  return <WorkGrid projects={projects} initial={isFilter(c) ? c : "all"} initialSub={isSub(t) ? t : "all"} syncUrl />;
}

/** Versión estática (mientras carga) con los filtros en "Todos". */
export function WorkBrowserFallback({ projects }: { projects: Project[] }) {
  return <WorkGrid projects={projects} initial="all" initialSub="all" />;
}

function WorkGrid({
  projects,
  initial,
  initialSub,
  syncUrl = false,
}: {
  projects: Project[];
  initial: Filter;
  initialSub: SubFilter;
  syncUrl?: boolean;
}) {
  const [filter, setFilter] = useState<Filter>(initial);
  const [sub, setSub] = useState<SubFilter>(initialSub);

  const update = (f: Filter, s: SubFilter) => {
    setFilter(f);
    setSub(s);
    if (!syncUrl) return;
    const q = new URLSearchParams();
    if (f !== "all") q.set("category", f);
    if (f === "creative-studio" && s !== "all") q.set("type", s);
    window.history.replaceState(null, "", q.size ? `?${q}` : window.location.pathname);
  };

  const count = (f: Filter) => (f === "all" ? projects.length : projects.filter((p) => p.categories.includes(f)).length);
  const shown = projects.filter(
    (p) =>
      (filter === "all" || p.categories.includes(filter)) &&
      (filter !== "creative-studio" || sub === "all" || p.productionTypes?.includes(sub)),
  );
  const label = filter === "all" ? "Todos" : specialties.find((s) => s.slug === filter)?.short;

  return (
    <div>
      <div role="group" aria-label="Filtrar proyectos por especialidad" className="flex flex-wrap gap-2">
        <Chip active={filter === "all"} onClick={() => update("all", "all")} count={count("all")}>
          Todos
        </Chip>
        {specialties.map((s) => (
          <Chip key={s.slug} active={filter === s.slug} onClick={() => update(s.slug, "all")} count={count(s.slug)}>
            {s.short}
          </Chip>
        ))}
      </div>

      <AnimatePresence initial={false}>
        {filter === "creative-studio" && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div role="group" aria-label="Filtrar por tipo de producción" className="flex flex-wrap gap-2 pt-3">
              <Chip small active={sub === "all"} onClick={() => update("creative-studio", "all")}>
                Toda la producción
              </Chip>
              {(Object.keys(productionTypeLabels) as ProductionType[]).map((k) => (
                <Chip key={k} small active={sub === k} onClick={() => update("creative-studio", k)}>
                  {productionTypeLabels[k]}
                </Chip>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p aria-live="polite" className="mt-6 text-sm text-charcoal-soft">
        {shown.length === 1 ? "1 proyecto" : `${shown.length} proyectos`} · {label}
      </p>

      {shown.length > 0 ? (
        <motion.ul layout className="mt-8 grid gap-4 md:grid-cols-3 md:gap-5">
          <AnimatePresence mode="popLayout">
            {shown.map((p, i) => {
              const wide = i % 4 === 0;
              return (
                <motion.li
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(wide && "md:col-span-2")}
                >
                  <WorkCard project={p} wide={wide} />
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      ) : (
        <div className="mt-8 rounded-[2rem] border border-dashed border-charcoal/20 px-6 py-16 text-center">
          <p className="display text-4xl text-charcoal">Próximamente</p>
          <p className="mx-auto mt-3 max-w-md text-charcoal-soft">
            {projects.length === 0
              ? "Estamos preparando la selección de proyectos. Muy pronto podrás explorar nuestras producciones aquí."
              : "Todavía no hay proyectos publicados en esta categoría."}
          </p>
        </div>
      )}
    </div>
  );
}

function Chip({
  active,
  onClick,
  count,
  small,
  children,
}: {
  active: boolean;
  onClick: () => void;
  count?: number;
  small?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full font-medium uppercase tracking-wide transition-colors duration-300",
        small ? "min-h-9 px-4 text-xs" : "min-h-11 px-5 text-[13px]",
        active ? "bg-burgundy text-cream" : "bg-burgundy/8 text-burgundy hover:bg-burgundy/15",
      )}
    >
      {children}
      {count !== undefined && <span className={cn("text-[11px]", active ? "text-rose" : "text-burgundy/50")}>{count}</span>}
    </button>
  );
}
