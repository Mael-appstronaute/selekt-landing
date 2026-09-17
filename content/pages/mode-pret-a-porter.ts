import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import type { Locale } from "@/lib/routes";

/**
 * Page secteur — mode et prêt-à-porter. Slug FR `/secteurs/mode-pret-a-porter`.
 *
 * Analyse SERP du 16/09 (`seo-pages/briefs/analyse-serp-fr-mode.md`) :
 * - `crm mode` (10/mois) écarté : 3 résultats sur 9 sont des offres d'emploi ;
 * - `crm prêt à porter` écarté : SERP dominée par le CRM de showroom wholesale ;
 * - mot-clé principal retenu : `fidélisation client prêt-à-porter`, NON MESURABLE et assumé.
 *   La page est un actif de prospection (2e secteur des bases) qui prend au passage une SERP vacante.
 * Trou de marché prouvé sur 9 pages : `portefeuille client` 0/9, `revenus influencés` 0/9,
 * `retouche` 0/9, `lookbook` 0/9, `wishlist` 0/9, `vendeuse` 0/9. La SERP mode parle au commercial
 * B2B ou au marketing, jamais à la vendeuse en boutique.
 *
 * Contraintes appliquées : aucun bloc « critères de choix » (il existe déjà sur deux pages EN,
 * cf. MAILLAGE-ET-CANNIBALISATION.md §2) · « soldes » traité en « périodes de promotion encadrées »,
 * aucun conseil juridique · « VIC » et « drop » employés une seule fois, explicités · aucun éditeur
 * nommé · aucun détail technique d'intégration · « 20 à 25 % de revenus influencés, constaté chez des
 * retailers équipés », jamais « +X % de CA ».
 *
 * Version EN : volontairement courte. L'analyse déconseille d'ouvrir une page secteur EN mode
 * (`clienteling fashion` réservé au pilier EN, `fashion retail crm` sert le wholesale, format gagnant
 * = comparatif nominatif qui nous est interdit). Elle existe parce que le gabarit impose une entrée
 * FR et EN par page (sélecteur de langue et hreflang).
 */
export const FASHION: Record<Locale, FeaturePageContent> = {
  fr: {
    modified: "2026-09-16",
    meta: {
      title: "Fidélisation client prêt-à-porter",
      description:
        "Fidélisation client en prêt-à-porter : taille, pièce mise de côté, arrivée de collection. Le clienteling des réseaux de mode, mesuré par boutique.",
    },
    hero: {
      kicker: "Mode · Prêt-à-porter",
      title: "Elle a essayé trois pièces. *Personne ne sait laquelle elle regrette.*",
      lede: "En mode, on voit passer beaucoup de monde et on reconnaît peu de clientes. Selekt donne à chaque vendeuse un portefeuille nommé, les informations qui comptent, et les occasions de recontacter au bon moment — puis mesure ce que ce travail rapporte, boutique par boutique.",
      demoLabel: "Demander une démo",
      bg: "waves",
      secondary: { label: "Le clienteling, expliqué simplement", key: "clienteling" },
    },
    sections: [
      {
        type: "list",
        kicker: "Le point de départ",
        title: "Beaucoup de monde, *et presque personne de reconnu*.",
        lede: "Le prêt-à-porter a le problème inverse de la bijouterie : les visites sont fréquentes, mais anonymes. Le fichier est volumineux, et il dort.",
        items: [
          {
            title: "Le flux contre la mémoire",
            body: "Une vendeuse voit des dizaines de personnes par jour. Elle retient les visages, rarement les tailles, presque jamais ce qui a été essayé sans être acheté.",
          },
          {
            title: "La cliente fidèle que personne n'a identifiée",
            body: "Elle vient quatre fois par an depuis trois ans. Personne ne le sait, parce que rien ne relie ses passages entre eux : elle est traitée comme une inconnue à chaque visite.",
          },
          {
            title: "Vingt à trente clientes suivies",
            body: "C'est ce qu'une vendeuse peut tenir de tête. Le reste de la base n'est jamais recontacté, alors qu'il a déjà acheté au moins une fois.",
          },
          {
            title: "La base est déjà là",
            body: "Elle est dans votre caisse et dans votre e-commerce, avec les achats et les dates. Il ne manque pas de données : il manque quelqu'un dont c'est le métier de s'en servir.",
          },
        ],
      },
      {
        type: "cards",
        tone: "cream",
        kicker: "Le calendrier",
        title: "La mode a un calendrier connu d'avance, *et personne ne s'en sert cliente par cliente*.",
        lede: "Tout le monde communique aux mêmes dates, en même temps, au même moment. La différence se joue avant, et une personne à la fois.",
        cols: 3,
        cards: [
          {
            kicker: "L'arrivée de collection",
            title: "Prévenir avant tout le monde",
            body: "Un arrivage, une capsule, un drop : quelques clientes attendaient précisément ces pièces, dans leur taille. Les prévenir la veille vaut mieux qu'une newsletter à toute la base le jour J.",
          },
          {
            kicker: "Les périodes de promotion encadrées",
            title: "Le moment où la relation compte le plus",
            body: "Pendant les soldes et les ventes privées, toutes les marques parlent en même temps. Un message individuel sur une pièce suivie depuis deux mois n'est pas une campagne : c'est un service.",
          },
          {
            kicker: "Les dates de la cliente",
            title: "Son anniversaire, son dernier achat",
            body: "Un événement annoncé en cabine — un mariage, une prise de poste — est une date que personne d'autre ne connaît. C'est celle qui transforme une relance en conseil.",
          },
        ],
      },
      {
        type: "table",
        tone: "cream",
        kicker: "Complémentarité",
        title: "Ce que vos outils font déjà, *ce que Selekt ajoute*.",
        lede: "Selekt ne remplace ni votre caisse, ni votre e-commerce, ni votre programme de fidélité. Il s'appuie dessus : sans eux, pas d'historique d'achat, donc pas de relation à travailler ni de revenus à mesurer.",
        columns: ["", "Vos outils actuels", "Selekt"],
        highlight: 2,
        rows: [
          { label: "Stock, réassort, collections", cells: [true, false] },
          { label: "Encaissement et comptabilité", cells: [true, false] },
          { label: "E-commerce, commandes et retours", cells: [true, false] },
          { label: "Programme de fidélité et campagnes", cells: [true, false] },
          { label: "Fiche cliente et historique d'achat", cells: [true, "reprise et enrichie"] },
          { label: "Portefeuille réparti par vendeuse", cells: [false, true] },
          { label: "Relances individuelles tracées", cells: [false, true] },
          { label: "Revenus influencés, mesurés par boutique", cells: [false, true] },
        ],
        note: "Vos outils font tourner la boutique et parlent à la base. Selekt fait parler une vendeuse à une cliente, et prouve ce que ça rapporte.",
      },
      {
        type: "split",
        photo: "boutiqueMode",
        alt: "Intérieur de boutique de mode, portants suspendus",
        kicker: "Le portefeuille",
        title: "Répartir les clientes *entre les vendeuses*.",
        body: "Une base que tout le monde peut consulter et que personne ne suit ne produit rien. Le portefeuille met un nom en face de chaque cliente : quelqu'un dont c'est le travail de la connaître et de la rappeler.",
        points: [
          "La répartition suit vos règles : qui a vendu, qui connaît la cliente, qui a de la disponibilité",
          "Une cliente qui achète dans plusieurs boutiques reste visible par toutes, avec une responsable désignée",
          "Au départ d'une vendeuse, son portefeuille est réattribué avec tout son historique",
          "La directrice de boutique voit qui a été contactée, quand, et qui n'a été rappelée par personne",
        ],
      },
      {
        type: "list",
        kicker: "Les détails",
        title: "Ce qu'il faut savoir d'une cliente *pour ne pas se tromper*.",
        lede: "En prêt-à-porter, se tromper coûte cher en temps : une sélection à côté de la plaque, et la cliente n'ouvrira plus le message suivant.",
        items: [
          {
            title: "La taille, et la coupe",
            body: "Ce n'est pas la même chose, et l'écart varie d'une marque à l'autre. Une cliente en 38 chez vous peut être en 40 sur une coupe ajustée : c'est l'information qui évite l'essayage inutile.",
          },
          {
            title: "Les matières, les coloris, ce qu'elle ne porte pas",
            body: "Ce qu'elle refuse compte autant que ce qu'elle aime. Une sélection qui écarte d'emblée ce qui ne lui va pas se lit comme du conseil, pas comme de la vente.",
          },
          {
            title: "Les mesures de retouche",
            body: "Longueur d'ourlet, cintrage, tombé : notées une fois, elles se réutilisent à chaque achat, et l'atelier gagne un aller-retour.",
          },
          {
            title: "Ce qu'elle a essayé sans acheter",
            body: "La pièce restée en cabine est le meilleur signal disponible. Elle dit l'envie, la taille et l'hésitation — et donne une raison légitime de recontacter.",
          },
          {
            title: "Le budget et l'occasion à venir",
            body: "Un événement à préparer oriente la sélection et la date du prochain contact. C'est ce qui distingue une relance utile d'une relance mécanique.",
          },
        ],
      },
      {
        type: "rows",
        tone: "paper",
        kicker: "Les rendez-vous naturels",
        title: "Essayage, retouche, réservation : *la mode crée ses propres occasions*.",
        lede: "Pas besoin d'inventer un prétexte : le service en crée plusieurs par semaine, et presque personne ne les exploite.",
        variant: "timeline",
        rows: [
          {
            title: "La pièce mise de côté",
            body: "Une réservation a une durée. Prévenir la veille de son échéance, c'est rendre service ; laisser filer, c'est remettre la pièce en rayon et perdre les deux.",
          },
          {
            title: "La retouche prête",
            body: "Un message dès le retour de l'atelier, signé par la vendeuse qui a pris les mesures. La cliente revient en boutique, et la visite devient une occasion de plus.",
          },
          {
            title: "La taille revenue en réassort",
            body: "Elle voulait la pièce, sa taille manquait. Le réassort est une information périssable : elle vaut le jour où elle arrive, pas trois semaines après.",
          },
          {
            title: "La fin de série",
            body: "Les dernières pièces d'un modèle suivi par quelques clientes justifient un message ciblé — et un seul, à celles que ça concerne vraiment.",
          },
          {
            title: "Le rendez-vous d'essayage préparé",
            body: "Une sélection réunie avant l'arrivée, à partir de ce qu'on sait d'elle. C'est le niveau de service que les maisons appellent le personal shopping, rendu tenable à l'échelle d'un réseau.",
          },
        ],
      },
      {
        type: "split",
        photo: "portantsNeutres",
        alt: "Portant de vêtements aux tons neutres",
        kicker: "Le réseau",
        title: "Un réseau, une cliente : *elle achète là où elle passe*.",
        body: "Une cliente de mode ne s'attache pas à une adresse : elle entre dans celle qui est sur son chemin, et commande en ligne le reste du temps. Si chaque boutique tient son propre fichier, la maison ne voit jamais la même personne.",
        points: [
          "La fiche suit la cliente d'une boutique à l'autre, avec son historique et ses préférences",
          "Le stock du réseau est visible depuis la cabine : la pièce trouvée ailleurs reste une vente de la maison",
          "La commande en ligne est rattachée à la conseillère qui l'a préparée en boutique",
          "Les clientes les plus fidèles — ce que le métier appelle les VIC — sont un niveau de service, pas un outil à part",
        ],
        reverse: true,
      },
      {
        type: "split",
        photo: "costumes",
        alt: "Costumes présentés sur mannequins",
        kicker: "La relance",
        title: "Relancer *sans solder*.",
        body: "La facilité, en mode, est de relancer avec une remise. Elle fonctionne une fois, puis elle apprend à la cliente à n'acheter qu'en promotion. Le clienteling fait l'inverse : il donne une raison qui n'est pas un prix.",
        points: [
          "Un motif réel : une pièce réservée, une retouche prête, une taille revenue, une collection qui lui correspond",
          "Le canal qu'elle a choisi, à la fréquence que la maison s'est fixée",
          "Un message signé par sa vendeuse, dans le ton de la maison",
          "Une validation humaine avant tout envoi, même quand le texte a été préparé automatiquement",
        ],
      },
      {
        type: "loop",
        kicker: "La preuve",
        title: "Mesurer ce que la relation *rapporte*.",
        steps: [
          {
            title: "Tracer l'action",
            body: "Message, rendez-vous d'essayage, relance : l'action est datée et rattachée à la vendeuse qui l'a faite.",
          },
          {
            title: "Fixer la fenêtre",
            body: "Sept, trente ou quatre-vingt-dix jours entre le contact et la vente. C'est la maison qui décide, et la règle est écrite.",
          },
          {
            title: "Attribuer la vente",
            body: "La vente survenue dans la fenêtre rejoint les revenus influencés. Ils restent distincts des ventes directes et ne s'y additionnent jamais.",
          },
          {
            title: "Réconcilier",
            body: "Boutique par boutique, ligne par ligne, les montants se rapprochent de la caisse. Chez des retailers équipés, les revenus influencés représentent couramment 20 à 25 % du total.",
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
          { value: 2, suffix: " min", label: "le temps réellement disponible entre deux clientes" },
        ],
      },
      {
        type: "cards",
        tone: "cream",
        kicker: "Vos outils",
        title: "Connecté à ce que vous *utilisez déjà*.",
        lede: "Selekt se branche sur le socle en place dans les réseaux de mode, et sur le reste : l'intégration n'est pas une limite de notre côté, c'est une étape du déploiement.",
        cols: 3,
        cards: [
          {
            kicker: "Caisse et gestion",
            title: "L'historique d'achat remonte tout seul",
            body: "Les ventes du magasin nourrissent la fiche cliente et rendent les revenus influencés réconciliables avec la caisse. Votre outil garde le stock, l'encaissement et la comptabilité.",
            key: "integrations",
            cta: "Les outils auxquels Selekt se connecte",
          },
          {
            kicker: "E-commerce et relation client",
            title: "En ligne et en boutique, la même cliente",
            body: "Commandes, retours, campagnes et programme de fidélité continuent de tourner. Selekt ajoute la couche individuelle : qui parle à qui, pour quelle raison, avec quel résultat.",
            key: "influencedRevenue",
            cta: "Comment les revenus influencés sont attribués",
          },
          {
            kicker: "Messageries",
            title: "Le canal que la cliente utilise vraiment",
            body: "Les échanges partent du canal choisi par la cliente et restent tracés au nom de la maison et de la vendeuse, avec une validation humaine avant envoi.",
            key: "aiCopilot",
            cta: "Des messages préparés et validés avant envoi",
          },
        ],
      },
      {
        type: "rows",
        tone: "cream",
        faq: true,
        kicker: "Questions fréquentes",
        title: "Ce que nous demandent *les réseaux de mode*.",
        rows: [
          {
            title: "En quoi est-ce différent de mon programme de fidélité ?",
            body: "Un programme de fidélité récompense un volume d'achats, à l'identique pour tout le monde. Le clienteling s'adresse à une cliente à la fois, avec une raison réelle de la contacter : une pièce réservée, une retouche prête, une collection qui arrive dans sa taille. Les deux cohabitent très bien, et le programme gagne à être exploité par la vendeuse.",
          },
          {
            title: "Nos vendeuses voient trop de monde pour se souvenir de chaque cliente.",
            body: "C'est exactement le point de départ. Sans outil, une vendeuse suit les vingt ou trente clientes dont elle se souvient ; le reste du fichier dort. Selekt lui donne un portefeuille nommé, l'historique d'achat et les quelques informations qui comptent : taille, coupe, préférences, essayages sans achat.",
          },
          {
            title: "Faut-il remplacer notre caisse ou notre site e-commerce ?",
            body: "Non. Selekt se pose au-dessus de ce que vous utilisez déjà : la caisse tient la vente, l'e-commerce tient la commande, Selekt tient la relation et la mesure. Sans vos outils actuels, il n'y aurait ni historique d'achat ni ventes à rattacher. Le raccordement se vérifie avec vous lors de la démonstration.",
          },
          {
            title: "Et pendant les soldes ou les périodes de promotion encadrées ?",
            body: "Ce sont les moments où la relation compte le plus, parce que tout le monde communique en même temps. Une vendeuse qui prévient sa cliente qu'une pièce suivie depuis deux mois est disponible dans sa taille ne fait pas une campagne : elle rend un service. Le message reste individuel, daté et tracé.",
          },
          {
            title: "Nos clientes achètent dans plusieurs de nos boutiques. Comment ça se passe ?",
            body: "La fiche cliente est unique pour le réseau : historique, préférences et échanges suivent la personne, quelle que soit la boutique où elle passe. Une responsable reste désignée, les autres conseillères voient ce qu'elles doivent voir, selon les permissions que vous fixez. Le siège lit les mêmes chiffres que le terrain.",
          },
          {
            title: "Comment savoir ce que la relation rapporte vraiment ?",
            body: "Chaque action est datée et rattachée à son auteur. Vous fixez une fenêtre d'attribution : sept, trente ou quatre-vingt-dix jours. Les ventes survenues dans cette fenêtre rejoignent les revenus influencés, tenus distincts des ventes directes et jamais additionnés. Chez des retailers équipés, on constate 20 à 25 % de revenus influencés.",
          },
        ],
      },
    ],
  },

  en: {
    modified: "2026-09-16",
    meta: {
      title: "Fashion retail client relationships",
      description:
        "Client books per advisor, sizes and alterations remembered, collection arrivals used one client at a time: clienteling for fashion retail networks.",
    },
    hero: {
      kicker: "Fashion · Ready-to-wear",
      title: "She tried three pieces. *Nobody knows which one she regrets.*",
      lede: "Fashion retail sees a lot of people and recognises very few of them. Selekt gives each advisor a named client book, the details that matter, and the reasons to reach out at the right moment — then measures what that work produces, store by store.",
      demoLabel: "Request a demo",
      bg: "waves",
      secondary: { label: "Clienteling, plainly explained", key: "clienteling" },
    },
    sections: [
      {
        type: "list",
        kicker: "Where it starts",
        title: "Plenty of footfall, *almost no one recognised*.",
        lede: "Ready-to-wear has the opposite problem to jewellery: visits are frequent, but anonymous. The client file is large, and it sleeps.",
        items: [
          {
            title: "Footfall against memory",
            body: "An advisor sees dozens of people a day. They remember faces, rarely sizes, and almost never what was tried on without being bought.",
          },
          {
            title: "The loyal client nobody identified",
            body: "She has come four times a year for three years. Nobody knows, because nothing links her visits together: she is served as a stranger every time.",
          },
          {
            title: "Twenty to thirty clients followed",
            body: "That is what one advisor can hold from memory. The rest of the base is never contacted again, although it has already bought at least once.",
          },
          {
            title: "The data is already there",
            body: "It sits in your POS and your e-commerce, with purchases and dates. Data is not what is missing — someone whose job is to use it, is.",
          },
        ],
      },
      {
        type: "rows",
        tone: "paper",
        kicker: "Natural occasions",
        title: "Fittings, alterations, holds: *fashion creates its own reasons*.",
        lede: "No pretext needs inventing: service creates several occasions a week, and almost nobody uses them.",
        variant: "timeline",
        rows: [
          {
            title: "The piece on hold",
            body: "A hold has an expiry date. A message the day before is a service; letting it lapse puts the piece back on the rail and loses both.",
          },
          {
            title: "The alteration is ready",
            body: "A message as soon as it returns from the workshop, signed by the advisor who took the measurements. The client comes back, and the visit becomes another occasion.",
          },
          {
            title: "Her size is back in stock",
            body: "She wanted the piece, her size was gone. A restock is perishable information: it is worth something the day it lands, not three weeks later.",
          },
          {
            title: "The prepared fitting appointment",
            body: "A selection gathered before she arrives, based on what is known about her. It is the level of service houses call personal shopping, made sustainable across a network.",
          },
        ],
      },
      {
        type: "loop",
        kicker: "The proof",
        title: "Measuring what the relationship *produces*.",
        steps: [
          { title: "Trace the action", body: "Message, fitting appointment, follow-up: timestamped and attributed to the advisor who made it." },
          { title: "Set the window", body: "Seven, thirty or ninety days between contact and sale. The house decides, and the rule is written down." },
          { title: "Attribute the sale", body: "A sale within the window joins influenced revenue, kept separate from walk-in sales and never added to them." },
          { title: "Reconcile", body: "Store by store, line by line, amounts match the POS. Across equipped retailers, influenced revenue commonly represents 20 to 25 percent of total revenue." },
        ],
      },
      {
        type: "rows",
        tone: "cream",
        faq: true,
        kicker: "Frequently asked",
        title: "What fashion networks *ask us*.",
        rows: [
          {
            title: "How is this different from our loyalty programme?",
            body: "A loyalty programme rewards volume, identically for everyone. Clienteling addresses one client at a time, with a real reason to reach out: a piece on hold, an alteration ready, a collection arriving in her size. The two coexist, and the programme works better when an advisor uses it.",
          },
          {
            title: "Do we need to replace our POS or our e-commerce?",
            body: "No. Selekt sits above what you already run: the POS holds the sale, e-commerce holds the order, Selekt holds the relationship and its measurement. Without your current tools there would be no purchase history and no sales to attribute.",
          },
          {
            title: "Our clients shop in several of our stores.",
            body: "The client profile is shared across the network: history, preferences and conversations follow the person, whichever store she walks into. One advisor stays responsible, and headquarters reads the same figures as the floor.",
          },
        ],
      },
    ],
  },
};
