import { NextResponse } from "next/server";

/**
 * Relais de notification pour le circuit de contrats signables hébergé sur le
 * VPS (selekt-retail.com/c/…). Le VPS ne peut pas joindre FormSubmit en direct
 * (challenge Cloudflare sur les IP datacenter) ; les fonctions Vercel passent.
 * Protégé par le même jeton que le webhook de signatures.
 */

const ENDPOINT = "https://formsubmit.co/ajax/contact@selekt-retail.com";
const TOKEN = "a6cdfdf08c4af95ac0b5c2f4b54b8eec";
const SITE_URL = "https://selekt-retail.com";

export async function POST(request: Request) {
  let data: { k?: string; fields?: Record<string, string> };
  try {
    data = (await request.json()) as typeof data;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (data.k !== TOKEN) {
    return NextResponse.json({ ok: false }, { status: 403 });
  }
  if (!data.fields || typeof data.fields !== "object") {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: SITE_URL,
        Referer: `${SITE_URL}/`,
      },
      body: JSON.stringify(data.fields),
    });
    const texte = await res.text();
    // On remonte la réponse FormSubmit telle quelle pour que le VPS puisse
    // journaliser précisément (activation manquante, challenge, succès…).
    return NextResponse.json(
      { ok: res.ok, formsubmit: texte.slice(0, 500) },
      { status: res.ok ? 200 : 502 }
    );
  } catch (error) {
    return NextResponse.json(
      { ok: false, formsubmit: String(error).slice(0, 200) },
      { status: 502 }
    );
  }
}
