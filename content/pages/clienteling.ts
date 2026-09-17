import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import type { Locale } from "@/lib/routes";

/**
 * Page pilier SEO — « clienteling ».
 * Cible : « clienteling » (480 rech./mois FR, en hausse) + « clienteling définition »
 * (~130 cumulées) + « clienteling luxe » (20). Mesuré DataForSEO le 15/09/2026.
 * La 1re page Google n'est faite que de pages « définition » d'éditeurs non spécialisés
 * (Cegid, HubSpot, Generix…) : on gagne en répondant mieux, pas en criant plus fort.
 *
 * Règles appliquées (cf. BRAIN 29-brief-seo-mapping-mots-cles.md) :
 * - aucun concurrent nommé, aucune comparaison nominative ;
 * - « 20 à 25 % de revenus influencés », jamais « +X % de CA » ;
 * - on répond d'abord à la question, on vend ensuite (une page qui ne répond pas
 *   à « c'est quoi » ne tiendra pas la première page).
 */
export const CLIENTELING: Record<Locale, FeaturePageContent> = {
  fr: {
    meta: {
      title: "Clienteling : définition et exemples",
      description:
        "Le clienteling, c'est la relation client suivie en boutique : fiche client, messages, relances. Définition, exemples et différence avec un CRM.",
    },
    hero: {
      kicker: "Clienteling",
      title: "Le clienteling, *expliqué simplement*.",
      lede: "Le clienteling, c'est l'art de suivre chaque client comme une relation, pas comme une transaction : savoir ce qu'il aime, le prévenir au bon moment, garder la trace de ce qui a été dit. Cette page explique ce que c'est, à quoi ça ressemble en boutique, et comment savoir si ça rapporte.",
      demoLabel: "Demander une démo",
      bg: "waves",
      secondary: { label: "Voir la plateforme", key: "platform" },
    },
    sections: [
      {
        type: "list",
        kicker: "Définition",
        title: "Clienteling : *la définition*.",
        lede: "Le clienteling désigne l'ensemble des pratiques par lesquelles un vendeur entretient une relation personnalisée et suivie avec ses clients, en s'appuyant sur ce qu'il sait d'eux : achats, préférences, tailles, échanges passés. Le mot vient du retail de luxe, où le vendeur connaît ses clients par leur nom ; l'outil ne fait que rendre cette pratique tenable à l'échelle d'un réseau.",
        items: [
          {
            title: "Ce que c'est",
            body: "Une relation suivie, tenue par une personne identifiée, nourrie par l'historique du client et poursuivie d'une visite à l'autre, en boutique comme à distance.",
          },
          {
            title: "Ce que ce n'est pas",
            body: "Ni de l'emailing de masse, ni une carte de fidélité. Le clienteling s'adresse à un client à la fois, avec une raison de le contacter et une personne qui signe le message.",
          },
          {
            title: "D'où vient le mot",
            body: "Du retail de luxe anglo-saxon, où le « client book » du vendeur — son carnet de clients — était déjà l'outil central bien avant le numérique.",
          },
          {
            title: "Qui le pratique",
            body: "Les maisons de luxe et les réseaux premium, mais aussi les bijoutiers, horlogers et boutiques de mode indépendants : partout où le panier est élevé et la visite rare.",
          },
        ],
      },
      {
        type: "split",
        photo: "salonBoise",
        alt: "Intérieur de boutique boisée, présentoirs éclairés",
        kicker: "En pratique",
        title: "À quoi ça ressemble *une journée type*.",
        body: "Le clienteling n'est pas un concept : c'est une suite de gestes concrets, faits par un vendeur entre deux clients. Sur une journée, ça tient en quelques minutes bien employées.",
        points: [
          "Le matin, la liste des clients à recontacter : anniversaires, commandes arrivées, pièces mises de côté",
          "Après une vente, la fiche client complétée : ce qui a plu, ce qui a été essayé, ce qu'il faudra proposer la prochaine fois",
          "Une pièce reçue en boutique, une cliente prévenue par message, un rendez-vous calé",
          "Le soir, ce qui n'a pas abouti est reporté, pas oublié",
        ],
      },
      {
        type: "list",
        kicker: "Exemples",
        title: "Cinq exemples *concrets*.",
        lede: "Les mêmes gestes reviennent, quel que soit le secteur. Ce sont eux qui font la différence entre un client qui revient et un client qui passe ailleurs.",
        items: [
          {
            title: "La pièce mise de côté",
            body: "Une cliente hésite sur un bracelet. Il est noté dans sa wishlist. Trois semaines plus tard, la vendeuse la prévient qu'il reste une pièce : la vente se fait sans remise.",
          },
          {
            title: "Le retour d'un achat marquant",
            body: "Un client a acheté une montre pour une occasion. Un an après, un message signé de son vendeur, au bon moment, vaut mieux que dix campagnes.",
          },
          {
            title: "Le renouvellement prévisible",
            body: "Certains produits se rachètent à échéance connue. Le clienteling consiste à être là un mois avant, pas six mois après.",
          },
          {
            title: "La pièce trouvée ailleurs dans le réseau",
            body: "La taille n'est plus disponible en boutique, mais elle l'est à trois rues. Le vendeur le voit, le propose, et la vente reste dans la maison.",
          },
          {
            title: "Le client transmis, pas perdu",
            body: "Un vendeur part. Ses clients restent connus de la maison : historique, préférences, échanges. Le lien se transmet au lieu de disparaître avec lui.",
          },
        ],
      },
      {
        type: "table",
        tone: "cream",
        kicker: "Clienteling ou CRM",
        title: "La différence avec un *CRM classique*.",
        lede: "Les deux gèrent des clients, mais ils ne sont pas faits pour la même personne. Un CRM d'entreprise est pensé pour le marketing et le siège ; le clienteling est pensé pour le vendeur, en boutique, entre deux clients.",
        columns: ["", "CRM généraliste", "Outil de clienteling"],
        highlight: 2,
        rows: [
          { label: "Utilisateur principal", cells: ["Marketing, siège", "Vendeur en boutique"] },
          { label: "Unité de travail", cells: ["Un segment, une campagne", "Un client, une conversation"] },
          { label: "Lieu d'usage", cells: ["Bureau, ordinateur", "Surface de vente, mobile"] },
          { label: "Le message est signé par", cells: ["La marque", "Le vendeur qui connaît le client"] },
          { label: "Mesure attendue", cells: ["Taux d'ouverture, de clic", "Ventes rattachées aux actions"] },
          { label: "Temps disponible pour s'en servir", cells: ["Une session de travail", "Deux minutes entre deux clients"] },
        ],
        note: "Les deux cohabitent très bien : le CRM garde la vision d'ensemble, le clienteling fait vivre la relation individuelle.",
      },
      {
        type: "list",
        kicker: "Les deux ensemble",
        title: "Comment un CRM et le clienteling *travaillent ensemble*.",
        lede: "La plupart des réseaux font tourner les deux. Ce qui compte n'est pas de choisir, mais de décider qui écrit quoi : sans cette règle, les deux outils finissent par se contredire devant le client.",
        items: [
          {
            title: "Qui écrit quoi",
            body: "Le CRM porte les campagnes, les segments et les consentements de masse. Le clienteling porte les actions individuelles et ce que le vendeur apprend en boutique. Un champ modifiable des deux côtés doit avoir un propriétaire déclaré.",
          },
          {
            title: "Un seul client, deux bases",
            body: "Le même client existe des deux côtés, souvent avec une adresse différente. L'identité se réconcilie une fois, sur un identifiant stable, sinon on adresse deux fois la même personne avec deux messages qui se contredisent.",
          },
          {
            title: "Le consentement suit le client, pas l'outil",
            body: "Un désabonnement enregistré dans le CRM doit arrêter aussi la relance individuelle. C'est la règle la plus souvent oubliée quand deux outils écrivent sur la même base.",
          },
          {
            title: "Une vente n'est comptée qu'une fois",
            body: "Si la campagne et le vendeur revendiquent la même vente, plus personne ne croit aux chiffres. L'attribution doit dire lequel des deux l'emporte, et selon quelle règle.",
          },
        ],
      },
      {
        type: "loop",
        kicker: "Mesurer",
        title: "Comment savoir si *ça rapporte*.",
        steps: [
          {
            title: "Tracer l'action",
            body: "Un message, un rendez-vous, une relance : l'action est datée et rattachée à son auteur. Sans cette trace, rien ne pourra être mesuré ensuite.",
          },
          {
            title: "Définir la fenêtre",
            body: "Combien de temps après un contact une vente lui est-elle attribuable ? Sept, trente, quatre-vingt-dix jours : c'est une décision de la maison, pas un réglage caché.",
          },
          {
            title: "Attribuer la vente",
            body: "Quand le client achète dans cette fenêtre, la vente rejoint les revenus influencés par le clienteling — distincts des ventes spontanées, jamais additionnés.",
          },
          {
            title: "Réconcilier",
            body: "Boutique par boutique, ligne par ligne, la direction doit lire les mêmes montants que le terrain. Sinon, personne n'y croira. Chez des retailers équipés, les revenus influencés représentent couramment 20 à 25 % du total.",
          },
        ],
      },
      {
        type: "rows",
        tone: "paper",
        kicker: "Réussir",
        title: "Ce qui fait *échouer* un projet de clienteling.",
        lede: "Les causes d'échec sont presque toujours les mêmes, et aucune n'est technique.",
        variant: "timeline",
        rows: [
          {
            title: "L'outil demande plus qu'il ne rend",
            body: "Si remplir une fiche prend plus de temps que le service rendu au vendeur, il ne la remplira pas. La contrepartie doit être immédiate : retrouver un client, voir un stock, envoyer un message propre.",
          },
          {
            title: "Les données sont ailleurs",
            body: "Si les achats restent dans la caisse et les préférences dans un carnet, personne ne voit le client en entier. Le clienteling suppose que la donnée circule dans les deux sens avec les outils existants.",
          },
          {
            title: "Personne ne mesure",
            body: "Sans attribution, le clienteling reste une intuition. Les maisons qui tiennent dans la durée sont celles qui savent dire ce que la relation a rapporté.",
          },
          {
            title: "Le management ne suit pas",
            body: "Un manager qui ne regarde jamais les actions de clienteling envoie un message clair à son équipe : ça ne compte pas. L'inverse est vrai aussi.",
          },
        ],
      },
      {
        type: "cards",
        tone: "cream",
        kicker: "Par métier",
        title: "Le clienteling *selon votre maison*.",
        lede: "Les gestes sont les mêmes, les moments diffèrent.",
        cols: 3,
        cards: [
          {
            kicker: "Bijouterie, joaillerie, horlogerie",
            title: "Des visites rares, des paniers élevés",
            body: "Entre deux achats, des mois ou des années. Le fichier client vaut plus que le passage : anniversaires, pièces regardées, occasions à venir.",
            key: "jewelry",
            cta: "Le clienteling en bijouterie",
          },
          {
            kicker: "Mode et prêt-à-porter",
            title: "Le rythme des collections",
            body: "Chaque arrivage est une raison légitime de contacter les bons clients, en fonction de leurs tailles et de ce qu'ils achètent vraiment.",
            key: "fashion",
            cta: "Le clienteling en prêt-à-porter",
          },
          {
            kicker: "Vous comparez des logiciels",
            title: "CRM retail : les trois familles d'outils",
            body: "Le mot CRM recouvre trois choses différentes dans le commerce de détail. Savoir laquelle on cherche évite d'acheter la mauvaise.",
            key: "crmRetail",
            cta: "Le CRM retail des réseaux de magasins",
          },
          {
            kicker: "Réseaux et franchises",
            title: "La même définition partout",
            body: "Plusieurs boutiques, un seul client. Les règles d'attribution et le référentiel client doivent être communs, sinon les chiffres ne se réconcilient jamais.",
            key: "hq",
            cta: "La vue réseau, unifiée",
          },
        ],
      },
      {
        type: "stats",
        kicker: "Ce que ça pèse",
        title: "Un ordre de grandeur *honnête*.",
        stats: [
          { value: 25, suffix: " %", label: "des revenus influencés par le clienteling, constaté chez des retailers équipés (20 à 25 %)" },
          { value: 3, suffix: " rôles", label: "vendeur, manager, siège : les mêmes chiffres, à leur niveau" },
          { value: 2, suffix: " min", label: "le temps réellement disponible entre deux clients" },
        ],
      },
      {
        type: "split",
        photo: "carnetStylo",
        alt: "Carnet à spirale et stylo dans un rai de lumière",
        kicker: "Avec Selekt",
        title: "Un outil pensé pour *le temps du vendeur*.",
        body: "Selekt réunit vendeurs, managers et siège dans une seule application de clienteling : fiche client complète, messages tracés, rendez-vous, catalogue avec le stock du réseau, et l'attribution des ventes selon vos règles.",
        points: [
          "Mobile pour le vendeur, tablette pour le manager, desktop pour le siège",
          "Revenus influencés et ventes directes toujours distincts, jamais additionnés",
          "Règles d'attribution, champs et modèles de messages configurables sans développeur",
        ],
        reverse: true,
      },
      {
        type: "rows",
        tone: "cream",
        faq: true,
        kicker: "Questions fréquentes",
        title: "Ce qu'on nous demande *le plus souvent*.",
        rows: [
          {
            title: "Quelle est la traduction de clienteling en français ?",
            body: "Il n'y en a pas d'exacte. On parle de relation client personnalisée en boutique, ou de suivi client individualisé. Le terme anglais reste employé dans le retail parce qu'aucune expression française ne recouvre la même pratique.",
          },
          {
            title: "Le clienteling, est-ce réservé au luxe ?",
            body: "Non. Il est né dans le luxe, mais il vaut partout où le panier est élevé et la visite peu fréquente : bijouterie, horlogerie, optique, mobilier, mode premium.",
          },
          {
            title: "Faut-il changer de logiciel de caisse ?",
            body: "Non. Le clienteling se branche sur la caisse et le e-commerce existants pour récupérer les achats et faire circuler la donnée client. La caisse continue son métier.",
          },
          {
            title: "Que devient le fichier client au regard du RGPD ?",
            body: "Il reste sous la responsabilité de la maison : consentement, droit d'accès et d'effacement, permissions au niveau de la donnée, journal des accès. Une relation personnalisée suppose une base tenue proprement.",
          },
          {
            title: "Combien de temps avant de voir un effet ?",
            body: "Les premières ventes attribuées apparaissent dès que les actions sont tracées et la fenêtre d'attribution définie. Une tendance fiable demande un cycle d'achat complet du secteur.",
          },
        ],
      },
    ],
  },

  en: {
    meta: {
      title: "Clienteling: meaning, examples and tools",
      description:
        "Clienteling means serving each client as a named relationship. Definition, in-store examples, how it differs from a CRM, and how to measure it.",
    },
    hero: {
      kicker: "Clienteling",
      title: "Clienteling, *plainly explained*.",
      lede: "Clienteling is the retail practice of serving each client as a named, continuing relationship rather than a transaction: knowing what they own and like, reaching out with a reason, and recording what happened so the next conversation starts where the last one stopped.",
      demoLabel: "Request a demo",
      bg: "waves",
      secondary: { label: "See the platform", key: "platform" },
    },
    sections: [
      {
        type: "list",
        kicker: "Definition",
        title: "What is *clienteling*?",
        lede: "Clienteling covers everything an advisor does to maintain a personalised, continuing relationship with their clients, based on what is known about them: purchases, preferences, sizes, past conversations. The word comes from luxury retail, where the advisor knows clients by name; software only makes that practice sustainable across a network of stores.",
        items: [
          {
            title: "What it is",
            body: "A continuing relationship, held by a named person, informed by the client's history and carried from one visit to the next, in store and remotely.",
          },
          {
            title: "What it is not",
            body: "Neither mass emailing nor a loyalty card. Clienteling addresses one client at a time, with a reason to reach out and a person signing the message.",
          },
          {
            title: "Where the word comes from",
            body: "From Anglo-Saxon luxury retail, where the advisor's client book — often called the black book — was the central tool long before anything was digital.",
          },
          {
            title: "Who practises it",
            body: "Luxury houses and premium networks, but also independent jewellers, watchmakers and fashion boutiques: wherever baskets are high and visits infrequent.",
          },
        ],
      },
      {
        type: "list",
        kicker: "The word",
        title: "Is clienteling *a real word*?",
        lede: "It is, and it is one of the few retail terms with no clean equivalent in other languages. Because people meet it first in a job title or a software category, the spelling and the pronunciation come up constantly.",
        items: [
          {
            title: "How to pronounce it",
            body: "Klee-en-TELL-ing, with the stress on the third syllable. It is built from clientele, the body of clients a house serves, and follows the same pattern as retailing or wholesaling.",
          },
          {
            title: "Clienteling, clientelling or clienting?",
            body: "Clienteling is the standard spelling in trade press and job titles. Clientelling, with two l's, appears in British usage. Clienting is a shorthand heard on the floor. All three name the same practice.",
          },
          {
            title: "The closest synonyms",
            body: "Relationship selling, one-to-one retail, client book selling, personal shopping. Each covers a part of it. Only clienteling covers the whole: knowing a client, reaching out with a reason, and recording what happened.",
          },
          {
            title: "Not to be confused with",
            body: "Customer service handles a request that has already been made. Clienteling starts the conversation before the client asks, and continues it between visits.",
          },
        ],
      },
      {
        type: "split",
        photo: "salonBoise",
        alt: "Wood-panelled boutique interior with lit displays",
        kicker: "In practice",
        title: "What clienteling looks like *on the shop floor*.",
        body: "Clienteling is not a concept: it is a series of concrete gestures, made by an advisor between two clients. Across a day, it amounts to a few well-spent minutes — which is exactly why the tool has to answer in seconds.",
        points: [
          "In the morning, the list of clients to contact: birthdays, orders received, pieces set aside",
          "After a sale, the client profile completed: what appealed, what was tried, what to show next time",
          "A piece arrives in store, a client is told, an appointment is booked",
          "In the evening, what did not land is carried forward, not forgotten",
        ],
      },
      {
        type: "list",
        kicker: "Examples",
        title: "Five clienteling *examples*.",
        lede: "The same gestures recur across sectors. They are what separates a client who comes back from one who buys elsewhere.",
        items: [
          {
            title: "The piece set aside",
            body: "A client hesitates over a bracelet. It goes on her wishlist. Three weeks later the advisor tells her one is left: the sale closes without a discount.",
          },
          {
            title: "The anniversary of a milestone purchase",
            body: "A client bought a watch for an occasion. A year later, a message signed by the advisor who sold it, sent at the right moment, is worth more than ten campaigns.",
          },
          {
            title: "The predictable replacement",
            body: "Some products are replaced on a known cycle. Clienteling means being there a month before, not six months after.",
          },
          {
            title: "The piece found elsewhere in the network",
            body: "The size is out of stock here, but available three streets away. The advisor sees it, offers it, and the sale stays within the house.",
          },
          {
            title: "The client handed over, not lost",
            body: "An advisor leaves. Their clients remain known to the house: history, preferences, conversations. The relationship is transferred instead of walking out of the door.",
          },
        ],
      },
      {
        type: "table",
        tone: "cream",
        kicker: "Clienteling or CRM",
        title: "Clienteling vs CRM: *what is the difference*?",
        lede: "Both manage clients, but they are built for different people. An enterprise CRM serves marketing and headquarters; clienteling serves the advisor, in store, between two clients. Most retail networks run both, and the clienteling tool feeds the CRM.",
        columns: ["", "General-purpose CRM", "Clienteling tool"],
        highlight: 2,
        rows: [
          { label: "Primary user", cells: ["Marketing, headquarters", "Advisor on the shop floor"] },
          { label: "Unit of work", cells: ["A segment, a campaign", "A client, a conversation"] },
          { label: "Where it is used", cells: ["Desk, computer", "Shop floor, mobile"] },
          { label: "Messages signed by", cells: ["The brand", "The advisor who knows the client"] },
          { label: "Expected measure", cells: ["Open and click rates", "Sales attributed to actions"] },
          { label: "Time available to use it", cells: ["A working session", "Two minutes between clients"] },
        ],
        note: "The two coexist well: the CRM keeps the overall view, clienteling carries the individual relationship and returns the evidence of what it produced.",
      },
      {
        type: "list",
        kicker: "Running both",
        title: "How a CRM and clienteling *work together*.",
        lede: "Most networks run both. The question is not which one to choose, but who writes what: without that rule, the two tools end up contradicting each other in front of the client.",
        items: [
          {
            title: "Who writes what",
            body: "The CRM owns campaigns, segments and bulk consent. Clienteling owns individual actions and what the advisor learns on the floor. Any field both sides can edit needs a declared owner.",
          },
          {
            title: "One client, two databases",
            body: "The same person exists on both sides, often under a different email. Identity is reconciled once, on a stable identifier — otherwise the same client is addressed twice, with two messages that contradict each other.",
          },
          {
            title: "Consent follows the client, not the tool",
            body: "An opt-out recorded in the CRM has to stop individual outreach as well. It is the rule most often forgotten when two tools write to the same base.",
          },
          {
            title: "A sale is counted once",
            body: "If the campaign and the advisor both claim the same sale, nobody believes the figures any more. Attribution has to say which one wins, and under which rule.",
          },
        ],
      },
      {
        type: "split",
        photo: "boutiqueSombre",
        alt: "Dark-toned boutique, clothing rails and the outline of a client",
        kicker: "Luxury retail",
        title: "What is clienteling *in luxury retail*?",
        body: "The same practice, with longer cycles and higher baskets. A client may visit once or twice a year, so the record matters more than footfall: pieces tried, sizes, occasions ahead, the name of the person who served them last time.",
        points: [
          "The relationship belongs to the house, not only to the advisor who built it",
          "Discretion is part of the service: no mass sends, no promotional tone",
          "Appointments, private viewings and waiting lists carry more weight than campaigns",
          "One client is often served in several cities, and must be recognised in each",
        ],
      },
      {
        type: "loop",
        kicker: "Measuring",
        title: "How to *measure* clienteling.",
        steps: [
          {
            title: "Trace the action",
            body: "A message, an appointment, a follow-up: the action is timestamped and attributed to its author. Without that trace, nothing can be measured later.",
          },
          {
            title: "Set the attribution window",
            body: "How long after a contact is a sale attributable to it? Seven, thirty, ninety days: that is the house's decision, written down, not a hidden setting.",
          },
          {
            title: "Attribute the sale",
            body: "When the client buys within that window, the sale joins influenced revenue. It stays separate from walk-in sales and is never added to them: a sale counted twice discredits the whole measure.",
          },
          {
            title: "Reconcile",
            body: "Store by store, line by line, leadership reads the same figures as the floor. Across equipped retailers, influenced revenue commonly represents 20 to 25 percent of total revenue.",
          },
        ],
      },
      {
        type: "cards",
        tone: "cream",
        kicker: "Choosing a tool",
        title: "What a clienteling platform *should include*.",
        lede: "Criteria rather than brands. Each one corresponds to a way projects fail when it is missing.",
        cols: 3,
        cards: [
          {
            kicker: "The client",
            title: "A profile fed by the POS",
            body: "Purchases, preferences, sizes and past conversations in one place, updated without anyone retyping them. A profile an advisor has to fill in by hand stays empty.",
          },
          {
            kicker: "The gesture",
            title: "Traced messaging and appointments",
            body: "Messages sent from the application, on the channels clients actually use, in the house's tone — and recorded, so the next advisor knows what was said.",
          },
          {
            kicker: "The product",
            title: "A catalogue with network stock",
            body: "What is available here, and elsewhere in the network. Without it, the advisor sends the client to a competitor without knowing it.",
          },
          {
            kicker: "The proof",
            title: "Attribution rules you set",
            body: "A window, included channels, and a clear separation between direct and influenced revenue. If the vendor decides the rules, the figures will be argued about.",
            key: "influencedRevenue",
            cta: "How influenced revenue is attributed",
          },
          {
            kicker: "The fit",
            title: "Configuration without a developer",
            body: "Fields, roles, message templates and appointment types change with the house. Every change that needs a project is a change that will not happen.",
            key: "configurability",
            cta: "Configured without a developer",
          },
          {
            kicker: "The floor",
            title: "Mobile, in seconds",
            body: "The advisor has two minutes between clients. A tool that takes longer than the service it renders will not be used, whatever the training plan says.",
            key: "advisor",
            cta: "What an advisor sees on the floor",
          },
        ],
      },
      {
        type: "rows",
        tone: "paper",
        kicker: "Getting it wrong",
        title: "Why clienteling programmes *fail*.",
        lede: "The causes are almost always the same, and none of them is technical.",
        variant: "timeline",
        rows: [
          {
            title: "The tool asks more than it gives",
            body: "If filling in a profile takes longer than the service it renders, advisors will not do it. The return has to be immediate: find a client, see stock, send a clean message.",
          },
          {
            title: "The data lives elsewhere",
            body: "If purchases stay in the POS and preferences in a notebook, nobody sees the whole client. Clienteling assumes data flows both ways with the tools already in place.",
          },
          {
            title: "Nobody measures",
            body: "Without attribution, clienteling remains an intuition, and the first budget review kills it. Houses that keep going are those that can say what the relationship produced.",
          },
          {
            title: "Management does not follow",
            body: "A manager who never looks at clienteling actions tells the team plainly that it does not count. The opposite is true as well.",
          },
        ],
      },
      {
        type: "list",
        kicker: "Across a network",
        title: "Clienteling across *a store network*.",
        lede: "One client, several stores, dozens of advisors: this is where a personal practice becomes an operating model, and where most of the disputes appear.",
        items: [
          {
            title: "One client, several stores",
            body: "The same person buys in two cities. Without a shared client record, two advisors work the same relationship in parallel, and both claim the sale.",
          },
          {
            title: "Sharing out the client book",
            body: "Who follows whom is a decision, not an accident. Portfolios are assigned, visible, and reviewed — otherwise the best clients are followed twice and the rest not at all.",
          },
          {
            title: "When an advisor leaves",
            body: "Their portfolio is reassigned with its history. The house keeps the relationship it paid to build, and the client is not greeted as a stranger.",
          },
          {
            title: "The same definition everywhere",
            body: "One attribution window, one set of included channels, one client record. Local variations make network figures impossible to compare.",
          },
        ],
      },
      {
        type: "cards",
        tone: "cream",
        kicker: "By sector",
        title: "Clienteling *by sector*.",
        lede: "The gestures are the same; the moments differ.",
        cols: 3,
        cards: [
          {
            kicker: "Jewellery and watches",
            title: "Rare visits, high baskets",
            body: "Months or years between purchases. The client record is worth more than footfall: anniversaries, pieces tried, occasions ahead, ring sizes.",
            key: "jewelry",
            cta: "Clienteling for jewelers",
          },
          {
            kicker: "Fashion and ready-to-wear",
            title: "The rhythm of collections",
            body: "Every delivery is a legitimate reason to contact the right clients, based on their sizes and what they actually buy.",
            key: "fashion",
            cta: "Clienteling for fashion retailers",
          },
          {
            kicker: "Comparing software",
            title: "Retail CRM: three families of tools",
            body: "In retail, the word CRM covers three different things. Knowing which one you are looking for prevents buying the wrong one.",
            key: "crmRetail",
            cta: "Retail CRM for store networks",
          },
          {
            kicker: "Networks and franchises",
            title: "One definition for everyone",
            body: "Several stores, one client. Attribution rules and the client record have to be shared, or the figures will never reconcile.",
            key: "hq",
            cta: "The network view, unified",
          },
        ],
      },
      {
        type: "list",
        kicker: "Client data",
        title: "Clienteling and *client data*.",
        lede: "A personalised relationship rests on a database held to a higher standard than a mailing list. In Europe it is also a legal obligation, and in practice it is what makes advisors comfortable using the tool.",
        items: [
          {
            title: "Consent, recorded",
            body: "Who agreed to be contacted, on which channel, and when. Consent is part of the client record, not a spreadsheet kept next to it.",
          },
          {
            title: "Permissions at data level",
            body: "An advisor sees their clients, a manager their store, headquarters the network. Sensitive fields can be restricted further, by role and by store.",
          },
          {
            title: "An audit log",
            body: "Every access and every change is recorded. It protects the house, and it settles disputes over who did what.",
          },
          {
            title: "Data that stays yours",
            body: "Client records, conversations and action history belong to the house. Changing POS, e-commerce platform or clienteling vendor does not cost you the relationship.",
          },
        ],
      },
      {
        type: "split",
        photo: "carnetStylo",
        alt: "Spiral notebook and pen in a shaft of light",
        kicker: "With Selekt",
        title: "Built for *the advisor's minutes*.",
        body: "Selekt brings advisors, managers and headquarters into one clienteling application: full client profile fed by the POS, traced messages, appointments, catalogue with network stock, and sales attribution following your own rules.",
        points: [
          "Mobile for the advisor, tablet for the manager, desktop for headquarters",
          "Influenced and direct revenue always distinct, never added together",
          "Attribution rules, fields and message templates configurable without a developer",
        ],
        reverse: true,
      },
      {
        type: "rows",
        tone: "cream",
        faq: true,
        kicker: "Frequently asked",
        title: "Frequently asked *questions*.",
        rows: [
          {
            title: "What is the difference between clienteling and CRM?",
            body: "A CRM organises customer data for marketing and headquarters: segments, campaigns, open rates. Clienteling gives one advisor the client in front of them and two minutes to act on it: history, preferences, a message signed by name. Most retail networks run both, and the clienteling tool feeds the CRM.",
          },
          {
            title: "Is clienteling a real word, and how is it pronounced?",
            body: "Yes. Clienteling is a retail term formed from clientele, used in trade press, job titles and software categories. It is pronounced klee-en-TELL-ing, with the stress on the third syllable. The variant spelling clientelling and the shorthand clienting refer to the same practice.",
          },
          {
            title: "What is another word for clienteling?",
            body: "There is no exact synonym. The closest terms are relationship selling, one-to-one retail, client book selling and personal shopping. Each covers part of the practice. Clienteling is the only word that covers all of it: knowing a client, reaching out with a reason, and recording what happened.",
          },
          {
            title: "Is clienteling only for luxury?",
            body: "No. It began in luxury, but it applies wherever baskets are high and visits infrequent: jewellery, watches, optical, furniture, premium fashion. The shorter the purchase cycle, the more clienteling gives way to campaigns.",
          },
          {
            title: "What should clienteling software include?",
            body: "A full client profile fed by the POS and e-commerce, traced messaging on the channels clients actually use, appointments, a catalogue showing network stock, and attribution rules the house sets itself. It has to work on mobile, in seconds, and return something useful on the first tap.",
          },
          {
            title: "How do retailers measure clienteling?",
            body: "By tracing every action, setting an attribution window — seven, thirty or ninety days — and counting the sales that follow as influenced revenue, kept separate from walk-in sales and never added to them. Across equipped retailers, influenced revenue commonly represents 20 to 25 percent of the total.",
          },
          {
            title: "Do we need to replace our POS?",
            body: "No. Clienteling connects to the existing POS and e-commerce to retrieve purchases and let client data flow both ways. The POS keeps doing its job: taking payment, managing stock, feeding the accounts.",
          },
          {
            title: "How long before we see an effect?",
            body: "The first attributed sales appear as soon as actions are traced and the attribution window is set. A reliable trend takes one full purchase cycle for the sector, which is a season in fashion and considerably longer in jewellery.",
          },
        ],
      },
    ],
  },
};
