import { FeaturePage } from "@/components/pages/FeaturePage";
import { CRM_RETAIL } from "@/content/pages/crm-retail";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("crmRetail", "en", CRM_RETAIL.en.meta);

export default function Page() {
  return <FeaturePage locale="en" content={CRM_RETAIL.en} />;
}
