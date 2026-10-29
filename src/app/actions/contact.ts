"use server";

import { site } from "@/content/site";
import { contactSchema, serviceOptions, type ContactState } from "@/lib/contact-schema";

/*
 * Envío del formulario de contacto.
 * Variables de entorno (ver .env.example):
 *   RESEND_API_KEY   clave de Resend (obligatoria para enviar)
 *   CONTACT_FROM     remitente, p. ej. "VINK Web <onboarding@resend.dev>"
 *   CONTACT_TO       destinatario (por defecto studiovink27@gmail.com)
 */

const MIN_FILL_MS = 3000;

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Antispam: campo trampa invisible y tiempo mínimo de llenado.
  if (String(formData.get("company_website") ?? "") !== "") return { status: "success" };
  const startedAt = Number(formData.get("started_at") ?? 0);
  if (!startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return {
      status: "error",
      message: "Espera un momento y vuelve a enviarlo, por favor.",
      values: Object.fromEntries(
        ["name", "brand", "email", "service", "message"].map((k) => [k, String(formData.get(k) ?? "")]),
      ),
    };
  }

  const raw = Object.fromEntries(formData);
  const values = Object.fromEntries(
    ["name", "brand", "email", "service", "message", "privacy"].map((k) => [k, String(raw[k] ?? "")]),
  );

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0]);
      fieldErrors[key] ??= issue.message;
    }
    return { status: "error", message: "Revisa los campos marcados.", fieldErrors, values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY no configurada");
    return {
      status: "error",
      message: `El formulario aún no está activo. Escríbenos a ${site.contact.email} y te respondemos pronto.`,
      values,
    };
  }

  const data = parsed.data;
  const serviceLabel = serviceOptions.find((s) => s.value === data.service)?.label ?? data.service;
  const text = [
    `Nombre: ${data.name}`,
    `Marca o negocio: ${data.brand || "—"}`,
    `Correo: ${data.email}`,
    `Servicio: ${serviceLabel}`,
    "",
    "Proyecto:",
    data.message,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM ?? "VINK Web <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO ?? site.contact.email],
        reply_to: data.email,
        subject: `Nueva solicitud: ${data.name}${data.brand ? ` (${data.brand})` : ""} — ${serviceLabel}`,
        text,
      }),
    });
    if (!res.ok) {
      console.error("[contact] Resend respondió", res.status, await res.text());
      throw new Error("send failed");
    }
  } catch {
    return {
      status: "error",
      message: `No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos a ${site.contact.email}.`,
      values,
    };
  }

  return { status: "success" };
}
