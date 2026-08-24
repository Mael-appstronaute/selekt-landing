import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import type { Locale } from "@/lib/routes";

export const WHY: Record<Locale, FeaturePageContent> = {
  fr: {
    meta: {
      title: "Pourquoi Selekt — configurable et traçable, les deux vraiment",
      description:
        "Face aux CRM généralistes et aux solutions de clienteling fermées, Selekt tient deux promesses à la fois : la configurabilité totale et la traçabilité du CA influencé.",
    },
    hero: {
      kicker: "Pourquoi Selekt",
      title: "Configurable et *traçable*. Les deux, vraiment.",
      lede: "Le marché force un choix : des CRM généralistes à adapter à grands frais, ou des solutions de clienteling fermées. Selekt refuse l'alternative : un produit métier, entièrement paramétrable, qui prouve ce qu'il rapporte.",
      demoLabel: "Demander une démo",
      bg: "silk",
      secondary: { label: "Voir la plateforme", key: "platform" },
    },
    sections: [
      {
        type: "photo",
        photo: "heroBoutique",
        alt: "Intérieur d'une boutique de luxe aux tons crème",
        kicker: "La maison",
        title: "Une maison se juge à ses *finitions*.",
        body: "Comparer des solutions, c'est comparer des détails : qui distingue les deux CA, qui vous laisse la main, qui journalise tout.",
      },
      {
        type: "table",
        tone: "cream",
        kicker: "Comparatif",
        title: "Trois approches, *factuellement*.",
        lede: "Un comparatif par catégories d'offres, sans viser un éditeur en particulier. Les différences structurelles, pas les effets d'annonce.",
        columns: ["CRM généralistes", "Selekt", "Clienteling fermé"],
        highlight: 1,
        rows: [
          { label: "Pensé pour la boutique de luxe", cells: [false, true, true] },
          {
            label: "Configurable sans développeur",
            cells: ["Projet d'intégration", true, "Options limitées"],
          },
          { label: "CA direct / CA influencé distingués", cells: [false, true, "Selon les offres"] },
          { label: "Règles d'attribution paramétrables", cells: [false, true, false] },
          { label: "IA avec validation humaine systématique", cells: ["Variable", true, "Variable"] },
          { label: "Interface FR · EN · ES · ZH", cells: ["Variable", true, "Variable"] },
          {
            label: "Permissions au niveau de la donnée",
            cells: ["Projet d'intégration", true, "Rarement"],
          },
          { label: "Journal d'audit complet", cells: ["Variable", true, "Variable"] },
        ],
        note: "Comparatif établi par catégories d'offres du marché, à date de publication. Chaque déploiement mérite son propre examen : c'est l'objet de la démonstration.",
      },
      {
        type: "cards",
        tone: "dark",
        cols: 2,
        kicker: "Nos deux paris",
        title: "Ce qui ne se *négocie* pas.",
        cards: [
          {
            key: "configurability",
            kicker: "Pari n°1",
            title: "La configurabilité totale",
            body: "Aucun rôle codé en dur, aucun champ imposé, aucune règle figée. Votre maison garde la main, du premier jour au dixième pays.",
            cta: "Explorer",
          },
          {
            key: "influencedRevenue",
            kicker: "Pari n°2",
            title: "La traçabilité de bout en bout",
            body: "Chaque euro influencé renvoie à une action, un auteur, une date. Le clienteling cesse d'être un acte de foi.",
            cta: "Explorer",
          },
        ],
      },
    ],
  },

  en: {
    meta: {
      title: "Why Selekt — configurable and traceable, truly both",
      description:
        "Against generalist CRMs and closed clienteling solutions, Selekt keeps two promises at once: total configurability and end-to-end traceability of influenced revenue.",
    },
    hero: {
      kicker: "Why Selekt",
      title: "Configurable and *traceable*. Truly both.",
      lede: "The market forces a choice: generalist CRMs adapted at great expense, or closed clienteling solutions. Selekt refuses the alternative: a domain product, fully configurable, that proves what it brings in.",
      demoLabel: "Request a demo",
      bg: "silk",
      secondary: { label: "See the platform", key: "platform" },
    },
    sections: [
      {
        type: "photo",
        photo: "heroBoutique",
        alt: "Cream-toned luxury boutique interior",
        kicker: "The house",
        title: "A house is judged by its *finishing*.",
        body: "Comparing solutions means comparing details: who distinguishes the two revenues, who leaves you the hand, who logs everything.",
      },
      {
        type: "table",
        tone: "cream",
        kicker: "Comparison",
        title: "Three approaches, *factually*.",
        lede: "A comparison by offer category, without targeting any particular vendor. Structural differences, not marketing claims.",
        columns: ["Generalist CRMs", "Selekt", "Closed clienteling"],
        highlight: 1,
        rows: [
          { label: "Designed for the luxury boutique", cells: [false, true, true] },
          {
            label: "Configurable without a developer",
            cells: ["Integration project", true, "Limited options"],
          },
          { label: "Direct / influenced revenue distinguished", cells: [false, true, "Depends on offer"] },
          { label: "Configurable attribution rules", cells: [false, true, false] },
          { label: "AI with systematic human approval", cells: ["Varies", true, "Varies"] },
          { label: "Interface in FR · EN · ES · ZH", cells: ["Varies", true, "Varies"] },
          {
            label: "Data-level permissions",
            cells: ["Integration project", true, "Rarely"],
          },
          { label: "Full audit log", cells: ["Varies", true, "Varies"] },
        ],
        note: "Comparison established by market offer categories, at publication date. Every deployment deserves its own examination: that is what the demonstration is for.",
      },
      {
        type: "cards",
        tone: "dark",
        cols: 2,
        kicker: "Our two wagers",
        title: "What is *non-negotiable*.",
        cards: [
          {
            key: "configurability",
            kicker: "Wager no. 1",
            title: "Total configurability",
            body: "No hard-coded roles, no imposed fields, no frozen rules. Your house keeps the hand, from day one to the tenth country.",
            cta: "Explore",
          },
          {
            key: "influencedRevenue",
            kicker: "Wager no. 2",
            title: "End-to-end traceability",
            body: "Every influenced euro points to an action, an author, a date. Clienteling stops being an act of faith.",
            cta: "Explore",
          },
        ],
      },
    ],
  },
};
