import { MediaSlot } from "@/components/media/MediaSlot";
import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { PillLink } from "@/components/ui/Button";
import { about, meetFounders } from "@/content/home";
import { cn } from "@/lib/cn";

const cardTones = [
  "bg-cream text-charcoal",
  "bg-charcoal text-cream",
  "bg-white text-charcoal",
  "bg-burgundy text-cream",
];

/** 03 — About Us: quiénes somos, qué nos hace diferentes y Meet the Founders. */
export function About() {
  return (
    <section id="about" className="bg-rose text-burgundy">
      <div className="container-vink py-24 md:py-36">
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
            <div className="overflow-hidden rounded-[2rem] lg:sticky lg:top-28">
              <MediaSlot id={meetFounders.together} sizes="(min-width: 1024px) 40vw, 100vw" />
            </div>
          </Reveal>

          <div className="flex flex-col lg:col-span-7">
            <Reveal className="max-w-2xl space-y-5 text-lg leading-relaxed md:text-xl">
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
              <PillLink href="/#contact" variant="light">
                Start a project
              </PillLink>
            </div>
          </div>
        </div>
      </div>

      {/* Meet the Founders */}
      <div id="founders" data-header="dark" className="bg-burgundy py-24 text-cream md:py-36">
        <div className="container-vink">
          <div className="grid gap-6 lg:grid-cols-12">
            <p className="label text-rose lg:col-span-3 lg:pt-4">{meetFounders.label}</p>
            <div className="lg:col-span-9">
              <WordReveal text={meetFounders.title} className="display text-giant" />
              <Reveal>
                <p className="mt-8 max-w-3xl text-lg leading-relaxed text-cream/80 md:text-xl">{meetFounders.intro}</p>
              </Reveal>
            </div>
          </div>

          <ul className="mt-16 grid gap-6 md:mt-24 md:grid-cols-2 md:gap-8">
            {meetFounders.people.map((f, i) => (
              <li key={f.name} className={cn(i === 1 && "md:mt-24")}>
                <Reveal delay={i * 0.1}>
                  <article className="group">
                    <div className="relative overflow-hidden rounded-[2rem]">
                      <div className="transition-transform duration-[1000ms] ease-vink group-hover:scale-[1.04] motion-reduce:transition-none">
                        <MediaSlot id={f.image} sizes="(min-width: 768px) 45vw, 100vw" />
                      </div>
                      <span className="absolute left-5 top-5 rounded-full bg-cream/90 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-burgundy">
                        0{i + 1} — {f.role}
                      </span>
                    </div>
                    <h3 className="display mt-6 text-mega leading-[0.8] transition-colors duration-500 group-hover:text-rose">
                      {f.name}
                    </h3>
                    <p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-rose">{f.role}</p>
                    <div className="mt-5 space-y-4 text-base leading-relaxed text-cream/80 md:text-lg">
                      {f.bio.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal className="mt-20 grid gap-8 border-t border-cream/15 pt-12 md:mt-28 lg:grid-cols-12 lg:items-end">
            <p className="display text-headline lg:col-span-7">{meetFounders.closingTitle}</p>
            <div className="lg:col-span-5">
              <p className="text-lg leading-relaxed text-cream/80">{meetFounders.closing}</p>
              <p className="display mt-6 text-3xl text-rose">Think with Vink.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
