import { NextResponse } from "next/server";
import { findLink, linkUsable, loadStore, saveStore } from "@/lib/confiance/store";
import { sha256Hex } from "@/lib/confiance/crypto";

/**
 * Sauvegarde automatique de la saisie du destinataire sur une page privée :
 * la reprise fonctionne même après fermeture du navigateur ou changement de
 * poste, tant que le lien est valide. Authentifié par le jeton du lien.
 */

export const runtime = "nodejs";

export async function POST(request: Request) {
  let data: { token?: string; fields?: Record<string, string> };
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (!data.token || typeof data.fields !== "object" || data.fields === null) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const store = loadStore();
  const link = findLink(store, data.token);
  if (!link || !linkUsable(link)) return NextResponse.json({ ok: false }, { status: 404 });

  const fields: Record<string, string> = {};
  for (const [k, v] of Object.entries(data.fields)) {
    if (typeof v === "string" && k.length <= 100 && v.length <= 10000) fields[k] = v;
  }
  store.drafts[sha256Hex(data.token)] = { fields, updatedAt: new Date().toISOString() };
  saveStore(store);
  return NextResponse.json({ ok: true });
}
