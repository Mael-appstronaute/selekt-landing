import { FeaturePage } from "@/components/pages/FeaturePage";
import { CONFIGURABILITY } from "@/content/pages/configurability";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("configurability", "en", CONFIGURABILITY.en.meta);

export default function Page() {
  return <FeaturePage locale="en" content={CONFIGURABILITY.en} />;
}
