import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { NumaTab } from "@/components/layout/NumaTab";

/** Sitio de VINK: versión negra con su header, footer y la pestaña hacia NUMA. */
export default function VinkLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <NumaTab />
    </>
  );
}
