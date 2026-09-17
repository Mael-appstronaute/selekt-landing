import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import type { Locale } from "@/lib/routes";

/**
 * Page money — CRM retail. Slugs `/crm-retail` (FR) et `/en/retail-crm` (EN).
 *
 * Analyse SERP du 16/09 (`briefs/analyse-serp-retail-crm.md`) :
 * - FR `crm retail` 110/mois (pics à 390) ; `crm magasin` et `crm boutique` (10 chacun) sont le même
 *   cluster et deviennent secondaires. `crm boutique` ne doit PAS porter le title ni le H1 : sa SERP
 *   contient un pack local et 5 résultats e-commerce sur 10.
 * - EN `retail crm` 260 US / 50 UK, plus `crm in retail` et `crm for retail` (140 + 140, CPC 60,11 $).
 *   `retail crm software` (210) reste en H2 et FAQ, jamais en title : le format qui gagne dessus est
 *   le comparatif nominatif, que notre règle « aucun éditeur nommé » nous interdit.
 *
 * FRONTIÈRE AVEC LE PILIER (risque de cannibalisation n°1 du plan) :
 * le pilier explique une PRATIQUE à qui ne la connaît pas ; cette page répond à quelqu'un qui a déjà
 * un BUDGET LOGICIEL et se demande dans quelle catégorie ranger ce qu'il achète.
 * Interdits explicites ici : aucun H2 « vs / différence / ou », aucun tableau à deux colonnes
 * clienteling/CRM, aucune définition autonome du clienteling (elle appartient au pilier, qui reçoit
 * le lien), aucun bloc « critères de choix » (il existe déjà sur deux pages EN).
 * Angles libres retenus, mesurés sur 18 pages concurrentes : le tableau à TROIS colonnes qui range
 * les familles d'outils (0 page FR sur 7 le fait), « ce qu'un CRM retail ne fait pas » (1/18),
 * la mesure (0/18), le fichier client tenu proprement (1/18), et le vendeur (absent de 5 pages FR sur 9).
 */
export const CRM_RETAIL: Record<Locale, FeaturePageContent> = {
  fr: {
    meta: {
      title: "CRM retail pour réseaux de magasins",
      description:
        "CRM retail pour réseaux de magasins : fiche client nourrie par la caisse, portefeuilles vendeurs, relances tracées et ventes influencées mesurées.",
    },
    hero: {
      kicker: "CRM retail",
      title: "Le CRM retail des réseaux de *boutiques physiques*.",
      lede: "La plupart des CRM sont pensés pour des équipes commerciales assises devant un ordinateur. Un réseau de magasins a d'autres contraintes : la vente part d'un passage en caisse, elle se joue en quelques minutes, et le client revient parfois un an plus tard. Cette page explique ce qu'on appelle un CRM retail, ce qu'il fait, et ce qu'il ne fait pas.",
      demoLabel: "Demander une démo",
      bg: "waves",
      secondary: { label: "Le clienteling, expliqué simplement", key: "clienteling" },
    },
    sections: [
      {
        type: "list",
        kicker: "Définition",
        title: "CRM retail : *la définition*.",
        lede: "Un CRM retail est un logiciel qui réunit en une seule fiche ce qu'une enseigne sait de chaque client — achats en magasin et en ligne, préférences, échanges — et qui rend cette fiche utilisable là où le client se présente : en boutique.",
        items: [
          {
            title: "Ce que c'est",
            body: "Un référentiel client unique, alimenté par la caisse et le site, partagé entre les boutiques et le siège, et consultable par la personne qui accueille le client.",
          },
          {
            title: "Ce que ce n'est pas",
            body: "Ni un logiciel de caisse, ni un outil de campagnes. Il ne vend rien, il n'encaisse rien : il tient la mémoire de la relation et la rend exploitable.",
          },
          {
            title: "D'où vient la confusion",
            body: "Le mot CRM désigne trois familles d'outils très différentes dans le commerce de détail. C'est l'objet de la section suivante, et la raison pour laquelle deux enseignes qui disent avoir un CRM n'ont souvent rien en commun.",
          },
          {
            title: "À qui ça sert",
            body: "Au vendeur, d'abord, parce qu'il a le client en face de lui. Au manager, pour répartir et suivre. Au siège, pour disposer d'une base cohérente et de chiffres réconciliables.",
          },
        ],
      },
      {
        type: "table",
        tone: "cream",
        kicker: "Trois outils, un seul mot",
        title: "Ce qu'on appelle *CRM* dans le retail.",
        lede: "Avant de comparer des offres, il faut savoir laquelle de ces trois familles on cherche. Beaucoup de projets échouent parce que la maison en attendait une et en a acheté une autre.",
        columns: ["", "CRM marketing", "Fichier client de la caisse", "Outil de clienteling"],
        // -1 volontaire : le gabarit remplace le libellé de la colonne « highlight » par « Selekt ».
        // Ici on range des familles d'outils, on ne met pas Selekt en avant — cf. briefs/analyse-serp-retail-crm.md §5.3.
        highlight: -1,
        rows: [
          { label: "Qui s'en sert", cells: ["Le marketing, le siège", "La caisse, l'administration des ventes", "Le vendeur, en boutique"] },
          { label: "Unité de travail", cells: ["Un segment, une campagne", "Une transaction", "Un client, une conversation"] },
          { label: "Ce qu'il sait du client", cells: ["Ses réactions aux envois", "Ses achats", "Ses achats, ses préférences, ce qui a été dit"] },
          { label: "Ce qu'il ignore", cells: ["Ce qui s'est dit en boutique", "Tout ce qui n'est pas un ticket", "Rien de ce qui précède, s'il est raccordé"] },
          { label: "Ce qu'il mesure", cells: ["Taux d'ouverture et de clic", "Chiffre d'affaires par magasin", "Ventes rattachées aux actions"] },
        ],
        note: "Les trois cohabitent très bien. Ce qui ne fonctionne pas, c'est d'attendre de l'un ce que seul un autre sait faire.",
      },
      {
        type: "rows",
        tone: "paper",
        kicker: "Les limites",
        title: "Ce qu'un CRM retail *ne fait pas*.",
        lede: "Presque personne ne l'écrit, et c'est pourtant ce qui évite les déceptions en comité de direction.",
        rows: [
          {
            title: "Il n'encaisse pas",
            body: "La caisse reste la caisse : paiement, stock, comptabilité, obligations réglementaires. Un CRM retail se branche dessus, il ne la remplace jamais.",
          },
          {
            title: "Il ne gère pas le stock",
            body: "Il peut afficher la disponibilité d'une pièce dans le réseau, parce que c'est utile au vendeur. Il ne pilote ni les commandes, ni le réassort, ni l'inventaire.",
          },
          {
            title: "Il ne remplace pas le vendeur",
            body: "Il lui donne de la mémoire et du temps. Une maison dont les équipes n'ont ni le temps ni le mandat de rappeler leurs clients n'obtiendra rien d'un logiciel.",
          },
          {
            title: "Il ne prouve rien tout seul",
            body: "Sans règle d'attribution écrite et sans remontée des ventes, il produit des tableaux de bord d'activité. Utile, mais ce n'est pas une preuve de rentabilité.",
          },
        ],
      },
      {
        type: "split",
        photo: "rueCommercante",
        alt: "Rue commerçante européenne étroite, façades anciennes",
        kicker: "En boutique",
        title: "Ce que ça change *pour le vendeur*.",
        body: "C'est le grand absent des pages qui traitent du sujet : cinq pages françaises sur neuf ne prononcent jamais le mot vendeur. Or c'est la seule personne qui utilisera l'outil tous les jours.",
        points: [
          "Il reconnaît un client qu'il n'a jamais servi, et le sert comme s'il le connaissait",
          "Il sait ce qui a été dit la dernière fois, et par qui",
          "Il voit ses clients à rappeler du jour, avec une raison pour chacun",
          "Il ne ressaisit rien : ce que la caisse enregistre arrive dans la fiche",
        ],
      },
      {
        type: "list",
        kicker: "Le réseau",
        title: "Un client, *plusieurs boutiques*.",
        lede: "Dès deux points de vente, le même client est servi à deux endroits sans que personne ne le sache. C'est le problème que le CRM retail résout en premier, et il est de nature organisationnelle avant d'être technique.",
        items: [
          // Item recentré le 16/09 : il portait « Un référentiel client unique » et développait la
          // réconciliation d'identité. Cette tête appartient désormais à `/referentiel-client-unique`
          // (brief analyse-serp-referentiel-client-unique.md §5.2). Ici on pose le constat et on renvoie
          // par la carte « Un seul client, une seule fiche » de la section « Votre environnement ».
          {
            title: "Le même client, vu à deux endroits",
            body: "Sans fiche commune, deux boutiques suivent la même personne sans le savoir, et les chiffres du réseau comptent deux clients là où il n'y en a qu'un. C'est le préalable à tout le reste, et il se traite à part.",
          },
          {
            title: "Des portefeuilles attribués et visibles",
            body: "Qui suit qui. Un client sans responsable désigné est un client que personne ne rappelle ; un client suivi par deux vendeurs reçoit deux messages contradictoires.",
          },
          {
            title: "Le départ d'un vendeur",
            body: "Son portefeuille se réattribue avec son historique. La maison garde la relation qu'elle a financée, et le client n'est pas accueilli comme un inconnu.",
          },
          {
            title: "Les mêmes règles partout",
            body: "Une fenêtre d'attribution, des canaux inclus, une définition du client actif. Des variantes locales rendent les chiffres du réseau incomparables entre eux.",
          },
        ],
      },
      {
        type: "rows",
        tone: "cream",
        kicker: "La preuve",
        title: "Une vente *comptée une fois*.",
        lede: "Aucune des dix-huit pages concurrentes que nous avons analysées ne décrit ce protocole. C'est pourtant la seule façon de répondre à la question que pose la direction : qu'est-ce que ça rapporte ?",
        variant: "timeline",
        rows: [
          {
            title: "Tracer l'action",
            body: "Message, rendez-vous, relance : l'action est datée et rattachée à la personne qui l'a faite. Sans cette trace, rien ne pourra être mesuré ensuite.",
          },
          {
            title: "Fixer la fenêtre",
            body: "Sept, trente ou quatre-vingt-dix jours entre le contact et la vente. C'est une décision de l'enseigne, écrite, pas un réglage caché dans un logiciel.",
          },
          {
            title: "Attribuer la vente",
            body: "La vente survenue dans la fenêtre rejoint les revenus influencés. Ils restent distincts des ventes directes et ne s'y additionnent jamais : une vente comptée deux fois discrédite toute la mesure.",
          },
          {
            title: "Réconcilier",
            body: "Magasin par magasin, ligne par ligne, avec la caisse. Chez des retailers équipés, les revenus influencés représentent couramment 20 à 25 % du total.",
          },
        ],
      },
      {
        type: "list",
        kicker: "Les données",
        title: "Le fichier client, *tenu proprement*.",
        lede: "Un fichier client de réseau est un actif, et un risque. Une seule page sur dix-huit aborde le sujet, alors que c'est la première question que pose une direction juridique.",
        items: [
          {
            title: "Le consentement, recueilli et daté",
            body: "Qui a accepté d'être contacté, sur quel canal, et quand. Le consentement fait partie de la fiche client, pas d'un tableur conservé à côté.",
          },
          {
            title: "Les droits d'accès et d'effacement",
            body: "Une demande de suppression doit pouvoir être exécutée sur l'ensemble des boutiques et des canaux, pas seulement là où le client s'est manifesté.",
          },
          {
            title: "Des permissions au niveau du champ",
            body: "Un vendeur voit ses clients, un manager sa boutique, le siège le réseau. Les champs sensibles se restreignent davantage, par rôle et par magasin.",
          },
          {
            title: "Un journal d'audit",
            body: "Qui a lu quoi, qui a modifié quoi, quand. Il protège la maison, et il tranche les discussions internes bien mieux qu'une conversation.",
          },
        ],
      },
      {
        type: "cards",
        tone: "paper",
        kicker: "Votre environnement",
        title: "Connecté à *ce que vous avez déjà*.",
        lede: "Un CRM retail n'a d'intérêt que raccordé : sans remontée des achats, il reste un carnet d'adresses.",
        cols: 3,
        cards: [
          {
            kicker: "Caisse et e-commerce",
            title: "Les achats remontent tout seuls",
            body: "Selekt se connecte aux logiciels de caisse et aux plateformes e-commerce en place. L'historique alimente la fiche client, et les ventes redeviennent rattachables au travail de relation.",
            key: "integrations",
            cta: "Toutes les intégrations",
          },
          {
            kicker: "Par métier",
            title: "Les réseaux à visites rares",
            body: "Bijouterie, horlogerie, joaillerie : plus la visite est espacée et le panier élevé, plus le fichier client vaut cher par rapport au passage.",
            key: "jewelry",
            cta: "Le clienteling en bijouterie",
          },
          // Carte substituée le 16/09 (elle pointait vers `hq`, déjà atteignable depuis le menu) :
          // la nouvelle page a besoin de liens entrants, et c'est le sujet retiré de la section 5.
          {
            kicker: "L'identité du client",
            title: "Un seul client, une seule fiche",
            body: "Avant de suivre une relation, il faut savoir qu'il s'agit bien de la même personne. Doublons, rapprochements, arbitrage des cas douteux : c'est le travail du référentiel client unique, sur lequel tout le reste s'appuie.",
            key: "customerRecord",
            cta: "Le référentiel client unique",
          },
        ],
      },
      {
        type: "rows",
        tone: "cream",
        kicker: "Questions fréquentes",
        title: "Ce qu'on nous demande *le plus souvent*.",
        rows: [
          {
            title: "Qu'est-ce qu'un CRM retail ?",
            body: "Un CRM retail est un logiciel qui réunit en une seule fiche ce qu'une enseigne sait de chaque client : achats en magasin et en ligne, préférences, échanges. Il se distingue d'un CRM d'entreprise par son point de départ : la transaction en point de vente, et non l'opportunité commerciale.",
          },
          {
            title: "Quelle différence entre un CRM retail et le fichier client de ma caisse ?",
            body: "La caisse enregistre des transactions et rattache un nom à un ticket. Un CRM retail part de ces données, les réconcilie entre boutiques et canaux, puis les rend exploitables : savoir qui relancer, pourquoi, et ce qui a déjà été dit. La caisse garde son métier ; le CRM lui ajoute la mémoire de la relation.",
          },
          {
            title: "Un CRM retail convient-il à un réseau de quelques boutiques ?",
            body: "Oui, et c'est souvent là qu'il change le plus de choses. Dès deux boutiques, le même client est vu à deux endroits sans que personne ne le sache. Le sujet n'est pas la taille du réseau, c'est le panier moyen et la rareté des visites : plus la visite est rare, plus le fichier vaut cher.",
          },
          {
            title: "Faut-il changer de logiciel de caisse pour installer un CRM retail ?",
            body: "Non. Le CRM se branche sur la caisse et le e-commerce en place pour récupérer les achats et faire circuler la donnée client dans les deux sens. La caisse continue d'encaisser, de gérer le stock et d'alimenter la comptabilité. Aucune migration de caisse n'est nécessaire.",
          },
          {
            title: "Comment savoir si un CRM retail rapporte quelque chose ?",
            body: "En traçant chaque action faite vers un client, en fixant une fenêtre d'attribution — sept, trente ou quatre-vingt-dix jours — et en comptant les ventes qui suivent comme des revenus influencés, tenus séparés des ventes directes et jamais additionnés. Chez des retailers équipés, ces revenus influencés représentent couramment 20 à 25 % du total.",
          },
          {
            title: "Que devient le fichier client au regard du RGPD ?",
            body: "Il reste sous la responsabilité de l'enseigne : recueil du consentement, droit d'accès et d'effacement, permissions au niveau du champ, journal des accès. Un fichier tenu proprement n'est pas une contrainte administrative : c'est ce qui rend une relance légitime aux yeux du client comme du régulateur.",
          },
        ],
      },
    ],
  },

  en: {
    meta: {
      title: "Retail CRM software for store networks",
      description:
        "What a retail CRM is, the three tools that name covers, and what changes when your stores are physical: one client record, influenced revenue.",
    },
    hero: {
      kicker: "Retail CRM",
      title: "Retail CRM, for *networks of physical stores*.",
      lede: "Most CRMs are designed for sales teams sitting at a desk. A store network works differently: the sale starts at the till, it plays out in a few minutes, and the client sometimes returns a year later. This page explains what a retail CRM is, what it does, and what it does not do.",
      demoLabel: "Request a demo",
      bg: "waves",
      secondary: { label: "Clienteling, plainly explained", key: "clienteling" },
    },
    sections: [
      {
        type: "list",
        kicker: "Definition",
        title: "What a retail CRM *actually is*.",
        lede: "A retail CRM brings everything a brand knows about a client into one record — purchases in store and online, preferences, past conversations — and makes that record usable where the client actually shows up: on the shop floor.",
        items: [
          {
            title: "What it is",
            body: "A single client record, fed by the point of sale and the website, shared between stores and headquarters, and readable by the person greeting the client.",
          },
          {
            title: "What it is not",
            body: "Neither a point-of-sale system nor a campaign tool. It sells nothing and takes no payment: it holds the memory of the relationship and makes it usable.",
          },
          {
            title: "Where the confusion comes from",
            body: "In retail, the word CRM covers three very different families of software. That is the next section, and the reason two brands that both say they have a CRM often have nothing in common.",
          },
          {
            title: "Who it serves",
            body: "The advisor first, because the client is standing in front of them. The manager, to share out and follow up. Headquarters, for a coherent base and figures that reconcile.",
          },
        ],
      },
      {
        type: "table",
        tone: "cream",
        kicker: "One word, three tools",
        title: "The three tools *called CRM* in retail.",
        lede: "Before comparing offers, you need to know which of the three families you are looking for. Many projects fail because the house expected one and bought another.",
        columns: ["", "Marketing CRM", "POS customer file", "Clienteling tool"],
        // -1 deliberately: the template swaps the highlighted column label for « Selekt ».
        highlight: -1,
        rows: [
          { label: "Who uses it", cells: ["Marketing, headquarters", "The till, sales administration", "The advisor, on the shop floor"] },
          { label: "Unit of work", cells: ["A segment, a campaign", "A transaction", "A client, a conversation"] },
          { label: "What it knows", cells: ["How clients react to sends", "What they bought", "Purchases, preferences, what was said"] },
          { label: "What it misses", cells: ["Everything said in store", "Anything that is not a receipt", "Nothing of the above, once connected"] },
          { label: "What it measures", cells: ["Open and click rates", "Revenue per store", "Sales attributed to actions"] },
        ],
        note: "All three coexist well. What does not work is expecting from one what only another can do.",
      },
      {
        type: "rows",
        tone: "paper",
        kicker: "Boundaries",
        title: "What a retail CRM *does not do*.",
        lede: "Almost nobody writes this down, and it is what prevents disappointment at board level.",
        rows: [
          {
            title: "It does not take payment",
            body: "The POS stays the POS: payment, stock, accounting, regulatory duties. A retail CRM connects to it and never replaces it.",
          },
          {
            title: "It does not manage stock",
            body: "It can show whether a piece is available elsewhere in the network, because that helps the advisor. It does not run ordering, replenishment or inventory.",
          },
          {
            title: "It does not replace the advisor",
            body: "It gives them memory and time. A house whose teams have neither the time nor the mandate to contact their clients will get nothing from software.",
          },
          {
            title: "It proves nothing on its own",
            body: "Without a written attribution rule and sales flowing back from the POS, it produces activity dashboards. Useful, but not evidence of return.",
          },
        ],
      },
      {
        type: "split",
        photo: "rueCommercante",
        alt: "Narrow European shopping street with period façades",
        kicker: "On the floor",
        title: "What changes *for the advisor*.",
        body: "This is what the pages on the subject leave out, and the advisor is the only person who will use the tool every single day.",
        points: [
          "They recognise a client they have never served, and serve them as if they knew them",
          "They know what was said last time, and by whom",
          "They see the day's clients to contact, each with a reason",
          "They retype nothing: what the till records lands in the client record",
        ],
      },
      {
        type: "list",
        kicker: "Across a network",
        title: "One client, *several stores*.",
        lede: "From two stores onward, the same client is served in two places with nobody aware of it. That is the first problem a retail CRM solves, and it is organisational before it is technical.",
        items: [
          {
            title: "A single client record",
            body: "One record per person, whichever store they buy in and whichever channel they use. Without that reconciliation, everything downstream is wrong.",
          },
          {
            title: "Assigned, visible client books",
            body: "Who follows whom. A client with no named owner is a client nobody contacts; a client followed by two advisors receives two contradictory messages.",
          },
          {
            title: "When an advisor leaves",
            body: "Their book is reassigned with its history. The house keeps the relationship it paid for, and the client is not greeted as a stranger.",
          },
          {
            title: "The same rules everywhere",
            body: "One attribution window, one set of included channels, one definition of an active client. Local variants make network figures impossible to compare.",
          },
        ],
      },
      {
        type: "rows",
        tone: "cream",
        kicker: "The proof",
        title: "A sale counted *once*.",
        lede: "None of the eighteen competing pages we analysed describes this protocol. It is the only way to answer the question leadership actually asks: what does it return?",
        variant: "timeline",
        rows: [
          {
            title: "Trace the action",
            body: "Message, appointment, follow-up: timestamped and attributed to the person who made it. Without that trace, nothing can be measured later.",
          },
          {
            title: "Set the window",
            body: "Seven, thirty or ninety days between contact and sale. It is the brand's decision, written down, not a setting hidden in a tool.",
          },
          {
            title: "Attribute the sale",
            body: "A sale within the window joins influenced revenue. It stays separate from walk-in sales and is never added to them: a sale counted twice discredits the whole measure.",
          },
          {
            title: "Reconcile",
            body: "Store by store, line by line, against the POS. Across equipped retailers, influenced revenue commonly represents 20 to 25 percent of total revenue.",
          },
        ],
      },
      {
        type: "list",
        kicker: "The data",
        title: "A client file *kept properly*.",
        lede: "A network's client file is an asset and a liability. One page out of eighteen covers this, although it is the first question a legal department asks.",
        items: [
          {
            title: "Consent, collected and dated",
            body: "Who agreed to be contacted, on which channel, and when. Consent belongs in the client record, not in a spreadsheet kept beside it.",
          },
          {
            title: "Access and erasure rights",
            body: "A deletion request has to be executable across every store and channel, not only where the client happened to ask.",
          },
          {
            title: "Field-level permissions",
            body: "An advisor sees their clients, a manager their store, headquarters the network. Sensitive fields are restricted further, by role and by store.",
          },
          {
            title: "An audit log",
            body: "Who read what, who changed what, when. It protects the house, and it settles internal debates far better than a conversation does.",
          },
        ],
      },
      {
        type: "cards",
        tone: "paper",
        kicker: "Your stack",
        title: "Connected to *what you already run*.",
        lede: "A retail CRM is only worth something once connected: without purchases flowing in, it is an address book.",
        cols: 3,
        cards: [
          {
            kicker: "POS and e-commerce",
            title: "Purchases arrive on their own",
            body: "Selekt connects to the point-of-sale and e-commerce platforms already in place. History feeds the client record, and sales become attributable to relationship work again.",
            key: "integrations",
            cta: "All integrations",
          },
          {
            kicker: "By sector",
            title: "Networks with infrequent visits",
            body: "Jewellery and watches: the rarer the visit and the higher the basket, the more the client file is worth compared with footfall.",
            key: "jewelry",
            cta: "Clienteling for jewelers",
          },
          {
            kicker: "Headquarters",
            title: "The same figures at every level",
            body: "Network analytics, a unified client base, shared rules: what leadership reads has to be what the store sees, or nobody trusts it.",
            key: "hq",
            cta: "The network view, unified",
          },
        ],
      },
      {
        type: "rows",
        tone: "cream",
        kicker: "Frequently asked",
        title: "Frequently asked *questions*.",
        rows: [
          {
            title: "What is a CRM system in retail?",
            body: "A retail CRM brings everything a brand knows about a client into one record: purchases in store and online, preferences, past conversations. It differs from a business CRM in where it starts. A business CRM starts from a sales opportunity; a retail CRM starts from a transaction at the till.",
          },
          {
            title: "How is a retail CRM different from the customer file in our POS?",
            body: "A POS records transactions and attaches a name to a receipt. A retail CRM takes that data, reconciles it across stores and channels, then makes it usable: who to reach out to, why, and what was already said. The POS keeps its job; the CRM adds the memory of the relationship.",
          },
          {
            title: "Do we need a retail CRM with only a handful of stores?",
            body: "Yes, and that is often where it changes the most. From two stores onward, the same client is served in two places with nobody aware of it. The question is not the size of the network but basket value and visit frequency: the rarer the visit, the more the client file is worth.",
          },
          {
            title: "Do we have to replace our POS?",
            body: "No. A retail CRM connects to the point of sale and e-commerce already in place, retrieving purchases and letting client data flow both ways. The POS carries on taking payment, managing stock and feeding the accounts. No till migration is required.",
          },
          {
            title: "How do you measure what a retail CRM returns?",
            body: "By tracing every action taken towards a client, setting an attribution window — seven, thirty or ninety days — and counting the sales that follow as influenced revenue, kept separate from walk-in sales and never added to them. Across equipped retailers, influenced revenue commonly represents 20 to 25 percent of the total.",
          },
          {
            title: "Where does the client file stand under GDPR?",
            body: "It stays the brand's responsibility: consent collected, rights of access and erasure honoured, permissions set at field level, an audit log of who read what. A file kept properly is not administrative overhead; it is what makes an outreach legitimate to the client and to the regulator.",
          },
        ],
      },
    ],
  },
};
