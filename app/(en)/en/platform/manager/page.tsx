import { FeaturePage } from "@/components/pages/FeaturePage";
import { MANAGER } from "@/content/pages/manager";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("manager", "en", MANAGER.en.meta);

export default function Page() {
  return <FeaturePage locale="en" content={MANAGER.en} />;
}
