import { FeaturePage } from "@/components/pages/FeaturePage";
import { KLAVIYO } from "@/content/pages/integration-klaviyo";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("klaviyo", "en", KLAVIYO.en.meta);

export default function Page() {
  return <FeaturePage locale="en" content={KLAVIYO.en} />;
}
