import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/confiance/auth";
import { loadStore } from "@/lib/confiance/store";

/** État complet du back-office (documents, journal, demandes) — sans les hashs de jetons. */

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!isAdmin(request)) return NextResponse.json({ ok: false }, { status: 401 });
  const store = loadStore();
  return NextResponse.json({
    ok: true,
    documents: store.documents,
    links: store.links.map((link) => {
      const rest = { ...link } as Partial<typeof link>;
      delete rest.tokenHash;
      return rest;
    }),
    requests: store.requests,
  });
}
