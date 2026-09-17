import { FeaturePage } from "@/components/pages/FeaturePage";
import { FASHION } from "@/content/pages/mode-pret-a-porter";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("fashion", "fr", FASHION.fr.meta);

export default function Page() {
  return <FeaturePage locale="fr" content={FASHION.fr} />;
}
