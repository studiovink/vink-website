import { ServiceAccordion } from "@/components/interactive/ServiceAccordion";
import { MediaSlot } from "@/components/media/MediaSlot";
import { Reveal } from "@/components/motion/Reveal";
import { TextLink } from "@/components/ui/Button";
import { services } from "@/content/home";
import { specialtiesDetail } from "@/content/services";
import { serviceHref } from "@/content/site";

export function Services() {
  return (
    <section id="services" className="bg-cream pb-24 pt-8 md:pb-36">
      <div className="container-vink">
        <Reveal>
          <p className="label text-charcoal">{services.label}</p>
          <div className="mt-3 flex flex-wrap items-end gap-x-6 gap-y-3">
            <h2 className="display text-giant text-charcoal">{services.title}</h2>
            <p className="max-w-[16rem] pb-3 text-sm text-charcoal-soft">{services.aside}</p>
          </div>
        </Reveal>

        <div className="mt-14">
          <ServiceAccordion
            items={specialtiesDetail.map((s) => ({
              key: s.slug,
              title: s.short,
              content: (
                <div className="grid gap-8 md:grid-cols-[1fr_14rem] md:items-start">
                  <div>
                    <p className="display text-2xl text-burgundy">{s.tagline}</p>
                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-charcoal-soft">
                      {s.description}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {s.offerings.map((o) => (
                        <li
                          key={o}
                          className="rounded-full border border-charcoal/15 px-3.5 py-1.5 text-xs font-medium text-charcoal"
                        >
                          {o}
                        </li>
                      ))}
                    </ul>
                    <TextLink href={serviceHref(s.slug)} className="mt-6 text-charcoal">
                      Learn more
                    </TextLink>
                  </div>
                  <div className="overflow-hidden rounded-[1.25rem]">
                    <MediaSlot id={s.image} sizes="14rem" quiet />
                  </div>
                </div>
              ),
            }))}
          />
        </div>
      </div>
    </section>
  );
}
