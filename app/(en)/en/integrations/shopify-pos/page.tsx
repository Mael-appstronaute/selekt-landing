import { FeaturePage } from "@/components/pages/FeaturePage";
import { SHOPIFY_POS } from "@/content/pages/integration-shopify-pos";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("shopifyPos", "en", SHOPIFY_POS.en.meta);

export default function Page() {
  return <FeaturePage locale="en" content={SHOPIFY_POS.en} />;
}
