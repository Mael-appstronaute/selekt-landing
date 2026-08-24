import { FeaturePage } from "@/components/pages/FeaturePage";
import { MANAGER } from "@/content/pages/manager";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("manager", "fr", MANAGER.fr.meta);

export default function Page() {
  return <FeaturePage locale="fr" content={MANAGER.fr} />;
}
