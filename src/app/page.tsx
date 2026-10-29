import { ContactSection } from "@/components/sections/ContactSection";
import { About } from "@/components/sections/home/About";
import { Hero } from "@/components/sections/home/Hero";
import { Philosophy } from "@/components/sections/home/Philosophy";
import { Services } from "@/components/sections/home/Services";
import { SignatureWorkSection } from "@/components/sections/home/SignatureWorkSection";
import { Specialties } from "@/components/sections/home/Specialties";
import { Transformation } from "@/components/sections/home/Transformation";
import { UseCases } from "@/components/sections/home/UseCases";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Philosophy />
      <Transformation />
      <Services />
      <SignatureWorkSection />
      <UseCases />
      <Specialties />
      <ContactSection />
    </>
  );
}
