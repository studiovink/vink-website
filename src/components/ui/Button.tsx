import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Variant = "light" | "dark" | "burgundy" | "numa" | "numaLight" | "numaOutline";

const pill: Record<Variant, string> = {
  light: "bg-cream text-charcoal",
  dark: "bg-ink-3 text-cream ring-1 ring-white/10",
  burgundy: "bg-burgundy text-cream",
  /* NUMA: blanco y negro. */
  numa: "bg-numa-deep text-numa-light",
  numaLight: "bg-white text-charcoal",
  numaOutline: "bg-transparent text-current ring-1 ring-current",
};

/** Flecha fina que acompaña a los CTA. Toma el color del texto. */
export function ArrowDot({ className }: { variant?: Variant; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex size-4 shrink-0 items-center justify-center opacity-80 transition-transform duration-500 ease-vink group-hover:translate-x-1 motion-reduce:transition-none",
        className,
      )}
    >
      <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.25">
        <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
      </svg>
    </span>
  );
}

type PillLinkProps = ComponentProps<typeof Link> & { variant?: Variant; wide?: boolean };

/** CTA principal: píldora sobria con flecha fina. */
export function PillLink({ variant = "light", wide, className, children, ...props }: PillLinkProps) {
  return (
    <Link
      {...props}
      className={cn(
        "group inline-flex min-h-11 items-center gap-3 rounded-full px-6 text-[13px] font-medium tracking-wide transition-opacity duration-300 hover:opacity-90",
        wide && "w-full justify-between",
        pill[variant],
        className,
      )}
    >
      <span className={cn(wide && "flex-1 text-center")}>{children}</span>
      <ArrowDot variant={variant} />
    </Link>
  );
}

type PillButtonProps = ComponentProps<"button"> & { variant?: Variant; wide?: boolean };

export function PillButton({ variant = "light", wide, className, children, ...props }: PillButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "group inline-flex min-h-11 items-center gap-3 rounded-full px-6 text-[13px] font-medium tracking-wide transition-opacity duration-300 hover:opacity-90 disabled:cursor-wait disabled:opacity-70",
        wide && "w-full justify-between",
        pill[variant],
        className,
      )}
    >
      <span className={cn(wide && "flex-1 text-center")}>{children}</span>
      <ArrowDot variant={variant} />
    </button>
  );
}

/** Enlace de texto en mayúsculas condensadas ("LEARN MORE"). */
export function TextLink({ className, children, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      className={cn(
        "display inline-flex items-center gap-2 text-base underline decoration-1 underline-offset-4 transition-colors hover:decoration-2",
        className,
      )}
    >
      {children}
    </Link>
  );
}
