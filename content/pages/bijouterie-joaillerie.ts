import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import type { Locale } from "@/lib/routes";

/**
 * Page secteur — bijouterie, horlogerie, joaillerie (HBJO).
 * Slug FR `/secteurs/bijouterie-joaillerie`. Version EN à produire ensuite
 * (`/en/industries/jewelry-watches`, cible « jewelry store software », CPC 72 $).
 *
 * Fondée sur l'analyse SERP du 16/09 (BRAIN `seo-pages/briefs/analyse-serp-fr-bijouterie.md`) :
 * les 9 pages qui se classent décrivent le stock, la caisse et la conformité. Recherche de
 * chaînes sur ces 9 pages : « relance » 0/9, « portefeuille client » 0/9, « CA influencé » 0/9.
 * Toute la SERP s'arrête à l'encaissement — on prend la moitié aval : portefeuille, relance,
 * SAV comme motif de contact, et mesure des revenus influencés. Jamais contre le logiciel de
 * gestion, toujours au-dessus.
 *
 * Règles : aucun concurrent nommé ; Odeis/Bijou3 jamais critiqués (cités comme environnements
 * connectés, confirmation Antoine du 16/09) ; « 20 à 25 % de revenus influencés, constaté chez
 * des retailers équipés », jamais « +X % de CA » ; aucun prix, aucune date de pilote.
 */
export const JEWELRY: Record<Locale, FeaturePageContent> = {
  fr: {
    modified: "2026-09-16",
    meta: {
      title: "CRM bijouterie et joaillerie",
      description:
        "Portefeuille par vendeuse, relances au bon moment, SAV suivi, revenus influencés mesurés : le clienteling des bijouteries, au-dessus de votre caisse.",
    },
    hero: {
      kicker: "Bijouterie · Horlogerie · Joaillerie",
      title: "Le client revient dans trois ans. *Quelqu'un doit s'en souvenir.*",
      lede: "En HBJO, la visite est rare et le panier élevé : tout se joue entre deux passages. Selekt se pose au-dessus de votre logiciel de gestion pour répartir les portefeuilles, relancer au bon moment et mesurer ce que la relation rapporte, boutique par boutique.",
      demoLabel: "Demander une démo",
      bg: "waves",
      secondary: { label: "Le clienteling, expliqué simplement", key: "clienteling" },
    },
    sections: [
      {
        type: "list",
        kicker: "Le point de départ",
        title: "La relation client tient dans la *mémoire des vendeuses*.",
        lede: "Dans la plupart des bijouteries, la connaissance client existe : elle est réelle, précise, parfois remarquable. Mais elle vit dans des têtes et dans des carnets, et elle ne couvre qu'une poignée de clients.",
        items: [
          {
            title: "Le carnet personnel",
            body: "Chaque vendeuse a le sien : tailles, préférences, dates. Il fonctionne très bien, pour elle, tant qu'elle est là et tant qu'elle s'en souvient.",
          },
          {
            title: "La vendeuse qui part",
            body: "Le jour où elle s'en va, la maison perd le lien avec ses meilleurs clients. Ils reviennent, ne sont pas reconnus, et repartent avec le sentiment d'être devenus anonymes.",
          },
          {
            title: "Vingt à trente clients suivis",
            body: "C'est ce qu'une vendeuse peut tenir de mémoire. Au-delà, le reste du fichier dort : il a acheté une fois, personne ne l'a jamais rappelé.",
          },
          {
            title: "Le fichier complet",
            body: "Il est déjà dans votre logiciel de gestion, avec les achats et les dates. Il ne manque pas de données : il manque quelqu'un dont c'est le travail de s'en servir.",
          },
        ],
      },
      {
        type: "cards",
        tone: "cream",
        kicker: "Le temps long",
        title: "Un cycle d'achat long : les occasions *ne repassent pas*.",
        lede: "En bijouterie, on n'achète pas parce qu'on passait devant. On achète pour une raison, à une date, et cette date est souvent connue à l'avance.",
        cols: 3,
        cards: [
          {
            kicker: "Les étapes de vie",
            title: "Fiançailles, mariage, naissance",
            body: "Un client qui a acheté une bague de fiançailles a une alliance à acheter dans l'année, puis un anniversaire de mariage tous les ans. Ces rendez-vous se manquent une seule fois.",
          },
          {
            kicker: "Les marronniers",
            title: "Saint-Valentin, fête des mères, Noël",
            body: "Tout le monde les connaît, presque personne ne les prépare client par client. La différence se joue trois semaines avant, sur une sélection qui correspond vraiment à la personne.",
          },
          {
            kicker: "Les dates du client",
            title: "Son anniversaire, son dernier achat",
            body: "La date la plus rentable est souvent celle d'un achat marquant. Un an après, un message signé de la vendeuse qui l'a servi vaut mieux que n'importe quelle campagne.",
          },
        ],
      },
      {
        type: "table",
        tone: "cream",
        kicker: "Complémentarité",
        title: "Ce que votre logiciel fait déjà, *ce que Selekt ajoute*.",
        lede: "Selekt ne remplace pas votre logiciel de gestion HBJO. Il s'appuie dessus : sans lui, pas d'historique d'achat, donc pas de relation à travailler ni de revenus à mesurer.",
        columns: ["", "Votre logiciel de gestion", "Selekt"],
        highlight: 2,
        rows: [
          { label: "Stock, pièces, inventaire", cells: [true, false] },
          { label: "Encaissement et comptabilité", cells: [true, false] },
          { label: "Livre de police et fiscalité HBJO", cells: [true, false] },
          { label: "Fiche client et historique d'achat", cells: [true, "reprise et enrichie"] },
          { label: "Portefeuille réparti par vendeuse", cells: [false, true] },
          { label: "Relances tracées et préparées", cells: [false, true] },
          { label: "Revenus influencés, mesurés par boutique", cells: [false, true] },
        ],
        note: "Votre logiciel tient la boutique. Selekt fait revenir le client, et prouve ce que ça rapporte.",
      },
      {
        type: "split",
        photo: "sertissage",
        alt: "Mains sertissant une bague à l'établi",
        kicker: "Le portefeuille",
        title: "Répartir les clients *entre les vendeuses*.",
        body: "Un fichier que tout le monde peut voir et que personne ne suit ne produit rien. Le portefeuille donne un nom en face de chaque client : quelqu'un dont c'est le travail de le connaître et de le rappeler.",
        points: [
          "La répartition se pose selon vos règles : qui a vendu, qui connaît, qui est disponible",
          "Un client servi par plusieurs vendeuses reste visible par toutes, avec un responsable désigné",
          "Au départ d'une vendeuse, son portefeuille se réattribue avec tout son historique",
          "Le manager voit qui a été contacté, quand, et qui n'a été rappelé par personne",
        ],
      },
      {
        type: "list",
        kicker: "Les détails",
        title: "Ce qui fait revenir un client, *ce sont les détails*.",
        lede: "En HBJO, ce ne sont pas des préférences vagues : ce sont des informations précises, que le client ne redonnera pas deux fois et qu'il s'attend à ce qu'on ait retenues.",
        items: [
          {
            title: "Les mesures",
            body: "Taille de bague, tour de poignet, tour de cou, longueur de chaîne. La donnée qui transforme un « je regarde » en vente, parce qu'on sait déjà que la pièce ira.",
          },
          {
            title: "Les matières et les contraintes",
            body: "Or jaune ou gris, allergies au nickel, pierres préférées, gravures déjà réalisées. Ce sont les critères qui font qu'une sélection est juste, ou qu'elle tombe à côté.",
          },
          {
            title: "La pièce vue en vitrine",
            body: "Une pièce unique ou une série limitée regardée sans être achetée : notée, elle devient une raison de rappeler avant qu'elle parte.",
          },
          {
            title: "Les confiés et le dépôt-vente",
            body: "Une pièce confiée, une réservation, une commande spéciale : chacune a une échéance, et chaque échéance est un contact légitime.",
          },
          {
            title: "Le budget et l'occasion à venir",
            body: "Ce que le client s'apprête à préparer — un anniversaire, un cadeau — dit quoi lui proposer, et surtout quand.",
          },
        ],
      },
      {
        type: "rows",
        tone: "paper",
        kicker: "Le service",
        title: "SAV, réparation, révision : *une date connue d'avance*.",
        lede: "L'atelier est traité partout comme un flux logistique. C'est pourtant la source de contacts la plus naturelle du métier : le client attend déjà de vos nouvelles.",
        variant: "timeline",
        rows: [
          {
            title: "La réparation prête",
            body: "Un message dès qu'elle revient de l'atelier, avec le nom de la vendeuse qui l'a prise en charge. Le client revient en boutique, et la visite est une occasion de plus.",
          },
          {
            title: "La révision à échéance",
            body: "Une montre mécanique se révise à intervalle connu. Prévenir avant l'échéance, c'est rendre service ; attendre la panne, c'est laisser le client aller ailleurs.",
          },
          {
            title: "La garantie qui arrive à terme",
            body: "Quelques semaines avant la fin, un contrôle proposé vaut mieux qu'un courrier générique. C'est le moment où l'on reparle d'entretien et d'accessoires.",
          },
          {
            title: "La commande spéciale et la liste d'attente",
            body: "En horlogerie surtout, l'attente peut durer des mois. Un point d'étape régulier, même sans nouvelle, fait la différence entre un client patient et un client perdu.",
          },
        ],
      },
      {
        type: "cards",
        tone: "paper",
        kicker: "Les métiers",
        title: "Horlogerie et joaillerie : *d'autres rythmes*.",
        lede: "Les gestes se ressemblent, les moments changent.",
        cols: 2,
        cards: [
          {
            kicker: "Horlogerie",
            title: "Le temps de l'attente",
            body: "Révisions, garanties, listes d'attente sur les pièces recherchées, seconde main : le suivi se mesure en années, et le client juge une maison à sa capacité à tenir le fil.",
            key: "advisor",
            cta: "L'espace vendeur en boutique",
          },
          {
            kicker: "Joaillerie",
            title: "Le sur-mesure et la transformation",
            body: "Un projet de création, une pierre de famille à remonter, une estimation : des cycles longs, très personnels, où chaque échange doit être retrouvé des mois plus tard.",
            key: "integrations",
            cta: "Les intégrations de Selekt",
          },
        ],
      },
      {
        type: "split",
        photo: "comptoirBijoux",
        alt: "Comptoir de bijouterie, bagues sur présentoirs",
        kicker: "La relance",
        title: "Relancer *sans être intrusif*.",
        body: "La crainte est légitime : en bijouterie, un message de trop abîme la relation. La règle est simple — on ne contacte pas pour vendre, on contacte parce qu'il y a une raison.",
        points: [
          "Un motif réel : une pièce réservée, une révision, une date qui compte pour le client",
          "Le canal qu'il a choisi, et la fréquence que la maison s'est fixée",
          "Un message signé par sa vendeuse, dans le ton de la maison, jamais une promotion de masse",
          "Une validation humaine avant tout envoi, y compris quand le texte est préparé automatiquement",
        ],
        reverse: true,
      },
      {
        type: "loop",
        kicker: "La preuve",
        title: "Mesurer ce que la relation *rapporte*.",
        steps: [
          {
            title: "Tracer l'action",
            body: "Message, rendez-vous, relance : l'action est datée et rattachée à la vendeuse qui l'a faite.",
          },
          {
            title: "Fixer la fenêtre",
            body: "Sept, trente ou quatre-vingt-dix jours entre le contact et la vente. C'est vous qui décidez, et la règle est écrite.",
          },
          {
            title: "Attribuer la vente",
            body: "La vente survenue dans la fenêtre rejoint les revenus influencés. Ils restent distincts des ventes directes et ne s'y additionnent jamais.",
          },
          {
            title: "Réconcilier",
            body: "Boutique par boutique, ligne par ligne, les montants se rapprochent de la caisse. C'est ce qui rend le chiffre discutable en réunion plutôt que contestable.",
          },
        ],
      },
      {
        type: "stats",
        kicker: "Ordres de grandeur",
        title: "Ce que ça pèse, *honnêtement*.",
        stats: [
          { value: 25, suffix: " %", label: "des revenus influencés par le clienteling, constaté chez des retailers équipés (20 à 25 %)" },
          { value: 3, suffix: " rôles", label: "vendeuse, manager, siège : les mêmes chiffres, à leur niveau" },
          { value: 2, suffix: " min", label: "le temps réellement disponible entre deux clients" },
        ],
      },
      {
        type: "list",
        kicker: "Votre environnement",
        title: "Connecté à votre *logiciel de caisse*.",
        lede: "Selekt se branche sur les outils déjà en place dans les bijouteries : l'historique d'achat remonte, la fiche client devient lisible en boutique, et personne ne ressaisit rien.",
        items: [
          {
            title: "Les environnements HBJO",
            body: "Odeis Retail et Bijou3 pour les maisons équipées en gestion HBJO, Cegid, Retail Pro et Shopify POS pour les réseaux mixtes. Le raccordement se cale avec vous, boutique par boutique.",
          },
          {
            title: "Le site e-commerce",
            body: "Une commande passée en ligne rejoint la fiche du client suivi en boutique. La vendeuse cesse de découvrir après coup ce que sa cliente a acheté sur le site.",
          },
          {
            title: "Les messageries",
            body: "Les échanges partent du canal que le client utilise vraiment, et restent tracés au nom de la maison et de la vendeuse.",
          },
          {
            title: "Ce qui ne bouge pas",
            body: "Votre logiciel garde son métier : stock, encaissement, livre de police, fiscalité. Selekt ne duplique rien de tout cela et ne s'y substitue pas.",
          },
        ],
      },
      {
        type: "rows",
        tone: "cream",
        faq: true,
        kicker: "Questions fréquentes",
        title: "Ce que nous demandent *les bijoutiers*.",
        rows: [
          {
            title: "Selekt est-il compatible avec mon logiciel de caisse ?",
            body: "Selekt ne remplace pas votre logiciel de gestion : il se pose au-dessus pour récupérer les achats et rendre la fiche client lisible en boutique. Les environnements que nous rencontrons le plus souvent sont Odeis Retail, Bijou3, Cegid, Shopify POS et Retail Pro. Le raccordement se cale avec vous, boutique par boutique, lors de la démonstration.",
          },
          {
            title: "Et le livre de police ?",
            body: "Le livre de police reste tenu par votre logiciel de gestion, qui en a l'obligation réglementaire et le format. Selekt n'y touche pas, ne le duplique pas et ne s'y substitue pas. Il travaille sur la relation : historique d'achat, préférences, échanges et rendez-vous, sans interférer avec vos registres ni votre fiscalité HBJO.",
          },
          {
            title: "Mon fichier client est ancien et incomplet. Est-il utilisable ?",
            body: "Oui, et c'est le cas le plus courant. On part de ce qui existe : noms, achats, dates. Les fiches se complètent ensuite au fil des ventes, par la vendeuse, en quelques secondes. Un fichier imparfait mais vivant vaut mieux qu'une base parfaite que personne ne met à jour.",
          },
          {
            title: "Mes vendeuses n'ont pas de téléphone professionnel.",
            body: "C'est l'objection la plus fréquente, et elle est légitime. L'application s'utilise depuis un appareil de la boutique, tablette ou mobile, et les échanges y sont tracés au nom de la maison et de la vendeuse. Le paramétrage des canaux se règle à la mise en route, selon l'organisation de votre point de vente.",
          },
          {
            title: "Combien de temps une vendeuse doit-elle y consacrer ?",
            body: "Quelques minutes par jour. Le matin, la liste des clients à recontacter ; après une vente, deux ou trois informations ajoutées à la fiche. Si l'outil demande plus qu'il ne rend, il n'est pas utilisé : la contrepartie doit être immédiate, retrouver un client ou voir une pièce disponible dans le réseau.",
          },
          {
            title: "Comment savoir ce que la relation rapporte ?",
            body: "Chaque action est datée et rattachée à son auteur. Vous fixez une fenêtre d'attribution : sept, trente ou quatre-vingt-dix jours. Les ventes survenues dans cette fenêtre rejoignent les revenus influencés, tenus distincts des ventes directes et jamais additionnés. Chez des retailers équipés, on constate 20 à 25 % de revenus influencés.",
          },
          {
            title: "Est-ce que cela remplace ma carte de fidélité ?",
            body: "Non. Une carte récompense un volume d'achats ; le clienteling s'adresse à un client à la fois, avec une raison réelle de le contacter : une révision, une pièce réservée, un anniversaire de mariage. Les deux cohabitent. La carte gagne simplement à être exploitée par la vendeuse plutôt que subie.",
          },
        ],
      },
    ],
  },

  en: {
    modified: "2026-09-16",
    meta: {
      title: "Jewelry store CRM and clienteling",
      description:
        "Client books per advisor, timely follow-ups, repairs tracked, influenced revenue measured: clienteling for jewelers and watchmakers, above your POS.",
    },
    hero: {
      kicker: "Jewelry · Watches · Fine jewelry",
      title: "The client returns in three years. *Someone has to remember.*",
      lede: "In jewelry and watches, visits are rare and baskets are high: everything is decided between two visits. Selekt sits above your jewelry store software to share out client books, follow up at the right moment, and measure what the relationship produces, store by store.",
      demoLabel: "Request a demo",
      bg: "waves",
      secondary: { label: "Clienteling, plainly explained", key: "clienteling" },
    },
    sections: [
      {
        type: "list",
        kicker: "Where it starts",
        title: "The relationship lives in *the advisor's memory*.",
        lede: "In most jewelry stores the client knowledge is real, precise, sometimes remarkable. It simply lives in people's heads and notebooks, and it covers only a handful of clients.",
        items: [
          {
            title: "The personal notebook",
            body: "Every advisor keeps one: sizes, preferences, dates. It works very well, for them, as long as they are there and as long as they remember.",
          },
          {
            title: "When an advisor leaves",
            body: "The store loses touch with their best clients. Those clients come back, are not recognised, and leave with the feeling of having become anonymous.",
          },
          {
            title: "Twenty to thirty clients followed",
            body: "That is what one advisor can hold from memory. Beyond that the file sleeps: those clients bought once, and nobody ever reached out again.",
          },
          {
            title: "The full client file",
            body: "It already sits in your retail software, with purchases and dates. Data is not what is missing — someone whose actual job is to use it, is.",
          },
        ],
      },
      {
        type: "cards",
        tone: "cream",
        kicker: "The long cycle",
        title: "The occasions *do not come round again*.",
        lede: "Nobody buys a diamond because they were walking past. They buy for a reason, on a date — and that date is usually known in advance.",
        cols: 3,
        cards: [
          {
            kicker: "Life milestones",
            title: "Engagement, wedding, birth",
            body: "A client who bought an engagement ring has a wedding band to buy within the year, then an anniversary every year after that. These appointments are missed only once.",
          },
          {
            kicker: "The seasonal peaks",
            title: "Valentine's Day, Mother's Day, the holidays",
            body: "Everyone knows the dates; almost nobody prepares them client by client. The difference is made three weeks earlier, with a selection that actually fits the person.",
          },
          {
            kicker: "The client's own dates",
            title: "Their birthday, their last purchase",
            body: "The most profitable date is often the anniversary of a milestone purchase. A year later, a message signed by the advisor who served them beats any campaign.",
          },
        ],
      },
      {
        type: "table",
        tone: "cream",
        kicker: "Complementary",
        title: "What your software already does, *what Selekt adds*.",
        lede: "Selekt does not replace your jewelry store software. It relies on it: without purchase history there is no relationship to work on, and no revenue to measure.",
        columns: ["", "Your retail software", "Selekt"],
        highlight: 2,
        rows: [
          { label: "Stock, pieces, inventory", cells: [true, false] },
          { label: "Payment and accounting", cells: [true, false] },
          { label: "Regulatory registers and tax", cells: [true, false] },
          { label: "Client profile and purchase history", cells: [true, "picked up and enriched"] },
          { label: "Client books shared out per advisor", cells: [false, true] },
          { label: "Traced, prepared follow-ups", cells: [false, true] },
          { label: "Influenced revenue, measured per store", cells: [false, true] },
        ],
        note: "Your software runs the store. Selekt brings the client back, and proves what that produced.",
      },
      {
        type: "split",
        photo: "sertissage",
        alt: "Hands setting a stone into a ring at the bench",
        kicker: "The client book",
        title: "Sharing the client book *between advisors*.",
        body: "A file everyone can see and nobody follows produces nothing. A client book puts a name against each client: someone whose job it is to know them and to reach out.",
        points: [
          "Allocation follows your rules: who sold, who knows the client, who has capacity",
          "A client served by several advisors stays visible to all, with one person responsible",
          "When an advisor leaves, their book is reassigned with its full history",
          "The manager sees who was contacted, when, and who has been called by nobody",
        ],
      },
      {
        type: "list",
        kicker: "The details",
        title: "What brings a client back *is the detail*.",
        lede: "In jewelry these are not vague preferences. They are precise facts a client will not give twice, and expects you to have kept.",
        items: [
          {
            title: "The measurements",
            body: "Ring size, wrist size, neck size, chain length. The detail that turns browsing into a sale, because you already know the piece will fit.",
          },
          {
            title: "Metals and constraints",
            body: "Yellow or white gold, nickel allergies, preferred stones, engravings already done. These decide whether a selection lands or misses.",
          },
          {
            title: "The piece seen in the window",
            body: "A one-off or limited piece looked at but not bought: recorded, it becomes a reason to call before it goes.",
          },
          {
            title: "Consignment and reservations",
            body: "A piece on consignment, a reservation, a special order: each has a deadline, and every deadline is a legitimate reason to make contact.",
          },
          {
            title: "The budget and the occasion ahead",
            body: "What the client is quietly preparing — an anniversary, a gift — tells you what to show, and above all when.",
          },
        ],
      },
      {
        type: "rows",
        tone: "paper",
        kicker: "Service",
        title: "Repairs and servicing: *a date known in advance*.",
        lede: "Workshop flows are treated everywhere as logistics. They are in fact the most natural source of contact in the trade: the client is already expecting to hear from you.",
        variant: "timeline",
        rows: [
          {
            title: "The repair is ready",
            body: "A message as soon as it returns from the workshop, signed by the advisor who took it in. The client comes back to the store, and the visit becomes another occasion.",
          },
          {
            title: "Servicing due",
            body: "A mechanical watch is serviced at known intervals. Reaching out before the date is a service; waiting for a failure sends the client somewhere else.",
          },
          {
            title: "Warranty about to end",
            body: "A few weeks before expiry, an offered check-up beats a generic letter. It is the moment to talk about care, straps and accessories again.",
          },
          {
            title: "Special orders and waiting lists",
            body: "In watches especially, waiting can last months. A regular update, even with no news, separates a patient client from a lost one.",
          },
        ],
      },
      {
        type: "cards",
        tone: "paper",
        kicker: "The trades",
        title: "Watches and fine jewelry: *other rhythms*.",
        lede: "The gestures are alike; the moments differ.",
        cols: 2,
        cards: [
          {
            kicker: "Watches",
            title: "The time of waiting",
            body: "Servicing, warranties, waiting lists on sought-after references, pre-owned: follow-up is measured in years, and a house is judged on its ability to keep the thread.",
          },
          {
            kicker: "Fine jewelry",
            title: "Bespoke and transformation",
            body: "A commission, a family stone to reset, an appraisal: long, deeply personal cycles where every exchange has to be found again months later.",
          },
        ],
      },
      {
        type: "split",
        photo: "comptoirBijoux",
        alt: "Jewellery counter with rings on display stands",
        kicker: "Outreach",
        title: "Reaching out *without being intrusive*.",
        body: "The concern is legitimate: in jewelry, one message too many damages the relationship. The rule is simple — you do not make contact to sell, you make contact because there is a reason.",
        points: [
          "A real reason: a piece reserved, a service due, a date that matters to the client",
          "The channel they chose, at the frequency the house has set for itself",
          "A message signed by their advisor, in the house's tone, never a mass promotion",
          "Human approval before anything is sent, including when the draft was prepared automatically",
        ],
        reverse: true,
      },
      {
        type: "loop",
        kicker: "The proof",
        title: "Measuring what the relationship *produces*.",
        steps: [
          {
            title: "Trace the action",
            body: "Message, appointment, follow-up: timestamped and attributed to the advisor who made it.",
          },
          {
            title: "Set the window",
            body: "Seven, thirty or ninety days between contact and sale. You decide, and the rule is written down rather than hidden in a setting.",
          },
          {
            title: "Attribute the sale",
            body: "A sale within the window joins influenced revenue. It stays separate from walk-in sales and is never added to them.",
          },
          {
            title: "Reconcile",
            body: "Store by store, line by line, the amounts match the POS. Across equipped retailers, influenced revenue commonly represents 20 to 25 percent of total revenue.",
          },
        ],
      },
      {
        type: "cards",
        tone: "cream",
        kicker: "Choosing a tool",
        title: "What jewelry store software *should include*.",
        lede: "Criteria rather than brands. Most jewelers already own retail software; the question is what has to sit next to it for clients to come back.",
        cols: 3,
        cards: [
          {
            kicker: "The client",
            title: "A profile fed by the POS",
            body: "Purchases, sizes, metals, engravings and past conversations in one place, updated without anyone retyping. A profile filled in by hand stays empty.",
          },
          {
            kicker: "The book",
            title: "Named client books",
            body: "Each client belongs to someone. Without that, the top clients are followed twice and the rest are never called at all.",
          },
          {
            kicker: "The calendar",
            title: "Dates that come back",
            body: "Anniversaries, servicing due, warranties ending, reservations: the tool has to surface the day's reasons to reach out, not wait to be asked.",
          },
          {
            kicker: "The proof",
            title: "Attribution rules you set",
            body: "A window, included channels, and a clear separation between direct and influenced revenue. If the vendor sets the rules, the figures will be argued about.",
            key: "influencedRevenue",
            cta: "How influenced revenue is attributed",
          },
          {
            kicker: "The floor",
            title: "Mobile, in seconds",
            body: "An advisor has two minutes between clients. A tool that takes longer than the service it renders will not be used, whatever the training plan says.",
          },
          {
            kicker: "The house",
            title: "Configuration without a developer",
            body: "Fields, roles, message templates and appointment types change from one house to the next. Every change that needs a project is a change that will not happen.",
            key: "integrations",
            cta: "See the integrations",
          },
        ],
      },
      {
        type: "list",
        kicker: "Your systems",
        title: "It works with *the software you already run*.",
        lede: "Selekt connects to the retail systems in place in jewelry stores — and to the others: integration is not a limitation on our side, it is a step in the deployment.",
        items: [
          {
            title: "Your point of sale and retail management",
            body: "Purchase history flows in, so the client profile is readable on the floor and influenced revenue reconciles with the till. Your software keeps stock, payment, registers and tax.",
          },
          {
            title: "Your e-commerce",
            body: "An online order joins the profile of the client followed in store, so the advisor stops discovering after the fact what their client bought on the website.",
          },
          {
            title: "Your messaging channels",
            body: "Outreach leaves on the channel the client actually uses, and stays traced in the name of the house and of the advisor who sent it.",
          },
          {
            title: "Anything else you run",
            body: "Loyalty, review platforms, marketing tools, a bespoke in-house system: tell us what you use and we set the connection up with you, store by store.",
          },
        ],
      },
      {
        type: "rows",
        tone: "cream",
        faq: true,
        kicker: "Frequently asked",
        title: "What jewelers *ask us*.",
        rows: [
          {
            title: "Does Selekt work with our jewelry store software?",
            body: "Yes. Selekt does not replace it: it sits above it to retrieve purchases and make the client profile readable on the floor. The environments we meet most often are Odeis Retail, Bijou3, Cegid, Shopify POS and Retail Pro, and we connect to other systems as well. The connection is set up with you, store by store.",
          },
          {
            title: "What is the best CRM for a jewelry business?",
            body: "The one your advisors open between two clients. A general-purpose CRM is built for marketing: segments, campaigns, open rates. A jewelry business needs the opposite — one client, their ring size, the date their servicing is due, and a message signed by the person who sold to them.",
          },
          {
            title: "Our client file is old and incomplete. Can we use it?",
            body: "Yes, and that is the most common case. We start from what exists: names, purchases, dates. Profiles are then completed sale after sale, by the advisor, in seconds. An imperfect file that is alive beats a perfect one nobody updates.",
          },
          {
            title: "Our advisors do not have work phones.",
            body: "That is the most frequent objection, and a fair one. The application is used from a device belonging to the store, tablet or mobile, and exchanges are traced in the name of the house and the advisor. Channels are configured at set-up, to match how your store works.",
          },
          {
            title: "How much time does an advisor need to spend on it?",
            body: "A few minutes a day. In the morning, the list of clients to contact; after a sale, two or three details added to the profile. If the tool asks more than it gives, it will not be used: the return has to be immediate — finding a client, or seeing a piece available elsewhere in the network.",
          },
          {
            title: "How do we know what the relationship produces?",
            body: "Every action is timestamped and attributed to its author. You set an attribution window — seven, thirty or ninety days. Sales that follow within it join influenced revenue, kept separate from direct sales and never added to them. Across equipped retailers, influenced revenue commonly represents 20 to 25 percent of the total.",
          },
          {
            title: "Does it replace our loyalty card?",
            body: "No. A card rewards volume; clienteling addresses one client at a time, with a real reason to reach out: a service due, a piece reserved, a wedding anniversary. The two coexist, and the card works better when an advisor actually uses it.",
          },
        ],
      },
    ],
  },
};
