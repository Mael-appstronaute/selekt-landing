import { HomePage } from "@/components/pages/HomePage";
import { HOME } from "@/content/home";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("home", "fr", HOME.fr.meta);

export default function Page() {
  return <HomePage locale="fr" />;
}
