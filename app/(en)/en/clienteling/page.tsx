import { FeaturePage } from "@/components/pages/FeaturePage";
import { CLIENTELING } from "@/content/pages/clienteling";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("clienteling", "en", CLIENTELING.en.meta);

export default function Page() {
  return <FeaturePage locale="en" content={CLIENTELING.en} />;
}
