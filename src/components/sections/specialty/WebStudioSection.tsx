import { DeviceToggle } from "@/components/interactive/DeviceToggle";
import { MediaSlot } from "@/components/media/MediaSlot";
import { Reveal } from "@/components/motion/Reveal";
import { getServicePage } from "@/content/service-pages";
import { cn } from "@/lib/cn";
import { Closing, Needs, Process, SpecialtyIntro } from "./parts";
import { themes } from "./theme";

/** 08 — Web Studio: Landing Pages, Business Websites y Digital Catalogs. */
export function WebStudioSection() {
  const page = getServicePage("web-studio")!;
  const t = themes.charcoal;

  return (
    <section id="web-studio" data-header="dark" className={cn("space-y-24 py-24 md:space-y-36 md:py-36", t.bg, t.text)}>
      <SpecialtyIntro page={page} index={8} theme={t} />

      {/* Tres soluciones como tarjetas */}
      <div className="container-vink">
        <Reveal>
          <h3 className="display text-giant">{page.offeringsTitle}</h3>
        </Reveal>
        <ul className="mt-12 grid gap-4 lg:grid-cols-3">
          {page.offerings.map((o, i) => (
            <li key={o.title}>
              <Reveal
                delay={i * 0.08}
                className={cn(
                  "group flex h-full flex-col rounded-[2rem] p-7 transition-colors duration-500 md:p-9",
                  i === 1 ? "bg-cream text-charcoal" : "bg-white/[0.06] text-cream hover:bg-white/10",
                )}
              >
                <span className="display text-6xl opacity-40">0{i + 1}</span>
                <h4 className="display mt-6 text-4xl leading-none">{o.title}</h4>
                <p className={cn("mt-1 text-sm", i === 1 ? "text-charcoal-soft" : "text-cream/60")}>{o.subtitle}</p>
                <p className={cn("mt-5 text-base leading-relaxed", i === 1 ? "text-charcoal-soft" : "text-cream/75")}>{o.text}</p>
                <ul className="mt-6 space-y-2 border-t border-current/15 pt-5">
                  {o.includes?.map((inc) => (
                    <li key={inc} className="flex items-start gap-3 text-sm">
                      <span aria-hidden className={i === 1 ? "text-burgundy" : "text-rose"}>
                        ✓
                      </span>
                      {inc}
                    </li>
                  ))}
                </ul>
                {o.note && (
                  <p className={cn("mt-auto pt-6 text-xs italic", i === 1 ? "text-charcoal-soft" : "text-cream/60")}>
                    {o.note}
                  </p>
                )}
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      {/* Demostración escritorio / celular */}
      <div className="container-vink">
        <Reveal className="text-center">
          <p className={cn("label", t.accent)}>Desktop · Mobile</p>
          <h3 className="display mt-4 text-headline">Diseño que conecta en cualquier pantalla.</h3>
        </Reveal>
        <Reveal className="mt-10" delay={0.1}>
          <DeviceToggle
            desktop={<MediaSlot id="web.desktop" sizes="(min-width: 1024px) 64rem, 100vw" />}
            mobile={<MediaSlot id="web.mobile" sizes="20rem" quiet />}
          />
        </Reveal>
      </div>

      <Needs page={page} theme={t} />
      <Process page={page} theme={t} />
      <Closing page={page} theme={t} />
    </section>
  );
}
