import { FeaturePage } from "@/components/pages/FeaturePage";
import { JEWELRY } from "@/content/pages/bijouterie-joaillerie";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("jewelry", "en", JEWELRY.en.meta);

export default function Page() {
  return <FeaturePage locale="en" content={JEWELRY.en} />;
}
