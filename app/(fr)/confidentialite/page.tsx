import { LegalPage } from "@/components/pages/LegalPage";
import { PRIVACY } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata("privacy", "fr", PRIVACY.fr.meta),
  robots: { index: false },
};

export default function Page() {
  return <LegalPage content={PRIVACY.fr} />;
}
