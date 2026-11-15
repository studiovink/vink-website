import Image from "next/image";
import { getAsset, type AssetId, type AssetTone } from "@/content/assets";
import { cn } from "@/lib/cn";
import { LoopVideo } from "./LoopVideo";

type MediaSlotProps = {
  id: AssetId;
  className?: string;
  /** Ocupa todo el contenedor padre (posicionado) en lugar de usar su proporción. */
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  /** Oculta la etiqueta de desarrollo (para miniaturas pequeñas). */
  quiet?: boolean;
  /** Videos: "preview" se reproduce al pasar el cursor (o visible en táctil). */
  videoMode?: "loop" | "preview";
};

/*
 * Espacios reservados: colores planos y neutros (sin degradados ni brillos),
 * para que no compitan con el diseño mientras llegan las fotos reales.
 */
const toneClasses: Record<AssetTone, string> = {
  burgundy: "bg-[#1a1617] text-cream/40",
  rose: "bg-[#171415] text-cream/40",
  cream: "bg-[#161415] text-cream/40",
  charcoal: "bg-[#141213] text-cream/40",
  /* NUMA (landing blanca) */
  sage: "bg-[#e9e8e3] text-charcoal/40",
  red: "bg-[#e9e8e3] text-charcoal/40",
  light: "bg-[#e1e4dc] text-charcoal/40",
};

/**
 * Espacio visual gestionado desde `src/content/assets.ts`.
 * Sin archivo → espacio reservado con la proporción exacta.
 */
export function MediaSlot({ id, className, fill, sizes, priority, quiet, videoMode }: MediaSlotProps) {
  const asset = getAsset(id);
  const [w, h] = asset.ratio.split(":").map(Number);
  const box = cn(
    "overflow-hidden",
    fill ? "absolute inset-0" : "relative w-full",
    toneClasses[asset.tone],
    className,
  );
  const style = fill ? undefined : { aspectRatio: `${w} / ${h}` };

  if (!asset.src) {
    return (
      <div className={box} style={style} role={asset.alt ? "img" : undefined} aria-label={asset.alt || undefined}>
        {process.env.NODE_ENV !== "production" && !quiet && (
          <span className="absolute bottom-3 left-3 rounded-full bg-black/25 px-2.5 py-1 font-mono text-[10px] tracking-wide text-white/80 backdrop-blur">
            {id} · {asset.ratio} · pendiente
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={box} style={style}>
      {asset.kind === "video" ? (
        <LoopVideo
          src={asset.src}
          srcMobile={asset.srcMobile ?? undefined}
          poster={asset.poster ?? undefined}
          posterMobile={asset.posterMobile ?? undefined}
          label={asset.alt}
          mode={videoMode}
        />
      ) : (
        <Image
          src={asset.src}
          alt={asset.alt}
          fill
          sizes={sizes ?? "100vw"}
          priority={priority}
          className="object-cover"
        />
      )}
      {asset.isConcept && (
        <span className="absolute right-3 top-3 rounded-full bg-cream/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-burgundy">
          Campaña conceptual
        </span>
      )}
    </div>
  );
}
