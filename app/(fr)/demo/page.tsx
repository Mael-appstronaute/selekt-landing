import { DemoPage } from "@/components/pages/DemoPage";
import { DEMO } from "@/content/demo";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("demo", "fr", DEMO.fr.meta);

export default function Page() {
  return <DemoPage locale="fr" />;
}
