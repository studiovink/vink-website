"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/cn";
import { mainNav, serviceHref, site, specialties, subBrands } from "@/content/site";

/**
 * Header editorial: logo + subtítulo, datos de contacto en columnas,
 * botón de contacto y botón de menú (menú a pantalla completa).
 */
export function Header() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 240 && y > prev && !menuOpen);
  });

  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const wa = site.contact.whatsapp[0];

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 text-cream transition-colors duration-500",
          scrolled && !menuOpen && "bg-ink/70 backdrop-blur-md",
        )}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-cream focus:px-4 focus:py-2 focus:text-charcoal"
        >
          Saltar al contenido
        </a>
        <div className="container-vink flex h-20 items-center justify-between gap-6 md:h-24">
          <Link href="/" aria-label="VINK Creative Studio — inicio" className="flex flex-col gap-1.5">
            <Logo className="h-5 md:h-6" />
            <span className="text-[10px] font-medium uppercase tracking-[0.06em] text-cream/65">Creative Studio</span>
          </Link>

          <dl className="hidden items-start gap-12 text-[11px] uppercase xl:flex">
            <div>
              <dt className="font-medium">Email</dt>
              <dd className="mt-1 text-cream/65">
                <a href={`mailto:${site.contact.email}`} className="hover:text-cream">
                  {site.contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-medium">Ubicación</dt>
              <dd className="mt-1 text-cream/65">Los Cabos · Guadalajara</dd>
            </div>
            <div>
              <dt className="font-medium">WhatsApp</dt>
              <dd className="mt-1 text-cream/65">
                <a href={`https://wa.me/${wa.number}`} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
                  {wa.display}
                </a>
              </dd>
            </div>
          </dl>

          <div className="flex items-center gap-2">
            <Link
              href="/#contact"
              className="hidden min-h-10 items-center rounded-full bg-burgundy px-5 text-[11px] font-semibold uppercase tracking-[0.04em] text-cream transition-opacity hover:opacity-90 sm:inline-flex"
            >
              Contact us
            </Link>
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setMenuOpen((o) => !o)}
              className="inline-flex size-10 items-center justify-center rounded-full bg-cream text-charcoal transition-opacity hover:opacity-90"
            >
              <span className="relative block h-2.5 w-4" aria-hidden>
                <span
                  className={cn(
                    "absolute left-0 top-0 h-px w-4 bg-current transition-transform duration-300",
                    menuOpen && "translate-y-[5px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-px w-4 bg-current transition-transform duration-300",
                    menuOpen && "-translate-y-[4px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Fuera del header: su transform rompería el `position: fixed` del panel. */}
      <AnimatePresence>{menuOpen && <SiteMenu pathname={pathname} />}</AnimatePresence>
    </>
  );
}

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return false;
  return pathname.startsWith(href);
}

/** Menú a pantalla completa. */
function SiteMenu({ pathname }: { pathname: string }) {
  return (
    <motion.nav
      id="site-menu"
      aria-label="Menú"
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-40 overflow-y-auto bg-ink text-cream"
    >
      <div className="container-vink grid min-h-full gap-12 pb-12 pt-28 md:pt-36 lg:grid-cols-12">
        <ul className="lg:col-span-7">
          {mainNav.map((item, i) => (
            <li key={item.label} className="border-b border-cream/10">
              <Link
                href={item.href}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                className="group flex items-baseline gap-4 py-3 md:py-4"
              >
                <span className="text-xs text-cream/45">(0{i + 1})</span>
                <span className="display text-5xl uppercase transition-colors group-hover:text-cream/60 md:text-7xl">
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex flex-col justify-between gap-10 lg:col-span-4 lg:col-start-9">
          <div>
            <p className="label text-cream/55">Services</p>
            <ul className="mt-5 space-y-1">
              {specialties.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={serviceHref(s.slug)}
                    className="flex min-h-11 items-center justify-between border-b border-cream/10 text-base text-cream/85 hover:text-cream"
                  >
                    {s.name}
                    <span aria-hidden>→</span>
                  </Link>
                </li>
              ))}
              {subBrands.map((b) => (
                <li key={b.slug}>
                  <Link
                    href={b.href}
                    className="flex min-h-11 items-center justify-between border-b border-cream/10 text-base text-cream/50 hover:text-cream"
                  >
                    {b.name}
                    <span aria-hidden>→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <a href={`mailto:${site.contact.email}`} className="text-sm text-cream/70 hover:text-cream">
              {site.contact.email}
            </a>
            <p className="display mt-4 text-4xl uppercase">
              Think with <span className="text-cream/50">Vink.</span>
            </p>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
