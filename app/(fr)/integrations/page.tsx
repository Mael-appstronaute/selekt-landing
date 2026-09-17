import { FeaturePage } from "@/components/pages/FeaturePage";
import { INTEGRATIONS } from "@/content/pages/integrations";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("integrations", "fr", INTEGRATIONS.fr.meta);

export default function Page() {
  return <FeaturePage locale="fr" content={INTEGRATIONS.fr} />;
}
