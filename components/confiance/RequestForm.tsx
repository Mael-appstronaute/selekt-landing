"use client";

import { useId, useState } from "react";

/**
 * Formulaire public « Demander notre dossier de conformité ».
 * WCAG 2.1 AA : chaque champ a un label explicite, les erreurs sont reliées
 * au champ par aria-describedby et annoncées (role=alert), tout se fait au
 * clavier. Honeypot « website » masqué des lecteurs d'écran.
 */

const FIELDS = [
  { key: "name", label: "Nom et prénom", type: "text", auto: "name" },
  { key: "company", label: "Société", type: "text", auto: "organization" },
  { key: "role", label: "Fonction", type: "text", auto: "organization-title" },
  { key: "email", label: "Adresse e-mail professionnelle", type: "email", auto: "email" },
] as const;

type FieldKey = (typeof FIELDS)[number]["key"] | "need";

const input =
  "w-full rounded-[10px] border border-(--line-light) bg-paper px-4 py-3 text-[0.95rem] text-ink outline-none transition-colors focus:border-brass";
const labelCls = "mb-1.5 block text-[0.82rem] font-medium text-ink";

export function RequestForm() {
  const uid = useId();
  const [values, setValues] = useState<Record<FieldKey, string>>({
    name: "",
    company: "",
    role: "",
    email: "",
    need: "",
  });
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const set = (key: FieldKey, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Partial<Record<FieldKey, string>> = {};
    for (const f of FIELDS) {
      if (!values[f.key].trim()) nextErrors[f.key] = "Ce champ est requis.";
    }
    if (!values.need.trim()) nextErrors.need = "Décrivez votre besoin en quelques mots.";
    if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = "Adresse e-mail invalide.";
    }
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setStatus("sending");
    try {
      const form = new FormData(event.currentTarget);
      const res = await fetch("/api/confiance/demande", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: String(form.get("website") ?? "") }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <p role="status" className="rounded-[14px] border border-(--line-light) bg-paper p-6 text-[0.95rem]">
        Merci, votre demande est bien enregistrée. Nous revenons vers vous sous
        deux jours ouvrés avec un lien d&apos;accès personnalisé à notre dossier
        de conformité.
      </p>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        {FIELDS.map((f) => {
          const id = `${uid}-${f.key}`;
          const error = errors[f.key];
          return (
            <div key={f.key}>
              <label htmlFor={id} className={labelCls}>
                {f.label}
              </label>
              <input
                id={id}
                name={f.key}
                type={f.type}
                autoComplete={f.auto}
                required
                value={values[f.key]}
                onChange={(e) => set(f.key, e.target.value)}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${id}-err` : undefined}
                className={input}
              />
              {error ? (
                <p id={`${id}-err`} role="alert" className="mt-1 text-[0.8rem] text-wine">
                  {error}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
      <div className="mt-4">
        <label htmlFor={`${uid}-need`} className={labelCls}>
          Votre besoin
        </label>
        <textarea
          id={`${uid}-need`}
          name="need"
          rows={4}
          required
          value={values.need}
          onChange={(e) => set("need", e.target.value)}
          aria-invalid={errors.need ? true : undefined}
          aria-describedby={errors.need ? `${uid}-need-err` : `${uid}-need-help`}
          className={input}
        />
        {errors.need ? (
          <p id={`${uid}-need-err`} role="alert" className="mt-1 text-[0.8rem] text-wine">
            {errors.need}
          </p>
        ) : (
          <p id={`${uid}-need-help`} className="mt-1 text-[0.8rem] text-(--ink-soft)">
            Par exemple : questionnaire de sécurité à compléter, revue DPO, dossier achats.
          </p>
        )}
      </div>

      {/* Piège anti-robots : champ invisible, ignoré des lecteurs d'écran */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 overflow-hidden">
        <label htmlFor={`${uid}-website`}>Site web</label>
        <input id={`${uid}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" ? (
        <p role="alert" className="mt-4 text-[0.85rem] text-wine">
          L&apos;envoi n&apos;a pas abouti. Réessayez dans quelques minutes ou
          écrivez-nous à contact@selekt-retail.com.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-ink px-8 text-[0.95rem] font-medium text-cream-2 transition-[background-color,transform] duration-300 ease-(--ease-lux) hover:-translate-y-0.5 hover:bg-void disabled:opacity-60"
      >
        {status === "sending" ? "Envoi en cours…" : "Demander notre dossier de conformité"}
      </button>

      <p className="mt-5 max-w-[62ch] text-[0.78rem] leading-relaxed text-(--ink-soft)">
        Les informations saisies sont traitées par Selekt pour répondre à votre
        demande de documentation (base légale : intérêt légitime). Elles sont
        conservées 24 mois puis supprimées. Pour exercer vos droits :
        contact@selekt-retail.com.
      </p>
    </form>
  );
}
