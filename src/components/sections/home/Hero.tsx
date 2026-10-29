import { MediaSlot } from "@/components/media/MediaSlot";
import { MaskLines, Reveal } from "@/components/motion/Reveal";
import { PillLink } from "@/components/ui/Button";
import { hero } from "@/content/home";

export function Hero() {
  return (
    <section
      data-header="dark"
      aria-label="VINK Creative Studio"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-burgundy text-cream"
    >
      <MediaSlot id="hero.video" fill priority className="-z-20" />
      {/* Velo para mantener el texto legible sobre cualquier video */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(23,10,14,0.55)_0%,rgba(23,10,14,0)_35%,rgba(23,10,14,0)_55%,rgba(23,10,14,0.65)_100%)]"
      />

      <div className="container-vink flex flex-1 flex-col pb-6 pt-32 md:pb-8 md:pt-40">
        <Reveal className="max-w-md" delay={0.5}>
          <p className="display text-2xl leading-[1.05] md:text-[1.7rem]">{hero.statement}</p>
          <p className="mt-3 text-sm text-cream/80 md:text-base">{hero.sub}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <PillLink href="/#contact">Start a project</PillLink>
          </div>
        </Reveal>

        <div className="mt-auto pt-16">
          <h1 className="display text-mega">
            <MaskLines lines={["VINK Creative", "Studio"]} delay={0.1} />
          </h1>
          <div className="mt-6 flex items-center justify-between text-xs text-cream/80 md:text-sm">
            <p>© 2026 VINK Creative Studio.</p>
            <a href="#about" className="hover:text-cream">
              (Scroll down)
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
