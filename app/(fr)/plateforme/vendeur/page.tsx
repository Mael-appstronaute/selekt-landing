import { FeaturePage } from "@/components/pages/FeaturePage";
import { ADVISOR } from "@/content/pages/advisor";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("advisor", "fr", ADVISOR.fr.meta);

export default function Page() {
  return <FeaturePage locale="fr" content={ADVISOR.fr} />;
}
