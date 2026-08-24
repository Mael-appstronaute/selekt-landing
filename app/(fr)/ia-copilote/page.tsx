import { FeaturePage } from "@/components/pages/FeaturePage";
import { AI } from "@/content/pages/ai";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("aiCopilot", "fr", AI.fr.meta);

export default function Page() {
  return <FeaturePage locale="fr" content={AI.fr} />;
}
