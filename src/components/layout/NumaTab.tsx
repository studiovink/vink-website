"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { getAsset } from "@/content/assets";

/**
 * Pestaña fija hacia la landing de NUMA Real Estate.
 * Escritorio: lengüeta vertical en el borde derecho. Celular: píldora abajo a la izquierda.
 * Aparece después del hero para no competir con la primera impresión.
 */
export function NumaTab() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(pathname !== "/");
  const logo = getAsset("numa.logo.black");

  useEffect(() => {
    if (pathname !== "/") return;
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <Link
      href="/numa-real-estate"
      aria-label="Ir a NUMA Real Estate, submarca de VINK para propiedades, hoteles y yates"
      className={cn(
        "group fixed z-40 flex items-center gap-2 bg-white text-charcoal shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] transition-all duration-500 ease-vink",
        // Celular: píldora inferior izquierda
        "bottom-4 left-4 rounded-full py-2 pl-3 pr-4",
        // Escritorio: lengüeta vertical en el borde derecho
        "md:bottom-auto md:left-auto md:right-0 md:top-1/2 md:-translate-y-1/2 md:flex-col md:rounded-l-2xl md:rounded-r-none md:px-3 md:py-5 md:hover:pr-5",
        visible ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0 md:translate-x-full md:translate-y-[-50%]",
      )}
    >
      {logo.src ? (
        // eslint-disable-next-line @next/next/no-img-element -- logo de tamaño libre
        <img src={logo.src} alt="" className="h-4 w-auto md:h-auto md:w-10" />
      ) : (
        <span className="display text-base">NUMA</span>
      )}
      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] md:[writing-mode:vertical-rl] md:rotate-180">
        Real Estate
      </span>
      <span aria-hidden className="text-sm transition-transform group-hover:translate-x-0.5 md:hidden">
        →
      </span>
    </Link>
  );
}
