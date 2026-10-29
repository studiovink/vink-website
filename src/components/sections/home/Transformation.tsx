import { BeforeAfterSlider } from "@/components/interactive/BeforeAfterSlider";
import { MediaSlot } from "@/components/media/MediaSlot";
import { Reveal } from "@/components/motion/Reveal";
import { TextLink } from "@/components/ui/Button";
import { transformation } from "@/content/home";

export function Transformation() {
  return (
    <section className="bg-cream py-24 md:py-36">
      <div className="container-vink grid items-center gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="label text-burgundy">{transformation.label}</p>
          <h2 className="display mt-5 text-headline text-charcoal">{transformation.title}</h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-charcoal-soft">{transformation.text}</p>
          <TextLink href="/services/creative-studio" className="mt-8 text-burgundy">
            Descubre Creative Studio
          </TextLink>
        </Reveal>
        <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
          <BeforeAfterSlider
            before={<MediaSlot id="creative.before" sizes="(min-width: 1024px) 45vw, 100vw" />}
            after={<MediaSlot id="creative.after" sizes="(min-width: 1024px) 45vw, 100vw" quiet />}
            beforeLabel={transformation.before}
            afterLabel={transformation.after}
          />
        </Reveal>
      </div>
    </section>
  );
}
