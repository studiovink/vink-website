import { PillLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section
      data-header="dark"
      className="flex min-h-[100svh] flex-col justify-end bg-burgundy pb-16 pt-36 text-cream"
    >
      <div className="container-vink">
        <p className="label text-rose">Error 404</p>
        <h1 className="display mt-4 text-mega">Página no encontrada</h1>
        <p className="mt-6 max-w-md text-lg text-cream/80">
          Esta página todavía no existe. Pero las ideas sí.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <PillLink href="/">Volver al inicio</PillLink>
          <PillLink href="/contact" variant="burgundy" className="ring-1 ring-cream/30">
            Let&apos;s talk
          </PillLink>
        </div>
      </div>
    </section>
  );
}
