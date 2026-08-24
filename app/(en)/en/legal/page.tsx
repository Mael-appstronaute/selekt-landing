import { LegalPage } from "@/components/pages/LegalPage";
import { LEGAL } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata("legal", "en", LEGAL.en.meta),
  robots: { index: false },
};

export default function Page() {
  return <LegalPage content={LEGAL.en} />;
}
