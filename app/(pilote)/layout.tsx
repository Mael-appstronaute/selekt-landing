import type { Metadata } from "next";
import type { ReactNode } from "react";
import { fontClasses } from "@/lib/fonts";
import { SITE_URL } from "@/lib/seo";
import "../globals.css";

/**
 * Layout autonome de la landing d'acquisition — pas de SiteShell :
 * aucune navigation, un seul objectif de conversion. Le sous-domaine
 * dédié pourra pointer ici via un rewrite Vercel vers /pilote.
 */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

export default function PiloteLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={`${fontClasses} h-full antialiased`}>
      <body className="grain flex min-h-full flex-col">
        <main className="w-full">{children}</main>
      </body>
    </html>
  );
}
