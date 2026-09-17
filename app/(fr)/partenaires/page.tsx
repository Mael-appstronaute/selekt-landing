import { PartnersPage } from "@/components/pages/PartnersPage";
import { PARTNERS } from "@/content/pages/partners";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("partners", "fr", PARTNERS.fr.meta);

export default function Page() {
  return <PartnersPage locale="fr" content={PARTNERS.fr} />;
}
