import { SignatureWork } from "@/components/interactive/SignatureWork";
import { MediaSlot } from "@/components/media/MediaSlot";
import { Reveal } from "@/components/motion/Reveal";
import { PillLink } from "@/components/ui/Button";
import { work } from "@/content/home";
import { publishedProjects } from "@/content/projects";

export function SignatureWorkSection() {
  const hasProjects = publishedProjects.length > 0;

  return (
    <section className="bg-cream pt-24 md:pt-36">
      <div className="container-vink">
        <Reveal>
          <p className="label text-charcoal">{work.label}</p>
          <h2 className="display mt-3 text-giant text-charcoal">Our Signature</h2>
        </Reveal>
      </div>

      <SignatureWork
        left={work.big[0]}
        right={work.big[1]}
        media={<MediaSlot id="work.signature" fill sizes="94vw" />}
        overlay={
          <div className="flex size-full flex-col justify-end bg-gradient-to-t from-black/70 via-black/10 to-transparent p-6 text-cream md:p-12">
            <p className="display max-w-4xl text-headline">{work.title}</p>
          </div>
        }
      />

      <div className="container-vink grid gap-8 pb-24 pt-14 md:grid-cols-2 md:pb-36">
        <p className="max-w-lg text-lg leading-relaxed text-charcoal-soft">
          {hasProjects
            ? "Different brands. Different ideas. Made with Vink."
            : work.empty}
        </p>
        <div className="flex flex-wrap items-start gap-3 md:justify-end">
          {hasProjects && (
            <PillLink href="/work" variant="dark">
              Explorar proyectos
            </PillLink>
          )}
          <PillLink href="/contact" variant={hasProjects ? "light" : "dark"}>
            {work.cta}
          </PillLink>
        </div>
      </div>
    </section>
  );
}
