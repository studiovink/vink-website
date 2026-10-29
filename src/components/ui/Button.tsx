import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Variant = "light" | "dark" | "burgundy";

const pill: Record<Variant, string> = {
  light: "bg-cream text-charcoal",
  dark: "bg-charcoal text-cream",
  burgundy: "bg-burgundy text-cream",
};

const dot: Record<Variant, string> = {
  light: "bg-burgundy text-cream",
  dark: "bg-rose text-burgundy",
  burgundy: "bg-rose text-burgundy",
};

/** Flecha dentro de un círculo, como en los CTA "Start a project". */
export function ArrowDot({ variant = "light", className }: { variant?: Variant; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex size-9 shrink-0 items-center justify-center rounded-full transition-transform duration-500 ease-vink group-hover:-rotate-45 motion-reduce:transition-none",
        dot[variant],
        className,
      )}
    >
      <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
      </svg>
    </span>
  );
}

type PillLinkProps = ComponentProps<typeof Link> & { variant?: Variant; wide?: boolean };

/** CTA principal en píldora con flecha. */
export function PillLink({ variant = "light", wide, className, children, ...props }: PillLinkProps) {
  return (
    <Link
      {...props}
      className={cn(
        "group inline-flex min-h-12 items-center gap-4 rounded-full py-1.5 pl-6 pr-1.5 text-sm font-medium transition-shadow duration-300 hover:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)]",
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
        "group inline-flex min-h-12 items-center gap-4 rounded-full py-1.5 pl-6 pr-1.5 text-sm font-medium transition-shadow duration-300 hover:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)] disabled:cursor-wait disabled:opacity-70",
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
