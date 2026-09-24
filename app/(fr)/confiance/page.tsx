import type { Metadata } from "next";
import { EmText } from "@/components/ui/EmText";
import { Kicker } from "@/components/ui/Kicker";
import { RequestForm } from "@/components/confiance/RequestForm";

/**
 * Page publique « Confiance & conformité » — la seule page indexable du
 * module. Contenu volontairement court et sans détail technique : le dossier
 * complet (questionnaire de sécurité, fiche RGPD) n'est accessible que par
 * lien personnalisé généré depuis le back-office.
 */

export const metadata: Metadata = {
  title: "Confiance & conformité — Selekt Retail OS",
  description:
    "Hébergement OVHcloud en France, chiffrement, conformité RGPD : demandez le dossier de conformité de Selekt Retail OS.",
  alternates: { canonical: "https://selekt-retail.com/confiance" },
};

const PILLARS = [
  {
    title: "Hébergé en France",
    body: "La plateforme et ses sauvegardes sont hébergées par OVHcloud, société française, dans des centres de données situés en France. Aucune donnée n'est stockée hors de l'Espace économique européen.",
  },
  {
    title: "Chiffrement",
    body: "Les échanges sont chiffrés en transit (TLS) et les données le sont au repos. Les accès d'administration sont nominatifs, limités et journalisés.",
  },
  {
    title: "RGPD",
    body: "Votre maison est responsable de traitement, Selekt est sous-traitant au sens de l'article 28. Les droits des personnes s'exercent directement depuis la plateforme.",
  },
  {
    title: "DPA disponible",
    body: "Un accord de traitement des données (DPA) accompagne chaque contrat, avec la liste des sous-traitants ultérieurs et les mesures de sécurité détaillées.",
  },
];

export default function Page() {
  return (
    <div className="mx-auto flex max-w-[1272px] flex-col gap-6 px-4 pb-16 pt-[92px] md:px-8">
      <header className="py-10 md:py-14">
        {/* Contraste AA : le sand-muted par défaut ne passe pas sur crème */}
        <Kicker className="text-(--ink-soft)!">Confiance &amp; conformité</Kicker>
        <h1 className="display-2 mt-4">
          <EmText text="La conformité, *documentée* et vérifiable." />
        </h1>
        <p className="mt-5 max-w-[600px] text-[0.96rem] leading-relaxed muted">
          Questionnaire de sécurité, fiche de description du traitement,
          mesures techniques et organisationnelles : nous remettons à vos
          équipes un dossier complet, personnalisé et daté. Cette page en
          présente l&apos;essentiel.
        </p>
      </header>

      <section aria-labelledby="piliers" className="rounded-[20px] bg-card p-6 md:p-10">
        <h2 id="piliers" className="sr-only">
          Nos engagements
        </h2>
        <ul className="grid gap-x-10 gap-y-8 md:grid-cols-2">
          {PILLARS.map((p) => (
            <li key={p.title} className="border-t border-(--line-light) pt-5">
              <h3 className="font-serif text-[1.35rem] leading-tight">{p.title}</h3>
              <p className="mt-2 max-w-[52ch] text-[0.92rem] leading-relaxed muted">{p.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="demande" className="rounded-[20px] bg-card p-6 md:p-10">
        <h2 id="demande" className="font-serif text-[1.7rem] leading-tight">
          Demander notre dossier de conformité
        </h2>
        <p className="mt-2 max-w-[62ch] text-[0.92rem] leading-relaxed muted">
          Dites-nous qui vous êtes et ce dont vous avez besoin : nous vous
          adressons un accès personnalisé au questionnaire de sécurité et à la
          fiche RGPD, adaptés à votre fonction.
        </p>
        <div className="relative mt-8 max-w-[720px]">
          <RequestForm />
        </div>
      </section>
    </div>
  );
}
