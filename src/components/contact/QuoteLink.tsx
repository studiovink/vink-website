"use client";

import type { ComponentProps } from "react";
import { PillLink } from "@/components/ui/Button";
import type { ServiceSlug } from "@/content/site";

export const SERVICE_EVENT = "vink:select-service";

/**
 * CTA de cotización: baja al formulario de contacto y deja el servicio
 * preseleccionado. Sin JavaScript funciona como enlace normal a #contact.
 */
export function QuoteLink({
  service,
  ...props
}: Omit<ComponentProps<typeof PillLink>, "href"> & { service: ServiceSlug }) {
  return (
    <PillLink
      {...props}
      href={`/?service=${service}#contact`}
      onClick={() => window.dispatchEvent(new CustomEvent(SERVICE_EVENT, { detail: service }))}
    />
  );
}
