import { FeaturePage } from "@/components/pages/FeaturePage";
import { REFERENTIEL_CLIENT_UNIQUE } from "@/content/pages/referentiel-client-unique";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("customerRecord", "fr", REFERENTIEL_CLIENT_UNIQUE.fr.meta);

export default function Page() {
  return <FeaturePage locale="fr" content={REFERENTIEL_CLIENT_UNIQUE.fr} />;
}
