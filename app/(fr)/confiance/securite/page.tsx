import type { Metadata } from "next";
import { ConfianceDocPage } from "@/components/confiance/DocPage";

export const metadata: Metadata = {
  title: "Questionnaire de sécurité — document confidentiel",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function Page({ searchParams }: PageProps<"/confiance/securite">) {
  return <ConfianceDocPage slug="securite" searchParams={searchParams} />;
}
