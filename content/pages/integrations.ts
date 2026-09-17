import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import type { Locale } from "@/lib/routes";

/**
 * Hub des intégrations — `/integrations` (FR) et `/en/integrations` (EN).
 *
 * Rôle SEO : page mère du cluster « Selekt + <outil> ». Les requêtes « cegid crm »,
 * « shopify pos crm » etc. sont faibles en volume (mesuré le 15/09), mais chaque page
 * fille lève une objection de démo et sert de lien dans les séquences de prospection.
 *
 * ⚠️ Écrit après la confirmation d'Antoine du 16/09 : tous les connecteurs affichés sont
 * en production. Ce qui n'est PAS confirmé et reste donc absent de la page : le sens exact
 * des échanges par outil, la fréquence de synchronisation, les modalités d'installation.
 * Ces blocs seront ajoutés quand Thomas/Samuel auront répondu (cf. BRAIN doc 29 §6.4).
 * Le vocabulaire des échanges reprend mot pour mot la promesse déjà publiée sur l'accueil
 * (« faire circuler la donnée client dans les deux sens, sans double saisie »).
 */
export const INTEGRATIONS: Record<Locale, FeaturePageContent> = {
  fr: {
    meta: {
      title: "Intégrations : caisse, e-commerce, CRM",
      description:
        "Caisse, e-commerce, CRM, messageries : Selekt se branche sur vos outils et fait circuler la donnée client dans les deux sens, sans double saisie.",
    },
    hero: {
      kicker: "Intégrations",
      title: "Selekt s'installe *dans votre écosystème*.",
      lede: "Une maison ne change pas de caisse pour faire du clienteling. Selekt se branche sur les outils déjà en place — caisse, e-commerce, CRM, messageries, avis — et fait circuler la donnée client dans les deux sens, sans double saisie.",
      demoLabel: "Demander une démo",
      bg: "waves",
      secondary: { label: "Voir la plateforme", key: "platform" },
    },
    sections: [
      {
        type: "cards",
        tone: "cream",
        kicker: "Les familles d'outils",
        title: "Ce à quoi Selekt *se connecte*.",
        lede: "Chaque famille répond à une question précise du quotidien : qui est ce client, qu'a-t-il acheté, que peut-on lui proposer, et comment le joindre.",
        cols: 2,
        variant: "bento",
        cards: [
          {
            kicker: "Caisse et gestion",
            title: "Les achats remontent tout seuls",
            body: "Cegid, Fastmag, Retail Pro, Oracle Xstore, Openbravo, Odeis et Bijou3, Dynamics 365 : l'historique d'achat nourrit la fiche client, et c'est lui qui rend le CA influencé réconciliable avec la comptabilité de la maison.",
            key: "cegid",
            cta: "Selekt et Cegid",
          },
          {
            kicker: "E-commerce",
            title: "Un seul client, en ligne et en boutique",
            body: "Shopify, PrestaShop, WooCommerce : la commande passée sur le site rejoint la fiche du client suivi en boutique. Le vendeur cesse de découvrir après coup que sa cliente a acheté en ligne.",
            key: "shopifyPos",
            cta: "Selekt et Shopify POS",
          },
          {
            kicker: "CRM et données",
            title: "Le siège garde sa vision d'ensemble",
            body: "Salesforce, Segment, Microsoft 365 : Selekt ne remplace pas le CRM du siège, il lui apporte ce qu'aucun CRM ne voit — le geste du vendeur et la vente qui en découle.",
          },
          {
            kicker: "Relation client",
            title: "Les campagnes et le suivi individuel cohabitent",
            body: "Splio, Klaviyo, WhatsApp, avis clients : la campagne parle à un segment, Selekt parle à un client. Les deux s'appuient sur la même base, sans se contredire ni se doubler.",
            key: "klaviyo",
            cta: "Selekt et Klaviyo",
          },
        ],
      },
      {
        type: "list",
        kicker: "Ce que ça change",
        title: "Quatre effets *concrets* en boutique.",
        items: [
          {
            title: "Pas de double saisie",
            body: "Le vendeur ne recopie rien : ce qui existe dans la caisse ou sur le site est déjà dans la fiche client, à jour, au moment où il en a besoin.",
          },
          {
            title: "Un stock réseau fiable",
            body: "La pièce introuvable en boutique mais disponible ailleurs se voit depuis l'application. La vente reste dans la maison au lieu de partir chez un concurrent.",
          },
          {
            title: "Un CA influencé réconciliable",
            body: "Parce que les ventes viennent de la caisse, les montants attribués au clienteling se rapprochent ligne à ligne de ce que lit la direction. Personne ne discute les chiffres.",
          },
          {
            title: "Une maison qui garde ses outils",
            body: "Le déploiement ne demande pas de remplacer l'existant. C'est la condition pour que le projet démarre en semaines, pas en trimestres.",
          },
        ],
      },
      {
        type: "split",
        photo: "etabliMaroquinerie",
        alt: "Établi de maroquinerie, pièces de cuir et outils",
        kicker: "Votre outil n'est pas dans la liste",
        title: "On regarde, *puis on répond*.",
        body: "Les maisons que nous accompagnons n'ont pas toutes le même socle. Dites-nous ce que vous utilisez : nous vous répondons sur la faisabilité et le délai, sans promesse en l'air.",
        points: [
          "Un point technique avec votre équipe ou votre intégrateur",
          "Une réponse claire : disponible, à développer, ou déconseillé",
          "Aucune migration de votre caisse ni de votre e-commerce",
        ],
        reverse: true,
      },
      {
        type: "rows",
        tone: "cream",
        faq: true,
        kicker: "Questions fréquentes",
        title: "Ce qu'on nous demande *avant de commencer*.",
        rows: [
          {
            title: "Faut-il changer de logiciel de caisse ?",
            body: "Non. Selekt se branche sur la caisse en place et la laisse faire son métier : encaisser, gérer le stock, tenir la comptabilité. Selekt s'occupe de la relation client et de la mesure de son effet.",
          },
          {
            title: "Qui voit quelles données ?",
            body: "Les permissions se règlent au niveau de la donnée, par rôle et par boutique. Un vendeur voit ses clients, un manager sa boutique, le siège le réseau. Chaque accès est journalisé.",
          },
          {
            title: "Que se passe-t-il si nous changeons d'outil plus tard ?",
            body: "La fiche client, les échanges et l'historique d'actions restent dans Selekt et vous appartiennent. Changer de caisse ou de plateforme e-commerce ne fait pas perdre la relation construite.",
          },
          {
            title: "Et les marques qui n'ont aucun outil de fidélité ?",
            body: "C'est le cas le plus fréquent dans les réseaux que nous rencontrons. Selekt part alors de la caisse seule : l'historique d'achat suffit à faire vivre les premières relances.",
          },
        ],
      },
    ],
  },

  en: {
    meta: {
      title: "Integrations: POS, e-commerce, CRM",
      description:
        "Selekt connects to your POS, e-commerce platform, CRM and customer engagement tools, so client data flows both ways without double entry.",
    },
    hero: {
      kicker: "Integrations",
      title: "Selekt fits *your existing stack*.",
      lede: "No house replaces its POS to start clienteling. Selekt connects to the tools already in place — POS, e-commerce, CRM, messaging, reviews — and lets client data flow both ways, without double entry.",
      demoLabel: "Request a demo",
      bg: "waves",
      secondary: { label: "See the platform", key: "platform" },
    },
    sections: [
      {
        type: "cards",
        tone: "cream",
        kicker: "Tool families",
        title: "What Selekt *connects to*.",
        lede: "Each family answers one daily question: who is this client, what have they bought, what can we show them, and how do we reach them.",
        cols: 2,
        variant: "bento",
        cards: [
          {
            kicker: "POS and retail management",
            title: "Purchases arrive on their own",
            body: "Cegid, Fastmag, Retail Pro, Oracle Xstore, Openbravo, Odeis and Bijou3, Dynamics 365: purchase history feeds the client profile, and it is what makes influenced revenue reconcilable with the house's own accounts.",
            key: "cegid",
            cta: "Selekt and Cegid",
          },
          {
            kicker: "E-commerce",
            title: "One client, online and in store",
            body: "Shopify, PrestaShop, WooCommerce: an online order joins the profile of the client followed in store. Advisors stop discovering purchases after the fact.",
            key: "shopifyPos",
            cta: "Selekt and Shopify POS",
          },
          {
            kicker: "CRM and data",
            title: "Headquarters keeps the wider view",
            body: "Salesforce, Segment, Microsoft 365: Selekt does not replace the corporate CRM. It adds what no CRM sees — the advisor's gesture and the sale that follows it.",
            key: "influencedRevenue",
            cta: "How influenced revenue is attributed",
          },
          {
            kicker: "Customer engagement",
            title: "Campaigns and one-to-one coexist",
            body: "Splio, Klaviyo, WhatsApp, review platforms: campaigns speak to a segment, Selekt speaks to a client. Both rely on the same base, without contradicting or duplicating each other.",
            key: "klaviyo",
            cta: "Selekt and Klaviyo",
          },
        ],
      },
      {
        type: "list",
        kicker: "What changes",
        title: "Four *concrete* effects on the floor.",
        items: [
          {
            title: "No double entry",
            body: "Advisors retype nothing: what exists in the POS or on the website is already in the client profile, current, at the moment they need it.",
          },
          {
            title: "Network stock you can trust",
            body: "A piece missing in one store but available in another is visible from the app. The sale stays within the house instead of leaving for a competitor.",
          },
          {
            title: "Influenced revenue that reconciles",
            body: "Because sales come from the POS, amounts attributed to clienteling match, line by line, what leadership reads. Nobody argues about the figures.",
          },
          {
            title: "A house that keeps its tools",
            body: "Deployment does not require replacing what is in place. That is what makes a project start in weeks rather than quarters.",
          },
        ],
      },
      {
        type: "rows",
        tone: "cream",
        faq: true,
        kicker: "Frequently asked",
        title: "What we are asked *before starting*.",
        rows: [
          {
            title: "Do we need to replace our POS?",
            body: "No. Selekt connects to the POS in place and lets it do its job: taking payment, managing stock, feeding the accounts. Selekt handles the client relationship and the measurement of its effect.",
          },
          {
            title: "Who sees which data?",
            body: "Permissions are set at data level, by role and by store. An advisor sees their clients, a manager their store, headquarters the network. Every access is logged.",
          },
          {
            title: "What if we change tools later?",
            body: "Client profiles, conversations and action history stay in Selekt and belong to you. Changing POS or e-commerce platform does not cost you the relationship you have built.",
          },
          {
            title: "What about houses with no loyalty tool at all?",
            body: "That is the most common case in the networks we meet. Selekt then starts from the POS alone: purchase history is enough to drive the first follow-ups.",
          },
        ],
      },
    ],
  },
};
