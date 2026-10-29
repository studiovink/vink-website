import { FounderSpotlight } from "@/components/interactive/FounderSpotlight";
import { MediaSlot } from "@/components/media/MediaSlot";
import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { PillLink } from "@/components/ui/Button";
import { about, founders } from "@/content/home";
import { cn } from "@/lib/cn";

const cardTones = [
  "bg-cream text-charcoal",
  "bg-charcoal text-cream",
  "bg-white text-charcoal",
  "bg-burgundy text-cream",
];

export function About() {
  return (
    <section id="about" className="bg-rose py-24 text-burgundy md:py-36">
      <div className="container-vink">
        <div className="grid gap-6 lg:grid-cols-12">
          <p className="label lg:col-span-2 lg:pt-4">{about.label}</p>
          <WordReveal
            lead={about.lead}
            text={about.statement}
            className="display text-headline lg:col-span-10"
            leadClassName="text-burgundy"
            wordClassName="text-burgundy"
          />
        </div>

        <div className="mt-20 grid gap-12 md:mt-28 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <FounderSpotlight
              tabs={founders.map((f) => ({
                id: f.id,
                label: f.label,
                role: f.role,
                bio: f.bio,
                media: <MediaSlot id={f.image} sizes="(min-width: 1024px) 40vw, 100vw" />,
              }))}
            />
          </Reveal>

          <div className="flex flex-col lg:col-span-7">
            <Reveal className="max-w-2xl space-y-5 text-lg leading-relaxed text-burgundy md:text-xl">
              {about.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p className="display pt-2 text-3xl md:text-4xl">{about.closing}</p>
            </Reveal>

            <ul className="mt-12 grid gap-3 sm:grid-cols-2">
              {about.differentiators.map((d, i) => (
                <li key={d.n}>
                  <Reveal delay={i * 0.08} className={cn("h-full rounded-[1.5rem] p-6", cardTones[i])}>
                    <p className="display text-6xl leading-none">
                      {d.n}
                      <span className="ml-1 text-2xl opacity-60">/04</span>
                    </p>
                    <h3 className="display mt-5 text-2xl leading-none">{d.title}</h3>
                    <p className="mt-2 text-sm opacity-80">{d.text}</p>
                  </Reveal>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <PillLink href="/contact" variant="light">
                Start a project
              </PillLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
