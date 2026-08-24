import { FeaturePage } from "@/components/pages/FeaturePage";
import { HQ } from "@/content/pages/hq";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("hq", "en", HQ.en.meta);

export default function Page() {
  return <FeaturePage locale="en" content={HQ.en} />;
}
