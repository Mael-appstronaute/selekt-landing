import { isAdmin } from "@/lib/confiance/auth";
import { loadStore, readPdf } from "@/lib/confiance/store";

/** Retéléchargement d'un PDF archivé (déchiffré à la volée). */

export const runtime = "nodejs";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdmin(request)) return new Response("Unauthorized", { status: 401 });
  const { id } = await params;
  if (!/^doss_[0-9a-f]+$/.test(id)) return new Response("Not found", { status: 404 });
  const store = loadStore();
  const link = store.links.find((l) => l.id === id);
  const pdf = readPdf(id);
  if (!link || !pdf) return new Response("Not found", { status: 404 });
  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="selekt-${link.doc}-${id}.pdf"`,
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
