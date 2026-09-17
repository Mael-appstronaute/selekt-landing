import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import type { Locale } from "@/lib/routes";

/**
 * Page d'intégration — Shopify et Shopify POS.
 * Slugs `/integrations/shopify-pos` et `/en/integrations/shopify-pos`.
 *
 * Analyse SERP du 16/09 (`briefs/analyse-serp-integrations.md` §1.3, §1.4, §4.2) :
 * mot-clé principal FR `shopify pos crm` (non mesurable mais c'est la formulation des équipés, et
 * trois agences françaises tiennent la SERP avec des pages « nous branchons X sur Shopify POS »),
 * EN `shopify clienteling` (seule requête du lot où des éditeurs tiers entrent par leur domaine).
 * `shopify crm` (320/mois US) volontairement écarté : tête de marque occupée par l'éditeur.
 * À signaler côté produit : 3 des 9 résultats sur `shopify clienteling` sont des fiches de l'App
 * Store Shopify — sur cette requête, le levier principal est une présence dans l'App Store.
 *
 * Règles : Shopify est un partenaire d'intégration, jamais comparé ni critiqué · aucun détail
 * technique inventé · « 20 à 25 % de revenus influencés, constaté chez des retailers équipés ».
 */
export const SHOPIFY_POS: Record<Locale, FeaturePageContent> = {
  fr: {
    meta: {
      title: "CRM et clienteling pour Shopify POS",
      description:
        "Selekt se connecte à Shopify et Shopify POS : un seul client en ligne et en boutique, des échanges tracés, des ventes rattachées à son conseiller.",
    },
    hero: {
      kicker: "Intégration · Shopify POS",
      title: "La commande en ligne et la visite en boutique, *le même client*.",
      lede: "Shopify tient la vente, en ligne comme en magasin. Selekt tient la relation : une fiche client unique que le vendeur peut ouvrir en boutique, des échanges tracés, et les ventes rattachées à la personne qui les a préparées.",
      demoLabel: "Demander une démo",
      bg: "waves",
      secondary: { label: "Toutes les intégrations", key: "integrations" },
    },
    sections: [
      {
        type: "table",
        tone: "cream",
        kicker: "Répartition des rôles",
        title: "Ce que Shopify gère, *ce que Selekt ajoute*.",
        lede: "Shopify reste le socle de vente. Selekt travaille sur ce qui se passe entre deux achats.",
        columns: ["", "Shopify et Shopify POS", "Selekt"],
        highlight: 2,
        rows: [
          { label: "Encaissement en boutique", cells: [true, false] },
          { label: "Boutique en ligne, catalogue, commandes", cells: [true, false] },
          { label: "Stock et gestion des produits", cells: [true, false] },
          { label: "Historique d'achat en ligne et en magasin", cells: [true, "réuni dans une seule fiche"] },
          { label: "Fiche client utilisable en boutique", cells: [false, true] },
          { label: "Portefeuille réparti par conseiller", cells: [false, true] },
          { label: "Échanges, rendez-vous et wishlists tracés", cells: [false, true] },
          { label: "Revenus influencés, par conseiller et par boutique", cells: [false, true] },
        ],
        note: "Aucune migration : votre boutique en ligne et votre caisse continuent exactement comme aujourd'hui.",
      },
      {
        type: "list",
        kicker: "Le même client des deux côtés",
        title: "En ligne et en boutique, *une seule personne*.",
        items: [
          {
            title: "Une fiche réunie",
            body: "Les commandes du site et les achats en magasin arrivent au même endroit. Le vendeur voit enfin ce que sa cliente achète quand elle n'est pas devant lui.",
          },
          {
            title: "Le conseiller sait ce qui s'est passé en ligne",
            body: "Plus de conversation à l'aveugle avec quelqu'un qui vient de commander sur le site. C'est souvent ce qui fait dire au client qu'il a été bien reconnu.",
          },
          {
            title: "La pièce disponible ailleurs",
            body: "Le stock du réseau se voit depuis l'application : la vente reste dans la maison au lieu de partir chez un concurrent.",
          },
          {
            title: "Zéro double saisie",
            body: "Rien à recopier d'un outil vers l'autre. La fiche se remplit avec ce qui existe déjà.",
          },
        ],
      },
      {
        type: "cards",
        tone: "cream",
        kicker: "En boutique",
        title: "Ce que ça donne *concrètement*.",
        cols: 3,
        cards: [
          {
            kicker: "La wishlist",
            title: "La pièce revenue en stock",
            body: "Une cliente avait repéré un modèle épuisé dans sa taille. Le réassort arrive : elle est prévenue par sa conseillère, avant la mise en ligne.",
          },
          {
            kicker: "Le retrait en boutique",
            title: "Une commande devient une conversation",
            key: "influencedRevenue",
            cta: "Comment les revenus influencés sont attribués",
            body: "Le client vient chercher sa commande. Le vendeur a sa fiche, son historique et deux ou trois idées justes : le retrait devient une vente complémentaire, sans forcer.",
          },
          {
            kicker: "Le réseau",
            title: "La cliente d'une autre boutique",
            key: "hq",
            cta: "La vue réseau, unifiée",
            body: "Elle entre pour la première fois ici, mais elle est connue de la maison. Elle est accueillie comme telle, avec ses préférences déjà là.",
          },
        ],
      },
      {
        type: "loop",
        kicker: "La mesure",
        title: "Rattacher une vente *au conseiller qui l'a préparée*.",
        steps: [
          {
            title: "Tracer l'action",
            body: "Message, rendez-vous, sélection préparée : l'action est datée et rattachée à son auteur.",
          },
          {
            title: "Fixer la fenêtre",
            body: "Sept, trente ou quatre-vingt-dix jours. Vous décidez aussi des canaux inclus, en ligne compris.",
          },
          {
            title: "Rattacher la vente",
            body: "Y compris une vente en ligne survenue après un conseil en boutique — c'est souvent là que se joue l'essentiel. Les revenus influencés restent distincts des ventes directes.",
          },
          {
            title: "Réconcilier",
            body: "Boutique par boutique et conseiller par conseiller. Chez des retailers équipés, les revenus influencés représentent couramment 20 à 25 % du total.",
          },
        ],
      },
      {
        type: "split",
        photo: "vitrineColliers",
        alt: "Vitrine de colliers éclairée de nuit",
        kicker: "Sécurité",
        title: "Permissions *et RGPD*.",
        body: "La fiche client circule entre des boutiques, un siège et un site. Ce qui la rend acceptable, c'est que chacun voie exactement ce qu'il doit voir, et que tout accès laisse une trace.",
        points: [
          "Rôles et permissions par boutique, jusqu'au niveau du champ",
          "Consentement et préférences de canal attachés à la fiche, pas à un outil",
          "Journal d'audit de chaque accès et de chaque modification",
          "Hébergement dans l'Union européenne",
        ],
      },
      {
        type: "split",
        photo: "grainCuir",
        alt: "Grain d'un cuir brun, gros plan",
        kicker: "Mise en route",
        title: "Comment ça *se met en place*.",
        body: "Le raccordement se cale avec vous : configuration, nombre de boutiques, périmètre de données. Nous partons de ce qui existe déjà plutôt que d'attendre une base parfaite.",
        points: [
          "Un point technique avec votre équipe ou votre agence",
          "Une ou deux boutiques pilotes avant le reste du réseau",
          "Aucune migration de votre boutique en ligne ni de votre caisse",
        ],
        reverse: true,
      },
      {
        type: "rows",
        tone: "cream",
        kicker: "Questions fréquentes",
        title: "Ce qu'on nous demande *sur Shopify*.",
        rows: [
          {
            title: "Faut-il être sur une offre particulière de Shopify ?",
            body: "Le sujet se vérifie avec vous au moment du raccordement, selon votre configuration et le nombre de boutiques concernées. Ce qui ne change pas : Selekt ne remplace ni votre boutique en ligne, ni votre caisse. Il ajoute la fiche client utilisable en magasin et la mesure de ce que la relation rapporte.",
          },
          {
            title: "Les ventes en ligne comptent-elles dans les revenus influencés ?",
            body: "Elles peuvent l'être, et c'est souvent tout l'intérêt : une cliente conseillée en boutique qui achète ensuite sur le site. Vous décidez des canaux inclus et de la fenêtre retenue, sept, trente ou quatre-vingt-dix jours. Les revenus influencés restent distincts des ventes directes et ne s'additionnent jamais avec elles.",
          },
          {
            title: "Nos vendeurs verront-ils le stock des autres boutiques ?",
            body: "C'est l'usage le plus demandé. La pièce introuvable ici mais disponible ailleurs devient visible depuis l'application, et la vente reste dans la maison. L'étendue de ce que chaque rôle peut consulter se règle au paramétrage, boutique par boutique, avec un journal d'accès.",
          },
          {
            title: "Nous avons déjà un outil d'emailing branché sur Shopify.",
            body: "Il reste en place. La campagne parle à un segment, Selekt parle à un client, à un moment précis, avec une raison réelle de le contacter. Les deux s'appuient sur la même base sans se doubler. C'est un cas de figure courant chez les réseaux que nous accompagnons.",
          },
          {
            title: "Combien de temps avant que ce soit utilisable en boutique ?",
            body: "Le démarrage se cale avec vous lors de la mise en route : périmètre des données, rôles, boutiques pilotes. Le principe est de partir de ce qui existe déjà — historique d'achat et coordonnées — plutôt que d'attendre une base parfaite. Un fichier imparfait mais vivant suffit aux premières relances.",
          },
        ],
      },
    ],
  },

  en: {
    meta: {
      title: "Clienteling for Shopify and Shopify POS",
      description:
        "Selekt connects to Shopify and Shopify POS: one client profile online and in store, tracked conversations, and sales linked back to the advisor.",
    },
    hero: {
      kicker: "Integration · Shopify POS",
      title: "The online order and the store visit, *the same client*.",
      lede: "Shopify holds the sale, online and in store. Selekt holds the relationship: one client profile advisors can open on the floor, traced conversations, and sales linked back to the person who prepared them.",
      demoLabel: "Request a demo",
      bg: "waves",
      secondary: { label: "All integrations", key: "integrations" },
    },
    sections: [
      {
        type: "table",
        tone: "cream",
        kicker: "Who does what",
        title: "What Shopify handles, *what Selekt adds*.",
        lede: "Shopify remains the commerce backbone. Selekt works on what happens between two purchases.",
        columns: ["", "Shopify and Shopify POS", "Selekt"],
        highlight: 2,
        rows: [
          { label: "In-store checkout", cells: [true, false] },
          { label: "Online store, catalogue, orders", cells: [true, false] },
          { label: "Stock and product management", cells: [true, false] },
          { label: "Purchase history, online and in store", cells: [true, "brought into one profile"] },
          { label: "Client profile usable on the shop floor", cells: [false, true] },
          { label: "Client books per advisor", cells: [false, true] },
          { label: "Traced conversations, appointments and wishlists", cells: [false, true] },
          { label: "Influenced revenue, per advisor and per store", cells: [false, true] },
        ],
        note: "No migration: your online store and your POS keep running exactly as they do today.",
      },
      {
        type: "list",
        kicker: "One client, both sides",
        title: "Online and in store, *the same person*.",
        items: [
          {
            title: "One profile",
            body: "Website orders and in-store purchases land in the same place. Advisors finally see what their client buys when she is not in front of them.",
          },
          {
            title: "Advisors know what happened online",
            body: "No more blind conversation with someone who ordered on the site yesterday. It is often what makes a client say they were properly recognised.",
          },
          {
            title: "The piece available elsewhere",
            body: "Network stock is visible from the app: the sale stays within the house instead of leaving for a competitor.",
          },
          {
            title: "No double entry",
            body: "Nothing to copy from one tool to the other. The profile fills itself from what already exists.",
          },
        ],
      },
      {
        type: "loop",
        kicker: "Measuring",
        title: "Linking a sale *to the advisor who prepared it*.",
        steps: [
          { title: "Trace the action", body: "Message, appointment, prepared selection: timestamped and attributed to its author." },
          { title: "Set the window", body: "Seven, thirty or ninety days. You also decide which channels count, including online." },
          { title: "Attribute the sale", body: "Including an online sale that follows in-store advice — often where the value sits. Influenced revenue stays separate from direct sales." },
          { title: "Reconcile", body: "Store by store and advisor by advisor. Across equipped retailers, influenced revenue commonly represents 20 to 25 percent of total revenue." },
        ],
      },
      {
        type: "split",
        photo: "grainCuir",
        alt: "Close-up of the grain of brown leather",
        kicker: "Getting started",
        title: "How it *is set up*.",
        body: "The connection is planned with you: configuration, number of stores, data scope. We start from what already exists rather than waiting for a perfect database.",
        points: [
          "A technical session with your team or your agency",
          "One or two pilot stores before the rest of the network",
          "No migration of your online store or your POS",
        ],
        reverse: true,
      },
      {
        type: "cards",
        tone: "paper",
        kicker: "The rest of your stack",
        title: "Shopify is not *your only tool*.",
        lede: "Beyond the storefront and the POS, Selekt connects to the marketing, loyalty and review tools already in place.",
        cols: 3,
        cards: [
          {
            kicker: "Measurement",
            title: "Influenced revenue, attributed",
            body: "Every action is traced, a window is set, and the sales that follow are counted separately from walk-in sales.",
            key: "influencedRevenue",
            cta: "How influenced revenue is attributed",
          },
          {
            kicker: "On the floor",
            title: "What the advisor actually sees",
            body: "The client profile, the day's reasons to reach out, and the network stock — on a phone, in seconds.",
            key: "advisor",
            cta: "The advisor workspace",
          },
          {
            kicker: "Everything else",
            title: "Whatever software you run",
            body: "POS, e-commerce, marketing, reviews, an in-house system: tell us what you use and we set the connection up with you.",
            key: "integrations",
            cta: "All integrations",
          },
        ],
      },
      {
        type: "rows",
        tone: "cream",
        kicker: "Frequently asked",
        title: "What we are asked *about Shopify*.",
        rows: [
          {
            title: "Do we need a specific Shopify plan?",
            body: "That is checked with you when the connection is set up, based on your configuration and the number of stores involved. What does not change: Selekt replaces neither your online store nor your POS. It adds the client profile advisors can use on the floor, and the measurement behind it.",
          },
          {
            title: "Do online sales count towards influenced revenue?",
            body: "They can, and that is often the point: a client advised in store who later buys on the website. You decide which channels are included and which window applies, seven, thirty or ninety days. Influenced revenue stays separate from direct sales and is never added to it.",
          },
          {
            title: "Will advisors see stock from other stores?",
            body: "That is the most requested use. A piece missing here but available elsewhere becomes visible from the app, and the sale stays within the house. What each role can consult is set during configuration, store by store, with every access logged.",
          },
          {
            title: "We already run an email tool on top of Shopify.",
            body: "It stays. Campaigns speak to a segment; Selekt speaks to one client, at a precise moment, with a real reason to reach out. Both rely on the same base without duplicating each other. It is the most common setup among the networks we work with.",
          },
          {
            title: "How long before store teams can use it?",
            body: "The start is planned with you during setup: data scope, roles, pilot stores. The principle is to begin from what already exists, purchase history and contact details, rather than waiting for a perfect base. An imperfect but living file is enough for the first follow-ups.",
          },
        ],
      },
    ],
  },
};
