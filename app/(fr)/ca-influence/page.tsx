import { FeaturePage } from "@/components/pages/FeaturePage";
import { INFLUENCED } from "@/content/pages/influenced";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("influencedRevenue", "fr", INFLUENCED.fr.meta);

export default function Page() {
  return <FeaturePage locale="fr" content={INFLUENCED.fr} />;
}
