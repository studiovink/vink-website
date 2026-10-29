import type { Metadata } from "next";
import { Suspense } from "react";
import { MaskLines, Reveal } from "@/components/motion/Reveal";
import { PillLink } from "@/components/ui/Button";
import { WorkBrowser, WorkBrowserFallback } from "@/components/work/WorkBrowser";
import { work } from "@/content/home";
import { visibleProjects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Portafolio de VINK Creative Studio: producción visual e IA, branding, sitios web y contenido para redes sociales.",
};

export default function WorkPage() {
  return (
    <>
      <section className="bg-cream pb-24 pt-36 md:pb-36 md:pt-44">
        <div className="container-vink">
          <p className="label text-burgundy">Selected work · Creative projects · Made by VINK</p>
          <h1 className="display mt-4 text-mega text-charcoal">
            <MaskLines lines={["Our Work"]} />
          </h1>
          <Reveal className="mt-8 grid gap-6 md:grid-cols-2">
            <p className="display text-title text-burgundy">{work.title}</p>
            <p className="max-w-xl text-lg leading-relaxed text-charcoal-soft">
              Cada proyecto es una oportunidad para explorar nuevas posibilidades y transformar una idea en algo
              visualmente extraordinario. Different brands. Different ideas. Made with Vink.
            </p>
          </Reveal>

          <div className="mt-16">
            <Suspense fallback={<WorkBrowserFallback projects={visibleProjects} />}>
              <WorkBrowser projects={visibleProjects} />
            </Suspense>
          </div>
        </div>
      </section>

      <section data-header="dark" className="bg-burgundy py-24 text-cream md:py-32">
        <div className="container-vink flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <h2 className="display max-w-3xl text-headline">{work.cta}</h2>
          <PillLink href="/#contact">Hablemos de tu proyecto</PillLink>
        </div>
      </section>
    </>
  );
}
