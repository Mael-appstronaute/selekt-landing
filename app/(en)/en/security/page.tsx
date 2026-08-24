import { FeaturePage } from "@/components/pages/FeaturePage";
import { SECURITY } from "@/content/pages/security";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("security", "en", SECURITY.en.meta);

export default function Page() {
  return <FeaturePage locale="en" content={SECURITY.en} />;
}
