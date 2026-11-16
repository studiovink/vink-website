import { FloatingDock } from "@/components/fuso/FloatingDock";
import { HeroScene } from "@/components/fuso/HeroScene";
import { SiteHeader } from "@/components/fuso/SiteHeader";
import {
  CraftSection,
  FeaturedMenu,
  Gallery,
  ReservationSection,
  SiteFooter,
  SpaceSection,
  StorySection,
} from "@/components/fuso/sections";

/*
 * FUSO · Pasta & aperitivo. Una sola página: la carta completa, la reserva y
 * las fotos ampliadas viven en diálogos (ver FusoExperience).
 */
export default function FusoPage() {
  return (
    <>
      <a href="#fuso-contenido" className="fu-skip">
        Ir al contenido
      </a>
      <SiteHeader />
      <FloatingDock />
      <main id="fuso-contenido">
        <HeroScene />
        <StorySection />
        <FeaturedMenu />
        <SpaceSection />
        <CraftSection />
        <Gallery />
        <ReservationSection />
      </main>
      <SiteFooter />
    </>
  );
}
