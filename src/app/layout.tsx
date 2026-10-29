import type { Metadata, Viewport } from "next";
import { MotionConfig } from "motion/react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/content/site";
import { bodyFont, headingFont } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.concept}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
  },
};

export const viewport: Viewport = {
  themeColor: "#3F1521",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${bodyFont.variable} ${headingFont.variable}`}>
      <body className="flex min-h-dvh flex-col">
        {/* reducedMotion="user": respeta la preferencia del dispositivo en todas las animaciones */}
        <MotionConfig reducedMotion="user">
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </MotionConfig>
      </body>
    </html>
  );
}
