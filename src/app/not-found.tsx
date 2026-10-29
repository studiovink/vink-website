import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-vink flex min-h-[80dvh] flex-col justify-center pb-24 pt-36">
      <p className="eyebrow text-burgundy">404</p>
      <h1 className="mt-4 max-w-3xl text-headline font-semibold text-burgundy">
        Esta página todavía no existe.{" "}
        <span className="font-serif font-normal italic">Pero las ideas sí.</span>
      </h1>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/" arrow>
          Volver al inicio
        </ButtonLink>
        <ButtonLink href="/contact" variant="outline">
          Let&apos;s talk
        </ButtonLink>
      </div>
    </section>
  );
}
