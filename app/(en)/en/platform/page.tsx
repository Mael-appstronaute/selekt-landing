import { FeaturePage } from "@/components/pages/FeaturePage";
import { PLATFORM } from "@/content/pages/platform";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("platform", "en", PLATFORM.en.meta);

export default function Page() {
  return <FeaturePage locale="en" content={PLATFORM.en} />;
}
