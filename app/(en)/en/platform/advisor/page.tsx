import { FeaturePage } from "@/components/pages/FeaturePage";
import { ADVISOR } from "@/content/pages/advisor";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("advisor", "en", ADVISOR.en.meta);

export default function Page() {
  return <FeaturePage locale="en" content={ADVISOR.en} />;
}
