import { LegalPage } from "@/components/pages/LegalPage";
import { PRIVACY } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata("privacy", "en", PRIVACY.en.meta),
  robots: { index: false },
};

export default function Page() {
  return <LegalPage content={PRIVACY.en} />;
}
