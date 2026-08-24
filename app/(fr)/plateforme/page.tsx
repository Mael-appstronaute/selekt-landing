import { FeaturePage } from "@/components/pages/FeaturePage";
import { PLATFORM } from "@/content/pages/platform";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("platform", "fr", PLATFORM.fr.meta);

export default function Page() {
  return <FeaturePage locale="fr" content={PLATFORM.fr} />;
}
