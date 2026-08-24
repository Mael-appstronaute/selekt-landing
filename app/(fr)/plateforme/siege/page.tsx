import { FeaturePage } from "@/components/pages/FeaturePage";
import { HQ } from "@/content/pages/hq";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("hq", "fr", HQ.fr.meta);

export default function Page() {
  return <FeaturePage locale="fr" content={HQ.fr} />;
}
