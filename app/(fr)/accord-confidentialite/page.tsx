// Accord de confidentialité Partenaires & Freelances signable en ligne,
// même process que appstronaute.com/accord-confidentialite (partie A
// APPSTRONAUTE pré-signée, envoi FormSubmit, téléchargement PDF).
// Page utilitaire partagée par lien direct : noindex, hors sitemap.

import { Kicker } from "@/components/ui/Kicker";
import NdaAccord from "@/components/pages/NdaAccord";

export const metadata = {
  title: "Accord de confidentialité — Partenaires & Freelances",
  description:
    "Accord de confidentialité, de non-sollicitation et de protection du secret des affaires à compléter et signer en ligne.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <div className="mx-auto flex max-w-[1272px] flex-col px-4 pb-8 pt-[92px] md:px-8">
      <header className="max-w-[820px] py-10 md:py-14">
        <Kicker>Formulaire légal — Partenaires &amp; Freelances</Kicker>
        <h1 className="display-2 mt-4">Accord de confidentialité</h1>
        <p className="muted mt-5 max-w-[640px] text-[0.98rem] leading-relaxed">
          Complétez vos informations, lisez l&apos;accord puis signez « Bon pour accord » : la
          partie Appstronaute est déjà signée, votre exemplaire nous est transmis
          automatiquement et vous pouvez le télécharger une fois complété.
        </p>
      </header>
      <div className="max-w-[820px]">
        <NdaAccord />
      </div>
    </div>
  );
}
