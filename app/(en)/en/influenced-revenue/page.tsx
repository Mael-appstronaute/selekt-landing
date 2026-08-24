import { FeaturePage } from "@/components/pages/FeaturePage";
import { INFLUENCED } from "@/content/pages/influenced";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("influencedRevenue", "en", INFLUENCED.en.meta);

export default function Page() {
  return <FeaturePage locale="en" content={INFLUENCED.en} />;
}
