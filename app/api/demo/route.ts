import { NextResponse } from "next/server";

/**
 * Réception des demandes de démo.
 * - Honeypot : le champ `website` rempli => on répond ok sans rien faire.
 * - Rate limit naïf par IP (en mémoire — suffisant pour un site vitrine).
 * - Transfert vers l'endpoint défini par DEMO_WEBHOOK_URL (variable
 *   d'environnement, à brancher : FormSubmit, CRM, webhook interne…).
 */

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

  const endpoint = process.env.DEMO_WEBHOOK_URL;
  if (!endpoint) {
    // Endpoint non branché : on accepte la demande pour ne pas perdre
    // l'expérience utilisateur, mais on le signale dans les logs serveur.
    console.warn("[demo] DEMO_WEBHOOK_URL non configurée — demande non transmise.");
    return NextResponse.json({ ok: true });
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        company: data.company,
        email: data.email,
        role: data.role,
        network: data.network,
        message: data.message ?? "",
        locale: data.locale ?? "fr",
        source: "selekt-site",
      }),
    });
    if (!res.ok) throw new Error(`webhook ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[demo] transmission échouée :", error);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
