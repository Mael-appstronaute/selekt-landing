import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import type { Locale } from "@/lib/routes";

/**
 * Page money — référentiel client unique. Slug `/referentiel-client-unique`. **FR uniquement.**
 *
 * Origine du dossier (16/09) : la Search Console montre 343 impressions et 0 clic sur
 * « référentiel client unique » (126), « rcu marketing » (114) et « rcu crm » (103), position
 * moyenne 25. L'analyse SERP (`briefs/analyse-serp-referentiel-client-unique.md`) a trouvé
 * pourquoi : **la page que Google classe est `/rcu`, et elle renvoie 404** — orpheline, absente du
 * sitemap, sans aucun lien entrant. Vérifié le 16/09 (`curl` navigateur ET Googlebot).
 * → une **301 `/rcu` → `/referentiel-client-unique`** est indispensable au dépôt.
 *
 * Volumes FR mesurés le 16/09 : référentiel client unique 50/mois, rcu marketing 20,
 * référentiel client 20, single customer view 20, rcu crm 10. La page ne se justifie PAS par le
 * volume mais par trois faits cumulés : (1) une URL indexée renvoie une erreur ; (2) le
 * qualificatif retail est un terrain vide sur ce champ — `référentiel client unique retail` renvoie
 * 9 résultats génériques sur 9, alors que `cdp retail` en renvoie 6 sur 9 écrits pour le retail ;
 * (3) l'offre RCU est celle qui convertit le mieux en prospection (8 % contre 1 % au clienteling).
 *
 * TROU DE MARCHÉ MESURÉ sur les 10 pages classées : « revenus influencés » 0/10, « vendeur » 1/10,
 * « caisse » 1/10, « portefeuille client » 1/10, « boutique/magasin » 3/10 — mais « CDP » 8/10.
 * Le marché écrit le RCU comme un projet de DSI ; personne ne l'écrit depuis le comptoir.
 * C'est l'angle de la page : où le client se dédouble, ce que ça coûte au vendeur, ce que la fiche
 * unique rend possible et mesurable.
 *
 * INTERDITS EXPLICITES (matrice + brief §5.4) :
 * - aucun H2 « RCU vs CRM », aucun tableau à deux colonnes RCU/CRM → le rapport entre les sigles
 *   vit en FAQ 2 et 3, et nulle part ailleurs (c'est le point fort du seul concurrent positionné
 *   retail : on ne l'attaque pas dessus) ;
 * - `customer data platform` (320/mois) employé comme vocabulaire, JAMAIS visé : ni slug, ni title,
 *   ni H1, ni H2 — SERP tenue par Salesforce, Oracle, Wikipedia, format listicle interdit chez nous ;
 * - `crm retail` / `crm boutique` appartiennent à `/crm-retail` ; `clienteling` au pilier ;
 *   `CA influencé` à `/ca-influence` (traité en section ici, jamais en tête) ;
 * - aucun bloc « critères de choix » (déjà sur deux pages EN), aucune section « étapes d'un projet »
 *   (elle appellerait des délais et des modalités que Thomas et Samuel n'ont pas validés), aucun prix ;
 * - `mdm`, `data lake`, `entrepôt de données`, `ID graph`, `DMP` : hors périmètre produit.
 *
 * Le seul énoncé de mécanique autorisé est « les rapprochements se font automatiquement », parce
 * qu'il est DÉJÀ publié sur `/plateforme/siege`. Rien d'autre n'est inventé.
 *
 * PHOTO : `etabliJoaillier` — 18 photographies ont été ajoutées au catalogue le 16/09 et réparties de
 * sorte qu'aucune de nos pages ne partage d'image avec une page produit ni avec une autre des nôtres.
 *
 * VERSION ANGLAISE : écrite, mais **sans cible mesurée**. Aucun volume anglophone n'a pu être relevé
 * sur ce champ (`single customer view`, `customer 360`, `golden record`) — à mesurer au prochain
 * relevé EN. Elle existe parce que le site est bilingue par construction : le sélecteur de langue du
 * `Header` renvoie vers `PAGES[key].en` sur toutes les pages, et une clé sans route anglaise produit
 * un 404 pour le visiteur. On n'en attend rien à court terme, et c'est écrit tel quel ici.
 */
export const REFERENTIEL_CLIENT_UNIQUE: Record<Locale, FeaturePageContent> = {
  fr: {
    meta: {
      // 41 + 19 (suffixe « — Selekt Retail OS ») = 60 caractères exactement, limite de la checklist.
      // Repli possible sans l'acronyme : « Référentiel client unique en retail » (54).
      title: "Référentiel client unique (RCU) en retail",
      description:
        "Référentiel client unique pour un réseau de boutiques : une seule fiche par client, alimentée par la caisse et le e-commerce, utilisable au comptoir.",
    },
    hero: {
      kicker: "Référentiel client unique",
      title: "Le référentiel client unique d'un *réseau de boutiques*.",
      lede: "Dans un réseau, le même client existe souvent quatre fois : une fois par magasin où il est passé, une fois sur le site, une fois dans le fichier de la caisse. Un référentiel client unique fait de ces quatre enregistrements une seule fiche, tenue proprement et utilisable là où le client se présente. Cette page explique ce que c'est, où les doublons naissent, et ce que la fiche unique change pour la personne qui a le client en face d'elle.",
      demoLabel: "Demander une démo",
      bg: "waves",
      secondary: { label: "La vue réseau, unifiée", key: "hq" },
    },
    sections: [
      {
        type: "list",
        kicker: "Définition",
        title: "Référentiel client unique : *la définition*.",
        lede: "Un référentiel client unique — RCU — est la base qui garantit qu'un client n'existe qu'une seule fois pour toute une enseigne, quelles que soient la boutique, la caisse ou le canal par lesquels il est passé.",
        items: [
          {
            title: "Ce que c'est",
            body: "Une seule fiche par personne, construite en rapprochant les enregistrements qui désignent le même client, puis mise à disposition des outils qui s'en servent : la boutique, le marketing, le service client, le siège.",
          },
          {
            title: "Ce que ce n'est pas",
            body: "Ni un entrepôt où l'on empile des données en attendant d'en faire quelque chose, ni un outil de campagnes. Il ne vend rien et n'envoie rien : il répond à une question préalable, « est-ce bien la même personne ? », dont tout le reste dépend.",
          },
          {
            title: "D'où viennent les doublons",
            body: "De la vie normale d'un réseau. Un client paie sans donner sa carte de fidélité, achète en ligne sous une autre adresse, se fait saisir son nom avec une faute un jour de forte affluence. Aucune de ces situations n'est une erreur : ce sont les conditions réelles de la vente.",
          },
          {
            title: "À qui ça sert",
            body: "Au vendeur, d'abord, parce qu'il reconnaît un client servi ailleurs par un collègue. Au marketing, pour ne pas relancer trois fois la même personne. À la direction, pour compter un client une fois et des ventes une fois.",
          },
        ],
      },
      {
        type: "table",
        tone: "cream",
        kicker: "Le même client, plusieurs fois",
        title: "Où un client *se dédouble*.",
        lede: "Les pages qui traitent du sujet parlent de silos et de vision à 360 degrés. Voici les scènes concrètes, telles qu'elles se produisent dans un réseau, et ce que la fiche unique en fait.",
        columns: ["", "Ce que voit le réseau aujourd'hui", "Ce que change une fiche unique"],
        // -1 volontaire : le gabarit remplace le libellé de la colonne « highlight » par « Selekt ».
        // Ici on oppose une situation à sa résolution, on ne compare pas deux produits.
        highlight: -1,
        rows: [
          {
            label: "Il paie sans donner sa carte",
            cells: [
              "Un ticket anonyme de plus, un client fidèle qui n'apparaît nulle part",
              "Le paiement, le nom ou le contact rapprochent l'achat de la fiche existante",
            ],
          },
          {
            label: "Il commande en ligne et retire en boutique",
            cells: [
              "Un client web et un passage en magasin, comptés comme deux personnes",
              "Un seul client, dont on sait qu'il achète en ligne et vient chercher sur place",
            ],
          },
          {
            label: "Il passe dans deux boutiques du réseau",
            cells: [
              "Deux historiques partiels, deux vendeurs qui croient chacun l'avoir découvert",
              "Un historique complet, et un interlocuteur désigné pour le suivre",
            ],
          },
          {
            label: "Son nom est saisi deux fois différemment",
            cells: [
              "Deux fiches presque identiques, que personne n'a le temps de fusionner",
              "Un rapprochement proposé, et un arbitrage humain quand le cas est douteux",
            ],
          },
          {
            label: "Il achète en détaxe",
            cells: [
              "Un dossier administratif à part, déconnecté de la relation",
              "Un achat rattaché au bon client, dans le même historique que les autres",
            ],
          },
        ],
        note: "Chacune de ces lignes se produit dans un réseau de deux boutiques comme de cinquante. Ce n'est pas une question de taille, c'est une question de nombre d'endroits où le même client peut se présenter sans être reconnu.",
      },
      {
        type: "rows",
        tone: "paper",
        variant: "timeline",
        kicker: "Comment ça tient",
        title: "D'une saisie de caisse à *une seule fiche*.",
        lede: "Le principe est simple, et il vaut mieux le comprendre avant de choisir quoi que ce soit : ce qui distingue un référentiel tenu d'un fichier client ordinaire, ce n'est pas la quantité de données, c'est la règle appliquée à chaque nouvelle entrée.",
        rows: [
          {
            title: "La donnée arrive de là où elle naît",
            body: "Un passage en caisse, une commande en ligne, une inscription en boutique, un échange avec le service client. Personne ne ressaisit rien : ce qui est déjà enregistrée quelque part n'a pas à l'être une seconde fois.",
          },
          {
            title: "Les fiches se rapprochent",
            body: "Les enregistrements qui désignent manifestement la même personne sont réunis. Sur la plateforme, les rapprochements se font automatiquement ; ce qui compte pour l'enseigne, c'est que la règle soit la même partout et qu'elle soit écrite.",
          },
          {
            title: "Les cas douteux restent arbitrables",
            body: "Deux homonymes dans la même ville ne se fusionnent pas tout seuls. Un référentiel sérieux sait dire « je ne sais pas » et laisser trancher un humain, plutôt que de mélanger deux clients — l'erreur la plus coûteuse de toutes.",
          },
          {
            title: "La règle est écrite une fois pour tout le réseau",
            body: "Ce qui fait un client actif, ce qui vaut consentement, ce qu'on rapproche et ce qu'on laisse séparé. Des variantes locales rendent les chiffres du réseau incomparables entre eux, et c'est ce qui fait échouer les projets bien avant la technique.",
          },
        ],
      },
      {
        type: "split",
        // `facade` : seule photo du catalogue qu'aucune page ne servait au 16/09 (vérifié en prod).
        photo: "etabliJoaillier",
        alt: "Mains d'un joaillier tenant une pince de précision",
        kicker: "Au comptoir",
        title: "Ce que ça change *pour le vendeur*.",
        body: "C'est le grand absent du sujet : sur les dix pages françaises qui se classent aujourd'hui sur « référentiel client unique », une seule prononce le mot vendeur, et une seule le mot caisse. Le référentiel y est décrit comme un projet de données. Or la personne qui en tire le bénéfice le plus immédiat est celle qui accueille le client.",
        points: [
          "Il reconnaît un client qu'un collègue a servi dans une autre boutique, et le sert comme s'il le connaissait",
          "Il ne redemande pas une taille, une préférence ou une adresse que la maison possède déjà",
          "Il voit un historique complet plutôt que le quart qui s'est joué devant lui",
          "Il ne crée pas un quatrième doublon en saisissant vite un jour d'affluence",
        ],
      },
      {
        type: "list",
        kicker: "Ce que ça rend possible",
        title: "Ce qu'une fiche unique *débloque*.",
        lede: "Un référentiel n'a aucune valeur en soi. Il en a parce qu'il rend faisables quatre choses qui, sans lui, sont approximatives ou fausses.",
        items: [
          {
            title: "Relancer sans doublonner",
            body: "Un client qui existe trois fois reçoit trois fois le même message, souvent le même jour. Ce n'est pas seulement inefficace : c'est le genre de détail qui décrédibilise une maison auprès de ses meilleurs clients.",
          },
          {
            title: "Reconnaître un client dans n'importe quelle boutique",
            body: "La reconnaissance est la promesse même du commerce de détail haut de gamme. Elle suppose que l'information suive le client, et non le point de vente où il est passé la première fois.",
          },
          {
            title: "Attribuer un portefeuille sans que personne ne se marche dessus",
            body: "On ne peut confier des clients à des vendeurs que si chaque client existe une fois. Sinon deux conseillers suivent la même personne, avec deux historiques différents et deux messages contradictoires.",
          },
          {
            title: "Compter un client une fois",
            body: "Le nombre de clients actifs, la fréquence d'achat, le panier moyen : tous ces indicateurs se calculent sur des personnes, pas sur des fiches. Un fichier qui compte 40 000 fiches pour 28 000 personnes se trompe sur tout.",
          },
        ],
      },
      {
        type: "rows",
        tone: "cream",
        kicker: "La preuve",
        title: "Une vente *comptée une fois*.",
        lede: "Aucune des dix pages concurrentes analysées ne dit comment on sait qu'un référentiel a servi à quelque chose. C'est pourtant la question que pose une direction, et elle mérite un protocole plutôt qu'une promesse.",
        rows: [
          {
            title: "Tracer l'action",
            body: "Message, rendez-vous, relance : chaque geste fait vers un client est daté et rattaché à la personne qui l'a fait. Sans cette trace, rien ne sera mesurable ensuite — et elle n'existe que si le client est identifié une seule fois.",
          },
          {
            title: "Fixer la fenêtre d'attribution",
            body: "Sept, trente ou quatre-vingt-dix jours entre le contact et la vente. C'est une décision de l'enseigne, écrite et connue de tous, pas un réglage caché dans un logiciel.",
          },
          {
            title: "Tenir les revenus influencés à part",
            body: "Une vente survenue dans la fenêtre rejoint les revenus influencés. Ils restent distincts du chiffre d'affaires direct et ne s'y additionnent jamais : une vente comptée deux fois discrédite toute la mesure, et le référentiel avec elle.",
          },
          {
            title: "Réconcilier avec la caisse",
            body: "Magasin par magasin, ligne par ligne. Chez des retailers équipés, les revenus influencés représentent couramment 20 à 25 % du total — un ordre de grandeur qui ne veut rien dire tant que les clients sont en double.",
          },
        ],
      },
      {
        type: "rows",
        tone: "paper",
        kicker: "La donnée",
        title: "Un fichier *tenu proprement*.",
        lede: "La moitié des pages du sujet traitent le RGPD, et c'est justifié : un référentiel réunit en un seul endroit ce qui était dispersé. Quatre points suffisent à poser le cadre.",
        rows: [
          {
            title: "Le consentement, recueilli et daté",
            body: "Qui a accepté d'être contacté, sur quel canal, et quand. Le consentement appartient à la fiche client, pas à un tableur conservé à côté.",
          },
          {
            title: "Les droits d'accès et d'effacement",
            body: "Une demande de suppression doit s'exécuter sur l'ensemble du réseau. C'est précisément ce qu'un référentiel rend possible, et ce qu'un fichier éclaté rend impraticable.",
          },
          {
            title: "Des permissions au niveau du champ",
            body: "Un vendeur voit ses clients, un manager sa boutique, le siège le réseau. Réunir les données n'oblige pas à les ouvrir à tout le monde.",
          },
          {
            title: "Un journal des accès",
            body: "Qui a lu quoi, qui a modifié quoi, quand. Il protège la maison, et il tranche les discussions internes mieux qu'une conversation.",
          },
        ],
      },
      {
        type: "cards",
        tone: "paper",
        kicker: "Autour du référentiel",
        title: "Ce qui *s'y branche*.",
        lede: "Un référentiel client unique se construit à partir de ce qui existe déjà et sert à ce qui se fait ensuite. Il n'est jamais un projet isolé.",
        cols: 3,
        cards: [
          {
            kicker: "Les sources",
            title: "D'où vient la donnée client",
            body: "Logiciels de caisse, plateformes e-commerce, outils d'envoi : Selekt se connecte à ce qui est déjà en place pour que les achats et les contacts alimentent la fiche sans ressaisie.",
            key: "integrations",
            cta: "Toutes les intégrations",
          },
          {
            kicker: "La mesure",
            title: "Une vente comptée une fois",
            body: "Fenêtre d'attribution, revenus influencés tenus séparés du chiffre d'affaires direct, réconciliation avec la caisse : le protocole qui transforme une base propre en preuve chiffrée.",
            key: "influencedRevenue",
            cta: "Le CA influencé, expliqué",
          },
          {
            kicker: "Ce qu'on en fait",
            title: "Ce qu'on fait de cette fiche en boutique",
            body: "Reconnaître, relancer au bon moment, suivre un portefeuille : la fiche unique est la condition, la relation client en boutique est le métier qu'elle rend possible.",
            key: "clienteling",
            cta: "Le clienteling, expliqué simplement",
          },
        ],
      },
      {
        type: "rows",
        tone: "cream",
        faq: true,
        kicker: "Questions fréquentes",
        title: "Ce qu'on nous demande *le plus souvent*.",
        rows: [
          {
            title: "Qu'est-ce qu'un référentiel client unique (RCU) ?",
            body: "Un référentiel client unique est la base qui garantit qu'un client n'existe qu'une fois pour toute une enseigne, quelles que soient la boutique, la caisse ou le canal par lesquels il est passé. Il rapproche les enregistrements qui désignent la même personne, puis met cette fiche unique à disposition des outils qui s'en servent.",
          },
          {
            title: "Quelle différence entre un référentiel client unique et un CRM ?",
            body: "Le référentiel répond à la question « qui est ce client, et est-ce bien le même ? ». Le CRM répond à « qu'est-ce qu'on fait avec lui ? ». Le premier tient l'identité et la fiabilité de la donnée, le second tient la relation et les actions. Dans un réseau de boutiques, le second ne vaut rien sans le premier.",
          },
          {
            title: "RCU, CDP, base client unique : ces mots désignent-ils la même chose ?",
            body: "Non, et la confusion est courante. Une base client unique stocke ; un référentiel client unique nettoie, rapproche et rend la fiche exploitable ; une customer data platform est une famille d'outils qui sert souvent à construire ce référentiel et à l'activer en marketing. Le référentiel est un résultat, la plateforme est un moyen de l'obtenir.",
          },
          {
            title: "Comment dit-on « référentiel client unique » en anglais ?",
            body: "On parle de single customer view, parfois de customer 360 ou de golden record pour désigner la fiche consolidée elle-même. Les trois expressions circulent dans le retail international et recouvrent la même idée : une seule représentation fiable du client, partagée par tous les points de contact de l'enseigne.",
          },
          {
            title: "Faut-il changer de logiciel de caisse pour avoir un référentiel client unique ?",
            body: "Non. Le référentiel se construit à partir des achats et des contacts que la caisse et le site enregistrent déjà ; il ne remplace ni l'un ni l'autre. La caisse continue d'encaisser, de gérer le stock et d'alimenter la comptabilité. Aucune migration de caisse n'est nécessaire.",
          },
          {
            title: "À partir de combien de boutiques est-ce que ça devient utile ?",
            body: "Dès la deuxième, et dès qu'il existe un site marchand. Le doublon ne naît pas de la taille du réseau mais du nombre d'endroits où le même client peut se présenter sans être reconnu. Plus la visite est rare et le panier élevé, plus une fiche perdue coûte cher.",
          },
          {
            title: "Comment sait-on qu'un référentiel client unique a rapporté quelque chose ?",
            body: "En traçant chaque action faite vers un client, en fixant une fenêtre d'attribution — sept, trente ou quatre-vingt-dix jours — et en comptant séparément les ventes qui suivent. Ces revenus influencés se tiennent à part du chiffre d'affaires direct et ne s'additionnent jamais. Chez des retailers équipés, ils représentent couramment 20 à 25 % du total.",
          },
        ],
      },
    ],
  },

  // Slug EN : `/en/single-customer-view`. Cible non mesurée (cf. en-tête) : la page est écrite
  // proprement, mais aucun classement n'en est attendu tant que les volumes EN ne sont pas relevés.
  en: {
    meta: {
      title: "Single customer view for store networks",
      description:
        "A single customer view across a store network: one record per client, fed by the till and the website, usable by the person at the counter.",
    },
    hero: {
      kicker: "Single customer view",
      title: "One client record, across *a network of stores*.",
      lede: "In a network, the same client often exists four times over: once per store they have visited, once on the website, once in the till's customer file. A single customer view turns those records into one, kept properly and usable where the client actually shows up. This page explains what it is, where duplicates come from, and what one record changes for the person standing in front of the client.",
      demoLabel: "Request a demo",
      bg: "waves",
      secondary: { label: "The network view, unified", key: "hq" },
    },
    sections: [
      {
        type: "list",
        kicker: "Definition",
        title: "A single customer view: *what it actually is*.",
        lede: "A single customer view is the base that guarantees a client exists only once across an entire brand, whatever the store, the till or the channel they came through.",
        items: [
          {
            title: "What it is",
            body: "One record per person, built by matching the entries that refer to the same client, then made available to the tools that use it: the store, marketing, customer care, headquarters.",
          },
          {
            title: "What it is not",
            body: "Neither a warehouse where data piles up awaiting a purpose, nor a campaign tool. It sells nothing and sends nothing: it answers the prior question — is this the same person? — on which everything else depends.",
          },
          {
            title: "Where duplicates come from",
            body: "From the ordinary life of a network. A client pays without producing their loyalty card, orders online under a different address, has their name typed with a typo on a busy afternoon. None of this is a mistake: these are the real conditions of selling.",
          },
          {
            title: "Who it serves",
            body: "The advisor first, because they recognise a client a colleague served elsewhere. Marketing, so the same person is not contacted three times. Leadership, to count a client once and a sale once.",
          },
        ],
      },
      {
        type: "table",
        tone: "cream",
        kicker: "The same client, several times",
        title: "Where a client *splits in two*.",
        lede: "Pages on this subject talk about silos and a 360-degree view. Here are the concrete scenes, as they happen in a store network, and what one record does with them.",
        columns: ["", "What the network sees today", "What one record changes"],
        // -1 deliberately: the template swaps the highlighted column label for « Selekt ».
        highlight: -1,
        rows: [
          {
            label: "They pay without producing their card",
            cells: [
              "One more anonymous receipt, and a loyal client who appears nowhere",
              "The payment, the name or the contact details attach the purchase to the existing record",
            ],
          },
          {
            label: "They order online and collect in store",
            cells: [
              "A web client and a store visit, counted as two people",
              "One client, known to buy online and collect in person",
            ],
          },
          {
            label: "They visit two stores in the network",
            cells: [
              "Two partial histories, two advisors each believing they found them",
              "One complete history, and a named person to follow up",
            ],
          },
          {
            label: "Their name is typed two different ways",
            cells: [
              "Two near-identical records nobody has time to merge",
              "A proposed match, and a human decision whenever the case is doubtful",
            ],
          },
          {
            label: "They buy tax free",
            cells: [
              "A separate administrative file, disconnected from the relationship",
              "A purchase attached to the right client, in the same history as the rest",
            ],
          },
        ],
        note: "Every one of these lines happens in a network of two stores as much as fifty. It is not a question of size, it is a question of how many places the same client can appear without being recognised.",
      },
      {
        type: "rows",
        tone: "paper",
        variant: "timeline",
        kicker: "How it holds together",
        title: "From a till entry to *one record*.",
        lede: "The principle is simple, and worth understanding before choosing anything: what separates a properly kept record base from an ordinary customer file is not the quantity of data, it is the rule applied to every new entry.",
        rows: [
          {
            title: "Data arrives from where it is created",
            body: "A purchase at the till, an online order, a sign-up in store, an exchange with customer care. Nobody retypes anything: what is already recorded somewhere should not be recorded a second time.",
          },
          {
            title: "Records are matched",
            body: "Entries that plainly refer to the same person are brought together. On the platform, matching happens automatically; what matters to the brand is that the rule is the same everywhere and that it is written down.",
          },
          {
            title: "Doubtful cases stay decidable",
            body: "Two namesakes in the same city do not merge on their own. A serious record base can say « I don't know » and leave the decision to a person, rather than mixing two clients — the costliest error of all.",
          },
          {
            title: "The rule is written once for the whole network",
            body: "What counts as an active client, what counts as consent, what gets matched and what stays separate. Local variants make network figures impossible to compare, and that is what sinks these projects long before the technology does.",
          },
        ],
      },
      {
        type: "split",
        photo: "etabliJoaillier",
        alt: "A jeweller's hands holding precision pliers",
        kicker: "At the counter",
        title: "What it changes *for the advisor*.",
        body: "This is the great absentee of the subject: of the ten French pages ranking on this topic today, one mentions the advisor and one mentions the till. The record base is described as a data project. Yet the person who benefits most immediately is the one greeting the client.",
        points: [
          "They recognise a client a colleague served in another store, and serve them as if they knew them",
          "They do not ask again for a size, a preference or an address the house already holds",
          "They see a complete history rather than the quarter of it that happened in front of them",
          "They do not create a fourth duplicate by typing quickly on a busy day",
        ],
      },
      {
        type: "list",
        kicker: "What it unlocks",
        title: "What one record *makes possible*.",
        lede: "A record base has no value in itself. It has value because it makes four things feasible that are otherwise approximate or plainly wrong.",
        items: [
          {
            title: "Following up without duplicating",
            body: "A client who exists three times receives the same message three times, often on the same day. That is not merely inefficient: it is the kind of detail that undermines a house in front of its best clients.",
          },
          {
            title: "Recognising a client in any store",
            body: "Recognition is the very promise of high-end retail. It requires the information to follow the client, not the store where they first happened to walk in.",
          },
          {
            title: "Assigning client books without overlap",
            body: "Clients can only be assigned to advisors if each client exists once. Otherwise two advisors follow the same person, with two different histories and two contradictory messages.",
          },
          {
            title: "Counting a client once",
            body: "Active clients, purchase frequency, average basket: all of these are calculated on people, not on records. A file holding 40,000 records for 28,000 people is wrong about everything.",
          },
        ],
      },
      {
        type: "rows",
        tone: "cream",
        kicker: "The proof",
        title: "A sale counted *once*.",
        lede: "None of the ten competing pages analysed says how you know the record base achieved anything. Yet that is the question leadership asks, and it deserves a protocol rather than a promise.",
        rows: [
          {
            title: "Trace the action",
            body: "Message, appointment, follow-up: every gesture towards a client is timestamped and attributed to the person who made it. Without that trace nothing can be measured afterwards — and it only exists if the client is identified once.",
          },
          {
            title: "Set the attribution window",
            body: "Seven, thirty or ninety days between contact and sale. It is the brand's decision, written down and known to everyone, not a setting hidden in a tool.",
          },
          {
            title: "Keep influenced revenue separate",
            body: "A sale falling inside the window joins influenced revenue. It stays distinct from walk-in revenue and is never added to it: a sale counted twice discredits the whole measure, and the record base with it.",
          },
          {
            title: "Reconcile against the till",
            body: "Store by store, line by line. Across equipped retailers, influenced revenue commonly represents 20 to 25 percent of total revenue — an order of magnitude that means nothing while clients are still duplicated.",
          },
        ],
      },
      {
        type: "rows",
        tone: "paper",
        kicker: "The data",
        title: "A client file *kept properly*.",
        lede: "Half the pages on this subject cover data protection, and rightly so: a record base brings into one place what used to be scattered. Four points are enough to set the frame.",
        rows: [
          {
            title: "Consent, collected and dated",
            body: "Who agreed to be contacted, on which channel, and when. Consent belongs in the client record, not in a spreadsheet kept beside it.",
          },
          {
            title: "Access and erasure rights",
            body: "A deletion request has to run across the whole network. That is precisely what a single record base makes possible, and what a scattered file makes impractical.",
          },
          {
            title: "Field-level permissions",
            body: "An advisor sees their clients, a manager their store, headquarters the network. Bringing data together does not oblige anyone to open it to everyone.",
          },
          {
            title: "An access log",
            body: "Who read what, who changed what, when. It protects the house, and it settles internal debates better than a conversation does.",
          },
        ],
      },
      {
        type: "cards",
        tone: "paper",
        kicker: "Around the record",
        title: "What *connects to it*.",
        lede: "A single customer view is built from what already exists and serves what comes next. It is never an isolated project.",
        cols: 3,
        cards: [
          {
            kicker: "The sources",
            title: "Where client data comes from",
            body: "Point-of-sale systems, e-commerce platforms, sending tools: Selekt connects to what is already in place so that purchases and contacts feed the record without retyping.",
            key: "integrations",
            cta: "All integrations",
          },
          {
            kicker: "The measure",
            title: "A sale counted once",
            body: "Attribution window, influenced revenue kept separate from walk-in revenue, reconciliation against the till: the protocol that turns a clean base into evidence.",
            key: "influencedRevenue",
            cta: "Influenced revenue, explained",
          },
          {
            kicker: "What you do with it",
            title: "What this record becomes on the shop floor",
            body: "Recognising, reaching out at the right moment, following a client book: one record is the condition, client relationships in store are the craft it makes possible.",
            key: "clienteling",
            cta: "Clienteling, plainly explained",
          },
        ],
      },
      {
        type: "rows",
        tone: "cream",
        faq: true,
        kicker: "Frequently asked",
        title: "Frequently asked *questions*.",
        rows: [
          {
            title: "What is a single customer view?",
            body: "A single customer view is the base that guarantees a client exists only once across an entire brand, whatever the store, the till or the channel they came through. It matches the entries that refer to the same person, then makes that one record available to the tools that use it.",
          },
          {
            title: "How is a single customer view different from a CRM?",
            body: "The record base answers « who is this client, and is it really the same one? ». The CRM answers « what do we do with them? ». The first holds identity and data reliability, the second holds the relationship and the actions. In a store network, the second is worth nothing without the first.",
          },
          {
            title: "Single customer view, golden record, customer data platform: the same thing?",
            body: "No, and the confusion is common. A golden record is the consolidated record itself; a single customer view is the result of cleaning and matching; a customer data platform is a family of tools often used to build that view and activate it in marketing. The view is an outcome, the platform is one way of reaching it.",
          },
          {
            title: "Do we have to replace our point-of-sale system?",
            body: "No. The record base is built from the purchases and contacts the till and the website already record; it replaces neither. The till carries on taking payment, managing stock and feeding the accounts. No migration is required.",
          },
          {
            title: "From how many stores does this become useful?",
            body: "From the second one, and as soon as there is a website. Duplicates do not come from the size of the network but from the number of places the same client can appear without being recognised. The rarer the visit and the higher the basket, the more a lost record costs.",
          },
          {
            title: "How do you know a single customer view returned anything?",
            body: "By tracing every action taken towards a client, setting an attribution window — seven, thirty or ninety days — and counting the sales that follow separately. That influenced revenue stays apart from walk-in revenue and is never added to it. Across equipped retailers, it commonly represents 20 to 25 percent of the total.",
          },
        ],
      },
    ],
  },
};
