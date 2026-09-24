import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/confiance/auth";
import {
  currentVersion,
  DOC_SLUGS,
  loadStore,
  PROFILES,
  saveStore,
  type DocSlug,
  type ProfileKey,
} from "@/lib/confiance/store";
import { newId, newToken, sha256Hex } from "@/lib/confiance/crypto";
import { SITE_URL } from "@/lib/seo";

/**
 * Génération d'un lien signé pour un destinataire : jeton aléatoire transmis
 * UNE seule fois dans la réponse (seul son hash SHA-256 est conservé),
 * durée 30 jours, option usage unique. Le lien fige la version courante du
 * document, les sections cochées et les éventuelles surcharges client.
 */

export const runtime = "nodejs";

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

type Payload = {
  doc?: string;
  profile?: string;
  sections?: number[];
  recipient?: { name?: string; company?: string; email?: string };
  variables?: { interlocuteur?: string; societe?: string; date?: string; version?: string };
  overrides?: Record<string, string>;
  singleUse?: boolean;
};

export async function POST(request: Request) {
  if (!isAdmin(request)) return NextResponse.json({ ok: false }, { status: 401 });
  let data: Payload;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!DOC_SLUGS.includes(data.doc as DocSlug)) return NextResponse.json({ ok: false }, { status: 400 });
  if (!Object.keys(PROFILES).includes(data.profile as ProfileKey)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const name = data.recipient?.name?.trim();
  const company = data.recipient?.company?.trim();
  const email = data.recipient?.email?.trim();
  if (!name || !company || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "recipient" }, { status: 400 });
  }
  if (!Array.isArray(data.sections) || data.sections.length === 0) {
    return NextResponse.json({ ok: false, error: "sections" }, { status: 400 });
  }

  const store = loadStore();
  const slug = data.doc as DocSlug;
  const doc = store.documents[slug];
  const version = currentVersion(doc);
  const validNums = new Set(version.sections.filter((s) => !s.internal).map((s) => s.num));
  const sections = data.sections.filter((n) => validNums.has(n)).sort((a, b) => a - b);
  if (sections.length === 0) return NextResponse.json({ ok: false, error: "sections" }, { status: 400 });

  const overrides: Record<string, string> = {};
  if (data.overrides && typeof data.overrides === "object") {
    for (const [k, v] of Object.entries(data.overrides)) {
      if (typeof v === "string" && v.trim() && v.length <= 200000 && validNums.has(Number(k))) {
        overrides[k] = v;
      }
    }
  }

  const token = newToken();
  const now = Date.now();
  const link = {
    id: newId("doss"),
    tokenHash: sha256Hex(token),
    doc: slug,
    versionId: version.id,
    versionLabel: version.label,
    profile: data.profile as ProfileKey,
    sections,
    recipient: { name, company, email },
    variables: {
      interlocuteur: data.variables?.interlocuteur?.trim() || name,
      societe: data.variables?.societe?.trim() || company,
      date: data.variables?.date?.trim() ||
        new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }),
      version: data.variables?.version?.trim() || version.label,
    },
    overrides,
    singleUse: Boolean(data.singleUse),
    createdAt: new Date(now).toISOString(),
    expiresAt: new Date(now + THIRTY_DAYS_MS).toISOString(),
  };
  store.links.push(link);
  saveStore(store);

  return NextResponse.json({
    ok: true,
    id: link.id,
    url: `${SITE_URL}/confiance/${slug}?t=${token}`,
    expiresAt: link.expiresAt,
  });
}
