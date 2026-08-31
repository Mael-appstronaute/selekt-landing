import type { Locale } from "@/lib/routes";

export type DemoContent = {
  meta: { title: string; description: string };
  hero: { kicker: string; title: string; lede: string };
  aside: {
    title: string;
    points: { title: string; body: string }[];
  };
  form: {
    name: string;
    company: string;
    email: string;
    role: string;
    roles: string[];
    /** libellé du champ libre affiché quand la fonction choisie est « Autre » */
    roleOther: string;
    network: string;
    networks: string[];
    message: string;
    messagePlaceholder: string;
    consent: string;
    privacyNote: string;
    submit: string;
    sending: string;
    successTitle: string;
    successBody: string;
    errorBody: string;
    required: string;
    invalidEmail: string;
  };
};

export const DEMO: Record<Locale, DemoContent> = {
  fr: {
    meta: {
      title: "Demander une démo",
      description:
        "Une démonstration guidée de Selekt Retail OS, adaptée à votre réseau de boutiques. Sans engagement.",
    },
    hero: {
      kicker: "Demander une démo",
      title: "Trente minutes. *Vos* cas d'usage.",
      lede: "Une démonstration guidée de la plateforme, préparée pour votre maison : vos métiers, vos questions, vos règles d'attribution.",
    },
    aside: {
      title: "Ce qui vous attend",
      points: [
        {
          title: "Une démonstration préparée",
          body: "Nous partons de votre organisation : réseau, métiers, outils en place. Pas d'un socle universel.",
        },
        {
          title: "Les sujets qui fâchent, d'abord",
          body: "Attribution du CA, RGPD, isolation des données, reprise de l'existant : venez avec vos questions difficiles.",
        },
        {
          title: "Sans engagement",
          body: "Vous repartez avec une vision claire de ce que Selekt changerait chez vous. La suite vous appartient.",
        },
      ],
    },
    form: {
      name: "Nom complet",
      company: "Maison / société",
      email: "E-mail professionnel",
      role: "Votre fonction",
      roles: [
        "Direction retail",
        "Direction relation client",
        "Direction commerciale réseau",
        "Direction générale",
        "Autre",
      ],
      roleOther: "Précisez votre poste",
      network: "Taille du réseau",
      networks: ["1 à 5 boutiques", "6 à 20 boutiques", "21 à 50 boutiques", "Plus de 50 boutiques"],
      message: "Votre contexte (facultatif)",
      messagePlaceholder: "Vos outils actuels, vos échéances, vos questions…",
      consent:
        "J'accepte que ces informations soient utilisées pour me recontacter au sujet de ma demande de démonstration.",
      privacyNote:
        "Ces données servent uniquement à traiter votre demande. Elles ne sont ni cédées, ni utilisées à d'autres fins.",
      submit: "Envoyer la demande",
      sending: "Envoi en cours…",
      successTitle: "Demande bien reçue.",
      successBody: "Nous revenons vers vous rapidement pour convenir d'un créneau.",
      errorBody: "L'envoi a échoué. Merci de réessayer dans un instant.",
      required: "Ce champ est requis.",
      invalidEmail: "Adresse e-mail invalide.",
    },
  },
  en: {
    meta: {
      title: "Request a demo",
      description:
        "A guided demonstration of Selekt Retail OS, tailored to your boutique network. No commitment.",
    },
    hero: {
      kicker: "Request a demo",
      title: "Thirty minutes. *Your* use cases.",
      lede: "A guided demonstration of the platform, prepared for your house: your roles, your questions, your attribution rules.",
    },
    aside: {
      title: "What to expect",
      points: [
        {
          title: "A prepared demonstration",
          body: "We start from your organization: network, roles, tools in place. Not a universal template.",
        },
        {
          title: "The hard topics first",
          body: "Revenue attribution, GDPR, data isolation, migration of existing data: bring your difficult questions.",
        },
        {
          title: "No commitment",
          body: "You leave with a clear view of what Selekt would change for you. What happens next is up to you.",
        },
      ],
    },
    form: {
      name: "Full name",
      company: "House / company",
      email: "Business email",
      role: "Your role",
      roles: [
        "Retail management",
        "Client relationship management",
        "Network sales management",
        "Executive management",
        "Other",
      ],
      roleOther: "Specify your role",
      network: "Network size",
      networks: ["1 to 5 boutiques", "6 to 20 boutiques", "21 to 50 boutiques", "More than 50 boutiques"],
      message: "Your context (optional)",
      messagePlaceholder: "Your current tools, your timeline, your questions…",
      consent:
        "I agree that this information may be used to contact me about my demonstration request.",
      privacyNote:
        "This data is used solely to process your request. It is neither shared nor used for any other purpose.",
      submit: "Send the request",
      sending: "Sending…",
      successTitle: "Request received.",
      successBody: "We will get back to you shortly to arrange a time slot.",
      errorBody: "Sending failed. Please try again in a moment.",
      required: "This field is required.",
      invalidEmail: "Invalid email address.",
    },
  },
};
