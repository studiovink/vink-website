import { MediaSwitcher } from "@/components/interactive/MediaSwitcher";
import { MediaSlot } from "@/components/media/MediaSlot";
import { Reveal } from "@/components/motion/Reveal";
import type { AssetId } from "@/content/assets";
import { getServicePage } from "@/content/service-pages";
import { cn } from "@/lib/cn";
import { Closing, SpecialtyIntro, WhatIs } from "./parts";
import { themes } from "./theme";

const applications: { key: string; label: string; asset: AssetId }[] = [
  { key: "cards", label: "Tarjetas", asset: "branding.app.cards" },
  { key: "labels", label: "Etiquetas", asset: "branding.app.labels" },
  { key: "packaging", label: "Empaques", asset: "branding.app.packaging" },
  { key: "menus", label: "Menús", asset: "branding.app.menus" },
  { key: "stationery", label: "Papelería", asset: "branding.app.stationery" },
  { key: "social", label: "Redes sociales", asset: "branding.app.social" },
];

/** 07 — Branding: Brand Identity y Brand Applications. */
export function BrandingSection() {
  const page = getServicePage("branding")!;
  const t = themes.rose;
  const [identity, apps] = page.offerings;

  return (
    <section id="branding" className={cn("space-y-24 py-24 md:space-y-36 md:py-36", t.bg, t.text)}>
      <SpecialtyIntro page={page} index={7} theme={t} />
      <WhatIs page={page} theme={t} />

      {/* Brand Identity */}
      <div className="container-vink grid gap-10 lg:grid-cols-12 lg:items-center">
        <Reveal className="lg:col-span-5">
          <p className={cn("label", t.accent)}>01 — {identity.subtitle}</p>
          <h3 className="display mt-4 text-giant">{identity.title}</h3>
          <p className={cn("mt-5 text-lg leading-relaxed", t.muted)}>{identity.text}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {identity.includes?.map((i) => (
              <li key={i} className={cn("rounded-full border px-3.5 py-1.5 text-sm", t.chip)}>
                {i}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="overflow-hidden rounded-[2rem] lg:col-span-7" delay={0.1}>
          <MediaSlot id="branding.identity" sizes="(min-width: 1024px) 58vw, 100vw" />
        </Reveal>
      </div>

      {/* Brand Applications */}
      <div className="container-vink">
        <Reveal className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className={cn("label", t.accent)}>02 — {apps.subtitle}</p>
            <h3 className="display mt-4 text-giant">{apps.title}</h3>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-10">
            <p className={cn("text-lg leading-relaxed", t.muted)}>{apps.text}</p>
            {apps.note && <p className={cn("mt-3 text-sm italic", t.muted)}>{apps.note}</p>}
          </div>
        </Reveal>
        <Reveal className="mt-12" delay={0.1}>
          <MediaSwitcher
            items={applications.map((a) => ({
              key: a.key,
              label: a.label,
              media: <MediaSlot id={a.asset} sizes="(min-width: 1024px) 60vw, 100vw" />,
            }))}
          />
        </Reveal>
      </div>

      <Closing page={page} theme={t} />
    </section>
  );
}
