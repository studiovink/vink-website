import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Cuéntanos tu idea y preparemos una propuesta personalizada. Let's work together — Think with Vink.",
};

export default function ContactPage() {
  return <ContactSection headingLevel="h1" />;
}
