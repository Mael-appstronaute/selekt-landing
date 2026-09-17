import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import type { Locale } from "@/lib/routes";

/**
 * Page d'intégration — Cegid. Slugs `/integrations/cegid` et `/en/integrations/cegid`.
 *
 * Analyse SERP du 16/09 (`seo-pages/briefs/analyse-serp-integrations.md` §1.1, §1.2, §4.1) :
 * mot-clé principal `cegid crm` (50/mois FR). `cegid clienteling` est écarté : 7 résultats sur 9
 * appartiennent à cegid.com, la requête est verrouillée par le partenaire. Sur `cegid crm`, les
 * rangs 5 à 7 sont des pages tierces « connecté à Cegid », dont une de 269 mots : barre d'entrée basse.
 * Gabarit du genre : 8 blocs, 950-1 150 mots. Bloc différenciant : la mesure (absente de 14 pages sur 15).
 *
 * Règles : Cegid est un partenaire d'intégration, jamais comparé ni critiqué (aucune case négative
 * dans la colonne de gauche du tableau) · aucun détail technique inventé (ni sens des échanges, ni
 * fréquence, ni modalité d'installation) · « 20 à 25 % de revenus influencés, constaté chez des
 * retailers équipés » · aucun prix.
 */
export const CEGID: Record<Locale, FeaturePageContent> = {
  fr: {
    modified: "2026-09-16",
    meta: {
      title: "CRM et clienteling connectés à Cegid",
      description:
        "Selekt se connecte à Cegid : l'historique d'achat nourrit la fiche client, le vendeur voit tout, et les ventes se rattachent au travail de relation.",
    },
    hero: {
      kicker: "Intégration · Cegid",
      title: "Votre caisse tient les ventes. *Selekt tient la relation.*",
      lede: "Cegid reste en place et garde son métier : encaissement, stock, comptabilité. Selekt se pose à côté pour donner au vendeur une fiche client lisible en boutique, un portefeuille nommé, et la mesure de ce que la relation rapporte.",
      demoLabel: "Demander une démo",
      bg: "waves",
      secondary: { label: "Toutes les intégrations", key: "integrations" },
    },
    sections: [
      {
        type: "table",
        tone: "cream",
        kicker: "Répartition des rôles",
        title: "Ce que Cegid gère, *ce que Selekt ajoute*.",
        lede: "Les deux outils ne travaillent pas au même moment : l'un pendant la vente, l'autre entre deux visites.",
        columns: ["", "Cegid", "Selekt"],
        highlight: 2,
        rows: [
          { label: "Encaissement et moyens de paiement", cells: [true, false] },
          { label: "Stock, réassort, référentiel article", cells: [true, false] },
          { label: "Comptabilité et pilotage financier", cells: [true, false] },
          { label: "Historique d'achat", cells: [true, "repris dans la fiche client"] },
          { label: "Fiche client utilisable en boutique", cells: [false, true] },
          { label: "Portefeuille réparti par conseiller", cells: [false, true] },
          { label: "Échanges et rendez-vous tracés", cells: [false, true] },
          { label: "Revenus influencés, mesurés par boutique", cells: [false, true] },
        ],
        note: "Rien à remplacer : sans l'historique d'achat tenu par Cegid, il n'y aurait ni relation à travailler ni vente à rattacher.",
      },
      {
        type: "list",
        kicker: "Pourquoi les brancher",
        title: "Quatre effets *immédiats*.",
        items: [
          {
            title: "Pas de double saisie",
            body: "Le vendeur ne recopie rien. Ce que la caisse enregistre se retrouve dans la fiche client, au moment où il en a besoin, sans manipulation de sa part.",
          },
          {
            title: "L'achat remonte tout seul",
            body: "La dernière pièce achetée, la date, le montant : la conversation démarre avec ces informations plutôt qu'avec une question qui trahit qu'on ne se souvient pas.",
          },
          {
            title: "Le vendeur cesse de découvrir après coup",
            body: "Un client servi ailleurs dans le réseau, une commande spéciale en cours : ce qui était invisible depuis la boutique devient lisible en quelques secondes.",
          },
          {
            title: "Les montants se réconcilient",
            body: "Parce que les ventes viennent de la caisse, les revenus attribués au clienteling se rapprochent ligne à ligne de ce que lit la direction. Personne ne discute les chiffres en réunion.",
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
            kicker: "La cliente qui revient",
            title: "On sait ce qu'elle a acheté",
            key: "advisor",
            cta: "L'espace vendeur en boutique",
            body: "Elle entre, le vendeur ouvre sa fiche : dernier achat, préférences, ce qu'elle avait regardé sans prendre. La conversation reprend là où elle s'était arrêtée.",
          },
          {
            kicker: "La commande spéciale",
            title: "Suivie jusqu'à l'appel",
            body: "La pièce commandée arrive. Le client est prévenu par la personne qui l'a servi, pas par un message automatique sans nom.",
          },
          {
            kicker: "La relance",
            title: "Motivée par un achat réel",
            key: "influencedRevenue",
            cta: "Comment les revenus influencés sont attribués",
            body: "On recontacte parce que l'historique donne une raison : un renouvellement, un anniversaire d'achat, un complément. Pas parce qu'il faut écouler un stock.",
          },
        ],
      },
      {
        type: "loop",
        kicker: "La mesure",
        title: "Du ticket de caisse *aux revenus influencés*.",
        steps: [
          {
            title: "Tracer l'action",
            body: "Message, rendez-vous, relance : l'action est datée et rattachée au conseiller qui l'a faite.",
          },
          {
            title: "Fixer la fenêtre",
            body: "Sept, trente ou quatre-vingt-dix jours entre le contact et la vente. C'est la maison qui décide, et la règle est écrite.",
          },
          {
            title: "Rattacher la vente",
            body: "La vente enregistrée en caisse dans cette fenêtre rejoint les revenus influencés. Ils restent distincts des ventes directes et ne s'y additionnent jamais.",
          },
          {
            title: "Réconcilier",
            body: "Boutique par boutique, ligne par ligne. Chez des retailers équipés, les revenus influencés représentent couramment 20 à 25 % du total.",
          },
        ],
      },
      {
        type: "split",
        photo: "outilsHorlogerie",
        alt: "Outils d'horloger rangés sur un plateau de bois",
        kicker: "Sécurité",
        title: "Permissions, isolation *et RGPD*.",
        body: "Une base client partagée entre des boutiques et un siège se tient à un niveau d'exigence supérieur à une liste de diffusion. C'est aussi ce qui rassure les équipes qui l'utilisent.",
        points: [
          "Permissions au niveau de la donnée : un vendeur voit ses clients, un manager sa boutique, le siège le réseau",
          "Isolation stricte entre les maisons d'un même groupe",
          "Journal d'audit : chaque accès et chaque modification sont enregistrés",
          "Hébergement dans l'Union européenne",
        ],
      },
      {
        type: "split",
        photo: "calibre",
        alt: "Calibre de montre maintenu dans un étau, fond sombre",
        kicker: "Mise en route",
        title: "Comment ça *se met en place*.",
        body: "Nous ne promettons pas un branchement en un clic, et nous ne demandons pas non plus un projet de six mois. Le raccordement se cale avec vous, et avec votre intégrateur quand vous en avez un.",
        points: [
          "Un point technique avec votre équipe ou votre intégrateur Cegid",
          "Un périmètre de données défini avec vous avant le démarrage",
          "Une ou deux boutiques pilotes, puis le reste du réseau",
          "Aucune migration de votre caisse, aucun changement dans vos habitudes d'encaissement",
        ],
        reverse: true,
      },
      {
        type: "cards",
        tone: "paper",
        kicker: "Le reste de votre environnement",
        title: "Cegid n'est pas *votre seul outil*.",
        lede: "Une maison équipée en caisse a aussi un site, des campagnes, parfois un programme de fidélité. Selekt s'y connecte également.",
        cols: 2,
        cards: [
          {
            kicker: "E-commerce et relation client",
            title: "Le même client partout",
            body: "Boutique en ligne, emailing, avis clients : les outils restent, Selekt ajoute la couche individuelle et la mesure de son effet.",
            key: "integrations",
            cta: "Toutes les intégrations",
          },
          {
            kicker: "Le reste",
            title: "Quel que soit votre logiciel",
            body: "Un outil maison, une solution sectorielle, un socle hérité : dites-nous ce que vous utilisez, nous vous répondons sur la faisabilité et le délai, sans promesse en l'air.",
            key: "demo",
            cta: "En parler en démonstration",
          },
        ],
      },
      {
        type: "rows",
        tone: "cream",
        faq: true,
        kicker: "Questions fréquentes",
        title: "Ce qu'on nous demande *sur Cegid*.",
        rows: [
          {
            title: "Faut-il changer quelque chose à notre installation Cegid ?",
            body: "Non. Cegid continue d'encaisser, de tenir le stock et d'alimenter la comptabilité. Selekt se pose à côté et travaille sur la relation client : fiche lisible en boutique, portefeuille par conseiller, échanges tracés. Le raccordement se cale avec vous et avec votre intégrateur, boutique par boutique, lors de la mise en route.",
          },
          {
            title: "Quelles données Selekt utilise-t-il ?",
            body: "Celles dont le vendeur a besoin pour reconnaître un client et lui parler juste : historique d'achat, coordonnées, préférences, échanges passés. Le périmètre exact se définit avec vous avant le démarrage, en fonction de ce que votre maison souhaite exposer en boutique et des permissions que vous accordez à chaque rôle.",
          },
          {
            title: "Nos vendeurs utilisent déjà un écran Cegid. Un outil de plus, est-ce réaliste ?",
            body: "C'est la bonne question. Selekt ne double pas la caisse : il sert à un autre moment, entre deux visites, quand il faut savoir qui recontacter et pourquoi. Quelques minutes par jour. Si l'outil demande plus qu'il ne rend, il n'est pas utilisé — la contrepartie doit être immédiate.",
          },
          {
            title: "Peut-on prouver ce que le travail de relation rapporte ?",
            body: "Oui, et c'est l'objet de Selekt. Chaque action est datée et rattachée à son auteur. Vous fixez une fenêtre d'attribution de sept, trente ou quatre-vingt-dix jours. Les ventes survenues dans cette fenêtre rejoignent les revenus influencés, tenus distincts des ventes directes et jamais additionnés avec elles.",
          },
          {
            title: "Qui est propriétaire des données ?",
            body: "Vous. Les fiches, les échanges et l'historique d'actions restent les vôtres et vous suivent si vous changez d'outil plus tard. Les permissions se règlent au niveau du champ, chaque accès est journalisé, et l'hébergement se fait dans l'Union européenne. Le détail se traite avec votre DSI avant le démarrage.",
          },
        ],
      },
    ],
  },

  en: {
    modified: "2026-09-16",
    meta: {
      title: "CRM and clienteling connected to Cegid",
      description:
        "Selekt connects to Cegid: purchase history feeds the client profile, advisors see everything, and sales reconnect to the relationship work behind them.",
    },
    hero: {
      kicker: "Integration · Cegid",
      title: "Your POS holds the sales. *Selekt holds the relationship.*",
      lede: "Cegid stays in place and keeps doing its job: payment, stock, accounting. Selekt sits beside it to give advisors a client profile they can actually use on the floor, a named client book, and the measurement of what the relationship produces.",
      demoLabel: "Request a demo",
      bg: "waves",
      secondary: { label: "All integrations", key: "integrations" },
    },
    sections: [
      {
        type: "table",
        tone: "cream",
        kicker: "Who does what",
        title: "What Cegid handles, *what Selekt adds*.",
        lede: "The two tools work at different moments: one during the sale, the other between two visits.",
        columns: ["", "Cegid", "Selekt"],
        highlight: 2,
        rows: [
          { label: "Payment and checkout", cells: [true, false] },
          { label: "Stock, replenishment, product data", cells: [true, false] },
          { label: "Accounting and financial reporting", cells: [true, false] },
          { label: "Purchase history", cells: [true, "picked up in the client profile"] },
          { label: "Client profile usable on the shop floor", cells: [false, true] },
          { label: "Client books per advisor", cells: [false, true] },
          { label: "Traced conversations and appointments", cells: [false, true] },
          { label: "Influenced revenue, measured per store", cells: [false, true] },
        ],
        note: "Nothing to replace: without the purchase history Cegid holds, there would be no relationship to work on and no sale to attribute.",
      },
      {
        type: "list",
        kicker: "Why connect them",
        title: "Four *immediate* effects.",
        items: [
          {
            title: "No double entry",
            body: "Advisors retype nothing. What the POS records appears in the client profile, at the moment they need it, without any handling on their side.",
          },
          {
            title: "Purchases arrive on their own",
            body: "Last piece bought, date, amount: the conversation starts from those facts rather than from a question that reveals nobody remembered.",
          },
          {
            title: "Advisors stop finding out afterwards",
            body: "A client served elsewhere in the network, a special order under way: what was invisible from the store becomes readable in seconds.",
          },
          {
            title: "The figures reconcile",
            body: "Because sales come from the POS, revenue attributed to clienteling matches, line by line, what leadership reads. Nobody argues about the numbers.",
          },
        ],
      },
      {
        type: "loop",
        kicker: "Measuring",
        title: "From the receipt *to influenced revenue*.",
        steps: [
          { title: "Trace the action", body: "Message, appointment, follow-up: timestamped and attributed to the advisor who made it." },
          { title: "Set the window", body: "Seven, thirty or ninety days between contact and sale. The house decides, and the rule is written down." },
          { title: "Attribute the sale", body: "A sale recorded in the POS within that window joins influenced revenue, kept separate from direct sales and never added to them." },
          { title: "Reconcile", body: "Store by store, line by line. Across equipped retailers, influenced revenue commonly represents 20 to 25 percent of total revenue." },
        ],
      },
      {
        type: "split",
        photo: "calibre",
        alt: "Watch movement held in a vice against a dark background",
        kicker: "Getting started",
        title: "How it *is set up*.",
        body: "We do not promise a one-click connection, and we do not ask for a six-month project either. The connection is planned with you, and with your integrator when you have one.",
        points: [
          "A technical session with your team or your Cegid integrator",
          "A data scope agreed with you before launch",
          "One or two pilot stores, then the rest of the network",
          "No migration of your POS, no change to how you take payment",
        ],
        reverse: true,
      },
      {
        type: "cards",
        tone: "paper",
        kicker: "The rest of your stack",
        title: "Cegid is not *your only tool*.",
        lede: "A house running a POS also runs a website, campaigns, sometimes a loyalty programme. Selekt connects to those as well.",
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
        faq: true,
        kicker: "Frequently asked",
        title: "What we are asked *about Cegid*.",
        rows: [
          {
            title: "Do we need to change anything in our Cegid setup?",
            body: "No. Cegid keeps taking payment, holding stock and feeding the accounts. Selekt sits beside it and works on the client relationship: a readable profile on the floor, client books per advisor, traced conversations. The connection is planned with you and your integrator, store by store.",
          },
          {
            title: "Which data does Selekt use?",
            body: "What an advisor needs to recognise a client and speak to them properly: purchase history, contact details, preferences, past conversations. The exact scope is defined with you before launch, according to what your house wants exposed on the floor and the permissions each role receives.",
          },
          {
            title: "Can we prove what the relationship work produces?",
            body: "Yes, and that is the point of Selekt. Every action is timestamped and attributed to its author. You set an attribution window of seven, thirty or ninety days. Sales within that window join influenced revenue, kept separate from direct sales and never added to them.",
          },
          {
            title: "Who owns the data?",
            body: "You do. Profiles, conversations and action history remain yours and follow you if you change tools later. Permissions are set at field level, every access is logged, and data is hosted in the European Union. The detail is reviewed with your IT team before launch.",
          },
        ],
      },
    ],
  },
};
