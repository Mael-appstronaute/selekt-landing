import { FeaturePage } from "@/components/pages/FeaturePage";
import { WHY } from "@/content/pages/why";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("whySelekt", "fr", WHY.fr.meta);

export default function Page() {
  return <FeaturePage locale="fr" content={WHY.fr} />;
}
