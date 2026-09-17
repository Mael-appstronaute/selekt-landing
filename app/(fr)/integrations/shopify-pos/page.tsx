import { FeaturePage } from "@/components/pages/FeaturePage";
import { SHOPIFY_POS } from "@/content/pages/integration-shopify-pos";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("shopifyPos", "fr", SHOPIFY_POS.fr.meta);

export default function Page() {
  return <FeaturePage locale="fr" content={SHOPIFY_POS.fr} />;
}
