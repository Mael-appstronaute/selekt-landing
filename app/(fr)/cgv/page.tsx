import { EmText } from "@/components/ui/EmText";
import { Kicker } from "@/components/ui/Kicker";

const PDF_URL = "/docs/cgv-selekt-retail-os.pdf";

export const metadata = {
  title: "Conditions générales de vente",
  description: "Conditions générales de vente de Selekt Retail OS.",
  robots: { index: false },
};

export default function Page() {
  return (
    <div className="mx-auto flex max-w-[1272px] flex-col gap-6 px-4 pb-8 pt-[92px] md:px-8">
      <header className="py-10 md:py-14">
        <Kicker>Informations légales</Kicker>
        <h1 className="display-2 mt-4">
          <EmText text="Conditions générales de *vente*." />
        </h1>
        <p className="mt-5 max-w-[560px] text-[0.96rem] leading-relaxed muted">
          Le document ci-dessous détaille les conditions générales de vente de
          Selekt Retail OS. Vous pouvez le consulter en ligne ou le télécharger
          au format PDF.
        </p>
        <a
          href={PDF_URL}
          download="CGV-Selekt-Retail-OS.pdf"
          className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-ink px-8 text-[0.95rem] font-medium text-cream-2 no-underline transition-[background-color,transform,box-shadow] duration-300 ease-(--ease-lux) hover:-translate-y-0.5 hover:bg-void hover:shadow-[0_14px_28px_-12px_rgba(16,15,13,0.5)] active:translate-y-0 active:scale-[0.98] active:duration-100"
        >
          Télécharger le PDF
        </a>
      </header>
      <section className="overflow-hidden rounded-[20px] bg-card p-2 md:p-3">
        <iframe
          src={PDF_URL}
          title="Conditions générales de vente de Selekt Retail OS"
          className="h-[80vh] w-full rounded-[14px] border-0 bg-white"
        />
      </section>
    </div>
  );
}
