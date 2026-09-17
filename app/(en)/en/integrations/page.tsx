import { FeaturePage } from "@/components/pages/FeaturePage";
import { INTEGRATIONS } from "@/content/pages/integrations";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("integrations", "en", INTEGRATIONS.en.meta);

export default function Page() {
  return <FeaturePage locale="en" content={INTEGRATIONS.en} />;
}
