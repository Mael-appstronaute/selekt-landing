import { FeaturePage } from "@/components/pages/FeaturePage";
import { CEGID } from "@/content/pages/integration-cegid";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("cegid", "en", CEGID.en.meta);

export default function Page() {
  return <FeaturePage locale="en" content={CEGID.en} />;
}
