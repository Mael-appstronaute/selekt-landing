import { FeaturePage } from "@/components/pages/FeaturePage";
import { JEWELRY } from "@/content/pages/bijouterie-joaillerie";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("jewelry", "fr", JEWELRY.fr.meta);

export default function Page() {
  return <FeaturePage locale="fr" content={JEWELRY.fr} />;
}
