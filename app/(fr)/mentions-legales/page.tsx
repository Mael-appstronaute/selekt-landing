import { LegalPage } from "@/components/pages/LegalPage";
import { LEGAL } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata("legal", "fr", LEGAL.fr.meta),
  robots: { index: false },
};

export default function Page() {
  return <LegalPage content={LEGAL.fr} />;
}
