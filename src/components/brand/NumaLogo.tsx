import { getAsset } from "@/content/assets";
import { cn } from "@/lib/cn";

/**
 * Logo de NUMA Real Estate. Usa el archivo oficial si existe en
 * public/media/numa/ (numa-logo-white / numa-logo-black); si no, muestra
 * el nombre con la tipografía de VINK.
 */
export function NumaLogo({ variant = "white", className }: { variant?: "white" | "black"; className?: string }) {
  const logo = getAsset(variant === "white" ? "numa.logo.white" : "numa.logo.black");

  if (logo.src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- logo SVG/PNG de tamaño libre
      <img src={logo.src} alt={logo.alt} className={cn("h-10 w-auto", className)} />
    );
  }

  return (
    <span
      role="img"
      aria-label="NUMA Real Estate"
      className={cn("inline-flex flex-col leading-none", variant === "white" ? "text-cream" : "text-charcoal", className)}
    >
      <span className="display text-[1em] tracking-[0.08em]">NUMA</span>
      <span className="mt-[0.15em] text-[0.22em] font-semibold uppercase tracking-[0.45em]">Real Estate</span>
    </span>
  );
}
