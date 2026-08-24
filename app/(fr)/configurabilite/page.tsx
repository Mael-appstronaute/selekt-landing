import { FeaturePage } from "@/components/pages/FeaturePage";
import { CONFIGURABILITY } from "@/content/pages/configurability";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("configurability", "fr", CONFIGURABILITY.fr.meta);

export default function Page() {
  return <FeaturePage locale="fr" content={CONFIGURABILITY.fr} />;
}
