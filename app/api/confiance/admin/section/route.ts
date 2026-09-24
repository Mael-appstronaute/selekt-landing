import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/confiance/auth";
import { currentVersion, DOC_SLUGS, loadStore, saveStore, type DocSlug } from "@/lib/confiance/store";

/** Édition du contenu de référence d'une section (version courante). */

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isAdmin(request)) return NextResponse.json({ ok: false }, { status: 401 });
  let data: { doc?: string; num?: number; title?: string; html?: string };
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (
    !DOC_SLUGS.includes(data.doc as DocSlug) ||
    typeof data.num !== "number" ||
    typeof data.html !== "string" ||
    data.html.length > 200000
  ) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const store = loadStore();
  const version = currentVersion(store.documents[data.doc as DocSlug]);
  const section = version.sections.find((s) => s.num === data.num);
  if (!section) return NextResponse.json({ ok: false }, { status: 404 });
  section.html = data.html;
  if (typeof data.title === "string" && data.title.trim()) section.title = data.title.trim();
  saveStore(store);
  return NextResponse.json({ ok: true });
}
