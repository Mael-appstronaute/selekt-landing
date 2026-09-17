import { FeaturePage } from "@/components/pages/FeaturePage";
import { FASHION } from "@/content/pages/mode-pret-a-porter";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("fashion", "en", FASHION.en.meta);

export default function Page() {
  return <FeaturePage locale="en" content={FASHION.en} />;
}
