import type { Locale } from "@/lib/routes";

export type LegalContent = {
  meta: { title: string; description: string };
  kicker: string;
  title: string;
  sections: { title: string; paragraphs: string[] }[];
};

/*
 * PLACEHOLDER — les mentions marquées « À COMPLÉTER » doivent être
 * renseignées avant mise en ligne (SIREN, adresse, hébergeur, contact).
 */

export const LEGAL: Record<Locale, LegalContent> = {
  fr: {
    meta: {
      title: "Mentions légales",
      description: "Mentions légales du site Selekt Retail OS.",
    },
    kicker: "Informations légales",
    title: "Mentions *légales*.",
    sections: [
      {
        title: "Éditeur du site",
        paragraphs: [
          "Le site selekt.appstronaute.com est édité par Appstronaute SAS, dont Selekt Retail OS est une marque.",
          "Siège social, numéro d'immatriculation et coordonnées : À COMPLÉTER avant mise en ligne.",
        ],
      },
      {
        title: "Directeur de la publication",
        paragraphs: ["À COMPLÉTER avant mise en ligne."],
      },
      {
        title: "Hébergement",
        paragraphs: ["Nom et coordonnées de l'hébergeur : À COMPLÉTER avant mise en ligne."],
      },
      {
        title: "Propriété intellectuelle",
        paragraphs: [
          "L'ensemble des contenus de ce site (textes, visuels, marques, logos) est protégé par le droit de la propriété intellectuelle. Toute reproduction non autorisée est interdite.",
        ],
      },
      {
        title: "Contact",
        paragraphs: ["Adresse de contact : À COMPLÉTER avant mise en ligne."],
      },
    ],
  },
  en: {
    meta: {
      title: "Legal notice",
      description: "Legal notice of the Selekt Retail OS website.",
    },
    kicker: "Legal information",
    title: "Legal *notice*.",
    sections: [
      {
        title: "Site publisher",
        paragraphs: [
          "The site selekt.appstronaute.com is published by Appstronaute SAS, of which Selekt Retail OS is a brand.",
          "Registered office, registration number and contact details: TO BE COMPLETED before going live.",
        ],
      },
      {
        title: "Publication director",
        paragraphs: ["TO BE COMPLETED before going live."],
      },
      {
        title: "Hosting",
        paragraphs: ["Host name and contact details: TO BE COMPLETED before going live."],
      },
      {
        title: "Intellectual property",
        paragraphs: [
          "All content on this site (texts, visuals, trademarks, logos) is protected by intellectual property law. Any unauthorized reproduction is prohibited.",
        ],
      },
      {
        title: "Contact",
        paragraphs: ["Contact address: TO BE COMPLETED before going live."],
      },
    ],
  },
};

export const PRIVACY: Record<Locale, LegalContent> = {
  fr: {
    meta: {
      title: "Politique de confidentialité",
      description:
        "Comment le site Selekt Retail OS collecte et traite les données du formulaire de demande de démonstration.",
    },
    kicker: "Confidentialité",
    title: "Politique de *confidentialité*.",
    sections: [
      {
        title: "Ce que nous collectons",
        paragraphs: [
          "Le site ne collecte de données personnelles qu'à un seul endroit : le formulaire de demande de démonstration. Les données collectées sont celles que vous y renseignez : nom, société, e-mail professionnel, fonction, taille du réseau et, si vous le souhaitez, un message de contexte.",
          "Le site ne dépose pas de cookies de suivi publicitaire.",
        ],
      },
      {
        title: "Pourquoi nous les collectons",
        paragraphs: [
          "Ces données servent exclusivement à traiter votre demande de démonstration et à vous recontacter à ce sujet. La base légale du traitement est votre consentement, exprimé par la case à cocher du formulaire.",
          "Elles ne sont ni cédées, ni vendues, ni utilisées à des fins de prospection non sollicitée.",
        ],
      },
      {
        title: "Durée de conservation",
        paragraphs: [
          "Les données liées à une demande de démonstration sont conservées le temps du traitement de la demande et des échanges commerciaux qui peuvent en découler, puis supprimées. Durée précise : À COMPLÉTER selon la politique interne.",
        ],
      },
      {
        title: "Vos droits",
        paragraphs: [
          "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation et d'opposition sur vos données. Pour l'exercer, écrivez-nous : adresse À COMPLÉTER avant mise en ligne.",
          "Vous pouvez également adresser une réclamation à la CNIL (cnil.fr).",
        ],
      },
    ],
  },
  en: {
    meta: {
      title: "Privacy policy",
      description:
        "How the Selekt Retail OS website collects and processes data from the demo request form.",
    },
    kicker: "Privacy",
    title: "Privacy *policy*.",
    sections: [
      {
        title: "What we collect",
        paragraphs: [
          "The site collects personal data in one place only: the demo request form. The data collected is what you enter there: name, company, business email, role, network size and, if you wish, a context message.",
          "The site does not set advertising tracking cookies.",
        ],
      },
      {
        title: "Why we collect it",
        paragraphs: [
          "This data is used exclusively to process your demonstration request and to contact you about it. The legal basis for processing is your consent, expressed through the form's checkbox.",
          "It is neither shared, nor sold, nor used for unsolicited prospecting.",
        ],
      },
      {
        title: "Retention period",
        paragraphs: [
          "Data linked to a demonstration request is kept for the time needed to process the request and any resulting commercial exchanges, then deleted. Exact duration: TO BE COMPLETED according to internal policy.",
        ],
      },
      {
        title: "Your rights",
        paragraphs: [
          "In accordance with the GDPR, you have the right to access, rectify, erase, restrict and object to the processing of your data. To exercise these rights, write to us: address TO BE COMPLETED before going live.",
          "You may also lodge a complaint with your supervisory authority.",
        ],
      },
    ],
  },
};
