import type { Metadata } from "next";
import { ConfianceDocPage } from "@/components/confiance/DocPage";

export const metadata: Metadata = {
  title: "Fiche de description du traitement — document confidentiel",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function Page({ searchParams }: PageProps<"/confiance/rgpd">) {
  return <ConfianceDocPage slug="rgpd" searchParams={searchParams} />;
}
