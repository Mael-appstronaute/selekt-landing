"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";

/**
 * Consultation d'un dossier par son destinataire (page privée à jeton).
 * - réponses de référence pré-remplies, en lecture ;
 * - le destinataire complète ses coordonnées, des commentaires par section
 *   et des questions libres, puis valide ;
 * - sauvegarde automatique (localStorage + serveur) : aucune perte si la
 *   page est fermée ; indicateur de progression ; navigation clavier.
 */

type SectionView = { num: number; title: string; html: string };

type Props = {
  token: string;
  docTitle: string;
  subtitle: string;
  versionLabel: string;
  expiresAt: string;
  recipient: { name: string; company: string; email: string };
  variables: { interlocuteur: string; societe: string; date: string; version: string };
  sections: SectionView[];
  serverDraft: Record<string, string> | null;
};

const input =
  "w-full rounded-[10px] border border-(--line-light) bg-paper px-4 py-3 text-[0.95rem] text-ink outline-none transition-colors focus:border-brass";
const labelCls = "mb-1.5 block text-[0.82rem] font-medium text-ink";

export function DocView(props: Props) {
  const uid = useId();
  const storageKey = `confiance-draft-${props.token.slice(0, 12)}`;

  const [fields, setFields] = useState<Record<string, string>>(() => ({
    contactName: props.recipient.name,
    contactEmail: props.recipient.email,
    contactRole: "",
    contactPhone: "",
    freeQuestions: "",
  }));
  const [seen, setSeen] = useState<Set<number>>(() => new Set());
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [result, setResult] = useState<{ sha256: string; mailed: boolean } | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const restored = useRef(false);

  // Restauration : brouillon serveur d'abord, puis localStorage s'il est plus récent.
  useEffect(() => {
    if (restored.current) return;
    restored.current = true;
    let next: Record<string, string> | null = props.serverDraft;
    try {
      const local = window.localStorage.getItem(storageKey);
      if (local) {
        const parsed = JSON.parse(local) as { fields: Record<string, string>; updatedAt: string };
        if (parsed?.fields) next = { ...(next ?? {}), ...parsed.fields };
      }
    } catch {
      // localStorage indisponible : le brouillon serveur suffit
    }
    if (next) setFields((f) => ({ ...f, ...next }));
  }, [props.serverDraft, storageKey]);

  // Sauvegarde automatique, 800 ms après la dernière frappe.
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scheduleSave = useCallback(
    (nextFields: Record<string, string>) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        const stamp = new Date().toISOString();
        try {
          window.localStorage.setItem(storageKey, JSON.stringify({ fields: nextFields, updatedAt: stamp }));
        } catch {
          // stockage local plein ou bloqué : la copie serveur prend le relais
        }
        fetch("/api/confiance/draft", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: props.token, fields: nextFields }),
        }).catch(() => undefined);
        setSavedAt(new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }));
      }, 800);
    },
    [props.token, storageKey],
  );

  const set = (key: string, value: string) => {
    setFields((f) => {
      const next = { ...f, [key]: value };
      scheduleSave(next);
      return next;
    });
    if (key === "contactEmail") setEmailError(null);
  };

  // Progression : sections parcourues + coordonnées remplies.
  const sectionRefs = useRef(new Map<number, HTMLElement>());
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const num = Number((entry.target as HTMLElement).dataset.section);
            setSeen((s) => (s.has(num) ? s : new Set(s).add(num)));
          }
        }
      },
      { rootMargin: "0px 0px -40% 0px" },
    );
    for (const el of sectionRefs.current.values()) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const progress = useMemo(() => {
    const required = ["contactName", "contactEmail"].filter((k) => fields[k]?.trim()).length;
    return Math.round(((seen.size + required) / (props.sections.length + 2)) * 100);
  }, [seen, fields, props.sections.length]);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.contactEmail ?? "")) {
      setEmailError("Adresse e-mail invalide.");
      document.getElementById(`${uid}-contactEmail`)?.focus();
      return;
    }
    setStatus("sending");
    const comments: Record<string, string> = {};
    for (const s of props.sections) {
      const v = fields[`comment-${s.num}`];
      if (v?.trim()) comments[String(s.num)] = v;
    }
    try {
      const res = await fetch("/api/confiance/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: props.token,
          contactName: fields.contactName,
          contactEmail: fields.contactEmail,
          contactRole: fields.contactRole,
          contactPhone: fields.contactPhone,
          freeQuestions: fields.freeQuestions,
          comments,
        }),
      });
      const body = (await res.json()) as { ok: boolean; sha256?: string; mailed?: boolean };
      if (body.ok && body.sha256) {
        setResult({ sha256: body.sha256, mailed: Boolean(body.mailed) });
        setStatus("done");
        try {
          window.localStorage.removeItem(storageKey);
        } catch {
          // rien à faire
        }
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "done" && result) {
    return (
      <div className="rounded-[20px] bg-card p-6 md:p-10" role="status">
        <h2 className="font-serif text-[1.7rem] leading-tight">Dossier validé.</h2>
        <p className="mt-3 max-w-[62ch] text-[0.95rem] leading-relaxed">
          Le document définitif a été généré
          {result.mailed
            ? ` et envoyé à ${fields.contactEmail} ainsi qu'à contact@selekt-retail.com.`
            : ". Notre équipe vous l'adresse par e-mail dans les meilleurs délais."}
        </p>
        <p className="mt-4 break-all text-[0.8rem] text-(--ink-soft)">
          Empreinte SHA-256 du PDF : {result.sha256}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      {/* Barre de progression, annoncée aux technologies d'assistance */}
      <div className="no-print sticky top-0 z-10 -mx-4 border-b border-(--line-light) bg-cream/95 px-4 py-3 backdrop-blur md:-mx-8 md:px-8">
        <div className="mx-auto flex max-w-[860px] items-center gap-4">
          <div
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progression de la consultation"
            className="h-1.5 flex-1 overflow-hidden rounded-full bg-(--line-light)"
          >
            <div className="h-full rounded-full bg-brass transition-[width] duration-300" style={{ width: `${progress}%` }} />
          </div>
          <p className="w-[9.5rem] text-right text-[0.75rem] text-(--ink-soft)" aria-live="polite">
            {progress} %{savedAt ? ` · enregistré ${savedAt}` : ""}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[860px]">
        <p className="mt-8 text-[0.9rem] leading-relaxed muted">
          Document préparé pour <strong>{props.variables.societe}</strong> à
          l&apos;attention de <strong>{props.variables.interlocuteur}</strong> ·{" "}
          {props.variables.date} · version {props.variables.version}. Les
          réponses ci-dessous sont pré-remplies par Selekt : vous n&apos;avez
          rien à saisir dans le corps du document. Complétez vos coordonnées,
          ajoutez vos commentaires éventuels puis validez en bas de page. Votre
          saisie est enregistrée automatiquement. Lien valable jusqu&apos;au{" "}
          {new Date(props.expiresAt).toLocaleDateString("fr-FR")}.
        </p>

        {props.sections.map((s) => (
          <section
            key={s.num}
            data-section={s.num}
            ref={(el) => {
              if (el) sectionRefs.current.set(s.num, el);
            }}
            aria-labelledby={`${uid}-h-${s.num}`}
            className="mt-10 border-t border-(--line-light) pt-6"
          >
            <h2 id={`${uid}-h-${s.num}`} className="font-serif text-[1.45rem] leading-tight">
              {s.num > 0 ? `${s.num}. ` : ""}
              {s.title}
            </h2>
            <div className="confiance-prose mt-4" dangerouslySetInnerHTML={{ __html: s.html }} />
            <div className="no-print mt-5">
              <label htmlFor={`${uid}-c-${s.num}`} className={labelCls}>
                Votre commentaire sur cette section (facultatif)
              </label>
              <textarea
                id={`${uid}-c-${s.num}`}
                rows={2}
                value={fields[`comment-${s.num}`] ?? ""}
                onChange={(e) => set(`comment-${s.num}`, e.target.value)}
                className={input}
              />
            </div>
          </section>
        ))}

        <section aria-labelledby={`${uid}-coord`} className="no-print mt-12 rounded-[20px] bg-card p-6 md:p-8">
          <h2 id={`${uid}-coord`} className="font-serif text-[1.45rem] leading-tight">
            Vos coordonnées et votre validation
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {(
              [
                ["contactName", "Nom et prénom", "text", "name", true],
                ["contactEmail", "Adresse e-mail", "email", "email", true],
                ["contactRole", "Fonction", "text", "organization-title", false],
                ["contactPhone", "Téléphone", "tel", "tel", false],
              ] as const
            ).map(([key, label, type, auto, required]) => (
              <div key={key}>
                <label htmlFor={`${uid}-${key}`} className={labelCls}>
                  {label}
                  {required ? "" : " (facultatif)"}
                </label>
                <input
                  id={`${uid}-${key}`}
                  type={type}
                  autoComplete={auto}
                  required={required}
                  value={fields[key] ?? ""}
                  onChange={(e) => set(key, e.target.value)}
                  aria-invalid={key === "contactEmail" && emailError ? true : undefined}
                  aria-describedby={key === "contactEmail" && emailError ? `${uid}-email-err` : undefined}
                  className={input}
                />
                {key === "contactEmail" && emailError ? (
                  <p id={`${uid}-email-err`} role="alert" className="mt-1 text-[0.8rem] text-wine">
                    {emailError}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
          <div className="mt-4">
            <label htmlFor={`${uid}-free`} className={labelCls}>
              Questions libres (facultatif)
            </label>
            <textarea
              id={`${uid}-free`}
              rows={4}
              value={fields.freeQuestions ?? ""}
              onChange={(e) => set("freeQuestions", e.target.value)}
              className={input}
            />
          </div>

          {status === "error" ? (
            <p role="alert" className="mt-4 text-[0.85rem] text-wine">
              La validation n&apos;a pas abouti. Votre saisie est conservée :
              réessayez dans quelques instants ou contactez
              contact@selekt-retail.com.
            </p>
          ) : null}

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-ink px-8 text-[0.95rem] font-medium text-cream-2 transition-[background-color,transform] duration-300 ease-(--ease-lux) hover:-translate-y-0.5 hover:bg-void disabled:opacity-60"
          >
            {status === "sending" ? "Génération du document…" : "Valider et recevoir le PDF"}
          </button>
          <p className="mt-3 text-[0.78rem] text-(--ink-soft)">
            À la validation, le document définitif est généré en PDF puis envoyé
            à votre adresse et à contact@selekt-retail.com.
          </p>
        </section>
      </div>
    </form>
  );
}
