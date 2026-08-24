import { FeaturePage } from "@/components/pages/FeaturePage";
import { SECURITY } from "@/content/pages/security";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("security", "fr", SECURITY.fr.meta);

export default function Page() {
  return <FeaturePage locale="fr" content={SECURITY.fr} />;
}
