"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/cn";
import { mainNav, serviceHref, specialties } from "@/content/site";

export function Header() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Discreto: se oculta al bajar y reaparece al subir.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 160 && y > prev && !menuOpen);
  });

  // Cierra el menú móvil al navegar.
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

  return (
    <>
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || menuOpen ? "bg-cream/90 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-burgundy focus:px-4 focus:py-2 focus:text-cream"
      >
        Saltar al contenido
      </a>
      <div className="container-vink flex h-20 items-center justify-between gap-6">
        <Link href="/" aria-label="VINK Creative Studio — inicio" className="text-burgundy">
          <Logo className="h-6 md:h-7" />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) =>
              "children" in item ? (
                <li key={item.label}>
                  <ServicesDropdown label={item.label} href={item.href} />
                </li>
              ) : (
                <li key={item.label}>
                  <NavLink href={item.href} active={isActive(pathname, item.href)}>
                    {item.label}
                  </NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden min-h-11 items-center rounded-full bg-burgundy px-5 text-sm font-semibold text-cream transition-colors duration-300 hover:bg-charcoal sm:inline-flex"
          >
            Let&apos;s talk
          </Link>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full text-burgundy lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="relative block h-3 w-6" aria-hidden>
              <span
                className={cn(
                  "absolute left-0 top-0 h-0.5 w-6 bg-current transition-transform duration-300",
                  menuOpen && "translate-y-[5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-0.5 w-6 bg-current transition-transform duration-300",
                  menuOpen && "-translate-y-[5px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>
    </motion.header>

    {/* Fuera del header: su transform rompería el `position: fixed` del panel. */}
    <AnimatePresence>
      {menuOpen && <MobileMenu pathname={pathname} />}
    </AnimatePresence>
    </>
  );
}

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return false;
  return pathname.startsWith(href);
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative inline-flex min-h-11 items-center px-3 text-sm font-medium text-charcoal transition-colors hover:text-burgundy",
        "after:absolute after:inset-x-3 after:bottom-2 after:h-px after:origin-left after:scale-x-0 after:bg-burgundy after:transition-transform after:duration-300 hover:after:scale-x-100",
        active && "text-burgundy after:scale-x-100",
      )}
    >
      {children}
    </Link>
  );
}

function ServicesDropdown({ label, href }: { label: string; href: string }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

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
      <div className="flex items-center">
        <NavLink href={href} active={pathname.startsWith("/services")}>
          {label}
        </NavLink>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label="Mostrar especialidades"
          onClick={() => setOpen((o) => !o)}
          className="-ml-2 inline-flex size-8 items-center justify-center text-charcoal hover:text-burgundy"
        >
          <svg
            aria-hidden
            viewBox="0 0 12 12"
            className={cn("size-3 transition-transform duration-300", open && "rotate-180")}
          >
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
            className="absolute left-0 top-full w-80 pt-2"
          >
            <ul className="overflow-hidden rounded-2xl border border-cream-deep bg-cream p-2 shadow-[0_24px_60px_-30px_rgba(63,21,33,0.45)]">
              {specialties.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={serviceHref(s.slug)}
                    onClick={() => setOpen(false)}
                    className="flex flex-col rounded-xl px-4 py-3 transition-colors hover:bg-cream-deep focus-visible:bg-cream-deep"
                  >
                    <span className="text-sm font-semibold text-burgundy">{s.name}</span>
                    <span className="text-xs text-charcoal-soft">{s.summary}</span>
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

function MobileMenu({ pathname }: { pathname: string }) {
  return (
    <motion.nav
      id="mobile-menu"
      aria-label="Principal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-x-0 bottom-0 top-20 z-40 overflow-y-auto bg-cream lg:hidden"
    >
      <ul className="container-vink flex flex-col gap-1 py-6">
        {mainNav.map((item) => (
          <li key={item.label} className="border-b border-cream-deep">
            <Link
              href={item.href}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className="block py-4 text-3xl font-semibold tracking-tight text-burgundy"
            >
              {item.label}
            </Link>
            {"children" in item && (
              <ul className="-mt-1 pb-4">
                {item.children.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={serviceHref(s.slug)}
                      className="flex min-h-11 items-center gap-2 text-base text-charcoal"
                    >
                      <span aria-hidden className="text-rose">—</span>
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <div className="container-vink pb-10">
        <Link
          href="/contact"
          className="flex min-h-12 w-full items-center justify-center rounded-full bg-burgundy text-sm font-semibold text-cream"
        >
          Let&apos;s talk
        </Link>
        <p className="eyebrow mt-8 text-burgundy">Think with Vink.</p>
      </div>
    </motion.nav>
  );
}
