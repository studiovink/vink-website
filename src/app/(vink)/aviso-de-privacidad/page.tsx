import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { privacyPolicy } from "@/content/legal";

export const metadata: Metadata = {
  title: privacyPolicy.title,
  description: "Cómo VINK Creative Studio recopila, utiliza y protege tus datos personales.",
};

export default function PrivacyPage() {
  return <LegalPage doc={privacyPolicy} />;
}
