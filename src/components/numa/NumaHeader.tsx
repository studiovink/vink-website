"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { NumaLogo } from "@/components/brand/NumaLogo";
import { cn } from "@/lib/cn";

const links = [
  { label: "Nosotros", href: "#about" },
  { label: "Para quién", href: "#selected" },
  { label: "Servicios", href: "#services" },
  { label: "Mercados", href: "#markets" },
  { label: "Contacto", href: "#contact" },
];

/**
 * Header de NUMA: transparente sobre la imagen de inicio (logo blanco) y
 * blanco al bajar (logo negro). "MENU +" abre un menú a pantalla completa.
 */
export function NumaHeader() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const light = !solid && !open; // sobre la imagen

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          light ? "text-white" : "border-b border-charcoal/10 bg-white/90 text-charcoal backdrop-blur-md",
        )}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-charcoal focus:px-4 focus:py-2 focus:text-cream"
        >
          Saltar al contenido
        </a>
        <div className="container-vink flex h-16 items-center justify-between md:h-20">
          <Link href="/numa-real-estate" aria-label="NUMA Real Estate — inicio" onClick={() => setOpen(false)}>
            <NumaLogo variant={light ? "white" : "black"} className="h-5 md:h-6" />
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="hidden text-[11px] font-medium uppercase tracking-[0.06em] opacity-70 hover:opacity-100 sm:block">
              by VINK
            </Link>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="numa-menu"
              onClick={() => setOpen((o) => !o)}
              className="inline-flex min-h-10 items-center gap-2 text-[12px] font-medium uppercase tracking-[0.06em]"
            >
              {open ? "Cerrar" : "Menu"}
              <span aria-hidden className={cn("text-base transition-transform duration-300", open && "rotate-45")}>
                +
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="numa-menu"
            aria-label="NUMA"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-white text-charcoal"
          >
            <div className="container-vink flex min-h-full flex-col justify-between pb-10 pt-28">
              <ul>
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-charcoal/10"
                  >
                    <a href={l.href} onClick={() => setOpen(false)} className="display block py-3 text-5xl hover:text-numa md:text-7xl">
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-sm">
                <a href="#contact" onClick={() => setOpen(false)} className="font-medium underline underline-offset-4">
                  Cotizar mi propiedad
                </a>
                <Link href="/" className="text-charcoal/60 hover:text-charcoal">
                  Una submarca de VINK Creative Studio →
                </Link>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
