import { z } from "zod";

export const serviceOptions = [
  { value: "creative-studio", label: "VINK Creative Studio — Producción visual e IA" },
  { value: "branding", label: "VINK Branding — Identidad de marca" },
  { value: "web-studio", label: "VINK Web Studio — Diseño y desarrollo web" },
  { value: "social-content", label: "VINK Social & Content — Redes sociales mensual" },
  { value: "unsure", label: "No estoy seguro todavía" },
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, { error: "Cuéntanos tu nombre." }).max(120),
  brand: z.string().trim().max(160).optional().default(""),
  email: z.email({ error: "Escribe un correo válido." }).max(200),
  service: z.enum(serviceOptions.map((s) => s.value) as [string, ...string[]], {
    error: "Elige una opción.",
  }),
  message: z
    .string()
    .trim()
    .min(10, { error: "Cuéntanos un poco más sobre tu proyecto (mínimo 10 caracteres)." })
    .max(4000),
  privacy: z.literal("on", { error: "Necesitamos que aceptes el Aviso de Privacidad." }),
});

export type ContactField = keyof z.infer<typeof contactSchema>;

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<ContactField, string>>;
      /** Valores enviados, para no perder lo escrito (React reinicia el formulario). */
      values?: Partial<Record<ContactField, string>>;
    };
