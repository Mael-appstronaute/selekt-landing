import type { Metadata } from "next";
import { fontClasses } from "@/lib/fonts";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { SiteShell } from "@/components/site/SiteShell";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Le clienteling des maisons de luxe`,
    template: `%s — ${SITE_NAME}`,
  },
};

export default function FrLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${fontClasses} h-full antialiased`}>
      <body className="grain flex min-h-full flex-col">
        <SiteShell locale="fr">{children}</SiteShell>
      </body>
    </html>
  );
}
