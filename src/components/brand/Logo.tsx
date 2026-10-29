import { cn } from "@/lib/cn";
import { LOGO_PATH, LOGO_VIEWBOX } from "./logo-path";

type LogoProps = {
  className?: string;
  title?: string;
};

/** Wordmark oficial de VINK. Toma el color de `currentColor`; el alto lo define `className`. */
export function Logo({ className, title = "VINK" }: LogoProps) {
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      role="img"
      aria-label={title}
      fill="currentColor"
      className={cn("w-auto", className)}
    >
      <path fillRule="evenodd" d={LOGO_PATH} />
    </svg>
  );
}
