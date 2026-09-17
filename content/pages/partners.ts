import type { Locale } from "@/lib/routes";
import type { HeroBg } from "@/components/site/PageHero";

export type Partner = {
  name: string;
  /** URL complète du site partenaire */
  url: string;
  /** hôte affiché sous le nom (sans protocole) */
  host: string;
  /** domaine d'expertise — kicker de la rangée */
  category: string;
  description: string;
  /** logo officiel dans public/ */
  logo: string;
  /** hauteur d'affichage en px — équilibrage optique par logo (cf. lib/connectors) */
  logoH: number;
};

export type PartnersPageContent = {
  meta: { title: string; description: string };
  hero: {
    kicker: string;
    title: string;
    lede: string;
    demoLabel: string;
    bg?: HeroBg;
  };
  list: {
    kicker: string;
    title: string;
    lede?: string;
    visitLabel: string;
    partners: Partner[];
  };
};

export const PARTNERS: Record<Locale, PartnersPageContent> = {
  fr: {
    meta: {
      title: "Partenaires — l'écosystème Selekt",
      description:
        "Données, CRM, gestion, conseil, commerce et formation : les partenaires qui entourent Selekt pour que chaque déploiement s'appuie sur les meilleurs, à chaque maillon du retail.",
    },
    hero: {
      kicker: "Partenaires",
      title: "Un écosystème choisi, maillon par *maillon*.",
      lede: "Selekt ne déploie jamais seul. Données, CRM, gestion, conseil, commerce, formation : nous nous entourons de maisons expertes pour que chaque projet s'appuie sur les meilleurs, du système d'encaissement aux équipes de vente.",
      demoLabel: "Demander une démo",
      bg: "aurora",
    },
    list: {
      kicker: "Ils travaillent avec nous",
      title: "Six maisons, six *expertises*.",
      lede: "Des partenaires choisis pour leur profondeur métier, pas pour la longueur du logo wall. Chacun couvre un maillon que nos clients rencontrent réellement.",
      visitLabel: "Visiter le site",
      partners: [
        {
          name: "Seikai",
          logo: "/logos/seikai.svg",
          logoH: 30,
          url: "https://seikai.fr/",
          host: "seikai.fr",
          category: "Données & décisionnel",
          description:
            "Dix ans d'expérience en data et décisionnel. Seikai automatise la chaîne BI de bout en bout, des sources aux tableaux de bord, en combinant algorithmes déterministes et IA. Des mois d'ingénierie de données ramenés à quelques heures.",
        },
        {
          name: "Splio",
          logo: "/logos/splio.png",
          logoH: 32,
          url: "https://splio.com/",
          host: "splio.com",
          category: "CRM & marketing automation",
          description:
            "Plateforme CRM AI-first propulsée par Tinyclues, pensée pour les marques B2C : marketing automation, données clients, programmes de fidélité et IA prédictive pour orchestrer des campagnes omnicanales et faire grandir la valeur client.",
        },
        {
          name: "Odeis",
          logo: "/logos/odeis.png",
          logoH: 36,
          url: "https://www.odeis.net/",
          host: "odeis.net",
          category: "Gestion HBJO",
          description:
            "Éditeur de logiciels dédié aux horlogers, bijoutiers, joailliers et orfèvres depuis plus de trente ans. La gamme Bijou3 couvre la gestion commerciale, la fidélité et l'e-commerce pour 6 000 utilisateurs dans 19 pays.",
        },
        {
          name: "Retail Management Services",
          logo: "/logos/rms.png",
          logoH: 34,
          url: "https://www.retailmanagementservices.fr/",
          host: "retailmanagementservices.fr",
          category: "Conseil retail",
          description:
            "Agence parisienne fondée en 2008, spécialiste de la performance retail pour le luxe, la mode et l'hospitalité : stratégie et expansion, recrutement et formation des équipes, excellence opérationnelle. Présente à Paris, Montréal et Abu Dhabi.",
        },
        {
          name: "Shopify",
          logo: "/logos/shopify.svg",
          logoH: 34,
          url: "https://www.shopify.com/fr",
          host: "shopify.com",
          category: "Commerce en ligne",
          description:
            "La plateforme de commerce qui propulse des millions de boutiques dans le monde. Créer, gérer et développer sa vente en ligne, des paiements à la logistique, sur une infrastructure éprouvée à toutes les échelles.",
        },
        {
          name: "Les Architectes de la Relation Client",
          logo: "/logos/arc.png",
          logoH: 50,
          url: "https://www.architectes-rc.fr/",
          host: "architectes-rc.fr",
          category: "Formation relation client",
          description:
            "Cabinet de formation spécialisé dans la relation client : des parcours sur mesure pour conseillers et managers, loin des catalogues standardisés, et des travaux de recherche dont un baromètre des compétences.",
        },
      ],
    },
  },

  en: {
    meta: {
      title: "Partners — the Selekt ecosystem",
      description:
        "Data, CRM, management software, consulting, commerce and training: the partners around Selekt so every deployment rests on the best, at every link of the retail chain.",
    },
    hero: {
      kicker: "Partners",
      title: "A chosen ecosystem, link by *link*.",
      lede: "Selekt never deploys alone. Data, CRM, management software, consulting, commerce, training: we surround ourselves with expert houses so every project rests on the best, from the point of sale to the sales teams.",
      demoLabel: "Request a demo",
      bg: "aurora",
    },
    list: {
      kicker: "They work with us",
      title: "Six houses, six *crafts*.",
      lede: "Partners chosen for their depth of craft, not for the length of the logo wall. Each one covers a link our clients actually encounter.",
      visitLabel: "Visit the website",
      partners: [
        {
          name: "Seikai",
          logo: "/logos/seikai.svg",
          logoH: 30,
          url: "https://seikai.fr/",
          host: "seikai.fr",
          category: "Data & business intelligence",
          description:
            "Ten years of experience in data and business intelligence. Seikai automates the BI chain end to end, from data sources to dashboards, by combining deterministic algorithms with AI. Months of data engineering brought down to a few hours.",
        },
        {
          name: "Splio",
          logo: "/logos/splio.png",
          logoH: 32,
          url: "https://splio.com/",
          host: "splio.com",
          category: "CRM & marketing automation",
          description:
            "An AI-first CRM platform powered by Tinyclues, built for B2C brands: marketing automation, customer data, loyalty programmes and predictive AI to orchestrate omnichannel campaigns and grow customer value.",
        },
        {
          name: "Odeis",
          logo: "/logos/odeis.png",
          logoH: 36,
          url: "https://www.odeis.net/",
          host: "odeis.net",
          category: "Watch & jewellery management",
          description:
            "A software house dedicated to watchmakers, jewellers and goldsmiths for over thirty years. The Bijou3 range covers sales management, loyalty and e-commerce for 6,000 users across 19 countries.",
        },
        {
          name: "Retail Management Services",
          logo: "/logos/rms.png",
          logoH: 34,
          url: "https://www.retailmanagementservices.fr/",
          host: "retailmanagementservices.fr",
          category: "Retail consulting",
          description:
            "A Paris agency founded in 2008, specialist in retail performance for luxury, fashion and hospitality: strategy and expansion, recruitment and team training, operational excellence. Operating from Paris, Montreal and Abu Dhabi.",
        },
        {
          name: "Shopify",
          logo: "/logos/shopify.svg",
          logoH: 34,
          url: "https://www.shopify.com/",
          host: "shopify.com",
          category: "Online commerce",
          description:
            "The commerce platform powering millions of stores worldwide. Create, run and grow online sales, from payments to logistics, on infrastructure proven at every scale.",
        },
        {
          name: "Les Architectes de la Relation Client",
          logo: "/logos/arc.png",
          logoH: 50,
          url: "https://www.architectes-rc.fr/",
          host: "architectes-rc.fr",
          category: "Customer relationship training",
          description:
            "A training firm specialised in customer relationships: tailor-made programmes for advisors and managers, far from standardised catalogues, plus published research including a skills barometer.",
        },
      ],
    },
  },
};
