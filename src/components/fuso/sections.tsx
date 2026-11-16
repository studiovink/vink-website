/* eslint-disable @next/next/no-img-element -- logos SVG locales: no pasan por el optimizador */
import Image from "next/image";
import { FUSO_BRAND, FUSO_IMAGES, fuso } from "@/content/fuso";
import { DishCard } from "./DishCard";
import { FusoButton } from "./FusoButton";
import { GalleryGrid } from "./GalleryGrid";
import { Lines } from "./Lines";

/** Historia: panel lavanda con el texto editorial y la chef recortada. */
export function StorySection() {
  const { story } = fuso;
  return (
    <section className="fu-panel fu-story" id="historia" aria-labelledby="fuso-story-heading">
      <div className="fu-story-copy fu-reveal">
        <h2 id="fuso-story-heading">
          <Lines lines={story.titleLines} />
        </h2>
        <p>{story.body}</p>
        <p className="fu-story-note">
          <Lines lines={story.secondaryLines} />
        </p>
        <a href="#oficio" className="fu-text-link">
          {story.link} <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="fu-story-portrait fu-reveal">
        <span className="fu-portrait-word" aria-hidden="true">
          FATTO
          <br />A MANO
        </span>
        <Image
          src={`${FUSO_IMAGES}/chef.webp`}
          width={1086}
          height={1448}
          alt={story.imageAlt}
          sizes="(max-width: 760px) 90vw, 45vw"
        />
      </div>
    </section>
  );
}

/** Carta destacada: cuatro platos escalonados y la copa de aperitivo a un lado. */
export function FeaturedMenu() {
  const { menu } = fuso;
  return (
    <section className="fu-panel fu-menu-section" id="carta" aria-labelledby="fuso-menu-heading">
      <div className="fu-section-heading fu-reveal">
        <h2 id="fuso-menu-heading">
          <Lines lines={menu.titleLines} />
        </h2>
        <p>{menu.intro}</p>
      </div>
      <div className="fu-menu-layout">
        <div className="fu-featured-grid fu-reveal">
          {menu.items.slice(0, 4).map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
        <aside className="fu-aperitivo fu-reveal" aria-label="Aperitivo">
          <Image
            src={`${FUSO_IMAGES}/spritz.webp`}
            width={1024}
            height={1536}
            alt="Spritz de naranja en copa con hielo"
            sizes="(max-width: 760px) 45vw, 30vw"
          />
          <p>
            <Lines lines={menu.aperitivoLines} />
          </p>
          <FusoButton action="menu" category="Aperitivo" variant="plum">
            {menu.aperitivoCta}
          </FusoButton>
        </aside>
      </div>
      <div className="fu-menu-footer">
        <FusoButton action="menu" variant="plum" roll>
          {menu.fullMenuCta}
        </FusoButton>
        <p>{menu.shortNote}</p>
      </div>
    </section>
  );
}

/** Espacio: la foto del interior a escala amplia con un bloque berenjena sólido. */
export function SpaceSection() {
  const { space } = fuso;
  return (
    <section className="fu-panel fu-atmosphere" id="espacio" aria-labelledby="fuso-space-heading">
      <Image
        className="fu-atmosphere-photo"
        src={`${FUSO_IMAGES}/interior.webp`}
        width={1536}
        height={1024}
        alt={space.imageAlt}
        sizes="(max-width: 1600px) 95vw, 1440px"
      />
      <div className="fu-space-copy fu-reveal">
        <h2 id="fuso-space-heading">
          <Lines lines={space.titleLines} />
        </h2>
        <p>{space.body}</p>
        <FusoButton action="reserve" roll>
          {fuso.reserve.cta}
        </FusoButton>
      </div>
    </section>
  );
}

/** Oficio: manos preparando pasta y un proceso breve, a ritmo más tranquilo. */
export function CraftSection() {
  const { craft } = fuso;
  return (
    <section className="fu-panel fu-craft" id="oficio" aria-labelledby="fuso-craft-heading">
      <div className="fu-craft-copy fu-reveal">
        <h2 id="fuso-craft-heading">
          <Lines lines={craft.titleLines} />
        </h2>
        <p>{craft.body}</p>
        <ol className="fu-craft-steps">
          {craft.steps.map((step) => (
            <li key={step.title}>
              <strong>{step.title}</strong>
              <span>{step.body}</span>
            </li>
          ))}
        </ol>
      </div>
      <figure className="fu-craft-photo fu-reveal">
        <Image
          src={`${FUSO_IMAGES}/hands.webp`}
          width={1536}
          height={1024}
          alt={craft.imageAlt}
          sizes="(max-width: 760px) 90vw, 45vw"
        />
        <figcaption>{craft.caption}</figcaption>
      </figure>
    </section>
  );
}

/** Galería: fotografías inclinadas que se amplían en un visor accesible. */
export function Gallery() {
  return (
    <section className="fu-gallery" id="galeria" aria-labelledby="fuso-gallery-heading">
      <h2 id="fuso-gallery-heading" className="fu-reveal">
        <Lines lines={fuso.gallery.titleLines} />
      </h2>
      <GalleryGrid />
    </section>
  );
}

/** Reservas: cierre lavanda con CTA claro y el plato de ravioli. */
export function ReservationSection() {
  const { reserve, business } = fuso;
  return (
    <section className="fu-panel fu-reservation" id="reservas" aria-labelledby="fuso-reserve-heading">
      <div className="fu-reveal">
        <h2 id="fuso-reserve-heading">
          <Lines lines={reserve.titleLines} />
        </h2>
        <p>{reserve.body}</p>
        <FusoButton action="reserve" variant="plum" roll>
          {reserve.cta}
        </FusoButton>
        <p className="fu-small">{business.reservationEndpoint ? reserve.confirmation : reserve.conceptNote}</p>
      </div>
      <Image
        className="fu-reserve-plate fu-reveal"
        src={`${FUSO_IMAGES}/ravioli.webp`}
        width={1254}
        height={1254}
        alt={reserve.plateAlt}
        sizes="(max-width: 760px) 90vw, 40vw"
      />
    </section>
  );
}

/** Datos reales del negocio: sólo se listan los que ya estén configurados. */
function businessLines() {
  const { business } = fuso;
  const lines: { label: string; href?: string }[] = [];
  const place = [business.address, business.city].filter(Boolean).join(", ");
  if (place) lines.push({ label: place });
  if (business.hours) lines.push({ label: business.hours });
  if (business.phone) lines.push({ label: business.phone, href: `tel:${business.phone.replace(/[^\d+]/g, "")}` });
  if (business.whatsapp)
    lines.push({ label: "WhatsApp", href: `https://wa.me/${business.whatsapp.replace(/\D/g, "")}` });
  if (business.email) lines.push({ label: business.email, href: `mailto:${business.email}` });
  if (business.instagram)
    lines.push({
      label: `Instagram @${business.instagram.replace(/^@/, "")}`,
      href: `https://www.instagram.com/${business.instagram.replace(/^@/, "")}`,
    });
  return lines;
}

export function SiteFooter() {
  const { footer, brand } = fuso;
  const contact = businessLines();
  return (
    <footer className="fu-footer">
      <div>
        <a href="#inicio" aria-label="Volver al inicio">
          <img
            className="fu-footer-logo"
            src={`${FUSO_BRAND}/fuso-butter.svg`}
            width={250}
            height={127}
            alt="FUSO"
            loading="lazy"
          />
        </a>
        <p>{brand.descriptor}</p>
      </div>
      <nav aria-label="Pie de página">
        {footer.links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <div className="fu-footer-info">
        {contact.length > 0 ? (
          <ul className="fu-footer-contact">
            {contact.map((line) => (
              <li key={line.label}>{line.href ? <a href={line.href}>{line.label}</a> : line.label}</li>
            ))}
          </ul>
        ) : (
          <p>{footer.pendingLabel}</p>
        )}
        <p className="fu-concept-note">
          {footer.conceptLabel}
          <br />
          {footer.imagesLabel}
          <br />© {footer.copyright}
        </p>
      </div>
    </footer>
  );
}
