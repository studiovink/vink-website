"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/cn";
import { mainNav, serviceHref, site, specialties } from "@/content/site";

/**
 * Header flotante con navegación en píldoras.
 * Se adapta al fondo: las secciones oscuras se marcan con `data-header="dark"`.
 */
export function Header() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > 200 && y > prev && !menuOpen);
  });

  // Detecta si el header está sobre una sección oscura.
  useEffect(() => {
    const check = () => {
      const probe = 40;
      const dark = Array.from(document.querySelectorAll<HTMLElement>("[data-header='dark']")).some(
        (el) => {
          const r = el.getBoundingClientRect();
          return r.top <= probe && r.bottom >= probe;
        },
      );
      setOnDark(dark);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [pathname]);

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

  const dark = onDark || menuOpen;

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-120%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-cream focus:px-4 focus:py-2 focus:text-burgundy"
        >
          Saltar al contenido
        </a>
        <div className="container-vink flex h-20 items-center justify-between gap-6 md:h-24">
          <Link
            href="/"
            aria-label="VINK Creative Studio — inicio"
            className={cn(
              "transition-colors duration-300",
              dark ? "text-cream" : "text-burgundy",
            )}
          >
            <Logo className="h-6 md:h-7" />
          </Link>

          <div className="flex items-center gap-1.5">
            <nav aria-label="Principal" className="hidden lg:block">
              <ul className="flex items-center gap-1.5">
                {mainNav.map((item) =>
                  "children" in item ? (
                    <li key={item.label}>
                      <ServicesPill label={item.label} href={item.href} dark={dark} />
                    </li>
                  ) : (
                    <li key={item.label}>
                      <NavPill href={item.href} dark={dark} active={isActive(pathname, item.href)}>
                        {item.label}
                      </NavPill>
                    </li>
                  ),
                )}
              </ul>
            </nav>
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setMenuOpen((o) => !o)}
              className={cn(
                "inline-flex size-11 items-center justify-center rounded-full backdrop-blur-md transition-colors duration-300",
                dark ? "bg-white/10 text-cream hover:bg-white/20" : "bg-burgundy/8 text-burgundy hover:bg-burgundy/15",
                menuOpen && "bg-cream text-burgundy hover:bg-cream",
              )}
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

const pillBase =
  "inline-flex min-h-10 items-center rounded-full px-5 text-[13px] font-medium uppercase tracking-wide backdrop-blur-md transition-colors duration-300";

function pillTone(dark: boolean, active?: boolean) {
  if (active) return dark ? "bg-cream text-burgundy" : "bg-burgundy text-cream";
  return dark
    ? "bg-white/10 text-cream hover:bg-white/20"
    : "bg-burgundy/8 text-burgundy hover:bg-burgundy/15";
}

function NavPill({
  href,
  dark,
  active,
  children,
}: {
  href: string;
  dark: boolean;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} aria-current={active ? "page" : undefined} className={cn(pillBase, pillTone(dark, active))}>
      {children}
    </Link>
  );
}

function ServicesPill({ label, href, dark }: { label: string; href: string; dark: boolean }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const active = pathname.startsWith("/services");

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onScroll = () => setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <div className={cn(pillBase, pillTone(dark, active), "gap-1 pr-2")}>
        <Link href={href} aria-current={active ? "page" : undefined}>
          {label}
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label="Mostrar especialidades"
          onClick={() => setOpen((o) => !o)}
          className="inline-flex size-7 items-center justify-center rounded-full"
        >
          <svg aria-hidden viewBox="0 0 12 12" className={cn("size-3 transition-transform duration-300", open && "rotate-180")}>
            <path d="M2 4.5 6 8l4-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full w-80 pt-2"
          >
            <ul className="overflow-hidden rounded-3xl bg-cream p-2 text-charcoal shadow-[0_30px_70px_-30px_rgba(23,20,22,0.55)]">
              {specialties.map((s, i) => (
                <li key={s.slug}>
                  <Link
                    href={serviceHref(s.slug)}
                    onClick={() => setOpen(false)}
                    className="group flex items-center gap-4 rounded-2xl px-4 py-3 transition-colors hover:bg-cream-deep focus-visible:bg-cream-deep"
                  >
                    <span className="text-xs text-charcoal-soft">(0{i + 1})</span>
                    <span className="flex flex-col">
                      <span className="display text-xl leading-none text-burgundy">{s.short}</span>
                      <span className="mt-1 text-xs text-charcoal-soft">{s.summary}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Menú a pantalla completa (móvil y escritorio, desde el botón de hamburguesa). */
function SiteMenu({ pathname }: { pathname: string }) {
  return (
    <motion.nav
      id="site-menu"
      aria-label="Menú"
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-40 overflow-y-auto bg-burgundy text-cream"
    >
      <div className="container-vink grid min-h-full gap-12 pb-12 pt-28 md:pt-36 lg:grid-cols-12">
        <ul className="lg:col-span-7">
          {mainNav.map((item, i) => (
            <li key={item.label} className="border-b border-cream/15">
              <Link
                href={item.href}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                className="group flex items-baseline gap-4 py-3 md:py-4"
              >
                <span className="text-xs text-cream/50">(0{i + 1})</span>
                <span className="display text-5xl transition-colors group-hover:text-rose md:text-7xl">
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex flex-col justify-between gap-10 lg:col-span-4 lg:col-start-9">
          <div>
            <p className="label text-rose">Services</p>
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
            </ul>
          </div>
          <div>
            <a href={`mailto:${site.contact.email}`} className="text-sm text-cream/75 hover:text-cream">
              {site.contact.email}
            </a>
            <p className="display mt-4 text-4xl text-rose">Think with Vink.</p>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
