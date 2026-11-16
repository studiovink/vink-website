"use client";

import { useEffect, useRef, useState, type FormEvent, type RefObject } from "react";
import { fuso } from "@/content/fuso";
import { Lines } from "./Lines";

type Props = { dialogRef: RefObject<HTMLDialogElement | null>; onClose: () => Promise<void> };

type Field = "name" | "email" | "date" | "time" | "guests";
type Errors = Partial<Record<Field, string>>;
type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "demo" }
  | { kind: "received" }
  | { kind: "error" };

const FIELD_ORDER: Field[] = ["name", "email", "date", "time", "guests"];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Fecha local de hoy en formato de <input type="date">. */
function today() {
  const now = new Date();
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

function validate(data: FormData): Errors {
  const errors: Errors = {};
  const text = (name: string) => String(data.get(name) ?? "").trim();
  if (!text("name")) errors.name = "Escribe tu nombre.";
  if (!text("email")) errors.email = "Escribe tu correo electrónico.";
  else if (!EMAIL.test(text("email"))) errors.email = "Revisa el correo: falta algo, por ejemplo tu@correo.com.";
  if (!text("date")) errors.date = "Elige una fecha.";
  else if (text("date") < today()) errors.date = "Esa fecha ya pasó. Elige hoy o un día posterior.";
  if (!text("time")) errors.time = "Elige una hora.";
  if (!text("guests")) errors.guests = "Dinos cuántas personas vienen.";
  return errors;
}

/**
 * Solicitud de mesa. Sin `business.reservationEndpoint` es una demostración:
 * valida los campos y lo dice con claridad, sin enviar nada. Con un endpoint
 * real envía la solicitud y nunca la presenta como reserva confirmada.
 */
export function ReservationDialog({ dialogRef, onClose }: Props) {
  const { reserve, business } = fuso;
  const endpoint = business.reservationEndpoint;
  const form = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  /* La fecha mínima depende del reloj del visitante: se fija en el navegador. */
  useEffect(() => {
    const input = form.current?.elements.namedItem("date");
    if (input instanceof HTMLInputElement) input.min = today();
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status.kind === "sending") return;
    const data = new FormData(event.currentTarget);
    const found = validate(data);
    setErrors(found);
    const first = FIELD_ORDER.find((field) => found[field]);
    if (first) {
      setStatus({ kind: "idle" });
      const control = event.currentTarget.elements.namedItem(first);
      if (control instanceof HTMLElement) control.focus();
      return;
    }
    if (!endpoint) {
      setStatus({ kind: "demo" });
      return;
    }
    setStatus({ kind: "sending" });
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      if (!response.ok) throw new Error(String(response.status));
      setStatus({ kind: "received" });
      form.current?.reset();
    } catch {
      setStatus({ kind: "error" });
    }
  };

  const clear = (field: Field) => {
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
    if (status.kind !== "idle" && status.kind !== "sending") setStatus({ kind: "idle" });
  };
  const invalid = (field: Field) => ({
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `fuso-error-${field}` : undefined,
    onInput: () => clear(field),
  });
  const error = (field: Field) =>
    errors[field] ? (
      <span className="fu-field-error" id={`fuso-error-${field}`}>
        {errors[field]}
      </span>
    ) : null;

  const errorCount = Object.values(errors).filter(Boolean).length;
  const message =
    errorCount > 0
      ? `Revisa ${errorCount === 1 ? "el campo marcado" : `los ${errorCount} campos marcados`}.`
      : status.kind === "demo"
        ? reserve.demoResult
        : status.kind === "sending"
          ? "Enviando tu solicitud…"
          : status.kind === "received"
            ? `Recibimos tu solicitud. ${reserve.confirmation}`
            : status.kind === "error"
              ? "No pudimos enviar la solicitud. Revisa tu conexión e inténtalo de nuevo."
              : "";

  return (
    <dialog ref={dialogRef} className="fu-modal fu-reserve-modal" aria-labelledby="fuso-form-title">
      <div className="fu-modal-top">
        <h2 id="fuso-form-title">
          <Lines lines={reserve.formTitleLines} />
        </h2>
        <button type="button" className="fu-modal-close" aria-label="Cerrar formulario" autoFocus onClick={() => void onClose()}>
          ×
        </button>
      </div>
      <p className="fu-form-description">{endpoint ? reserve.confirmation : reserve.demoNotice}</p>
      <form ref={form} onSubmit={onSubmit} noValidate>
        <div className="fu-form-grid">
          <label>
            Nombre
            <input name="name" autoComplete="name" required maxLength={100} placeholder="Tu nombre" {...invalid("name")} />
            {error("name")}
          </label>
          <label>
            Correo electrónico
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={180}
              placeholder="tu@correo.com"
              {...invalid("email")}
            />
            {error("email")}
          </label>
          <label>
            Fecha
            <input name="date" type="date" required {...invalid("date")} />
            {error("date")}
          </label>
          <label>
            Hora
            <select name="time" required defaultValue="" {...invalid("time")}>
              <option value="">Elige una hora</option>
              {reserve.times.map((time) => (
                <option key={time}>{time}</option>
              ))}
            </select>
            {error("time")}
          </label>
          <label>
            Personas
            <select name="guests" required defaultValue="" {...invalid("guests")}>
              <option value="">Elige</option>
              {Array.from({ length: reserve.maxGuests }, (_, i) => i + 1).map((count) => (
                <option key={count} value={count}>
                  {count} {count === 1 ? "persona" : "personas"}
                </option>
              ))}
            </select>
            {error("guests")}
          </label>
          <label className="fu-field-wide">
            Comentarios (opcional)
            <textarea name="notes" maxLength={500} rows={3} placeholder="Alergias, ocasión especial, silla alta…" />
          </label>
        </div>
        <button className="fu-btn fu-btn-plum" type="submit" disabled={status.kind === "sending"}>
          {endpoint ? reserve.cta : "Probar solicitud"}
        </button>
        <p className="fu-form-result" role="status" aria-live="polite" data-state={errorCount > 0 ? "error" : status.kind}>
          {message}
        </p>
      </form>
    </dialog>
  );
}
