import type { Metadata } from "next";
import { fontClasses } from "@/lib/fonts";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { SiteShell } from "@/components/site/SiteShell";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Clienteling for luxury houses`,
    template: `%s — ${SITE_NAME}`,
  },
};

export default function EnLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fontClasses} h-full antialiased`}>
      <body className="grain flex min-h-full flex-col">
        <SiteShell locale="en">{children}</SiteShell>
      </body>
    </html>
  );
}
