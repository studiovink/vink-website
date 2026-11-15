import { cn } from "@/lib/cn";

/**
 * Encabezado de sección estilo editorial: ⊕ (01) ETIQUETA ……… (01)
 */
export function SectionLabel({
  index,
  children,
  className,
  tone = "dark",
  dotClass,
}: {
  /** Color del punto ⊕ (por defecto, el vino de VINK sobre oscuro). */
  dotClass?: string;
  index?: number;
  children: React.ReactNode;
  className?: string;
  /** dark = sobre fondo oscuro; light = sobre fondo claro */
  tone?: "dark" | "light";
}) {
  const n = index !== undefined ? `(${String(index).padStart(2, "0")})` : null;
  return (
    <div className={cn("flex items-center justify-between gap-4", tone === "dark" ? "text-cream" : "text-charcoal", className)}>
      <p className="label flex items-center gap-2.5">
        <span
          aria-hidden
          className={cn(
            "inline-flex size-4 items-center justify-center rounded-full text-[10px] leading-none",
            dotClass ?? (tone === "dark" ? "bg-burgundy text-cream" : "bg-charcoal text-cream"),
          )}
        >
          +
        </span>
        {n && <span className="opacity-60">{n}</span>}
        <span>{children}</span>
      </p>
      {n && <span className="label opacity-60">{n}</span>}
    </div>
  );
}
