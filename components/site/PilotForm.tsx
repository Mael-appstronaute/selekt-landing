"use client";

import { useState } from "react";
import type { PilotContent } from "@/content/pilote";

type Status = "idle" | "sending" | "success" | "error";

/** Valeur sentinelle de l'option « Autre » — le champ libre la remplace à l'envoi. */
export const POS_OTHER = "autre";

const inputCls =
  "w-full rounded-md border border-ink/20 bg-paper px-4 py-3 text-[0.95rem] text-ink " +
  "placeholder:text-ink/35 transition-colors duration-150 ease-(--ease-lux) " +
  "focus:border-brass focus:outline-none";

export function PilotForm({ copy }: { copy: PilotContent["form"] }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [posValue, setPosValue] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    const nextErrors: Record<string, string> = {};
    for (const field of ["firstName", "lastName", "company", "email", "phone", "stores", "pos"]) {
      if (!data[field]?.trim()) nextErrors[field] = copy.required;
    }
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      nextErrors.email = copy.invalidEmail;
    }
    if (data.phone?.trim() && !/^[+0-9][0-9 ().\-]{5,19}$/.test(data.phone.trim())) {
      nextErrors.phone = copy.invalidPhone;
    }
    if (data.pos === POS_OTHER && !data.posOther?.trim()) {
      nextErrors.posOther = copy.required;
    }
    if (!data.consent) nextErrors.consent = copy.required;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    // Honeypot rempli => robot : succès silencieux, rien n'est envoyé.
    if (data.website) {
      setStatus("success");
      return;
    }

    setStatus("sending");

    // Copie serveur → Airtable (file d'appels) : best-effort, jamais bloquant.
    void fetch("/api/pilote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).catch(() => {});

    try {
      // Envoi direct navigateur → FormSubmit : les appels serveur (VPS comme
      // Vercel) sont bloqués par le Cloudflare de FormSubmit, seul le
      // navigateur passe. Réception appstronaute + copie selekt.
      const res = await fetch("https://formsubmit.co/ajax/appstronaute@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: "Nouvelle candidature pilote — Selekt",
          _template: "table",
          _cc: "contact@selekt-retail.com",
          _replyto: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          company: data.company,
          email: data.email,
          phone: data.phone,
          stores: data.stores,
          pos: data.pos === POS_OTHER ? data.posOther.trim() : data.pos,
          source: "selekt-pilote",
        }),
      });
      // FormSubmit répond 200 même en échec — vérifier le corps.
      const body = (await res.json().catch(() => null)) as { success?: string } | null;
      setStatus(res.ok && body && String(body.success) !== "false" ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-md border border-ink/14 bg-card p-10 text-center">
        <p aria-hidden className="font-serif text-[3rem] leading-none text-brass">
          ✓
        </p>
        <h3 className="title-1 mt-4">{copy.successTitle}</h3>
        <p className="mt-3 muted">{copy.successBody}</p>
      </div>
    );
  }

  const err = (field: string) =>
    errors[field] ? (
      <p role="alert" className="mt-1.5 text-[0.8rem] text-wine">
        {errors[field]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-md border border-ink/14 bg-card p-7 md:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="pilot-first-name" className="kicker text-sand-muted">
            {copy.firstName}
          </label>
          <input
            id="pilot-first-name"
            name="firstName"
            autoComplete="given-name"
            className={`mt-2 ${inputCls}`}
          />
          {err("firstName")}
        </div>
        <div>
          <label htmlFor="pilot-last-name" className="kicker text-sand-muted">
            {copy.lastName}
          </label>
          <input
            id="pilot-last-name"
            name="lastName"
            autoComplete="family-name"
            className={`mt-2 ${inputCls}`}
          />
          {err("lastName")}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="pilot-company" className="kicker text-sand-muted">
          {copy.company}
        </label>
        <input
          id="pilot-company"
          name="company"
          autoComplete="organization"
          className={`mt-2 ${inputCls}`}
        />
        {err("company")}
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="pilot-email" className="kicker text-sand-muted">
            {copy.email}
          </label>
          <input
            id="pilot-email"
            name="email"
            type="email"
            autoComplete="email"
            className={`mt-2 ${inputCls}`}
          />
          {err("email")}
        </div>
        <div>
          <label htmlFor="pilot-phone" className="kicker text-sand-muted">
            {copy.phone}
          </label>
          <input
            id="pilot-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={`mt-2 ${inputCls}`}
          />
          {err("phone")}
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="pilot-stores" className="kicker text-sand-muted">
            {copy.stores}
          </label>
          <select id="pilot-stores" name="stores" defaultValue="" className={`mt-2 ${inputCls}`}>
            <option value="" disabled hidden />
            {copy.storesOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          {err("stores")}
        </div>
        <div>
          <label htmlFor="pilot-pos" className="kicker text-sand-muted">
            {copy.pos}
          </label>
          <select
            id="pilot-pos"
            name="pos"
            value={posValue}
            onChange={(e) => setPosValue(e.target.value)}
            className={`mt-2 ${inputCls}`}
          >
            <option value="" disabled hidden />
            {copy.posOptions.map((pos) => (
              <option key={pos} value={pos}>
                {pos}
              </option>
            ))}
            <option value={POS_OTHER}>{copy.posOther}</option>
          </select>
          {err("pos")}
        </div>
      </div>

      {posValue === POS_OTHER && (
        <div className="mt-5">
          <label htmlFor="pilot-pos-other" className="kicker text-sand-muted">
            {copy.posOtherLabel}
          </label>
          <input
            id="pilot-pos-other"
            name="posOther"
            placeholder={copy.posOtherPlaceholder}
            className={`mt-2 ${inputCls}`}
          />
          {err("posOther")}
        </div>
      )}

      {/* Honeypot — invisible pour les humains, rempli par les robots */}
      <div aria-hidden className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="pilot-website">Website</label>
        <input id="pilot-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-6 border-t border-ink/10 pt-5">
        <label className="flex cursor-pointer items-start gap-3 text-[0.85rem] leading-relaxed muted">
          <input
            type="checkbox"
            name="consent"
            value="yes"
            className="mt-1 h-4 w-4 shrink-0 accent-(--wine)"
          />
          {copy.consent}
        </label>
        {err("consent")}
        <p className="mt-3 text-[0.78rem] leading-relaxed text-ink/50">{copy.privacyNote}</p>
      </div>

      {status === "error" && (
        <p role="alert" className="mt-4 text-[0.85rem] text-wine">
          {copy.errorBody}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex h-12 w-full cursor-pointer items-center justify-center rounded-full bg-ink px-8 text-[0.95rem] font-medium text-cream-2 transition-[background-color,transform,box-shadow] duration-300 ease-(--ease-lux) hover:-translate-y-0.5 hover:bg-void hover:shadow-[0_14px_28px_-12px_rgba(16,15,13,0.5)] active:translate-y-0 active:scale-[0.98] active:duration-100 disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
      >
        {status === "sending" ? copy.sending : copy.submit}
      </button>
    </form>
  );
}
