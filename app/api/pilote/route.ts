import { NextResponse } from "next/server";

/**
 * Réception des candidatures au programme pilote (LP /pilote).
 * L'e-mail de notification part du NAVIGATEUR vers FormSubmit (voir
 * PilotForm — les appels serveur vers FormSubmit sont bloqués par
 * Cloudflare) ; cette route reçoit une copie de chaque candidature et
 * l'écrit dans Airtable (base SELEKT, table « 🎯 Candidatures pilote »)
 * pour le rapprochement campagne et la file d'appels.
 * Brief du 7/09 : un échec Airtable ne bloque jamais le visiteur — on
 * logge et on répond ok. Les champs « Dans la campagne » et « Statut »
 * appartiennent à la machine et à Yamna : ne jamais les écrire ici.
 * Le token ne transite que côté serveur, jamais exposé au navigateur.
 */

const AIRTABLE_ENDPOINT = "https://api.airtable.com/v0/appy7D9hAfuL3quzi/tbld9pFFAh8tu60mU";

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

type PilotPayload = {
  firstName?: string;
  lastName?: string;
  company?: string;
  email?: string;
  phone?: string;
  stores?: string;
  pos?: string;
  posOther?: string;
  consent?: string;
  website?: string;
};

export async function POST(request: Request) {
  let data: PilotPayload;
  try {
    data = (await request.json()) as PilotPayload;
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
  const required = ["firstName", "lastName", "company", "email", "phone", "stores", "pos"] as const;
  for (const field of required) {
    const value = data[field];
    if (typeof value !== "string" || !value.trim() || value.length > 500) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email!)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (!/^[+0-9][0-9 ().\-]{5,19}$/.test(data.phone!.trim())) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (data.pos === "autre" && (typeof data.posOther !== "string" || !data.posOther.trim())) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (typeof data.posOther === "string" && data.posOther.length > 500) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (data.consent !== "yes") {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const token = process.env.AIRTABLE_TOKEN_LANDING;
  if (!token) {
    console.error("[pilote] AIRTABLE_TOKEN_LANDING absente : candidature non écrite dans Airtable");
    return NextResponse.json({ ok: true });
  }

  try {
    const res = await fetch(AIRTABLE_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              Email: data.email,
              "Prénom": data.firstName,
              Nom: data.lastName,
              Enseigne: data.company,
              "Nb boutiques": data.stores,
              POS: data.pos === "autre" ? data.posOther!.trim() : data.pos,
              "Téléphone": data.phone,
              Consentement: true,
              "Reçu le": new Date().toISOString(),
              Source: "landing-pilote",
              Page: "/pilote",
            },
          },
        ],
      }),
    });
    if (!res.ok) {
      throw new Error(`airtable ${res.status} — ${(await res.text()).slice(0, 300)}`);
    }
  } catch (error) {
    console.error("[pilote] écriture Airtable échouée :", error);
  }
  return NextResponse.json({ ok: true });
}
