import { FeaturePage } from "@/components/pages/FeaturePage";
import { WHY } from "@/content/pages/why";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("whySelekt", "en", WHY.en.meta);

export default function Page() {
  return <FeaturePage locale="en" content={WHY.en} />;
}
