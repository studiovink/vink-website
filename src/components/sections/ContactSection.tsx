import { ContactForm } from "@/components/contact/ContactForm";
import { MaskLines, Reveal } from "@/components/motion/Reveal";
import { contact } from "@/content/home";
import { site, whatsappUrl } from "@/content/site";

export function ContactSection({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const Heading = headingLevel;
  const whatsapp = whatsappUrl("Hola VINK, tengo una idea para mi marca.");

  return (
    <section id="contact" data-header="dark" className="bg-burgundy pb-24 pt-32 text-cream md:pb-32 md:pt-40">
      <div className="container-vink">
        <p className="label text-rose">{contact.label}</p>
        <Heading className="display mt-4 text-giant">
          <MaskLines lines={[contact.title[0], <span key="r" className="text-rose">{contact.title[1]}</span>]} />
        </Heading>

        <div className="mt-16 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-lg leading-relaxed text-cream/85">{contact.intro}</p>
            </Reveal>

            <Reveal className="mt-10" delay={0.1}>
              <p className="text-sm text-cream/70">{contact.direct}</p>
              <div className="mt-4 flex flex-col gap-2">
                <a
                  href={`mailto:${site.contact.email}`}
                  className="display text-2xl underline decoration-rose decoration-1 underline-offset-4 hover:decoration-2 md:text-3xl"
                >
                  {site.contact.email}
                </a>
                {whatsapp && (
                  <a
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="display text-2xl underline decoration-rose decoration-1 underline-offset-4 hover:decoration-2 md:text-3xl"
                  >
                    WhatsApp
                  </a>
                )}
              </div>
            </Reveal>

            <Reveal className="mt-14" delay={0.15}>
              <p className="label text-rose">¿Qué sucede después?</p>
              <ol className="mt-5 border-t border-cream/15">
                {contact.steps.map((s) => (
                  <li key={s.n} className="grid grid-cols-[3rem_1fr] gap-2 border-b border-cream/15 py-4">
                    <span className="text-xs text-cream/60">({s.n})</span>
                    <div>
                      <p className="display text-xl">{s.title}</p>
                      <p className="mt-1 text-sm text-cream/70">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-7" delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
