import { FeaturePage } from "@/components/pages/FeaturePage";
import { CLIENTELING } from "@/content/pages/clienteling";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("clienteling", "fr", CLIENTELING.fr.meta);

export default function Page() {
  return <FeaturePage locale="fr" content={CLIENTELING.fr} />;
}
