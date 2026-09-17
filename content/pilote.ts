import type { KpiRow } from "@/components/mockups/KpiPanel";
import type { PriorityItem } from "@/components/mockups/PrioritiesList";
import type { AttributionLabels } from "@/components/mockups/AttributionPanel";

/* Convention : *mot* = italique accentué (sable sur sombre, laiton sur clair).
   Page d'acquisition autonome (cold mailing / cold calling) — FR uniquement. */

export type PilotContent = typeof PILOTE;

export const PILOTE = {
  meta: {
    title: "Programme pilote Selekt — 3 mois offerts pour 5 maisons",
    description:
      "Selekt ouvre son programme pilote à cinq réseaux de boutiques : trois mois d'accès complet offerts du 1er octobre au 31 décembre, accompagnement dédié et remise fondatrice de 50 % à vie.",
  },

  header: {
    note: "Programme pilote · 5 places",
    cta: "Candidater",
  },

  hero: {
    kicker: "Programme pilote · 1er octobre → 31 décembre 2026",
    title: "Trois mois pour prouver que votre clienteling *rapporte*.",
    lede: "Selekt sélectionne cinq maisons pour son programme pilote : trois mois d'accès complet à la plateforme, offerts et accompagnés, avant la commercialisation de janvier.",
    primary: "Candidater au programme",
    secondary: "Découvrir l'offre pilote",
    alt: "Conseillère au comptoir d'une boutique de luxe, tablette en main",
    offer: {
      kicker: "L'offre pilote",
      rows: [
        { value: "5", label: "maisons sélectionnées" },
        { value: "3 mois", label: "offerts, sans engagement" },
        { value: "−50 %", label: "à vie sur l'outil" },
      ],
      micro: "Candidature en 2 minutes · Réponse sous 48 h",
    },
    checks: ["3 mois offerts", "Sans engagement", "−50 % à vie ensuite"],
    marquee: [
      "5 maisons sélectionnées",
      "3 mois offerts",
      "−50 % à vie sur l'outil",
      "Sans engagement",
      "Réponse sous 48 h",
      "Avant-première exclusive",
    ],
  },

  connectors: {
    kicker: "Connecteurs",
    title: "Elle se *connecte* à vos outils.",
    body: "E-commerce, caisse, CRM, messageries, bureautique : Selekt s'intègre à l'écosystème de la maison et fait circuler la donnée client dans les deux sens, sans double saisie.",
    cta: "Candidater au pilote",
  },

  intro: {
    title: "Le clienteling existe déjà dans vos boutiques. Sa *preuve*, pas encore.",
    body: "Selekt réunit vendeurs, managers et siège dans une seule application : chaque message, rendez-vous et wishlist est tracé, chaque vente retrouve son origine, et le CA influencé remonte, réconciliable ligne à ligne, du comptoir au comité de direction.",
  },

  features: {
    kicker: "Ce que vous testez",
    title: "Une application, trois métiers, les mêmes *chiffres*.",
    body: "Pendant le pilote, vos équipes utilisent la plateforme complète, en conditions réelles, sur vos propres règles d'attribution.",
    cards: [
      {
        kicker: "Espace Vendeur",
        title: "Le client sur le bout des doigts",
        body: "Fiche 360°, wishlist, messagerie tracée, priorités du jour préparées chaque matin.",
        mock: {
          kind: "priorities" as const,
          title: "Priorités du jour — démonstration",
          items: [
            { initials: "A·M", text: "Recontacter après l'essayage du trench", tag: "Relance" },
            { initials: "C·B", text: "Wishlist : la pièce est arrivée en boutique", tag: "Stock" },
            { initials: "L·R", text: "Rendez-vous jeudi 15 h, préparer la sélection", tag: "RDV", wine: true },
          ] satisfies PriorityItem[],
        },
      },
      {
        kicker: "Espace Manager",
        title: "Le cockpit de la boutique",
        body: "CA direct et influencé par vendeur, objectifs d'équipe, portefeuilles clients.",
        mock: {
          kind: "kpi" as const,
          title: "Cockpit boutique — démonstration",
          badge: "Mois en cours",
          rows: [
            { label: "CA direct", value: "72 %", share: 72 },
            { label: "CA influencé", value: "28 %", share: 28, green: true },
            { label: "Objectif d'équipe", value: "84 %", share: 84 },
          ] satisfies KpiRow[],
          footnote: "Deux CA distincts, jamais additionnés. Données fictives.",
        },
      },
      {
        kicker: "Espace Siège",
        title: "La vue réseau, unifiée",
        body: "Analytics réseau, base clients unifiée, console de configuration sans développeur.",
        mock: {
          kind: "attribution" as const,
          labels: {
            title: "CA du mois — Boutique Vendôme",
            window: "Fenêtre : 30 j",
            direct: "CA direct",
            influenced: "CA influencé",
            note: "Attribution selon vos règles : fenêtre, canaux, méthode. Réconciliable ligne à ligne.",
          } satisfies AttributionLabels,
        },
      },
    ],
  },

  differentiation: {
    kicker: "Pourquoi Selekt",
    title: "Ce que les autres SaaS de clienteling *ne font pas*.",
    body: "Le marché sait envoyer des messages. Il ne sait ni prouver ce qu'ils rapportent, ni s'adapter à une maison sans projet IT.",
    colSelekt: "Avec Selekt",
    colOthers: "Clienteling classique",
    rows: [
      {
        dimension: "Mesure de la valeur",
        selekt: "CA influencé attribué selon vos règles, réconciliable ligne à ligne avec le CA direct",
        others: "Impact déclaratif, invérifiable",
      },
      {
        dimension: "Adaptation à la maison",
        selekt: "100 % paramétrable sans développeur : rôles, champs, règles, modèles",
        others: "Développements spécifiques sur devis",
      },
      {
        dimension: "Intelligence artificielle",
        selekt: "Copilote encadré : l'IA propose, l'humain relit et envoie",
        others: "Absente, ou boîte noire sans garde-fou",
      },
      {
        dimension: "Périmètre",
        selekt: "Vendeur, manager et siège dans une seule application",
        others: "Outil vendeur isolé du reste du réseau",
      },
      {
        dimension: "Mise en route",
        selekt: "Connecté à votre encaissement en quelques jours",
        others: "Projet d'intégration de plusieurs mois",
      },
    ],
  },

  roadmap: {
    kicker: "Roadmap produit",
    title: "Vous arrivez au *bon* moment.",
    steps: [
      {
        date: "Fin août 2026",
        title: "Développement finalisé",
        body: "La plateforme est complète : trois espaces, attribution, IA copilote, console de configuration.",
      },
      {
        date: "Septembre 2026",
        title: "Tests internes",
        body: "Un mois de rodage intensif par nos équipes avant toute mise en production.",
      },
      {
        date: "1er oct. → 31 déc.",
        title: "Projet pilote",
        body: "Cinq maisons utilisent Selekt en conditions réelles, accompagnées chaque semaine.",
        highlight: true,
        chip: "5 places — c'est ici",
      },
      {
        date: "1er janvier 2027",
        title: "Commercialisation",
        body: "Ouverture au marché. Les maisons pilotes conservent leur remise fondatrice à vie.",
      },
    ],
  },

  offer: {
    kicker: "Pourquoi candidater",
    title: "Cinq maisons. Pas *une* de plus.",
    body: "Nous préférons cinq déploiements réussis et accompagnés à cinquante comptes livrés à eux-mêmes. En échange de vos retours, les conditions fondatrices :",
    benefits: [
      "L'outil en exclusivité, en avant-première, trois mois avant le marché",
      "Programme ambassadeur : 50 % de remise à vie sur l'outil",
      "Un interlocuteur dédié et un point d'accompagnement chaque semaine",
      "Votre voix dans la roadmap : les fonctionnalités du pilote sont priorisées avec vous",
    ],
    stats: [
      { value: 5, label: "Maisons pilotes" },
      { value: 3, label: "Mois d'accès offert" },
      { value: 50, prefix: "−", suffix: " %", label: "À vie sur l'outil" },
    ],
    button: "Candidater au programme",
    micro: "Sans engagement · Sortie libre à tout moment",
    alt: "Nature morte sombre : cuir et outils de maroquinier",
  },

  apply: {
    kicker: "Candidature",
    title: "Rejoindre le programme pilote",
    steps: [
      {
        title: "Candidature en 2 minutes",
        body: "Le formulaire ci-contre suffit. Pas de dossier, pas de carte bancaire.",
      },
      {
        title: "Échange de 30 minutes",
        body: "Nous vous rappelons sous 48 h pour comprendre votre réseau et vos règles d'attribution.",
      },
      {
        title: "Sélection des 5 maisons",
        body: "Nous retenons les réseaux où le pilote peut prouver le plus, toutes tailles confondues.",
      },
      {
        title: "Onboarding le 1er octobre",
        body: "Connexion à votre encaissement, paramétrage à votre vocabulaire, formation des équipes.",
      },
    ],
  },

  form: {
    firstName: "Prénom",
    lastName: "Nom",
    company: "Nom de l'entreprise",
    email: "E-mail professionnel",
    phone: "Téléphone",
    stores: "Nombre de boutiques",
    storesOptions: ["1 boutique", "2 à 5 boutiques", "6 à 15 boutiques", "Plus de 15 boutiques"],
    pos: "Système d'encaissement (POS)",
    posOptions: ["Odeis Retail", "Bijou3", "Cegid", "Shopify POS", "Retail Pro POS"],
    posOther: "Autre / plusieurs systèmes",
    posOtherLabel: "Précisez votre système",
    posOtherPlaceholder: "Ex. : Fastmag, développement interne…",
    consent:
      "J'accepte que ces informations soient utilisées pour me recontacter dans le cadre du programme pilote Selekt.",
    privacyNote:
      "Aucune revente de données, aucune newsletter non sollicitée. Vos informations servent uniquement à instruire votre candidature.",
    submit: "Envoyer ma candidature",
    sending: "Envoi en cours…",
    successTitle: "Candidature reçue.",
    successBody:
      "Merci. Nous revenons vers vous sous 48 h pour organiser un échange de trente minutes.",
    errorBody: "L'envoi a échoué. Vérifiez votre connexion et réessayez dans un instant.",
    required: "Ce champ est requis.",
    invalidEmail: "Adresse e-mail invalide.",
    invalidPhone: "Numéro de téléphone invalide.",
  },

  faq: {
    kicker: "Questions fréquentes",
    title: "Ce que les maisons nous *demandent*.",
    items: [
      {
        q: "Combien coûte le programme pilote ?",
        a: "Rien. Les trois mois sont offerts, sans carte bancaire et sans engagement. À l'issue du pilote, les maisons qui continuent bénéficient de la remise ambassadeur de 50 % à vie.",
      },
      {
        q: "Qu'attendez-vous de nous en échange ?",
        a: "Utiliser l'outil en conditions réelles et nous accorder un point de retour d'une demi-heure toutes les deux semaines. C'est ce qui fait la valeur du pilote, dans les deux sens.",
      },
      {
        q: "Êtes-vous compatibles avec notre encaissement ?",
        a: "Selekt se connecte notamment à Cegid, Shopify POS, Odeis Retail, Bijou3 et Retail Pro. Un autre système ? Indiquez-le dans le formulaire : la connexion fait partie de l'étude de candidature.",
      },
      {
        q: "Que deviennent nos données ?",
        a: "Hébergement en Union européenne, conformité RGPD, permissions réglables champ par champ. En fin de pilote, vos données vous sont restituées ou supprimées, à votre choix.",
      },
      {
        q: "Que se passe-t-il après le 31 décembre ?",
        a: "La commercialisation ouvre le 1er janvier 2027. Les maisons pilotes gardent leur configuration, leurs données et leur remise fondatrice de 50 % à vie, sans obligation de poursuivre.",
      },
    ],
  },

  finalCta: {
    title: "Cinq places. Un trimestre. Une *preuve*.",
    button: "Candidater au programme",
  },

  footer: {
    legal: "Mentions légales",
    privacy: "Confidentialité",
    site: "selekt — le site",
    copyright: "© 2026 Appstronaute SAS",
  },
} as const;
