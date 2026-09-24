import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/confiance/auth";
import { currentVersion, DOC_SLUGS, loadStore, saveStore, type DocSlug } from "@/lib/confiance/store";
import { newId } from "@/lib/confiance/crypto";

/**
 * Création d'une nouvelle version d'un document (v1.1, v1.2…) : copie de la
 * version courante, avec date et auteur. Les versions précédentes sont
 * conservées telles quelles — les liens déjà émis continuent de pointer vers
 * la version qui leur a servi de base.
 */

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isAdmin(request)) return NextResponse.json({ ok: false }, { status: 401 });
  let data: { doc?: string; label?: string; author?: string };
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const label = data.label?.trim();
  const author = data.author?.trim();
  if (!DOC_SLUGS.includes(data.doc as DocSlug) || !label || !author || label.length > 20 || author.length > 100) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const store = loadStore();
  const doc = store.documents[data.doc as DocSlug];
  if (doc.versions.some((v) => v.label === label)) {
    return NextResponse.json({ ok: false, error: "exists" }, { status: 409 });
  }
  const base = currentVersion(doc);
  doc.versions.push({
    id: newId("ver"),
    label,
    author,
    createdAt: new Date().toISOString(),
    sections: base.sections.map((s) => ({ ...s })),
  });
  saveStore(store);
  return NextResponse.json({ ok: true });
}
