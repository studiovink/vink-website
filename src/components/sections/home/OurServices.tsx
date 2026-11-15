import { HoverPreviewList } from "@/components/interactive/HoverPreviewList";
import { MediaSlot } from "@/components/media/MediaSlot";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { services } from "@/content/home";
import { specialtiesDetail } from "@/content/services";
import { serviceHref } from "@/content/site";

/** 05 — Our Services: lista editorial con vista previa que sigue al cursor. */
export function OurServices() {
  return (
    <section id="services" className="bg-ink-2 py-24 md:py-32">
      <div className="container-vink">
        <SectionLabel index={4}>What we do</SectionLabel>
        <Reveal>
          <h2 className="display mt-10 text-giant uppercase">Services/</h2>
          <p className="mt-5 max-w-md text-base text-cream/65">{services.aside.replace(/^— /, "")}</p>
        </Reveal>

        <div className="mt-14">
          <HoverPreviewList
            rows={specialtiesDetail.map((s, i) => ({
              key: s.slug,
              href: serviceHref(s.slug),
              index: i + 1,
              title: s.name,
              description: s.tagline,
              tags: [...s.offerings.map((o) => o.split(" — ")[0]), s.engagement],
              preview: <MediaSlot id={s.image} quiet sizes="14rem" />,
            }))}
          />
        </div>
      </div>
    </section>
  );
}
