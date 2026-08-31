"use client";

import { useState } from "react";
import type { DemoContent } from "@/content/demo";
import type { Locale } from "@/lib/routes";

type Status = "idle" | "sending" | "success" | "error";

const inputCls =
  "w-full rounded-md border border-ink/20 bg-paper px-4 py-3 text-[0.95rem] text-ink " +
  "placeholder:text-ink/35 transition-colors duration-150 ease-(--ease-lux) " +
  "focus:border-brass focus:outline-none";

export function DemoForm({ locale, copy }: { locale: Locale; copy: DemoContent["form"] }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  // dernière entrée de copy.roles = « Autre » : ouvre un champ libre pour préciser le poste
  const otherRole = copy.roles[copy.roles.length - 1];
  const [role, setRole] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    const nextErrors: Record<string, string> = {};
    for (const field of ["name", "company", "email", "role", "network"]) {
      if (!data[field]?.trim()) nextErrors[field] = copy.required;
    }
    if (data.role === otherRole && !data.roleOther?.trim()) {
      nextErrors.roleOther = copy.required;
    }
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      nextErrors.email = copy.invalidEmail;
    }
    if (!data.consent) nextErrors.consent = copy.required;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      const body = (await res.json()) as { ok?: boolean };
      setStatus(res.ok && body.ok ? "success" : "error");
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
          <label htmlFor="demo-name" className="kicker text-sand-muted">
            {copy.name}
          </label>
          <input id="demo-name" name="name" autoComplete="name" className={`mt-2 ${inputCls}`} />
          {err("name")}
        </div>
        <div>
          <label htmlFor="demo-company" className="kicker text-sand-muted">
            {copy.company}
          </label>
          <input id="demo-company" name="company" autoComplete="organization" className={`mt-2 ${inputCls}`} />
          {err("company")}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="demo-email" className="kicker text-sand-muted">
          {copy.email}
        </label>
        <input id="demo-email" name="email" type="email" autoComplete="email" className={`mt-2 ${inputCls}`} />
        {err("email")}
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="demo-role" className="kicker text-sand-muted">
            {copy.role}
          </label>
          <select
            id="demo-role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={`mt-2 ${inputCls}`}
          >
            <option value="" disabled hidden />
            {copy.roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          {err("role")}
          {role === otherRole && (
            <div className="mt-3">
              <label htmlFor="demo-role-other" className="kicker text-sand-muted">
                {copy.roleOther}
              </label>
              <input id="demo-role-other" name="roleOther" className={`mt-2 ${inputCls}`} />
              {err("roleOther")}
            </div>
          )}
        </div>
        <div>
          <label htmlFor="demo-network" className="kicker text-sand-muted">
            {copy.network}
          </label>
          <select id="demo-network" name="network" defaultValue="" className={`mt-2 ${inputCls}`}>
            <option value="" disabled hidden />
            {copy.networks.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          {err("network")}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="demo-message" className="kicker text-sand-muted">
          {copy.message}
        </label>
        <textarea
          id="demo-message"
          name="message"
          rows={4}
          placeholder={copy.messagePlaceholder}
          className={`mt-2 resize-y ${inputCls}`}
        />
      </div>

      {/* Honeypot — invisible pour les humains, rempli par les robots */}
      <div aria-hidden className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="demo-website">Website</label>
        <input id="demo-website" name="website" tabIndex={-1} autoComplete="off" />
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
        className="mt-6 inline-flex h-12 w-full cursor-pointer items-center justify-center rounded-full bg-ink px-8 text-[0.95rem] font-medium text-cream-2 transition-colors duration-300 ease-(--ease-lux) hover:bg-void disabled:opacity-60"
      >
        {status === "sending" ? copy.sending : copy.submit}
      </button>
    </form>
  );
}
