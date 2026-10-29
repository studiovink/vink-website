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
};

const toneClasses: Record<AssetTone, string> = {
  burgundy:
    "bg-[radial-gradient(120%_90%_at_70%_20%,#6b2a3b_0%,#3f1521_45%,#2c0e17_100%)] text-cream/50",
  rose: "bg-[radial-gradient(120%_90%_at_30%_20%,#ead0c9_0%,#d8b7af_50%,#c99d93_100%)] text-burgundy/50",
  cream:
    "bg-[radial-gradient(120%_90%_at_50%_10%,#fbf8f4_0%,#ebe2d8_70%,#e0d4c7_100%)] text-burgundy/40",
  charcoal:
    "bg-[radial-gradient(120%_90%_at_60%_10%,#3a3236_0%,#171416_70%)] text-cream/40",
};

/**
 * Espacio visual gestionado desde `src/content/assets.ts`.
 * Sin archivo → espacio reservado con la proporción exacta.
 */
export function MediaSlot({ id, className, fill, sizes, priority, quiet }: MediaSlotProps) {
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
        <div aria-hidden className="grain absolute inset-0" />
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
