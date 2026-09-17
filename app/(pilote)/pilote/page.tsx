import type { Metadata } from "next";
import { PilotPage } from "@/components/pages/PilotPage";
import { PILOTE } from "@/content/pilote";

export const metadata: Metadata = {
  title: { absolute: PILOTE.meta.title },
  description: PILOTE.meta.description,
  alternates: { canonical: "/pilote" },
  openGraph: {
    title: PILOTE.meta.title,
    description: PILOTE.meta.description,
    url: "/pilote",
    siteName: "Selekt Retail OS",
    locale: "fr_FR",
    type: "website",
  },
};

export default function Page() {
  return <PilotPage />;
}
