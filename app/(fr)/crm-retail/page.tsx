import { FeaturePage } from "@/components/pages/FeaturePage";
import { CRM_RETAIL } from "@/content/pages/crm-retail";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("crmRetail", "fr", CRM_RETAIL.fr.meta);

export default function Page() {
  return <FeaturePage locale="fr" content={CRM_RETAIL.fr} />;
}
