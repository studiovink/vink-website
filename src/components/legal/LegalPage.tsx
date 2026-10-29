import type { LegalDocument } from "@/content/legal";

export function LegalPage({ doc }: { doc: LegalDocument }) {
  return (
    <article className="container-vink pb-24 pt-36 md:pb-32 md:pt-44">
      <header className="max-w-3xl">
        <p className="label text-burgundy">{doc.eyebrow}</p>
        <h1 className="display mt-4 text-giant text-charcoal">{doc.title}</h1>
        <p className="mt-6 text-sm text-charcoal-soft">
          Última actualización: {doc.updatedAt ?? "pendiente de publicación"}
        </p>
      </header>

      <div className="mt-16 grid gap-12 lg:grid-cols-12">
        <nav aria-label="Contenido" className="hidden lg:col-span-3 lg:block">
          <ol className="sticky top-28 space-y-2 border-l border-cream-deep pl-5 text-sm">
            {doc.sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-charcoal-soft hover:text-burgundy">
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="max-w-2xl text-base leading-relaxed text-charcoal lg:col-span-8 lg:col-start-5">
          <div className="space-y-5 text-lg">
            {doc.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          {doc.sections.map((s) => (
            <section key={s.id} id={s.id} className="mt-14 scroll-mt-28">
              <h2 className="display text-title text-burgundy">{s.title}</h2>
              <div className="mt-4 space-y-4">
                {s.body?.map((p) => <p key={p}>{p}</p>)}
                {s.pending && <Pending>{s.pending}</Pending>}
              </div>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}

/** Marca visible de contenido legal que falta completar antes del lanzamiento. */
function Pending({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-xl border border-dashed border-burgundy/40 bg-cream-deep/60 px-4 py-3 text-sm text-charcoal-soft">
      <span className="font-semibold text-burgundy">Pendiente de completar: </span>
      {children}
    </p>
  );
}
