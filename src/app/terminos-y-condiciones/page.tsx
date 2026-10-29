import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { termsAndConditions } from "@/content/legal";

export const metadata: Metadata = {
  title: termsAndConditions.title,
  description: "Condiciones generales de uso del sitio web de VINK Creative Studio.",
};

export default function TermsPage() {
  return <LegalPage doc={termsAndConditions} />;
}
