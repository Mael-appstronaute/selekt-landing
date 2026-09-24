import { notFound } from "next/navigation";
import { Kicker } from "@/components/ui/Kicker";
import { DocView } from "@/components/confiance/DocView";
import {
  findLink,
  linkSections,
  linkUsable,
  loadStore,
  saveStore,
  type DocSlug,
} from "@/lib/confiance/store";
import { headers } from "next/headers";

/**
 * Rendu serveur commun aux deux pages privées (/confiance/securite et
 * /confiance/rgpd) : sans jeton valide → 404, sinon consignation de la
 * première ouverture (date + IP) et affichage du dossier pour ce lien
 * (sections cochées, surcharges client appliquées).
 */

export async function ConfianceDocPage({
  slug,
  searchParams,
}: {
  slug: DocSlug;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const token = typeof params.t === "string" ? params.t : "";
  if (!token || token.length > 200) notFound();

  const store = loadStore();
  const link = findLink(store, token);
  if (!link || link.doc !== slug || !linkUsable(link)) notFound();

  if (!link.firstOpenedAt) {
    const h = await headers();
    link.firstOpenedAt = new Date().toISOString();
    link.openIp = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    saveStore(store);
  }

  const doc = store.documents[slug];
  const sections = linkSections(store, link).map(({ num, title, html }) => ({ num, title, html }));
  const draft = store.drafts[link.tokenHash]?.fields ?? null;

  return (
    <div className="mx-auto flex max-w-[1272px] flex-col px-4 pb-16 pt-[92px] md:px-8">
      <header className="mx-auto w-full max-w-[860px] py-8 md:py-10">
        {/* Contraste AA : le sand-muted par défaut ne passe pas sur crème */}
        <Kicker className="text-(--ink-soft)!">Confiance &amp; conformité · document confidentiel</Kicker>
        <h1 className="display-2 mt-4">{doc.title}</h1>
        <p className="mt-2 text-[0.95rem] italic muted">{doc.subtitle}</p>
      </header>
      <DocView
        token={token}
        docTitle={doc.title}
        subtitle={doc.subtitle}
        versionLabel={link.versionLabel}
        expiresAt={link.expiresAt}
        recipient={link.recipient}
        variables={link.variables}
        sections={sections}
        serverDraft={draft}
      />
    </div>
  );
}
