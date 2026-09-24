"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

/**
 * Back-office du module Confiance & conformité (/confiance-admin).
 * Quatre onglets : Documents (édition des sections, versions), Nouveau lien
 * (profils, sections à la carte, variables, surcharges), Journal (envois,
 * export CSV, PDF archivés), Demandes (formulaire public).
 * Auth : mot de passe unique (CONFIANCE_ADMIN_PASSWORD), session 12 h.
 */

type Section = { num: number; title: string; html: string; internal: boolean };
type Version = { id: string; label: string; createdAt: string; author: string; sections: Section[] };
type DocState = {
  title: string;
  subtitle: string;
  profiles: Record<string, number[]>;
  versions: Version[];
};
type LinkRow = {
  id: string;
  doc: "securite" | "rgpd";
  versionLabel: string;
  profile: string;
  sections: number[];
  recipient: { name: string; company: string; email: string };
  singleUse: boolean;
  createdAt: string;
  expiresAt: string;
  firstOpenedAt?: string;
  validatedAt?: string;
  pdfSha256?: string;
};
type RequestRow = {
  id: string;
  name: string;
  company: string;
  role: string;
  email: string;
  need: string;
  createdAt: string;
};
type AdminData = {
  documents: Record<"securite" | "rgpd", DocState>;
  links: LinkRow[];
  requests: RequestRow[];
};

const PROFILES: Record<string, string> = {
  dpo: "DPO",
  rssi: "Sécurité / RSSI",
  achats: "Achats",
  complet: "Complet",
};

const input =
  "w-full rounded-[10px] border border-(--line-light) bg-paper px-3 py-2 text-[0.9rem] text-ink outline-none focus:border-brass";
const labelCls = "mb-1 block text-[0.78rem] font-medium text-ink";
const btn =
  "inline-flex h-10 items-center justify-center rounded-full bg-ink px-6 text-[0.88rem] font-medium text-cream-2 transition-colors hover:bg-void disabled:opacity-60";
const btnGhost =
  "inline-flex h-10 items-center justify-center rounded-full border border-(--line-light) bg-paper px-6 text-[0.88rem] font-medium text-ink hover:border-brass";

const fmt = (iso?: string) => (iso ? new Date(iso).toLocaleString("fr-FR") : "—");

export function AdminApp() {
  const [data, setData] = useState<AdminData | null>(null);
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [tab, setTab] = useState<"documents" | "lien" | "journal" | "demandes">("documents");
  const [notice, setNotice] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const res = await fetch("/api/confiance/admin/data");
    if (res.status === 401) {
      setAuthed(false);
      return;
    }
    const body = (await res.json()) as { ok: boolean } & AdminData;
    if (body.ok) {
      setData(body);
      setAuthed(true);
    }
  }, []);

  useEffect(() => {
    refresh().catch(() => setAuthed(false));
  }, [refresh]);

  if (authed === null) return <p role="status">Chargement…</p>;
  if (!authed) return <Login onSuccess={refresh} />;
  if (!data) return <p role="status">Chargement…</p>;

  return (
    <div>
      <h1 className="display-2">Back-office Confiance</h1>
      <nav aria-label="Sections du back-office" className="mt-6 flex flex-wrap gap-2">
        {(
          [
            ["documents", "Documents"],
            ["lien", "Nouveau lien"],
            ["journal", `Journal (${data.links.length})`],
            ["demandes", `Demandes (${data.requests.length})`],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            aria-current={tab === key ? "page" : undefined}
            className={tab === key ? btn : btnGhost}
          >
            {label}
          </button>
        ))}
      </nav>
      {notice ? (
        <p role="status" className="mt-4 rounded-[10px] border border-brass bg-paper px-4 py-3 text-[0.88rem]">
          {notice}
        </p>
      ) : null}
      <div className="mt-8">
        {tab === "documents" ? (
          <DocumentsTab data={data} onSaved={(m) => { setNotice(m); refresh(); }} />
        ) : null}
        {tab === "lien" ? <LinkTab data={data} onCreated={() => refresh()} /> : null}
        {tab === "journal" ? <JournalTab data={data} /> : null}
        {tab === "demandes" ? <RequestsTab data={data} /> : null}
      </div>
    </div>
  );
}

function Login({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  return (
    <form
      className="mx-auto mt-16 w-full max-w-[380px] rounded-[20px] bg-card p-8"
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await fetch("/api/confiance/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        });
        if (res.ok) onSuccess();
        else setError("Mot de passe refusé.");
      }}
    >
      <h1 className="font-serif text-[1.6rem]">Back-office Confiance</h1>
      <label htmlFor="admin-pass" className={`${labelCls} mt-5`}>
        Mot de passe
      </label>
      <input
        id="admin-pass"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setError(null);
        }}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? "admin-pass-err" : undefined}
        className={input}
      />
      {error ? (
        <p id="admin-pass-err" role="alert" className="mt-2 text-[0.82rem] text-wine">
          {error}
        </p>
      ) : null}
      <button type="submit" className={`${btn} mt-5 w-full`}>
        Se connecter
      </button>
    </form>
  );
}

/* ————— Onglet Documents : versions + édition des sections ————— */

function DocumentsTab({ data, onSaved }: { data: AdminData; onSaved: (msg: string) => void }) {
  const [slug, setSlug] = useState<"securite" | "rgpd">("securite");
  const [selected, setSelected] = useState<number | null>(null);
  const [draftHtml, setDraftHtml] = useState("");
  const [draftTitle, setDraftTitle] = useState("");
  const [preview, setPreview] = useState(false);
  const [newVersion, setNewVersion] = useState({ label: "", author: "" });
  const doc = data.documents[slug];
  const version = doc.versions[doc.versions.length - 1];
  const section = version.sections.find((s) => s.num === selected) ?? null;

  useEffect(() => {
    if (section) {
      setDraftHtml(section.html);
      setDraftTitle(section.title);
      setPreview(false);
    }
  }, [section]);

  return (
    <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
      <div>
        <label htmlFor="doc-select" className={labelCls}>
          Document
        </label>
        <select
          id="doc-select"
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value as "securite" | "rgpd");
            setSelected(null);
          }}
          className={input}
        >
          <option value="securite">Questionnaire de sécurité</option>
          <option value="rgpd">Fiche de description du traitement</option>
        </select>

        <p className="mt-4 text-[0.82rem] text-(--ink-soft)">
          Version courante : <strong>{version.label}</strong> · {fmt(version.createdAt)} · {version.author}
        </p>
        <details className="mt-1 text-[0.82rem]">
          <summary className="cursor-pointer">Historique des versions ({doc.versions.length})</summary>
          <ul className="mt-2 space-y-1">
            {[...doc.versions].reverse().map((v) => (
              <li key={v.id}>
                {v.label} — {fmt(v.createdAt)} — {v.author}
              </li>
            ))}
          </ul>
        </details>

        <form
          className="mt-4 rounded-[14px] border border-(--line-light) bg-paper p-4"
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await fetch("/api/confiance/admin/version", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ doc: slug, ...newVersion }),
            });
            if (res.ok) {
              onSaved(`Version ${newVersion.label} créée pour « ${doc.title} ».`);
              setNewVersion({ label: "", author: "" });
            } else if (res.status === 409) {
              onSaved("Cette étiquette de version existe déjà.");
            }
          }}
        >
          <p className="text-[0.82rem] font-medium">Publier une nouvelle version</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div>
              <label htmlFor="ver-label" className={labelCls}>
                Étiquette
              </label>
              <input
                id="ver-label"
                value={newVersion.label}
                onChange={(e) => setNewVersion((v) => ({ ...v, label: e.target.value }))}
                placeholder="v1.1"
                required
                className={input}
              />
            </div>
            <div>
              <label htmlFor="ver-author" className={labelCls}>
                Auteur
              </label>
              <input
                id="ver-author"
                value={newVersion.author}
                onChange={(e) => setNewVersion((v) => ({ ...v, author: e.target.value }))}
                required
                className={input}
              />
            </div>
          </div>
          <button type="submit" className={`${btnGhost} mt-3 h-9 px-4 text-[0.8rem]`}>
            Créer la version
          </button>
        </form>

        <ul className="mt-5 max-h-[420px] space-y-1 overflow-auto pr-1" aria-label="Sections du document">
          {version.sections.map((s) => (
            <li key={s.num}>
              <button
                type="button"
                onClick={() => setSelected(s.num)}
                aria-current={selected === s.num ? "true" : undefined}
                className={`w-full rounded-[8px] px-3 py-2 text-left text-[0.85rem] ${
                  selected === s.num ? "bg-ink text-cream-2" : "hover:bg-card"
                }`}
              >
                {s.num > 0 ? `${s.num}. ` : ""}
                {s.title}
                {s.internal ? " · INTERNE" : ""}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        {section ? (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const res = await fetch("/api/confiance/admin/section", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ doc: slug, num: section.num, title: draftTitle, html: draftHtml }),
              });
              if (res.ok) onSaved(`Section « ${draftTitle} » enregistrée (${version.label}).`);
            }}
          >
            <label htmlFor="sec-title" className={labelCls}>
              Titre de la section
            </label>
            <input
              id="sec-title"
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              className={input}
            />
            <div className="mt-3 flex items-center justify-between">
              <label htmlFor="sec-html" className={labelCls}>
                Contenu (HTML : paragraphes, listes, tableaux)
              </label>
              <button type="button" onClick={() => setPreview((p) => !p)} className={`${btnGhost} h-8 px-4 text-[0.78rem]`}>
                {preview ? "Éditer" : "Aperçu"}
              </button>
            </div>
            {preview ? (
              <div
                className="confiance-prose min-h-[300px] rounded-[10px] border border-(--line-light) bg-paper p-4"
                dangerouslySetInnerHTML={{ __html: draftHtml }}
              />
            ) : (
              <textarea
                id="sec-html"
                value={draftHtml}
                onChange={(e) => setDraftHtml(e.target.value)}
                rows={18}
                className={`${input} font-mono text-[0.78rem] leading-relaxed`}
              />
            )}
            <button type="submit" className={`${btn} mt-4`}>
              Enregistrer la section
            </button>
            <p className="mt-2 text-[0.78rem] text-(--ink-soft)">
              L&apos;enregistrement modifie la version courante ({version.label}). Pour figer un état
              avant des changements importants, publiez d&apos;abord une nouvelle version.
            </p>
          </form>
        ) : (
          <p className="text-[0.9rem] muted">Sélectionnez une section à gauche pour l&apos;éditer.</p>
        )}
      </div>
    </div>
  );
}

/* ————— Onglet Nouveau lien ————— */

function LinkTab({ data, onCreated }: { data: AdminData; onCreated: () => void }) {
  const [slug, setSlug] = useState<"securite" | "rgpd">("securite");
  const [profile, setProfile] = useState("complet");
  const doc = data.documents[slug];
  const version = doc.versions[doc.versions.length - 1];
  const selectable = useMemo(() => version.sections.filter((s) => !s.internal), [version]);
  const [checked, setChecked] = useState<Set<number>>(() => new Set(doc.profiles.complet));
  const [recipient, setRecipient] = useState({ name: "", company: "", email: "" });
  const [variables, setVariables] = useState({ interlocuteur: "", societe: "", date: "", version: "" });
  const [overrides, setOverrides] = useState<Record<string, string>>({});
  const [singleUse, setSingleUse] = useState(false);
  const [created, setCreated] = useState<{ url: string; id: string; expiresAt: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const applyProfile = (doc2: DocState, p: string) => setChecked(new Set(doc2.profiles[p] ?? []));

  return (
    <form
      className="max-w-[860px]"
      onSubmit={async (e) => {
        e.preventDefault();
        setError(null);
        setSending(true);
        try {
          const res = await fetch("/api/confiance/admin/link", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              doc: slug,
              profile,
              sections: [...checked],
              recipient,
              variables,
              overrides,
              singleUse,
            }),
          });
          const body = (await res.json()) as { ok: boolean; url?: string; id?: string; expiresAt?: string };
          if (body.ok && body.url) {
            setCreated({ url: body.url, id: body.id!, expiresAt: body.expiresAt! });
            onCreated();
          } else {
            setError("Création refusée : vérifiez le destinataire et les sections cochées.");
          }
        } finally {
          setSending(false);
        }
      }}
    >
      {created ? (
        <div role="status" className="mb-6 rounded-[14px] border border-brass bg-paper p-5">
          <p className="text-[0.9rem] font-medium">Lien créé ({created.id}) — copiez-le maintenant, il ne sera plus affiché :</p>
          <p className="mt-2 break-all rounded-[8px] bg-card px-3 py-2 font-mono text-[0.8rem]">{created.url}</p>
          <div className="mt-3 flex gap-2">
            <button type="button" className={`${btnGhost} h-9 px-4 text-[0.8rem]`} onClick={() => navigator.clipboard?.writeText(created.url)}>
              Copier le lien
            </button>
            <span className="self-center text-[0.78rem] text-(--ink-soft)">
              Valable jusqu&apos;au {new Date(created.expiresAt).toLocaleDateString("fr-FR")}
            </span>
          </div>
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="lk-doc" className={labelCls}>
            Document
          </label>
          <select
            id="lk-doc"
            value={slug}
            onChange={(e) => {
              const next = e.target.value as "securite" | "rgpd";
              setSlug(next);
              setOverrides({});
              applyProfile(data.documents[next], profile);
            }}
            className={input}
          >
            <option value="securite">Questionnaire de sécurité ({data.documents.securite.versions.at(-1)?.label})</option>
            <option value="rgpd">Fiche RGPD ({data.documents.rgpd.versions.at(-1)?.label})</option>
          </select>
        </div>
        <div>
          <label htmlFor="lk-profile" className={labelCls}>
            Profil pré-réglé
          </label>
          <select
            id="lk-profile"
            value={profile}
            onChange={(e) => {
              setProfile(e.target.value);
              applyProfile(doc, e.target.value);
            }}
            className={input}
          >
            {Object.entries(PROFILES).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </div>
      </div>

      <fieldset className="mt-5 rounded-[14px] border border-(--line-light) bg-paper p-4">
        <legend className="px-1 text-[0.82rem] font-medium">
          Sections incluses ({checked.size}/{selectable.length})
        </legend>
        <ul className="grid gap-1 sm:grid-cols-2">
          {selectable.map((s) => (
            <li key={s.num} className="flex items-start gap-2">
              <input
                id={`lk-s-${s.num}`}
                type="checkbox"
                checked={checked.has(s.num)}
                onChange={(e) => {
                  setChecked((c) => {
                    const next = new Set(c);
                    if (e.target.checked) next.add(s.num);
                    else next.delete(s.num);
                    return next;
                  });
                }}
                className="mt-1 h-4 w-4 accent-(--brass)"
              />
              <label htmlFor={`lk-s-${s.num}`} className="text-[0.85rem]">
                {s.num > 0 ? `${s.num}. ` : ""}
                {s.title}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <fieldset className="mt-5 rounded-[14px] border border-(--line-light) bg-paper p-4">
        <legend className="px-1 text-[0.82rem] font-medium">Destinataire et variables</legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {(
            [
              ["name", "Interlocuteur (nom)"],
              ["company", "Société"],
              ["email", "E-mail"],
            ] as const
          ).map(([k, label]) => (
            <div key={k}>
              <label htmlFor={`lk-r-${k}`} className={labelCls}>
                {label}
              </label>
              <input
                id={`lk-r-${k}`}
                type={k === "email" ? "email" : "text"}
                required
                value={recipient[k]}
                onChange={(e) => setRecipient((r) => ({ ...r, [k]: e.target.value }))}
                className={input}
              />
            </div>
          ))}
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {(
            [
              ["date", "Date affichée (défaut : aujourd'hui)"],
              ["version", `Numéro de version (défaut : ${version.label})`],
            ] as const
          ).map(([k, label]) => (
            <div key={k}>
              <label htmlFor={`lk-v-${k}`} className={labelCls}>
                {label}
              </label>
              <input
                id={`lk-v-${k}`}
                value={variables[k]}
                onChange={(e) => setVariables((v) => ({ ...v, [k]: e.target.value }))}
                className={input}
              />
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <input
            id="lk-single"
            type="checkbox"
            checked={singleUse}
            onChange={(e) => setSingleUse(e.target.checked)}
            className="h-4 w-4 accent-(--brass)"
          />
          <label htmlFor="lk-single" className="text-[0.85rem]">
            Usage unique : le lien devient inaccessible après validation (sinon : 30 jours)
          </label>
        </div>
      </fieldset>

      <details className="mt-5 rounded-[14px] border border-(--line-light) bg-paper p-4">
        <summary className="cursor-pointer text-[0.82rem] font-medium">
          Surcharges ponctuelles pour ce client ({Object.keys(overrides).length})
        </summary>
        <p className="mt-2 text-[0.78rem] text-(--ink-soft)">
          Remplace la réponse de référence d&apos;une section, pour ce lien uniquement. Laisser vide
          pour conserver la référence.
        </p>
        {selectable
          .filter((s) => checked.has(s.num))
          .map((s) => (
            <div key={s.num} className="mt-3">
              <label htmlFor={`lk-o-${s.num}`} className={labelCls}>
                {s.num > 0 ? `${s.num}. ` : ""}
                {s.title}
              </label>
              <textarea
                id={`lk-o-${s.num}`}
                rows={3}
                value={overrides[String(s.num)] ?? ""}
                placeholder="HTML de remplacement (vide = réponse de référence)"
                onChange={(e) => {
                  const v = e.target.value;
                  setOverrides((o) => {
                    const next = { ...o };
                    if (v.trim()) next[String(s.num)] = v;
                    else delete next[String(s.num)];
                    return next;
                  });
                }}
                className={`${input} font-mono text-[0.75rem]`}
              />
            </div>
          ))}
      </details>

      {error ? (
        <p role="alert" className="mt-4 text-[0.85rem] text-wine">
          {error}
        </p>
      ) : null}
      <button type="submit" disabled={sending} className={`${btn} mt-6`}>
        {sending ? "Création…" : "Générer le lien"}
      </button>
    </form>
  );
}

/* ————— Onglet Journal ————— */

function JournalTab({ data }: { data: AdminData }) {
  const rows = [...data.links].reverse();
  return (
    <div>
      <a href="/api/confiance/admin/journal" className={btnGhost}>
        Exporter le journal en CSV
      </a>
      <div className="mt-5 overflow-x-auto rounded-[14px] border border-(--line-light) bg-paper">
        <table className="w-full min-w-[900px] border-collapse text-[0.82rem]">
          <caption className="sr-only">Journal des liens générés et des validations</caption>
          <thead>
            <tr className="border-b border-(--line-light) bg-card text-left">
              {["Identifiant", "Document", "Version", "Profil", "Sections", "Destinataire", "Créé", "1re ouverture", "Validé", "PDF"].map((h) => (
                <th key={h} scope="col" className="px-3 py-2 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={10} className="px-3 py-6 text-center text-(--ink-soft)">
                  Aucun lien généré pour l&apos;instant.
                </td>
              </tr>
            ) : (
              rows.map((l) => (
                <tr key={l.id} className="border-b border-(--line-light) align-top">
                  <td className="px-3 py-2 font-mono text-[0.75rem]">{l.id}</td>
                  <td className="px-3 py-2">{l.doc === "securite" ? "Sécurité" : "RGPD"}</td>
                  <td className="px-3 py-2">{l.versionLabel}</td>
                  <td className="px-3 py-2">{PROFILES[l.profile] ?? l.profile}</td>
                  <td className="px-3 py-2">{l.sections.length}</td>
                  <td className="px-3 py-2">
                    {l.recipient.name}
                    <br />
                    <span className="text-(--ink-soft)">
                      {l.recipient.company} · {l.recipient.email}
                    </span>
                  </td>
                  <td className="px-3 py-2">{fmt(l.createdAt)}</td>
                  <td className="px-3 py-2">{fmt(l.firstOpenedAt)}</td>
                  <td className="px-3 py-2">
                    {fmt(l.validatedAt)}
                    {l.pdfSha256 ? (
                      <>
                        <br />
                        <span className="font-mono text-[0.7rem] text-(--ink-soft)" title={l.pdfSha256}>
                          {l.pdfSha256.slice(0, 16)}…
                        </span>
                      </>
                    ) : null}
                  </td>
                  <td className="px-3 py-2">
                    {l.validatedAt ? (
                      <a href={`/api/confiance/admin/pdf/${l.id}`} className="underline underline-offset-2">
                        Télécharger
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ————— Onglet Demandes (formulaire public) ————— */

function RequestsTab({ data }: { data: AdminData }) {
  const rows = [...data.requests].reverse();
  return (
    <div className="overflow-x-auto rounded-[14px] border border-(--line-light) bg-paper">
      <table className="w-full min-w-[700px] border-collapse text-[0.82rem]">
        <caption className="sr-only">Demandes reçues depuis la page publique</caption>
        <thead>
          <tr className="border-b border-(--line-light) bg-card text-left">
            {["Reçue le", "Nom", "Société", "Fonction", "E-mail", "Besoin"].map((h) => (
              <th key={h} scope="col" className="px-3 py-2 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-3 py-6 text-center text-(--ink-soft)">
                Aucune demande pour l&apos;instant.
              </td>
            </tr>
          ) : (
            rows.map((r) => (
              <tr key={r.id} className="border-b border-(--line-light) align-top">
                <td className="px-3 py-2">{fmt(r.createdAt)}</td>
                <td className="px-3 py-2">{r.name}</td>
                <td className="px-3 py-2">{r.company}</td>
                <td className="px-3 py-2">{r.role}</td>
                <td className="px-3 py-2">{r.email}</td>
                <td className="max-w-[320px] px-3 py-2">{r.need}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
