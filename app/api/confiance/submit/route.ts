import { NextResponse } from "next/server";
import {
  findLink,
  linkSections,
  linkUsable,
  loadStore,
  saveStore,
} from "@/lib/confiance/store";
import { sha256Hex } from "@/lib/confiance/crypto";
import { renderPdf } from "@/lib/confiance/pdf";
import { sendDossier } from "@/lib/confiance/mail";

/**
 * Validation d'un dossier par le destinataire : reconstruit le document côté
 * serveur (sections du lien + surcharges, jamais le contenu envoyé par le
 * client), génère le PDF, calcule son empreinte SHA-256, l'archive chiffré,
 * l'envoie à contact@selekt-retail.com et au destinataire, et complète le
 * journal. Un échec d'e-mail ne bloque pas la validation (PDF archivé).
 */

export const runtime = "nodejs";
export const maxDuration = 60;

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 10;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const stamps = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (stamps.length >= MAX_PER_WINDOW) return true;
  stamps.push(now);
  hits.set(ip, stamps);
  return false;
}

type Payload = {
  token?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactRole?: string;
  freeQuestions?: string;
  comments?: Record<string, string>; // num de section → commentaire
  website?: string; // honeypot
};

export async function POST(request: Request) {
  let data: Payload;
  try {
    data = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (data.website) return NextResponse.json({ ok: true });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) return NextResponse.json({ ok: false, error: "rate" }, { status: 429 });

  if (!data.token) return NextResponse.json({ ok: false }, { status: 400 });
  const store = loadStore();
  const link = findLink(store, data.token);
  if (!link || !linkUsable(link)) return NextResponse.json({ ok: false }, { status: 404 });

  const name = (data.contactName ?? "").trim() || link.recipient.name;
  const email = (data.contactEmail ?? "").trim() || link.recipient.email;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "email" }, { status: 400 });
  }
  for (const value of [data.contactPhone, data.contactRole, data.freeQuestions]) {
    if (typeof value === "string" && value.length > 10000) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
  }

  const comments: Record<string, string> = {};
  if (data.comments && typeof data.comments === "object") {
    for (const [k, v] of Object.entries(data.comments)) {
      if (typeof v === "string" && v.trim() && v.length <= 10000) comments[k] = v;
    }
  }

  const doc = store.documents[link.doc];
  const sections = linkSections(store, link).map((s) => ({
    ...s,
    comment: comments[String(s.num)],
  }));
  const dateStr = new Date().toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  let pdf: Buffer;
  try {
    pdf = await renderPdf({
      docTitle: doc.title,
      subtitle: doc.subtitle,
      versionLabel: link.versionLabel,
      docId: link.id,
      dateStr,
      variables: link.variables,
      recipient: { name, company: link.recipient.company, email },
      recipientFields: {
        ...(data.contactRole?.trim() ? { Fonction: data.contactRole.trim() } : {}),
        ...(data.contactPhone?.trim() ? { Téléphone: data.contactPhone.trim() } : {}),
      },
      sections,
      freeQuestions: data.freeQuestions,
    });
  } catch (error) {
    console.error("[confiance] génération PDF échouée :", error);
    return NextResponse.json({ ok: false, error: "pdf" }, { status: 500 });
  }

  const hash = sha256Hex(pdf);
  const { savePdf } = await import("@/lib/confiance/store");
  savePdf(link.id, pdf);

  // Journal : validation + empreinte (relecture du store pour limiter les courses)
  const fresh = loadStore();
  const freshLink = fresh.links.find((l) => l.id === link.id);
  if (freshLink) {
    freshLink.validatedAt = new Date().toISOString();
    freshLink.validateIp = ip;
    freshLink.pdfSha256 = hash;
    freshLink.recipient = { ...freshLink.recipient, name, email };
    delete fresh.drafts[link.tokenHash];
    saveStore(fresh);
  }

  const sent = await sendDossier({
    recipientEmail: email,
    recipientName: name,
    company: link.recipient.company,
    docTitle: doc.title,
    versionLabel: link.versionLabel,
    docId: link.id,
    summary: [
      `Document : ${doc.title} (${link.versionLabel})`,
      `Profil : ${link.profile}`,
      `Sections incluses : ${sections.map((s) => (s.num > 0 ? s.num : s.title)).join(", ")}`,
      `Destinataire : ${name} — ${link.recipient.company} — ${email}`,
      `Validé le : ${dateStr}`,
      `Empreinte SHA-256 : ${hash}`,
    ],
    pdf,
    filename: `selekt-${link.doc}-${link.variables.version.replace(/\s+/g, "")}-${link.id}.pdf`,
  }).catch((error) => {
    console.error("[confiance] envoi mail dossier échoué :", error);
    return false;
  });

  return NextResponse.json({ ok: true, sha256: hash, mailed: sent });
}
