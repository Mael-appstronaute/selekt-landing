import { FeaturePage } from "@/components/pages/FeaturePage";
import { REFERENTIEL_CLIENT_UNIQUE } from "@/content/pages/referentiel-client-unique";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("customerRecord", "en", REFERENTIEL_CLIENT_UNIQUE.en.meta);

export default function Page() {
  return <FeaturePage locale="en" content={REFERENTIEL_CLIENT_UNIQUE.en} />;
}
