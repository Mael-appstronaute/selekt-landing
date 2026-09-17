import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import type { Locale } from "@/lib/routes";

/**
 * Page d'intégration — Klaviyo. Slugs `/integrations/klaviyo` et `/en/integrations/klaviyo`.
 *
 * Analyse SERP du 16/09 (`briefs/analyse-serp-integrations.md` §1.6 à §1.9, §4.3) :
 * mot-clé principal `klaviyo clienteling`, EN d'abord — c'est la seule SERP du lot qui soit ouverte
 * (Klaviyo n'y place que sa page d'accueil, contre 5/8 sur `klaviyo crm`). La version FR suit
 * immédiatement : elle ne sert pas à se classer mais à être envoyée, les 30 marques équipées de
 * Klaviyo détectées chez nos prospects étant françaises (doc 29 §6.3).
 *
 * `klaviyo crm` (260/mois US, CPC 26 $) VOLONTAIREMENT ÉCARTÉ : s'y positionner obligerait à
 * trancher « Klaviyo est-il un CRM ? », donc à contredire un partenaire. Interdit et perdu d'avance.
 *
 * Règles : Klaviyo partenaire, jamais comparé ni critiqué (la SERP est saturée de « vs », gabarit
 * qu'on s'interdit — ce qui laisse l'angle « les deux coexistent » libre) · aucun détail technique
 * inventé · « 20 à 25 % de revenus influencés, constaté chez des retailers équipés ».
 */
export const KLAVIYO: Record<Locale, FeaturePageContent> = {
  fr: {
    meta: {
      title: "Clienteling en boutique avec Klaviyo",
      description:
        "La campagne parle à un segment, Selekt parle à un client. Selekt se connecte à Klaviyo pour que la boutique agisse sur la même base, et que ça se mesure.",
    },
    hero: {
      kicker: "Intégration · Klaviyo",
      title: "La campagne parle à un segment. *Selekt parle à un client.*",
      lede: "Klaviyo garde les campagnes, les segments et les automatisations. Selekt prend l'autre moitié du travail : ce qu'une conseillère fait, une personne à la fois, entre deux visites — et la mesure de ce que ça rapporte.",
      demoLabel: "Demander une démo",
      bg: "waves",
      secondary: { label: "Toutes les intégrations", key: "integrations" },
    },
    sections: [
      {
        type: "table",
        tone: "cream",
        kicker: "Répartition des rôles",
        title: "Ce que Klaviyo gère, *ce que Selekt ajoute*.",
        lede: "Les deux s'appuient sur la même base client, mais ne parlent pas au même moment ni de la même façon.",
        columns: ["", "Klaviyo", "Selekt"],
        highlight: 2,
        rows: [
          { label: "Campagnes email et SMS", cells: [true, false] },
          { label: "Segments et automatisations", cells: [true, false] },
          { label: "Envois à grande échelle", cells: [true, false] },
          { label: "Base client et consentements", cells: [true, "partagée, jamais dupliquée"] },
          { label: "Conversation individuelle de la conseillère", cells: [false, true] },
          { label: "Portefeuille réparti par vendeur", cells: [false, true] },
          { label: "Rendez-vous, wishlists, pièces mises de côté", cells: [false, true] },
          { label: "Revenus influencés, par conseiller", cells: [false, true] },
        ],
        note: "Rien à remplacer : une maison sans campagnes n'a pas plus de relation qu'une maison sans vendeurs.",
      },
      {
        type: "list",
        kicker: "Deux gestes différents",
        title: "Un segment et une personne, *ce n'est pas le même geste*.",
        items: [
          {
            title: "Mille clients d'un côté, deux cents de l'autre",
            body: "La campagne touche toute une base en une fois. La conseillère suit un portefeuille qu'elle connaît, et c'est cette proximité qui fait la différence sur un panier élevé.",
          },
          {
            title: "Un motif réel plutôt qu'une offre",
            body: "La campagne annonce. La conseillère contacte parce qu'une pièce est arrivée, qu'une retouche est prête ou qu'une date approche.",
          },
          {
            title: "Un message signé par quelqu'un",
            body: "Le client répond à une personne, pas à une marque. C'est aussi ce qui rend la réponse exploitable en boutique.",
          },
          {
            title: "Ce que la boutique sait et que la campagne ignore",
            body: "Une taille, un essayage sans achat, un événement annoncé en cabine : rien de tout cela n'entre dans un segment, et c'est pourtant ce qui déclenche la vente suivante.",
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
            kicker: "Après l'envoi",
            title: "Le client qui a ouvert, puis rien",
            key: "aiCopilot",
            cta: "Des messages préparés et validés avant envoi",
            body: "La campagne a fait son travail : il a ouvert, il a cliqué, il n'est pas venu. Sa conseillère le sait et le rappelle avec une raison qui lui est propre.",
          },
          {
            kicker: "Avant l'envoi",
            title: "La pièce mise de côté",
            body: "Ce qui est réservé pour un client ne part pas dans une promotion générale. Une base partagée évite de solder ce qu'on lui tenait au chaud.",
          },
          {
            kicker: "Après la visite",
            title: "Le rendez-vous pris",
            key: "influencedRevenue",
            cta: "Comment les revenus influencés sont attribués",
            body: "Une campagne annonce une collection, un rendez-vous d'essayage se prend en boutique. Les deux se répondent au lieu de se doubler.",
          },
        ],
      },
      {
        type: "loop",
        kicker: "La mesure",
        title: "Mesurer ce que le travail individuel *rapporte*.",
        steps: [
          {
            title: "Tracer l'action",
            body: "Le message envoyé par la conseillère est daté et rattaché à son auteur, distinctement d'un envoi de campagne.",
          },
          {
            title: "Fixer la fenêtre",
            body: "Sept, trente ou quatre-vingt-dix jours entre le contact et la vente. C'est la maison qui fixe la règle.",
          },
          {
            title: "Rattacher la vente",
            body: "La vente rejoint les revenus influencés. Ce que la campagne a fait et ce que la conseillère a fait restent deux chiffres distincts, jamais additionnés.",
          },
          {
            title: "Réconcilier",
            body: "Conseiller par conseiller, boutique par boutique. Chez des retailers équipés, les revenus influencés représentent couramment 20 à 25 % du total.",
          },
        ],
      },
      {
        type: "split",
        photo: "carnetOuvert",
        alt: "Carnet ouvert sur un bois sombre, pages vierges",
        kicker: "Consentement",
        title: "Préférences, consentement *et RGPD*.",
        body: "Quand deux outils écrivent sur la même base, la question n'est pas technique mais éthique : le client ne doit jamais payer la complexité de notre organisation.",
        points: [
          "Le canal choisi par le client est respecté des deux côtés",
          "Un désabonnement enregistré dans la campagne arrête aussi la relance individuelle",
          "Permissions au niveau du champ, par rôle et par boutique, et journal d'audit",
          "Hébergement dans l'Union européenne",
        ],
      },
      {
        type: "split",
        photo: "murVetements",
        alt: "Mur de vêtements et miroir dans une boutique claire",
        kicker: "Mise en route",
        title: "Comment ça *se met en place*.",
        body: "Le raccordement se cale avec vous : périmètre de données, rôles, répartition entre ce qui part en campagne et ce qui part de la boutique.",
        points: [
          "Un point avec votre équipe marketing et votre équipe retail, ensemble",
          "Une règle écrite : qui annonce quoi, et qui contacte qui",
          "Une ou deux boutiques pilotes avant le reste du réseau",
        ],
        reverse: true,
      },
      {
        type: "rows",
        tone: "cream",
        faq: true,
        kicker: "Questions fréquentes",
        title: "Ce qu'on nous demande *sur Klaviyo*.",
        rows: [
          {
            title: "Selekt remplace-t-il Klaviyo ?",
            body: "Non. Klaviyo continue de faire ce qu'il fait bien : campagnes, segments, automatisations, à grande échelle. Selekt couvre l'autre moitié, le travail individuel d'une équipe de vente entre deux visites. Les deux s'appuient sur la même base client, pour qu'un client ne soit jamais contacté deux fois le même jour pour la même raison.",
          },
          {
            title: "Qui décide de ce que la boutique envoie et de ce que la campagne envoie ?",
            body: "Vous, à la mise en route. La plupart des maisons gardent les annonces larges côté campagne et laissent les relances individuelles aux conseillères, avec une raison réelle de contacter. Selekt enregistre qui a contacté qui, quand et pourquoi : la frontière reste visible au lieu d'être théorique.",
          },
          {
            title: "Comment distinguer les résultats de la campagne de ceux de la boutique ?",
            body: "Chaque action est datée et rattachée à la personne qui l'a faite. Vous fixez une fenêtre d'attribution de sept, trente ou quatre-vingt-dix jours. Les ventes de cette fenêtre deviennent des revenus influencés, tenus distincts des ventes directes et jamais additionnés. Chez des retailers équipés, on constate 20 à 25 % de revenus influencés.",
          },
          {
            title: "Et le consentement, la protection des données ?",
            body: "Les préférences et le consentement voyagent avec la fiche client, et le canal choisi par le client est respecté des deux côtés. Les permissions se règlent au niveau du champ, par rôle et par boutique, et chaque accès est journalisé. L'hébergement se fait dans l'Union européenne. Le détail se revoit avec votre équipe avant le démarrage.",
          },
          {
            title: "Nous avons Klaviyo mais aucun outil de fidélité côté caisse. Est-ce un problème ?",
            body: "Non, et c'est le cas le plus fréquent dans les réseaux que nous rencontrons. Selekt part de l'historique d'achat et des coordonnées, quel que soit l'outil qui les détient. Klaviyo garde les campagnes, Selekt donne à la boutique une fiche client utilisable, et les premières relances sortent de ce que vous avez déjà.",
          },
        ],
      },
    ],
  },

  en: {
    meta: {
      title: "Klaviyo clienteling for store teams",
      description:
        "Campaigns speak to a segment, Selekt speaks to one client. Selekt connects to Klaviyo so store teams act on the same base, and the results are measured.",
    },
    hero: {
      kicker: "Integration · Klaviyo",
      title: "Campaigns speak to a segment. *Selekt speaks to one client.*",
      lede: "Klaviyo keeps campaigns, segments and automations. Selekt takes the other half of the work: what an advisor does, one client at a time, between two visits — and the measurement of what it produces.",
      demoLabel: "Request a demo",
      bg: "waves",
      secondary: { label: "All integrations", key: "integrations" },
    },
    sections: [
      {
        type: "table",
        tone: "cream",
        kicker: "Who does what",
        title: "What Klaviyo handles, *what Selekt adds*.",
        lede: "Both rely on the same client base, but they do not speak at the same moment, nor in the same way.",
        columns: ["", "Klaviyo", "Selekt"],
        highlight: 2,
        rows: [
          { label: "Email and SMS campaigns", cells: [true, false] },
          { label: "Segments and automations", cells: [true, false] },
          { label: "Sending at scale", cells: [true, false] },
          { label: "Client base and consent", cells: [true, "shared, never duplicated"] },
          { label: "One-to-one advisor conversations", cells: [false, true] },
          { label: "Client books per advisor", cells: [false, true] },
          { label: "Appointments, wishlists, pieces on hold", cells: [false, true] },
          { label: "Influenced revenue, per advisor", cells: [false, true] },
        ],
        note: "Nothing to replace: a house without campaigns has no more relationship than a house without advisors.",
      },
      {
        type: "list",
        kicker: "Two different gestures",
        title: "A segment and a person *are not the same gesture*.",
        items: [
          {
            title: "A thousand clients on one side, two hundred on the other",
            body: "A campaign reaches a whole base at once. An advisor follows a book she knows, and on high baskets that closeness is what makes the difference.",
          },
          {
            title: "A real reason rather than an offer",
            body: "Campaigns announce. An advisor reaches out because a piece has arrived, an alteration is ready, or a date is coming up.",
          },
          {
            title: "A message signed by someone",
            body: "The client replies to a person, not to a brand. That is also what makes the reply usable on the shop floor.",
          },
          {
            title: "What the store knows and the campaign does not",
            body: "A size, a fitting with no purchase, an event mentioned in the fitting room: none of it fits a segment, and all of it drives the next sale.",
          },
        ],
      },
      {
        type: "loop",
        kicker: "Measuring",
        title: "Measuring what the one-to-one work *produces*.",
        steps: [
          { title: "Trace the action", body: "A message sent by an advisor is timestamped and attributed to its author, distinctly from a campaign send." },
          { title: "Set the window", body: "Seven, thirty or ninety days between contact and sale. The house sets the rule." },
          { title: "Attribute the sale", body: "The sale joins influenced revenue. What the campaign did and what the advisor did stay two separate figures, never added together." },
          { title: "Reconcile", body: "Advisor by advisor, store by store. Across equipped retailers, influenced revenue commonly represents 20 to 25 percent of total revenue." },
        ],
      },
      {
        type: "split",
        photo: "carnetOuvert",
        alt: "Open notebook on dark wood, blank pages",
        kicker: "Consent",
        title: "Preferences, consent *and data protection*.",
        body: "When two tools write to the same base, the question is not technical but ethical: a client should never pay for the complexity of our own organisation.",
        points: [
          "The channel a client has chosen is respected on both sides",
          "An opt-out recorded in the campaign tool also stops individual outreach",
          "Field-level permissions, by role and by store, with a full audit log",
          "Data hosted in the European Union",
        ],
      },
      {
        type: "cards",
        tone: "paper",
        kicker: "The rest of your stack",
        title: "Klaviyo is not *your only tool*.",
        lede: "Campaigns sit next to a POS, an e-commerce platform and sometimes a loyalty programme. Selekt connects to those as well.",
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
        title: "What we are asked *about Klaviyo*.",
        rows: [
          {
            title: "Does Selekt replace Klaviyo?",
            body: "No. Klaviyo keeps doing what it does well: campaigns, segments, automations, at scale. Selekt covers the other half, the one-to-one work a store team does between visits. Both draw on the same client base, so a client is never contacted twice for the same reason on the same day.",
          },
          {
            title: "Who decides what the store sends and what the campaign sends?",
            body: "You do, at setup. Most houses keep broad announcements on the campaign side and leave individual follow-ups to advisors, with a real reason to reach out. Selekt records who contacted whom, when and why, so the line between the two stays visible rather than theoretical.",
          },
          {
            title: "How do we tell campaign results from store results?",
            body: "Every action is dated and tied to the person who took it. You set an attribution window of seven, thirty or ninety days. Sales in that window become influenced revenue, kept separate from direct sales and never added to them. Across equipped retailers, 20 to 25 percent of revenue is influenced.",
          },
          {
            title: "What about consent and data protection?",
            body: "Client preferences and consent travel with the profile, and the channel a client has chosen is respected on both sides. Permissions are set at field level, by role and by store, and every access is logged. Data is hosted in the European Union. The detail is reviewed with your team before launch.",
          },
          {
            title: "We use Klaviyo but no POS-side loyalty tool. Is that a problem?",
            body: "No, and it is the most common case in the networks we meet. Selekt starts from purchase history and contact details, whatever holds them. Klaviyo keeps the campaigns, Selekt gives the store floor a usable client profile, and the first follow-ups come out of what you already have.",
          },
        ],
      },
    ],
  },
};
