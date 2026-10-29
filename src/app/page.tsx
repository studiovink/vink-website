import { ButtonLink } from "@/components/ui/Button";

/*
 * Home provisional (Fase 0–1): solo valida tipografía, color y navegación.
 * Las secciones completas se construyen en la Fase 3.
 */
export default function Home() {
  return (
    <section className="container-vink flex min-h-dvh flex-col justify-center pb-20 pt-32">
      <p className="eyebrow text-burgundy">VINK Creative Studio</p>
      <h1 className="mt-6 max-w-6xl text-display font-semibold text-burgundy">
        Ideas humanas.{" "}
        <span className="font-serif font-normal italic">Posibilidades extraordinarias.</span>
      </h1>
      <p className="mt-8 max-w-xl text-lg text-charcoal-soft md:text-xl">
        Creatividad, estrategia, diseño y tecnología para marcas que quieren ir más allá.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/work" arrow>
          Explore our work
        </ButtonLink>
        <ButtonLink href="/contact" variant="outline">
          Let&apos;s talk
        </ButtonLink>
      </div>
      <p className="eyebrow mt-16 text-charcoal-soft">Think with Vink.</p>
    </section>
  );
}
