import { DemoPage } from "@/components/pages/DemoPage";
import { DEMO } from "@/content/demo";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("demo", "en", DEMO.en.meta);

export default function Page() {
  return <DemoPage locale="en" />;
}
