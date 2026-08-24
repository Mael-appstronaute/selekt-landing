import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import type { Locale } from "@/lib/routes";

export const AI: Record<Locale, FeaturePageContent> = {
  fr: {
    meta: {
      title: "IA copilote — encadrée, utile, validée par l'humain",
      description:
        "Génération de messages dans le ton de la marque, résumés clients, comptes rendus de rendez-vous. Mots interdits, validation humaine avant envoi, coût maîtrisé.",
    },
    hero: {
      kicker: "IA copilote",
      title: "Une IA copilote. Pas un *gadget*.",
      lede: "Elle rédige dans le ton de votre maison, résume les fiches, prépare les comptes rendus. Et rien ne part sans validation humaine.",
      demoLabel: "Demander une démo",
      bg: "aurora",
      secondary: { label: "Voir l'espace vendeur", key: "advisor" },
      mockup: {
        kind: "ai",
        labels: {
          title: "Brouillon — relecture avant envoi",
          badge: "Validation requise",
          segments: [
            { text: "Madame, la pièce que vous aviez admirée est arrivée en boutique. " },
            { text: "Profitez-en vite, offre limitée !", blocked: true },
            { text: " Puis-je vous la réserver pour votre prochaine visite ?" },
          ],
          editLabel: "Modifier",
          approveLabel: "Relire et envoyer",
          footnote: "Les formulations proscrites par la maison sont bloquées avant même la relecture. Le bouton d'envoi n'existe pas côté IA.",
        },
      },
    },
    sections: [
      {
        type: "split",
        photo: "ecriture",
        alt: "Plume écrivant une lettre sur papier ligné",
        kicker: "La relecture",
        title: "Rien ne part sans *validation*.",
        body: "L'IA prépare, propose, résume. La décision d'envoyer reste un geste humain — toujours. C'est la condition de la confiance.",
        reverse: true,
        mockup: {
          kind: "ai",
          labels: {
            title: "Brouillon — relecture avant envoi",
            badge: "Validation requise",
            segments: [
              { text: "Madame, la pièce que vous aviez admirée est arrivée en boutique. " },
              { text: "Profitez-en vite, offre limitée !", blocked: true },
              { text: " Puis-je vous la réserver pour votre prochaine visite ?" },
            ],
            editLabel: "Modifier",
            approveLabel: "Relire et envoyer",
            footnote: "Les formulations proscrites par la maison sont bloquées avant même la relecture.",
          },
        },
      },
      {
        type: "rows",
        tone: "cream",
        kicker: "Les usages",
        title: "Utile au *quotidien*. Sinon rien.",
        lede: "Trois usages, choisis parce qu'ils font gagner du temps de vente, pas parce qu'ils font une démo.",
        rows: [
          {
            title: "Messages dans le ton",
            body: "L'IA propose un brouillon fidèle à la voix de la maison, dans la langue du client. Le vendeur ajuste et décide.",
          },
          {
            title: "Résumés clients",
            body: "Avant un rendez-vous, l'essentiel de la fiche en quelques lignes : historique, préférences, dernières conversations.",
          },
          {
            title: "Comptes rendus",
            body: "Après le rendez-vous, le compte rendu se rédige en quelques secondes et nourrit la fiche client.",
          },
        ],
      },
      {
        type: "cards",
        tone: "dark",
        cols: 2,
        variant: "bento",
        kicker: "Les garde-fous",
        title: "La confiance est une *architecture*.",
        cards: [
          {
            kicker: "Vocabulaire",
            title: "Mots interdits",
            body: "Chaque maison définit sa liste de formulations proscrites. L'IA ne les propose jamais : elles sont bloquées à la source.",
          },
          {
            kicker: "Contrôle",
            title: "Validation humaine",
            body: "Aucun message ne part sans relecture. L'IA rédige des brouillons ; l'envoi reste un geste humain, toujours.",
          },
          {
            kicker: "Ton",
            title: "La voix de la maison",
            body: "L'IA écrit selon la charte de la marque, pas selon ses habitudes. Le style se règle depuis la console.",
          },
          {
            kicker: "Économie",
            title: "Coût maîtrisé",
            body: "L'usage de l'IA est suivi et plafonné. Pas de facture surprise, pas de dépendance subie.",
          },
        ],
      },
    ],
  },

  en: {
    meta: {
      title: "AI copilot — guard-railed, useful, human-approved",
      description:
        "Message drafting in the brand's tone, client summaries, appointment reports. Blocked words, human approval before sending, controlled cost.",
    },
    hero: {
      kicker: "AI copilot",
      title: "An AI copilot. Not a *gimmick*.",
      lede: "It drafts in your house's tone, summarizes profiles, prepares reports. And nothing leaves without human approval.",
      demoLabel: "Request a demo",
      bg: "aurora",
      secondary: { label: "See the advisor workspace", key: "advisor" },
      mockup: {
        kind: "ai",
        labels: {
          title: "Draft — review before sending",
          badge: "Approval required",
          segments: [
            { text: "Madam, the piece you admired has arrived in boutique. " },
            { text: "Hurry, limited-time offer!", blocked: true },
            { text: " May I set it aside for your next visit?" },
          ],
          editLabel: "Edit",
          approveLabel: "Review & send",
          footnote: "Phrasings proscribed by the house are blocked before review even begins. The send button does not exist on the AI's side.",
        },
      },
    },
    sections: [
      {
        type: "split",
        photo: "ecriture",
        alt: "Fountain pen writing a letter on lined paper",
        kicker: "The review",
        title: "Nothing leaves without *approval*.",
        body: "The AI prepares, proposes, summarizes. The decision to send remains a human gesture — always. That is what trust is built on.",
        reverse: true,
        mockup: {
          kind: "ai",
          labels: {
            title: "Draft — review before sending",
            badge: "Approval required",
            segments: [
              { text: "Madam, the piece you admired has arrived in boutique. " },
              { text: "Hurry, limited-time offer!", blocked: true },
              { text: " May I set it aside for your next visit?" },
            ],
            editLabel: "Edit",
            approveLabel: "Review & send",
            footnote: "Phrasings proscribed by the house are blocked before review even begins.",
          },
        },
      },
      {
        type: "rows",
        tone: "cream",
        kicker: "The uses",
        title: "Useful *daily*. Or not at all.",
        lede: "Three uses, chosen because they save selling time, not because they make a good demo.",
        rows: [
          {
            title: "Messages in the right tone",
            body: "The AI drafts faithfully to the house's voice, in the client's language. The advisor adjusts and decides.",
          },
          {
            title: "Client summaries",
            body: "Before an appointment, the profile's essentials in a few lines: history, preferences, latest conversations.",
          },
          {
            title: "Appointment reports",
            body: "After the appointment, the report writes itself in seconds and feeds the client profile.",
          },
        ],
      },
      {
        type: "cards",
        tone: "dark",
        cols: 2,
        variant: "bento",
        kicker: "The guardrails",
        title: "Trust is an *architecture*.",
        cards: [
          {
            kicker: "Vocabulary",
            title: "Blocked words",
            body: "Each house defines its list of proscribed phrasings. The AI never proposes them: they are blocked at the source.",
          },
          {
            kicker: "Control",
            title: "Human approval",
            body: "No message leaves without review. The AI writes drafts; sending remains a human gesture, always.",
          },
          {
            kicker: "Tone",
            title: "The house's voice",
            body: "The AI writes according to the brand's guidelines, not its own habits. Style is tuned from the console.",
          },
          {
            kicker: "Economics",
            title: "Controlled cost",
            body: "AI usage is tracked and capped. No surprise invoice, no imposed dependency.",
          },
        ],
      },
    ],
  },
};
