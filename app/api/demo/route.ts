import { NextResponse } from "next/server";

/**
 * Réception des demandes de démo.
 * - Honeypot : le champ `website` rempli => on répond ok sans rien faire.
 * - Rate limit naïf par IP (en mémoire — suffisant pour un site vitrine).
 * - Transfert vers DEMO_WEBHOOK_URL si définie (CRM, webhook interne…),
 *   sinon vers FormSubmit → contact@selekt-retail.com. L'adresse ne
 *   transite que côté serveur, jamais exposée au navigateur.
 */

const DEFAULT_ENDPOINT = "https://formsubmit.co/ajax/contact@selekt-retail.com";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://selekt-landing-one.vercel.app";

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const stamps = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (stamps.length >= MAX_PER_WINDOW) return true;
  stamps.push(now);
  hits.set(ip, stamps);
  return false;
}

type DemoPayload = {
  name?: string;
  company?: string;
  email?: string;
  role?: string;
  roleOther?: string;
  network?: string;
  message?: string;
  consent?: string;
  website?: string;
  locale?: string;
};

export async function POST(request: Request) {
  let data: DemoPayload;
  try {
    data = (await request.json()) as DemoPayload;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Honeypot : réponse positive silencieuse, rien n'est transmis.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  // Validation serveur — mêmes règles que le client.
  const required = ["name", "company", "email", "role", "network"] as const;
  for (const field of required) {
    const value = data[field];
    if (typeof value !== "string" || !value.trim() || value.length > 500) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email!)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (data.consent !== "yes") {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (typeof data.message === "string" && data.message.length > 5000) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (typeof data.roleOther === "string" && data.roleOther.length > 500) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const endpoint = process.env.DEMO_WEBHOOK_URL ?? DEFAULT_ENDPOINT;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // FormSubmit refuse les requêtes sans origine identifiable
        Origin: SITE_URL,
        Referer: `${SITE_URL}/`,
      },
      body: JSON.stringify({
        // Directives FormSubmit (ignorées par un webhook classique)
        _subject: "Nouvelle demande de démo — site Selekt",
        _template: "table",
        name: data.name,
        company: data.company,
        email: data.email,
        // « Autre » : la précision saisie accompagne la fonction
        role: data.roleOther?.trim() ? `${data.role} — ${data.roleOther.trim()}` : data.role,
        network: data.network,
        message: data.message ?? "",
        locale: data.locale ?? "fr",
        source: "selekt-site",
      }),
    });
    if (!res.ok) throw new Error(`webhook ${res.status}`);
    // FormSubmit répond 200 même en échec — vérifier le corps.
    const result = (await res.json().catch(() => null)) as { success?: string; message?: string } | null;
    if (result && String(result.success) === "false") {
      throw new Error(result.message ?? "formsubmit: success=false");
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[demo] transmission échouée :", error);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
