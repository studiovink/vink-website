import { PillarRing } from "@/components/interactive/PillarRing";
import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { philosophy } from "@/content/home";
import { ProcessTimeline } from "@/components/interactive/ProcessTimeline";

export function Philosophy() {
  return (
    <section data-header="dark" className="bg-charcoal py-24 text-cream md:py-36">
      <div className="container-vink">
        <p className="label text-cream">{philosophy.label}</p>
        <WordReveal
          lead={philosophy.lead}
          text={philosophy.rest}
          className="display mt-6 max-w-6xl text-headline"
          leadClassName="text-cream"
          wordClassName="text-cream"
        />

        <div className="mt-16 grid items-center gap-16 lg:mt-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-5 lg:self-end">
            <p className="max-w-md text-lg leading-relaxed text-cream/75">{philosophy.sub}</p>
            <p className="display mt-8 text-3xl text-rose">Think with Vink.</p>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <PillarRing items={philosophy.pillars} />
          </div>
        </div>

        <div className="mt-24 md:mt-36">
          <Reveal>
            <p className="label text-rose">{philosophy.process.label}</p>
            <h3 className="display mt-4 max-w-4xl text-headline">{philosophy.process.title}</h3>
          </Reveal>
          <ProcessTimeline steps={philosophy.process.steps} />
          <p className="mt-6 text-sm text-cream/60">{philosophy.process.note}</p>
        </div>
      </div>
    </section>
  );
}
