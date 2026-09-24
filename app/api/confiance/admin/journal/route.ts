import { isAdmin } from "@/lib/confiance/auth";
import { loadStore, PROFILES } from "@/lib/confiance/store";

/** Export CSV du journal des envois (séparateur ; — Excel FR, UTF-8 BOM). */

export const runtime = "nodejs";

const csvCell = (v: string) => `"${v.replace(/"/g, '""')}"`;

export async function GET(request: Request) {
  if (!isAdmin(request)) return new Response("Unauthorized", { status: 401 });
  const store = loadStore();
  const header = [
    "identifiant",
    "document",
    "version",
    "profil",
    "sections",
    "destinataire_nom",
    "destinataire_societe",
    "destinataire_email",
    "usage_unique",
    "cree_le",
    "expire_le",
    "premiere_ouverture",
    "ip_ouverture",
    "valide_le",
    "ip_validation",
    "sha256_pdf",
  ];
  const rows = store.links.map((l) =>
    [
      l.id,
      store.documents[l.doc].title,
      l.versionLabel,
      PROFILES[l.profile],
      l.sections.join(" "),
      l.recipient.name,
      l.recipient.company,
      l.recipient.email,
      l.singleUse ? "oui" : "non",
      l.createdAt,
      l.expiresAt,
      l.firstOpenedAt ?? "",
      l.openIp ?? "",
      l.validatedAt ?? "",
      l.validateIp ?? "",
      l.pdfSha256 ?? "",
    ]
      .map(csvCell)
      .join(";"),
  );
  const csv = `﻿${header.join(";")}\n${rows.join("\n")}\n`;
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="journal-confiance-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
