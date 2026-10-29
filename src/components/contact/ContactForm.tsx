"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { sendContact } from "@/app/actions/contact";
import { PillButton } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { serviceOptions, type ContactField, type ContactState } from "@/lib/contact-schema";

const initial: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, initial);
  const startedAt = useRef(0);
  const serviceRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
    // Preselecciona el servicio si se llega desde un CTA (?service=branding)
    const s = new URLSearchParams(window.location.search).get("service");
    if (s && serviceRef.current && serviceOptions.some((o) => o.value === s)) {
      serviceRef.current.value = s;
    }
  }, []);

  // Se adjunta al enviar: un reinicio del formulario no puede borrarlo.
  const submit = (formData: FormData) => {
    formData.set("started_at", String(startedAt.current));
    action(formData);
  };

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-[2rem] bg-cream p-8 text-charcoal md:p-10">
        <p className="display text-5xl text-burgundy">¡Gracias!</p>
        <p className="mt-4 text-lg">
          Recibimos tu mensaje. Revisaremos tu idea y nos pondremos en contacto contigo muy pronto.
        </p>
        <p className="display mt-8 text-2xl text-burgundy">Think with Vink.</p>
      </div>
    );
  }

  const err = (f: ContactField) =>
    state.status === "error" ? state.fieldErrors?.[f] : undefined;
  const val = (f: ContactField) => (state.status === "error" ? state.values?.[f] : undefined);

  return (
    <form action={submit} noValidate className="rounded-[2rem] bg-cream p-6 text-charcoal md:p-10">
      <p className="display text-3xl text-burgundy md:text-4xl">Tell us about your project.</p>
      <p className="mt-2 text-sm text-charcoal-soft">Nos encantaría conocer tu idea.</p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <Field label="¿Cómo te llamas?" name="name" defaultValue={val("name")} error={err("name")} autoComplete="name" required />
        <Field label="¿Cuál es tu marca o negocio?" name="brand" defaultValue={val("brand")} error={err("brand")} autoComplete="organization" />
        <Field
          label="¿Cuál es tu correo electrónico?"
          name="email"
          type="email"
          defaultValue={val("email")}
          error={err("email")}
          autoComplete="email"
          required
          className="md:col-span-2"
        />
        <div className="md:col-span-2">
          <label htmlFor="service" className="text-sm font-semibold">
            ¿Qué servicio te interesa? <span aria-hidden className="text-burgundy">*</span>
          </label>
          <select
            id="service"
            name="service"
            required
            ref={serviceRef}
            defaultValue={val("service") ?? ""}
            aria-invalid={Boolean(err("service"))}
            aria-describedby={err("service") ? "service-error" : undefined}
            className={inputClass(Boolean(err("service")))}
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            {serviceOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <FieldError id="service-error" message={err("service")} />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="message" className="text-sm font-semibold">
            Cuéntanos sobre tu proyecto <span aria-hidden className="text-burgundy">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            defaultValue={val("message")}
            aria-invalid={Boolean(err("message"))}
            aria-describedby={err("message") ? "message-error" : undefined}
            placeholder="Qué tienes en mente, qué te gustaría crear o qué buscas mejorar…"
            className={cn(inputClass(Boolean(err("message"))), "resize-y py-3")}
          />
          <FieldError id="message-error" message={err("message")} />
        </div>
      </div>

      {/* Antispam */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          No llenar
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-6">
        <label className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            name="privacy"
            required
            defaultChecked={val("privacy") === "on"}
            aria-invalid={Boolean(err("privacy"))}
            aria-describedby={err("privacy") ? "privacy-error" : undefined}
            className="mt-0.5 size-5 shrink-0 accent-burgundy"
          />
          <span>
            He leído el{" "}
            <Link href="/aviso-de-privacidad" className="font-semibold text-burgundy underline underline-offset-2">
              Aviso de Privacidad
            </Link>{" "}
            y conozco cómo se utilizarán mis datos para atender mi solicitud.
          </span>
        </label>
        <FieldError id="privacy-error" message={err("privacy")} />
      </div>

      {state.status === "error" && (
        <p role="alert" className="mt-6 rounded-2xl bg-burgundy/10 px-4 py-3 text-sm text-burgundy">
          {state.message}
        </p>
      )}

      <PillButton type="submit" variant="dark" wide disabled={pending} className="mt-8">
        {pending ? "Enviando…" : "Enviar solicitud"}
      </PillButton>
    </form>
  );
}

function inputClass(invalid: boolean) {
  return cn(
    "mt-2 block min-h-12 w-full rounded-2xl border bg-white px-4 text-base text-charcoal outline-none transition-colors placeholder:text-charcoal/40 focus:border-burgundy",
    invalid ? "border-burgundy" : "border-charcoal/15",
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  required,
  autoComplete,
  defaultValue,
  className,
}: {
  defaultValue?: string;
  label: string;
  name: string;
  type?: string;
  error?: string;
  required?: boolean;
  autoComplete?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="text-sm font-semibold">
        {label} {required && <span aria-hidden className="text-burgundy">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={inputClass(Boolean(error))}
      />
      <FieldError id={`${name}-error`} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm font-medium text-burgundy">
      {message}
    </p>
  );
}
