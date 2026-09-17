import { FeaturePage } from "@/components/pages/FeaturePage";
import { KLAVIYO } from "@/content/pages/integration-klaviyo";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("klaviyo", "fr", KLAVIYO.fr.meta);

export default function Page() {
  return <FeaturePage locale="fr" content={KLAVIYO.fr} />;
}
