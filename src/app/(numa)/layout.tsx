import type { Viewport } from "next";
import { NumaFooter } from "@/components/numa/NumaFooter";
import { NumaHeader } from "@/components/numa/NumaHeader";

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

/** Landing de NUMA Real Estate: versión blanca con su propio header y footer. */
export default function NumaLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex min-h-dvh flex-1 flex-col bg-white text-charcoal">
      <NumaHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <NumaFooter />
    </div>
  );
}
