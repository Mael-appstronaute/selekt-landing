import { FeaturePage } from "@/components/pages/FeaturePage";
import { AI } from "@/content/pages/ai";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("aiCopilot", "en", AI.en.meta);

export default function Page() {
  return <FeaturePage locale="en" content={AI.en} />;
}
