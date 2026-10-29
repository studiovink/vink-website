import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "cream" | "ghost";

const variants: Record<Variant, string> = {
  primary: "bg-burgundy text-cream hover:bg-charcoal",
  outline:
    "border border-current text-current hover:bg-burgundy hover:border-burgundy hover:text-cream",
  cream: "bg-cream text-burgundy hover:bg-rose",
  ghost: "text-current underline-offset-4 hover:underline",
};

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  arrow?: boolean;
};

export function ButtonLink({
  variant = "primary",
  arrow = false,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      {...props}
      className={cn(
        "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold tracking-wide transition-colors duration-300 ease-vink",
        variants[variant],
        className,
      )}
    >
      {children}
      {arrow && (
        <span
          aria-hidden
          className="transition-transform duration-300 ease-vink group-hover:translate-x-1 motion-reduce:transition-none"
        >
          →
        </span>
      )}
    </Link>
  );
}
