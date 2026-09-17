import { FeaturePage } from "@/components/pages/FeaturePage";
import { CEGID } from "@/content/pages/integration-cegid";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("cegid", "fr", CEGID.fr.meta);

export default function Page() {
  return <FeaturePage locale="fr" content={CEGID.fr} />;
}
