import { ContactSection } from "@/components/sections/ContactSection";
import { About } from "@/components/sections/home/About";
import { Hero } from "@/components/sections/home/Hero";
import { OurServices } from "@/components/sections/home/OurServices";
import { Philosophy } from "@/components/sections/home/Philosophy";
import { SignatureWorkSection } from "@/components/sections/home/SignatureWorkSection";
import { BrandingSection } from "@/components/sections/specialty/BrandingSection";
import { CreativeStudioSection } from "@/components/sections/specialty/CreativeStudioSection";
import { SocialContentSection } from "@/components/sections/specialty/SocialContentSection";
import { WebStudioSection } from "@/components/sections/specialty/WebStudioSection";

/*
 * Estructura de la página principal (documento "Website structure"):
 * 1 Header · 2 Hero · 3 About Us · 4 Our Philosophy · 5 Our Services ·
 * 6 Creative Studio · 7 Branding · 8 Web Studio · 9 Social & Content ·
 * 10 Our Work · 11 Let's Work Together · 12 Footer
 */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Philosophy />
      <OurServices />
      <CreativeStudioSection />
      <BrandingSection />
      <WebStudioSection />
      <SocialContentSection />
      <SignatureWorkSection />
      <ContactSection />
    </>
  );
}
