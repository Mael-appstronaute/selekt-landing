"use client";

// Accord de confidentialité Partenaires & Freelances signable en ligne,
// dupliqué du site appstronaute.com (/accord-confidentialite) et habillé au
// langage design Selekt (crème/ink/brass). Partie A inchangée : APPSTRONAUTE,
// pré-signée Rehane Ikhlef « Bon pour accord » — cohérent avec les contrats
// déjà en prod sur selekt-retail.com/c/*. Envoi FormSubmit navigateur →
// appstronaute@gmail.com (+cc contact@selekt-retail.com), téléchargement PDF
// via fenêtre d'impression autonome (source unique).

import { useEffect, useMemo, useRef, useState } from "react";

const FORM_EMAIL = "appstronaute@gmail.com";
const CONTACT_EMAIL = "contact@selekt-retail.com";
const SIG_A_SRC = "/legal/signature-appstronaute.png";

/* Même habillage de champ que le formulaire de démo */
const fieldClass =
  "w-full rounded-md border border-ink/20 bg-paper px-4 py-3 text-[0.95rem] text-ink placeholder:text-ink/35 transition-colors focus:border-brass focus:outline-none";

const FONCTIONS = [
  "Setter / prospection",
  "Closer / Sales / Business developer",
  "Chef de projet / Product owner",
  "Designer UI-UX / Graphiste",
  "Développeur",
  "Testeur / QA",
  "Autre",
] as const;

type PartnerType = "agence" | "freelance";
type Status = "idle" | "sending" | "sent" | "error";

interface Fields {
  denomination: string;
  forme: string;
  capital: string;
  rcsVille: string;
  rcsNumero: string;
  siege: string;
  representant: string;
  fonctionRep: string;
  nomComplet: string;
  statut: string;
  siren: string;
  registre: string;
  registreVille: string;
  adresse: string;
  dateNaissance: string;
  lieuNaissance: string;
  email: string;
  telephone: string;
  villeSignature: string;
  fonctionAutre: string;
}

const EMPTY: Fields = {
  denomination: "",
  forme: "",
  capital: "",
  rcsVille: "",
  rcsNumero: "",
  siege: "",
  representant: "",
  fonctionRep: "",
  nomComplet: "",
  statut: "micro-entrepreneur",
  siren: "",
  registre: "RNE",
  registreVille: "",
  adresse: "",
  dateNaissance: "",
  lieuNaissance: "",
  email: "",
  telephone: "",
  villeSignature: "",
  fonctionAutre: "",
};

/* Valeur dynamique injectée dans le texte du contrat */
function V({ v, ph }: { v: string; ph: string }) {
  return v ? (
    <span className="nda-val">{v}</span>
  ) : (
    <span className="nda-miss">[{ph}]</span>
  );
}

function partnerName(type: PartnerType, f: Fields) {
  return type === "agence" ? f.denomination : f.nomComplet;
}

function signataireB(type: PartnerType, f: Fields) {
  return type === "agence" ? f.representant : f.nomComplet;
}

function qualiteB(type: PartnerType, f: Fields) {
  return type === "agence" ? f.fonctionRep : "Entrepreneur individuel";
}

/* ------------------------------------------------------------------ */
/* Corps du contrat — source unique écran / impression                 */
/* ------------------------------------------------------------------ */

function ContractBody({
  type,
  f,
  fonctions,
  dateStr,
  partnerSigUrl,
}: {
  type: PartnerType;
  f: Fields;
  fonctions: string[];
  dateStr: string;
  partnerSigUrl: string | null;
}) {
  const fonctionsLabel = fonctions.length
    ? fonctions
        .map((x) => (x === "Autre" && f.fonctionAutre ? `Autre : ${f.fonctionAutre}` : x))
        .join(", ")
    : "";

  return (
    <article className="nda-body">
      <header>
        <h2 className="nda-doc-title">
          Accord de confidentialité — Partenaires &amp; Freelances — Appstronaute
        </h2>
        <p className="nda-confidentiel">CONFIDENTIEL</p>
        <p>
          Accord de confidentialité, de non-sollicitation et de protection du secret des
          affaires, applicable à toute agence partenaire ou à tout freelance intervenant pour
          Appstronaute, quel que soit son poste (closer, setter, sales, chef de projet,
          designer, développeur, testeur, etc.).
        </p>
      </header>

      <h3>Entre les soussignés</h3>
      <p>
        <strong>APPSTRONAUTE</strong>, société par actions simplifiée au capital de 43 500 €,
        immatriculée au RCS de Marseille sous le numéro 934 416 496 (SIRET 934 416 496 00016,
        TVA FR37934416496), dont le siège social est situé 40 avenue de Saint-Antoine, 13015
        Marseille, représentée par la société House of Morpheus, en sa qualité de Présidente,
        elle-même représentée par Rehane Ikhlef, Président, dûment habilité,
      </p>
      <p>
        Ci-après dénommée « <strong>Appstronaute</strong> » ou « <strong>l&apos;Agence</strong> »,
      </p>
      <p>D&apos;une part,</p>
      <p>ET</p>
      {type === "agence" ? (
        <p>
          <V v={f.denomination} ph="Dénomination sociale" />, <V v={f.forme} ph="forme sociale" />{" "}
          au capital de <V v={f.capital} ph="montant" /> €, immatriculée au RCS de{" "}
          <V v={f.rcsVille} ph="ville" /> sous le numéro <V v={f.rcsNumero} ph="numéro" />, dont
          le siège social est situé <V v={f.siege} ph="adresse" />, représentée par{" "}
          <V v={f.representant} ph="nom" />, en sa qualité de <V v={f.fonctionRep} ph="fonction" />,
          dûment habilité(e),
        </p>
      ) : (
        <p>
          <V v={f.nomComplet} ph="Prénom Nom" />, entrepreneur individuel exerçant sous le statut
          de <V v={f.statut} ph="statut" />, immatriculé(e) sous le numéro SIREN{" "}
          <V v={f.siren} ph="numéro" /> au <V v={f.registre} ph="RCS / RNE" /> de{" "}
          <V v={f.registreVille} ph="ville" />, domicilié(e) professionnellement{" "}
          <V v={f.adresse} ph="adresse" />
          {(f.dateNaissance || f.lieuNaissance) && (
            <>
              , né(e) le <V v={f.dateNaissance} ph="date" /> à <V v={f.lieuNaissance} ph="lieu" />
            </>
          )}
          ,
        </p>
      )}
      <p>
        Ci-après dénommé(e) le « <strong>Partenaire</strong> »,
      </p>
      <p>D&apos;autre part,</p>
      <p>
        Appstronaute et le Partenaire étant ci-après désignés ensemble les «{" "}
        <strong>Parties</strong> » et individuellement une « <strong>Partie</strong> ».
      </p>

      <h3>Préambule</h3>
      <p>
        Appstronaute est une agence de développement spécialisée dans la conception de design
        graphique (charte graphique, logo, maquettes), de sites internet et d&apos;applications
        mobiles et web pour startups et entreprises.
      </p>
      <p>
        Dans le cadre de son activité, Appstronaute fait appel à des agences partenaires et à
        des professionnels indépendants pour intervenir, selon les besoins, sur la prospection
        et la vente (setting, closing, business development), la gestion de projet, le design,
        le développement, les tests et la recette, ou toute autre fonction.
      </p>
      <p>
        Pour exercer ces missions, le Partenaire accède nécessairement à des informations
        stratégiques d&apos;Appstronaute et de ses clients : méthodes commerciales, tarifs et
        marges, fichiers de prospects et de clients, projets en cours, codes sources, maquettes,
        accès aux outils et environnements techniques. Ces informations ont une valeur
        commerciale considérable, sont le fruit d&apos;investissements importants et font
        l&apos;objet de mesures de protection raisonnables. Elles constituent, pour une large
        part, des secrets d&apos;affaires au sens des articles L. 151-1 et suivants du Code de
        commerce.
      </p>
      <p>
        Appstronaute a elle-même souscrit envers ses clients des engagements de confidentialité
        et de protection des données, qu&apos;elle ne peut respecter que si ses partenaires
        s&apos;y soumettent strictement.
      </p>
      <p>
        Le Partenaire reconnaît que le respect du présent Accord constitue une{" "}
        <strong>condition essentielle et déterminante</strong> du consentement
        d&apos;Appstronaute à toute collaboration, sans laquelle Appstronaute n&apos;aurait pas
        contracté.
      </p>
      <p>
        Les Parties déclarent qu&apos;elles sont et demeureront, pendant toute la durée de leurs
        relations, des professionnels indépendants. Le présent Accord n&apos;emporte aucun lien
        de subordination, aucun mandat, aucune société ni aucune exclusivité.
      </p>
      <p>Le préambule fait partie intégrante de l&apos;Accord.</p>
      <p>
        <strong>IL A ÉTÉ ARRÊTÉ ET CONVENU CE QUI SUIT :</strong>
      </p>

      <h3>Article 1. Définitions</h3>
      <p>
        Les termes ci-dessous, employés avec une majuscule, ont la signification suivante, au
        singulier comme au pluriel.
      </p>
      <p>
        « <strong>Accord</strong> » : le présent accord, son préambule et ses annexes.
      </p>
      <p>
        « <strong>Client</strong> » : toute personne physique ou morale ayant conclu, concluant
        ou ayant été en discussion avec Appstronaute pour la réalisation d&apos;un projet, y
        compris ses dirigeants, salariés et utilisateurs.
      </p>
      <p>
        « <strong>Prospect</strong> » : toute personne physique ou morale identifiée, contactée,
        qualifiée ou démarchée par ou pour le compte d&apos;Appstronaute, y compris tout lead
        issu de campagnes publicitaires, de formulaires, de salons, de recommandations ou de la
        prospection du Partenaire pour le compte d&apos;Appstronaute.
      </p>
      <p>
        « <strong>Informations Confidentielles</strong> » : toutes informations, données,
        documents et savoir-faire, de quelque nature que ce soit (commerciale, financière,
        technique, stratégique, juridique, organisationnelle ou autre) et sous quelque forme ou
        support que ce soit (écrit, oral, visuel, électronique, code, fichier, enregistrement),
        relatifs à Appstronaute, à ses Clients, Prospects, partenaires, fournisseurs ou
        sous-traitants, communiqués au Partenaire ou auxquels il accède, directement ou
        indirectement, avant ou après la signature de l&apos;Accord, qu&apos;ils soient ou non
        marqués « confidentiel ». Sont notamment, et sans que cette liste soit limitative, des
        Informations Confidentielles :
      </p>
      <ul>
        <li>
          les fichiers et listes de Clients et de Prospects, leurs coordonnées, besoins,
          budgets, historiques d&apos;échanges et statuts dans le pipeline commercial ;
        </li>
        <li>
          les méthodes de prospection et de vente, scripts d&apos;appels, séquences de relance,
          argumentaires, traitements d&apos;objections, enregistrements d&apos;appels, supports
          de présentation et propositions commerciales ;
        </li>
        <li>
          la politique tarifaire, les devis, grilles de prix, marges, taux de conversion,
          chiffre d&apos;affaires, commissions, rémunérations des partenaires et conditions
          négociées ;
        </li>
        <li>
          les projets des Clients, leurs idées, concepts, business models, cahiers des charges,
          documents découverte, roadmaps, calendriers et informations non publiques ;
        </li>
        <li>
          les maquettes, wireframes, fichiers de conception (Figma ou équivalent), chartes
          graphiques, logos, prototypes et assets, y compris non retenus ;
        </li>
        <li>
          les codes sources et objets, architectures, bases de données, schémas, API, dépôts de
          code, scripts, configurations, variables d&apos;environnement, clés et secrets
          techniques ;
        </li>
        <li>
          les plans de test, cas de recette, rapports d&apos;anomalies et vulnérabilités
          identifiées ;
        </li>
        <li>les identifiants, mots de passe, accès aux outils, comptes et environnements ;</li>
        <li>
          les processus internes, méthodologies, templates, outils, automatisations et
          savoir-faire d&apos;Appstronaute ;
        </li>
        <li>les données à caractère personnel ;</li>
        <li>
          l&apos;existence, le contenu et les conditions de l&apos;Accord et de toute mission
          confiée au Partenaire ;
        </li>
        <li>
          plus généralement, toute information dont le caractère confidentiel résulte de sa
          nature ou des circonstances de sa communication.
        </li>
      </ul>
      <p>
        « <strong>Secrets d&apos;Affaires</strong> » : les Informations Confidentielles
        répondant aux critères de l&apos;article L. 151-1 du Code de commerce.
      </p>
      <p>
        « <strong>Données Personnelles</strong> » : toute information se rapportant à une
        personne physique identifiée ou identifiable, au sens de l&apos;article 4 du Règlement
        (UE) 2016/679 du 27 avril 2016 (« RGPD »).
      </p>
      <p>
        « <strong>Mission</strong> » : toute prestation confiée par Appstronaute au Partenaire,
        quel que soit son support contractuel (contrat de sous-traitance, contrat d&apos;apport
        d&apos;affaires, bon de commande, devis, échange écrit).
      </p>
      <p>
        « <strong>Outils</strong> » : l&apos;ensemble des logiciels, plateformes et services
        utilisés dans le cadre des Missions, notamment le CRM, les messageries (Slack, WhatsApp,
        Discord, e-mail), les outils de gestion de projet (Odoo, Trello, Notion ou équivalent),
        de conception (Figma ou équivalent), les dépôts de code (GitHub, GitLab ou équivalent),
        les environnements d&apos;hébergement et de test, et Google Workspace.
      </p>
      <p>
        « <strong>Personnel</strong> » : pour une agence partenaire, ses dirigeants, salariés,
        stagiaires, alternants, prestataires et sous-traitants ; pour un freelance, lui-même et
        toute personne à laquelle il aurait été autorisé à recourir en application de
        l&apos;article 6.
      </p>
      <p>
        « <strong>Écrit</strong> » : tout moyen de communication habituellement utilisé entre
        les Parties, tel que e-mail, Slack, WhatsApp, Odoo, Discord, Trello ou Google Workspace.
        Les notifications de manquement et de mise en demeure sont toutefois faites par lettre
        recommandée avec avis de réception ou lettre recommandée électronique.
      </p>

      <h3>Article 2. Objet et champ d&apos;application</h3>
      <p>
        <strong>2-1. Objet.</strong> L&apos;Accord fixe les conditions dans lesquelles le
        Partenaire protège les Informations Confidentielles, les Secrets d&apos;Affaires, les
        Données Personnelles, la clientèle et les équipes d&apos;Appstronaute.
      </p>
      <p>
        <strong>2-2. Accord cadre.</strong> L&apos;Accord s&apos;applique à l&apos;ensemble des
        Missions, présentes et futures, confiées au Partenaire, sans qu&apos;il soit nécessaire
        de le rappeler. Il prévaut sur toute stipulation contraire ou moins protectrice figurant
        dans un devis, des conditions générales du Partenaire ou tout autre document, sauf
        dérogation écrite, expresse et signée par Appstronaute visant le présent article.
      </p>
      <p>
        <strong>2-3. Antériorité.</strong> L&apos;Accord couvre également les Informations
        Confidentielles communiquées pendant la phase de discussion, d&apos;entretien, de test
        ou de négociation ayant précédé sa signature, conformément à l&apos;article 1112-2 du
        Code civil.
      </p>
      <p>
        <strong>2-4. Fonctions couvertes.</strong> L&apos;Accord s&apos;applique quel que soit
        le poste occupé. Le Partenaire est notamment soumis aux obligations renforcées
        ci-dessous selon sa fonction, précisée en Annexe 1. Ces obligations s&apos;ajoutent aux
        obligations générales et ne les limitent pas.
      </p>
      <table className="nda-table">
        <thead>
          <tr>
            <th>Fonction</th>
            <th>Informations particulièrement exposées</th>
            <th>Obligations renforcées</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Setter / prospection</td>
            <td>Listes de Prospects, leads, séquences, scripts, statuts CRM</td>
            <td>
              Aucun export, copie ou capture des listes ; contact des Prospects uniquement
              depuis les comptes et numéros fournis par Appstronaute ; aucune conservation de
              contacts sur un téléphone ou compte personnel
            </td>
          </tr>
          <tr>
            <td>Closer / sales / business developer</td>
            <td>Tarifs, marges, remises, propositions, enregistrements d&apos;appels, pipeline</td>
            <td>
              Aucune communication de prix hors grille validée ; aucun enregistrement
              d&apos;appel sans information préalable de l&apos;interlocuteur et accord
              d&apos;Appstronaute ; aucune proposition d&apos;offre concurrente ou parallèle au
              Prospect
            </td>
          </tr>
          <tr>
            <td>Chef de projet / product owner</td>
            <td>Cahiers des charges, roadmaps, budgets, échanges Clients, calendriers</td>
            <td>
              Échanges avec le Client uniquement via les canaux d&apos;Appstronaute ; aucune
              relation directe hors Mission ; aucune mention de l&apos;intervention en
              sous-traitance auprès du Client sans accord d&apos;Appstronaute
            </td>
          </tr>
          <tr>
            <td>Designer UI/UX / graphiste</td>
            <td>Maquettes, fichiers Figma, chartes, logos, pistes non retenues</td>
            <td>
              Fichiers conservés dans l&apos;espace d&apos;Appstronaute uniquement ; aucune
              publication sur Behance, Dribbble, Instagram, LinkedIn ou portfolio, même
              partielle, floutée ou après livraison
            </td>
          </tr>
          <tr>
            <td>Développeur</td>
            <td>Codes sources, dépôts, architectures, clés API, secrets, bases de données</td>
            <td>
              Code hébergé uniquement sur les dépôts d&apos;Appstronaute ou du Client ; aucun
              fork ou copie personnelle ; aucun secret en clair dans le code ; aucune
              réutilisation de code spécifique dans un autre projet ; aucun versement dans un
              dépôt public
            </td>
          </tr>
          <tr>
            <td>Testeur / QA</td>
            <td>Comptes de test, données de recette, anomalies, failles</td>
            <td>
              Vulnérabilités signalées exclusivement à Appstronaute ; aucune exploitation,
              divulgation ou publication, même après correction
            </td>
          </tr>
          <tr>
            <td>Toute autre fonction (marketing, support, data, administratif…)</td>
            <td>Selon accès</td>
            <td>Application intégrale de l&apos;Accord</td>
          </tr>
        </tbody>
      </table>

      <h3>Article 3. Obligations de confidentialité</h3>
      <p>
        <strong>3-1. Obligation de secret.</strong> Le Partenaire s&apos;engage à garder
        strictement secrètes les Informations Confidentielles et à ne pas les divulguer,
        directement ou indirectement, en tout ou partie, à quelque tiers que ce soit, sans
        l&apos;accord préalable et écrit d&apos;Appstronaute.
      </p>
      <p>
        <strong>3-2. Usage restreint.</strong> Le Partenaire n&apos;utilise les Informations
        Confidentielles que pour l&apos;exécution des Missions et dans la stricte mesure
        nécessaire. Il s&apos;interdit notamment de les utiliser :
      </p>
      <ul>
        <li>pour son propre compte ou pour le compte d&apos;un tiers ;</li>
        <li>
          pour démarcher, conseiller ou servir un Client ou un Prospect en dehors
          d&apos;Appstronaute ;
        </li>
        <li>
          pour concevoir, développer, entraîner ou alimenter un produit, un service, un outil ou
          un modèle d&apos;intelligence artificielle ;
        </li>
        <li>
          pour concurrencer Appstronaute ou lui porter préjudice de quelque manière que ce soit.
        </li>
      </ul>
      <p>
        <strong>3-3. Interdiction de reproduction.</strong> Le Partenaire ne copie, reproduit,
        extrait, télécharge, exporte, photographie, capture ou transfère aucune Information
        Confidentielle, sauf nécessité impérative de la Mission et sur les seuls supports et
        Outils autorisés par Appstronaute. Toute copie autorisée reste la propriété
        d&apos;Appstronaute et est soumise à l&apos;Accord.
      </p>
      <p>
        <strong>3-4. Diffusion interne limitée (« besoin d&apos;en connaître »).</strong> Le
        Partenaire ne communique les Informations Confidentielles qu&apos;aux seuls membres de
        son Personnel qui en ont strictement besoin pour exécuter la Mission, préalablement
        désignés à Appstronaute et liés par un engagement écrit au moins aussi protecteur que
        l&apos;Accord (Annexe 2).
      </p>
      <p>
        <strong>3-5. Niveau de protection.</strong> Le Partenaire protège les Informations
        Confidentielles avec un soin au moins égal à celui qu&apos;il apporte à ses propres
        informations les plus sensibles, et en tout état de cause avec un niveau de protection
        conforme aux standards professionnels et à l&apos;article 4.
      </p>
      <p>
        <strong>3-6. Confidentialité de la relation.</strong> Sauf accord écrit
        d&apos;Appstronaute, le Partenaire s&apos;interdit de révéler l&apos;existence et le
        contenu de l&apos;Accord et des Missions, l&apos;identité des Clients, ainsi que le fait
        qu&apos;il intervient pour Appstronaute sur un projet donné. En particulier, il ne se
        présente pas auprès des Clients et Prospects comme un tiers indépendant
        d&apos;Appstronaute, ni comme un salarié ou un associé d&apos;Appstronaute s&apos;il ne
        l&apos;est pas ; il intervient au nom d&apos;Appstronaute selon les consignes de
        présentation reçues par Écrit.
      </p>
      <p>
        <strong>3-7. Exceptions.</strong> Ne sont pas soumises à l&apos;obligation de secret les
        informations dont le Partenaire prouve, par écrit et documents datés, qu&apos;elles :
      </p>
      <ul>
        <li>
          étaient licitement dans le domaine public au moment de leur communication, ou y sont
          tombées ensuite sans faute de sa part ;
        </li>
        <li>
          étaient déjà licitement en sa possession, sans obligation de confidentialité, avant
          leur communication ;
        </li>
        <li>
          lui ont été communiquées licitement par un tiers autorisé à les divulguer, sans
          obligation de confidentialité ;
        </li>
        <li>
          ont été développées par lui de manière indépendante, sans accès aux Informations
          Confidentielles.
        </li>
      </ul>
      <p>
        Une information n&apos;entre pas dans ces exceptions du seul fait que certains de ses
        éléments sont publics, ni parce qu&apos;elle pourrait être reconstituée à partir
        d&apos;informations publiques. La charge de la preuve de l&apos;exception incombe au
        Partenaire.
      </p>
      <p>
        <strong>3-8. Divulgation imposée ou légalement protégée.</strong> Si le Partenaire est
        tenu de divulguer une Information Confidentielle en vertu de la loi, d&apos;une décision
        de justice ou d&apos;une demande d&apos;une autorité, il en informe Appstronaute par
        Écrit sans délai et avant toute divulgation, lorsque la loi le permet, afin de lui
        permettre de s&apos;y opposer. Il ne divulgue que la partie strictement exigée.
      </p>
      <p>
        Conformément aux articles L. 151-7 et L. 151-8 du Code de commerce et à la loi n°
        2016-1691 du 9 décembre 2016 modifiée relative aux lanceurs d&apos;alerte, aucune
        stipulation de l&apos;Accord ne fait obstacle à l&apos;exercice légitime du droit
        d&apos;alerte, à l&apos;exercice de la liberté d&apos;expression et d&apos;information
        dans les conditions prévues par la loi, ni à la communication d&apos;informations aux
        autorités administratives ou judiciaires dans l&apos;exercice de leurs pouvoirs.
      </p>
      <p>
        <strong>3-9. Secret des affaires.</strong> Le Partenaire reconnaît que les Informations
        Confidentielles constituent, pour l&apos;essentiel, des Secrets d&apos;Affaires
        d&apos;Appstronaute ou de ses Clients, dont la valeur commerciale tient à leur caractère
        secret et qui font l&apos;objet des mesures de protection décrites dans l&apos;Accord.
        Toute obtention, utilisation ou divulgation non autorisée constitue, outre un manquement
        contractuel, une atteinte au secret des affaires au sens des articles L. 151-4 à L.
        151-6 du Code de commerce, ouvrant droit aux mesures et réparations prévues aux articles
        L. 152-1 et suivants du même code.
      </p>
      <p>
        <strong>3-10. Absence de licence et de garantie.</strong> La communication
        d&apos;Informations Confidentielles ne confère au Partenaire aucun droit, titre, licence
        ou option sur celles-ci. Elles sont communiquées « en l&apos;état », sans garantie
        d&apos;exactitude ou d&apos;exhaustivité.
      </p>

      <h3>Article 4. Sécurité, outils et usages numériques</h3>
      <p>
        Les règles du présent article sont des objectifs de sécurité liés à la protection des
        informations. Elles n&apos;ont ni pour objet ni pour effet de régir l&apos;organisation
        du travail du Partenaire, qui reste libre de ses méthodes, horaires et moyens.
      </p>
      <p>
        <strong>4-1. Accès et identifiants.</strong> Les accès fournis par Appstronaute sont
        nominatifs, personnels et incessibles. Le Partenaire s&apos;engage à :
      </p>
      <ul>
        <li>
          utiliser des mots de passe robustes et uniques, stockés dans un gestionnaire de mots
          de passe, et activer l&apos;authentification à deux facteurs partout où elle est
          disponible ;
        </li>
        <li>
          ne jamais partager, prêter ou communiquer ses identifiants, y compris à un membre de
          son Personnel ;
        </li>
        <li>
          n&apos;utiliser que les comptes, Outils et canaux fournis ou validés par Appstronaute ;
        </li>
        <li>
          ne créer aucun compte, espace, groupe ou canal parallèle (groupe WhatsApp personnel,
          drive personnel, dépôt personnel) contenant des Informations Confidentielles.
        </li>
      </ul>
      <p>
        <strong>4-2. Équipements.</strong> Les équipements utilisés (ordinateur, téléphone)
        doivent être protégés par un mot de passe ou une authentification biométrique, disposer
        d&apos;un disque chiffré, d&apos;un système et d&apos;un antivirus à jour, et se
        verrouiller automatiquement. Le Partenaire n&apos;accède pas aux Informations
        Confidentielles depuis un équipement partagé ou public, ni via un réseau Wi-Fi public
        sans VPN.
      </p>
      <p>
        <strong>4-3. Discrétion.</strong> Le Partenaire s&apos;interdit d&apos;évoquer les
        Missions, Clients et Prospects dans les lieux publics, espaces de coworking ou
        transports d&apos;une manière permettant à un tiers d&apos;en prendre connaissance, et
        veille à ce que son écran ne soit pas visible par des tiers.
      </p>
      <p>
        <strong>4-4. Intelligence artificielle.</strong> Le Partenaire s&apos;interdit de
        saisir, téléverser ou soumettre toute Information Confidentielle ou Donnée Personnelle
        (notamment code source, maquettes, cahiers des charges, conversations Clients, fichiers
        de Prospects, enregistrements d&apos;appels) dans un outil d&apos;intelligence
        artificielle, de transcription ou de traduction, sauf si cet outil a été préalablement
        et expressément autorisé par Appstronaute par Écrit, et uniquement dans une
        configuration excluant l&apos;utilisation des données pour l&apos;entraînement des
        modèles. Tout contenu produit par ces outils à partir d&apos;Informations
        Confidentielles est lui-même une Information Confidentielle.
      </p>
      <p>
        <strong>4-5. Réseaux sociaux, portfolio et communication.</strong> Sauf accord
        préalable, écrit et spécifique d&apos;Appstronaute pour chaque contenu, le Partenaire
        s&apos;interdit de publier, présenter ou mentionner, sur tout support (site internet,
        portfolio, Behance, Dribbble, GitHub public, LinkedIn, Instagram, TikTok, X, YouTube,
        conférences, candidatures, appels d&apos;offres) :
      </p>
      <ul>
        <li>
          tout Livrable, maquette, capture d&apos;écran, extrait de code, vidéo ou élément
          d&apos;un projet, même partiel, flouté, anonymisé ou postérieur à la mise en ligne ;
        </li>
        <li>le nom ou le logo d&apos;un Client, ou le fait qu&apos;il a travaillé sur son projet ;</li>
        <li>tout résultat commercial, chiffre, témoignage ou méthode d&apos;Appstronaute.</li>
      </ul>
      <p>
        La mise en ligne publique d&apos;un projet par le Client ne vaut pas autorisation de le
        présenter.
      </p>
      <p>
        <strong>4-6. CRM, fichiers et bases de données.</strong> Le Partenaire reconnaît que les
        fichiers de Clients et de Prospects et le CRM d&apos;Appstronaute constituent des bases
        de données dont Appstronaute est productrice au sens des articles L. 341-1 et suivants
        du Code de la propriété intellectuelle. Toute extraction ou réutilisation, même non
        substantielle mais répétée et systématique, est interdite. Les Prospects générés par le
        Partenaire dans le cadre d&apos;une Mission appartiennent à Appstronaute et sont saisis
        exclusivement dans ses Outils.
      </p>
      <p>
        <strong>4-7. Code et environnements techniques.</strong> Le Partenaire s&apos;interdit
        de stocker des secrets (clés API, mots de passe, jetons) en clair dans le code ou les
        messageries, de rendre public un dépôt, d&apos;introduire volontairement dans un
        livrable un code malveillant, une porte dérobée, un mécanisme de blocage ou une
        dépendance non déclarée, et d&apos;intégrer un composant dont la licence serait
        incompatible avec l&apos;exploitation par Appstronaute ou le Client.
      </p>
      <p>
        <strong>4-8. Traçabilité.</strong> Le Partenaire est informé que l&apos;accès aux Outils
        fait l&apos;objet d&apos;une journalisation (connexions, exports, téléchargements,
        modifications) à des fins de sécurité et de preuve, conformément à la réglementation sur
        les Données Personnelles. Il accepte que ces journaux soient opposables à titre de
        preuve.
      </p>
      <p>
        <strong>4-9. Incident de sécurité.</strong> Le Partenaire notifie à Appstronaute par
        Écrit, dans les <strong>24 heures</strong> de sa connaissance, toute perte, vol,
        divulgation, accès non autorisé ou suspicion de compromission affectant des Informations
        Confidentielles, des identifiants ou un équipement. Il coopère pleinement aux mesures
        correctives et ne communique pas lui-même avec les Clients ou les tiers concernés sans
        accord d&apos;Appstronaute.
      </p>
      <p>
        <strong>4-10. Révocation des accès.</strong> Appstronaute peut suspendre ou révoquer à
        tout moment, sans préavis ni indemnité, tout ou partie des accès du Partenaire,
        notamment en cas de suspicion de manquement ou de fin de Mission.
      </p>
      <p>
        <strong>4-11. Contrôle.</strong> Le Partenaire remet, sur simple demande, une
        attestation écrite de conformité à l&apos;Accord et la liste des personnes ayant eu
        accès aux Informations Confidentielles. Pour une agence partenaire, Appstronaute peut en
        outre faire procéder, moyennant un préavis de 10 jours ouvrés, à un audit sur pièces ou
        à distance du respect de l&apos;Accord, dans la limite d&apos;un audit par an sauf
        incident.
      </p>

      <h3>Article 5. Personnel du Partenaire</h3>
      <p>
        <strong>5-1. Agence partenaire — porte-fort.</strong> Lorsque le Partenaire est une
        personne morale, il se porte fort, au sens de l&apos;article 1204 du Code civil, du
        respect de l&apos;Accord par l&apos;ensemble de son Personnel, y compris après le départ
        de celui-ci. Tout manquement commis par un membre de son Personnel est réputé commis par
        le Partenaire lui-même.
      </p>
      <p>
        <strong>5-2. Engagements individuels.</strong> Avant tout accès à une Information
        Confidentielle, le Partenaire fait signer à chaque membre de son Personnel concerné
        l&apos;engagement individuel figurant en Annexe 2, ou un engagement au moins aussi
        protecteur, et en remet copie à Appstronaute sur simple demande. Il tient à jour la
        liste des personnes intervenant sur les Missions.
      </p>
      <p>
        <strong>5-3. Départ d&apos;un membre du Personnel.</strong> En cas de départ ou de
        réaffectation d&apos;un membre de son Personnel, le Partenaire en informe Appstronaute
        par Écrit sans délai, afin que ses accès soient révoqués, et s&apos;assure de la
        restitution et de la destruction de toute Information Confidentielle détenue par cette
        personne.
      </p>
      <p>
        <strong>5-4. Freelance — exécution personnelle.</strong> Lorsque le Partenaire est un
        freelance, l&apos;intuitu personae est déterminant : il exécute personnellement les
        Missions et ne peut se faire assister, remplacer ou substituer sans l&apos;accord
        préalable et écrit d&apos;Appstronaute.
      </p>

      <h3>Article 6. Sous-traitance et tiers</h3>
      <p>
        Le Partenaire ne peut sous-traiter tout ou partie d&apos;une Mission, ni communiquer des
        Informations Confidentielles à un sous-traitant, prestataire, associé, apporteur
        d&apos;affaires ou toute autre personne extérieure, qu&apos;avec l&apos;accord
        préalable, écrit et spécifique d&apos;Appstronaute. En cas d&apos;accord, le Partenaire
        impose à ce tiers des obligations au moins équivalentes à celles de l&apos;Accord et
        demeure solidairement responsable envers Appstronaute de tout manquement de ce tiers.
      </p>

      <h3>Article 7. Propriété intellectuelle et savoir-faire</h3>
      <p>
        <strong>7-1. Propriété des informations.</strong> Les Informations Confidentielles
        demeurent la propriété exclusive d&apos;Appstronaute ou de ses Clients. Aucune
        stipulation de l&apos;Accord ne peut être interprétée comme une cession ou une licence à
        ce titre.
      </p>
      <p>
        <strong>7-2. Travaux réalisés.</strong> Les droits de propriété intellectuelle sur les
        livrables réalisés par le Partenaire sont régis par le contrat de Mission applicable. À
        défaut de stipulation contraire, le Partenaire s&apos;engage à céder à Appstronaute,
        dans les conditions de l&apos;article L. 131-3 du Code de la propriété intellectuelle,
        les droits patrimoniaux sur ces livrables, et s&apos;interdit dans tous les cas de les
        exploiter pour son compte ou celui d&apos;un tiers.
      </p>
      <p>
        <strong>7-3. Savoir-faire d&apos;Appstronaute.</strong> Les méthodes, processus,
        templates, scripts commerciaux, automatisations, composants et outils internes
        d&apos;Appstronaute auxquels le Partenaire accède ne peuvent être réutilisés, reproduits
        ou adaptés par lui en dehors des Missions, y compris sous une forme modifiée.
      </p>
      <p>
        <strong>7-4. Signes distinctifs.</strong> Le Partenaire s&apos;interdit d&apos;utiliser
        la dénomination, la marque, le logo, le nom de domaine ou tout signe distinctif
        d&apos;Appstronaute ou de ses Clients, sauf dans la stricte mesure nécessaire aux
        Missions. Il s&apos;interdit également de déposer ou réserver tout signe, nom de
        domaine, compte ou identifiant de réseau social identique ou similaire.
      </p>

      <h3>Article 8. Protection des Données Personnelles</h3>
      <p>
        <strong>8-1. Qualification.</strong> Dans la mesure où le Partenaire traite des Données
        Personnelles pour le compte d&apos;Appstronaute ou de ses Clients, il agit en qualité de
        sous-traitant, ou de sous-traitant ultérieur, au sens de l&apos;article 28 du RGPD. Les
        Parties conviennent que l&apos;Annexe 3 constitue le contrat de traitement requis par
        cet article.
      </p>
      <p>
        <strong>8-2. Engagements essentiels.</strong> Le Partenaire s&apos;engage notamment à :
      </p>
      <ul>
        <li>
          ne traiter les Données Personnelles que sur instruction documentée d&apos;Appstronaute
          et pour les seules finalités de la Mission ;
        </li>
        <li>
          n&apos;en effectuer aucune copie, extraction ou réutilisation, notamment à des fins de
          prospection pour son propre compte ;
        </li>
        <li>
          ne transférer aucune Donnée Personnelle hors de l&apos;Espace économique européen sans
          autorisation écrite d&apos;Appstronaute et garanties conformes aux articles 44 et
          suivants du RGPD ;
        </li>
        <li>
          notifier à Appstronaute toute violation de Données Personnelles dans un délai maximal
          de <strong>24 heures</strong> après en avoir pris connaissance, avec les informations
          prévues à l&apos;article 33.3 du RGPD ;
        </li>
        <li>
          respecter la réglementation applicable à la prospection commerciale, notamment
          l&apos;article L. 34-5 du Code des postes et des communications électroniques, les
          règles d&apos;opposition au démarchage téléphonique (liste Bloctel) et les
          restrictions relatives au démarchage téléphonique des consommateurs issues des
          articles L. 223-1 et suivants du Code de la consommation.
        </li>
      </ul>
      <p>
        <strong>8-3. Données du Partenaire.</strong> Appstronaute traite les données
        personnelles du Partenaire et de son Personnel pour la gestion de la relation, la
        sécurité des Outils et la preuve, sur le fondement de l&apos;exécution du contrat et de
        son intérêt légitime. Ces personnes disposent des droits prévus aux articles 15 à 22 du
        RGPD, qu&apos;elles exercent auprès d&apos;Appstronaute à l&apos;adresse
        contact@appstronaute.com, et peuvent saisir la CNIL.
      </p>

      <h3>Article 9. Non-sollicitation de la clientèle</h3>
      <p>
        <strong>9-1. Engagement.</strong> Pendant toute la durée des relations entre les Parties
        et pendant <strong>vingt-quatre (24) mois</strong> après leur cessation, pour quelque
        cause que ce soit, le Partenaire s&apos;interdit, directement ou indirectement, par
        personne ou société interposée, de :
      </p>
      <ul>
        <li>
          solliciter, démarcher, prospecter ou accepter de travailler pour tout Client ou
          Prospect avec lequel il a été en contact, ou dont il a eu connaissance, à
          l&apos;occasion d&apos;une Mission ;
        </li>
        <li>
          détourner ou tenter de détourner ces Clients ou Prospects au profit d&apos;un tiers,
          ou les inciter à réduire ou cesser leurs relations avec Appstronaute.
        </li>
      </ul>
      <p>
        <strong>9-2. Obligation d&apos;information.</strong> Si un Client ou un Prospect
        contacte directement le Partenaire, celui-ci en informe Appstronaute par Écrit sous 48
        heures et renvoie le Client ou le Prospect vers Appstronaute.
      </p>
      <p>
        <strong>9-3. Dérogation.</strong> Le Partenaire peut travailler directement avec un
        Client ou un Prospect visé ci-dessus uniquement avec l&apos;accord préalable et écrit
        d&apos;Appstronaute, qui peut être subordonné au versement d&apos;une commission
        convenue par Écrit.
      </p>
      <p>
        <strong>9-4. Portée.</strong> Cette clause ne constitue pas une clause de
        non-concurrence : le Partenaire reste libre d&apos;exercer son activité auprès de toute
        autre clientèle. Les Parties reconnaissent qu&apos;elle est limitée dans le temps et à
        la seule clientèle rencontrée par l&apos;intermédiaire d&apos;Appstronaute, et
        qu&apos;elle est proportionnée à la protection des intérêts légitimes
        d&apos;Appstronaute, qui supporte seule le coût d&apos;acquisition de ses Clients et
        Prospects.
      </p>

      <h3>Article 10. Non-sollicitation du personnel</h3>
      <p>
        <strong>10-1. Engagement.</strong> Pendant toute la durée des relations entre les
        Parties et pendant <strong>douze (12) mois</strong> après leur cessation, le Partenaire
        s&apos;interdit, directement ou indirectement, de solliciter, recruter, embaucher ou
        faire travailler, sous quelque forme que ce soit (salariat, freelance, sous-traitance),
        toute personne salariée d&apos;Appstronaute ou tout prestataire indépendant ou agence
        partenaire intervenant pour Appstronaute, avec lequel il a été en contact à
        l&apos;occasion d&apos;une Mission, ni les inciter à cesser ou réduire leur
        collaboration avec Appstronaute.
      </p>
      <p>
        <strong>10-2. Réciprocité.</strong> Appstronaute s&apos;interdit de même, pendant la
        même durée, de solliciter directement un salarié d&apos;une agence partenaire affecté
        aux Missions, sans l&apos;accord de cette dernière.
      </p>
      <p>
        <strong>10-3. Limite.</strong> Ne constitue pas un manquement le recrutement d&apos;une
        personne ayant répondu spontanément, sans sollicitation, à une offre d&apos;emploi
        diffusée publiquement. Cette limite est destinée à préserver la liberté de travailler
        des personnes concernées et la validité de la clause.
      </p>

      <h3>Article 11. Sanctions des manquements</h3>
      <p>
        <strong>11-1. Clauses pénales.</strong> Tout manquement du Partenaire aux obligations
        ci-dessous entraîne de plein droit le paiement à Appstronaute des pénalités forfaitaires
        suivantes, que les Parties ont évaluées ensemble en considération de la valeur des
        informations protégées, du coût d&apos;acquisition des Clients et Prospects, de
        l&apos;atteinte à l&apos;image d&apos;Appstronaute et de ses engagements envers ses
        Clients.
      </p>
      <table className="nda-table">
        <thead>
          <tr>
            <th>Manquement</th>
            <th>Agence partenaire</th>
            <th>Freelance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              Divulgation ou utilisation non autorisée d&apos;Informations Confidentielles
              (art. 3, 4-4, 4-6, 4-7, 7)
            </td>
            <td>20 000 € par manquement</td>
            <td>10 000 € par manquement</td>
          </tr>
          <tr>
            <td>Publication non autorisée (art. 4-5)</td>
            <td>
              5 000 € par contenu publié, et 300 € par jour de maintien en ligne après demande
              de retrait
            </td>
            <td>
              3 000 € par contenu publié, et 150 € par jour de maintien en ligne après demande
              de retrait
            </td>
          </tr>
          <tr>
            <td>Sollicitation ou détournement d&apos;un Client ou Prospect (art. 9)</td>
            <td>
              15 000 € par Client ou Prospect, majorés de 30 % du chiffre d&apos;affaires HT
              réalisé avec lui pendant la période d&apos;interdiction
            </td>
            <td>
              8 000 € par Client ou Prospect, majorés de 30 % du chiffre d&apos;affaires HT
              réalisé avec lui pendant la période d&apos;interdiction
            </td>
          </tr>
          <tr>
            <td>Sollicitation ou recrutement d&apos;un membre des équipes (art. 10)</td>
            <td>
              12 mois de la dernière rémunération brute ou des honoraires de la personne, avec
              un minimum de 10 000 €
            </td>
            <td>
              6 mois de la dernière rémunération brute ou des honoraires de la personne, avec un
              minimum de 5 000 €
            </td>
          </tr>
          <tr>
            <td>Retard dans la restitution ou la destruction (art. 13)</td>
            <td>200 € par jour de retard</td>
            <td>100 € par jour de retard</td>
          </tr>
        </tbody>
      </table>
      <p>
        Ces pénalités constituent des clauses pénales au sens de l&apos;article 1231-5 du Code
        civil. S&apos;agissant d&apos;obligations de ne pas faire dont la violation constitue
        une inexécution définitive, elles sont exigibles dès la constatation du manquement, sans
        mise en demeure préalable, sauf pour les pénalités journalières qui courent à compter
        d&apos;une demande par Écrit. Elles sont dues pour chaque manquement constaté et se
        cumulent en cas de manquements distincts. Leur paiement ne libère pas le Partenaire de
        son obligation de cesser le manquement et ne prive pas Appstronaute du droit de demander
        la réparation de son préjudice dans la mesure où il excède le montant des pénalités.
      </p>
      <p>
        <strong>11-2. Mesures d&apos;urgence.</strong> Le Partenaire reconnaît qu&apos;une
        violation de l&apos;Accord peut causer à Appstronaute un préjudice immédiat et
        difficilement réparable. Appstronaute peut solliciter en référé ou sur requête toute
        mesure propre à prévenir ou faire cesser une atteinte, notamment celles prévues aux
        articles L. 152-3 et L. 152-4 du Code de commerce et R. 152-1 du même code (saisie,
        interdiction d&apos;utilisation, rappel, destruction, retrait de publication), sans
        préjudice de la procédure amiable prévue à l&apos;article 15.
      </p>
      <p>
        <strong>11-3. Garantie.</strong> Le Partenaire garantit Appstronaute contre toute
        réclamation, action ou condamnation d&apos;un Client ou d&apos;un tiers résultant
        d&apos;un manquement à l&apos;Accord imputable au Partenaire ou à son Personnel, et
        l&apos;indemnise de toutes les sommes mises à sa charge, y compris les frais
        raisonnables de défense et d&apos;avocat.
      </p>
      <p>
        <strong>11-4. Rupture de la relation.</strong> Tout manquement à l&apos;Accord constitue
        une inexécution suffisamment grave au sens des articles 1224 et 1226 du Code civil.
        Appstronaute peut, par notification écrite motivée, mettre fin immédiatement à tout ou
        partie des Missions en cours, sans préavis ni indemnité. En cas d&apos;urgence,
        notamment de divulgation en cours, la mise en demeure préalable n&apos;est pas requise.
        Appstronaute peut par ailleurs suspendre tout paiement dû au Partenaire au titre des
        Missions concernées, dans les conditions de l&apos;article 1219 du Code civil,
        jusqu&apos;à cessation du manquement.
      </p>
      <p>
        <strong>11-5. Assurance.</strong> Le Partenaire déclare être titulaire d&apos;une
        assurance de responsabilité civile professionnelle couvrant les conséquences de ses
        manquements, et en justifie à première demande.
      </p>

      <h3>Article 12. Durée</h3>
      <p>
        <strong>12-1. Entrée en vigueur.</strong> L&apos;Accord prend effet à la date de sa
        signature par la dernière des Parties, et en tout état de cause dès le premier accès du
        Partenaire à une Information Confidentielle, pour une durée indéterminée couvrant
        l&apos;ensemble des relations entre les Parties.
      </p>
      <p>
        <strong>12-2. Fin des relations.</strong> Chaque Partie peut mettre fin à l&apos;Accord
        pour l&apos;avenir par lettre recommandée avec avis de réception, moyennant un préavis
        de 30 jours, à condition qu&apos;aucune Mission ne soit en cours. La fin de
        l&apos;Accord ne s&apos;applique pas aux Informations Confidentielles déjà communiquées.
      </p>
      <p>
        <strong>12-3. Survie des obligations.</strong> Nonobstant la fin des relations entre les
        Parties, pour quelque cause que ce soit :
      </p>
      <ul>
        <li>
          les obligations de confidentialité (articles 3 et 4) demeurent en vigueur pendant{" "}
          <strong>cinq (5) ans</strong> après la fin de la dernière Mission ;
        </li>
        <li>
          pour les Secrets d&apos;Affaires, les codes sources, les identifiants et les méthodes
          commerciales, elles demeurent en vigueur au-delà de ce délai,{" "}
          <strong>aussi longtemps que ces informations conservent leur caractère secret</strong> ;
        </li>
        <li>
          pour les Données Personnelles, elles demeurent en vigueur aussi longtemps que le
          Partenaire en détient ;
        </li>
        <li>
          les articles 7, 9, 10, 11, 13, 14 et 15 demeurent en vigueur pour les durées qui y
          sont prévues ou nécessaires à leur exécution.
        </li>
      </ul>

      <h3>Article 13. Restitution et destruction</h3>
      <p>
        À la fin de chaque Mission, à la fin des relations ou à tout moment sur simple demande
        d&apos;Appstronaute, le Partenaire, dans un délai de <strong>sept (7) jours</strong> :
      </p>
      <ul>
        <li>
          restitue à Appstronaute l&apos;ensemble des Informations Confidentielles, documents,
          fichiers, livrables, codes et matériels en sa possession ou celle de son Personnel ;
        </li>
        <li>
          supprime de manière définitive et irrécupérable toute copie, sur tout support
          (ordinateurs, téléphones, disques, clouds, messageries, e-mails, outils tiers), y
          compris les contacts de Clients et Prospects enregistrés sur ses appareils ;
        </li>
        <li>quitte les groupes, canaux et espaces de collaboration et restitue les accès ;</li>
        <li>
          remet à Appstronaute l&apos;attestation de restitution et de destruction figurant en
          Annexe 4, signée par son représentant légal ou par lui-même.
        </li>
      </ul>
      <p>
        Seules peuvent être conservées les copies dont la conservation est imposée par une
        obligation légale, notamment comptable ou fiscale ; elles restent soumises à
        l&apos;Accord et ne sont utilisées à aucune autre fin.
      </p>

      <h3>Article 14. Dispositions diverses</h3>
      <p>
        <strong>14-1. Articulation.</strong> L&apos;Accord complète les contrats de Mission
        conclus entre les Parties. En cas de contradiction, la stipulation la plus protectrice
        des Informations Confidentielles, de la clientèle et des équipes d&apos;Appstronaute
        prévaut.
      </p>
      <p>
        <strong>14-2. Indépendance.</strong> Aucune stipulation de l&apos;Accord ne crée entre
        les Parties de lien de subordination. Les obligations qu&apos;il contient portent
        exclusivement sur la protection des informations, de la clientèle et des équipes
        d&apos;Appstronaute.
      </p>
      <p>
        <strong>14-3. Incessibilité.</strong> L&apos;Accord est conclu en considération de la
        personne du Partenaire. Celui-ci ne peut le céder ou le transférer, en tout ou partie,
        sans l&apos;accord préalable et écrit d&apos;Appstronaute. Appstronaute peut le céder à
        toute société qui la contrôle, qu&apos;elle contrôle ou qui lui succède, ce que le
        Partenaire accepte dès à présent conformément à l&apos;article 1216 du Code civil.
      </p>
      <p>
        <strong>14-4. Tolérance.</strong> Le fait pour Appstronaute de ne pas se prévaloir
        d&apos;un manquement, quelles qu&apos;en soient la fréquence et la durée, ne vaut pas
        renonciation à s&apos;en prévaloir ultérieurement.
      </p>
      <p>
        <strong>14-5. Divisibilité.</strong> Si une stipulation de l&apos;Accord est déclarée
        nulle ou inapplicable, elle est réputée non écrite ou réduite à la mesure permise par la
        loi, sans affecter les autres stipulations. Les Parties s&apos;engagent à la remplacer
        par une stipulation valable aussi proche que possible de l&apos;intention initiale.
      </p>
      <p>
        <strong>14-6. Preuve et signature électronique.</strong> Les Parties conviennent que les
        Écrits électroniques, les journaux de connexion des Outils et les échanges sur les
        messageries utilisées dans le cadre des Missions sont admis comme mode de preuve.
        L&apos;Accord peut être signé par voie électronique, conformément aux articles 1366 et
        1367 du Code civil ; la signature électronique a la même valeur qu&apos;une signature
        manuscrite.
      </p>
      <p>
        <strong>14-7. Négociation.</strong> Le Partenaire reconnaît avoir disposé du temps
        nécessaire pour prendre connaissance de l&apos;Accord, se faire conseiller et en
        négocier les termes, en particulier les articles 3, 4, 9, 10 et 11 dont il accepte
        spécifiquement la portée.
      </p>

      <h3>Article 15. Loi applicable et litiges</h3>
      <p>
        <strong>15-1. Loi applicable.</strong> L&apos;Accord est soumis au droit français. Il
        est rédigé en langue française, qui seule fait foi.
      </p>
      <p>
        <strong>15-2. Règlement amiable.</strong> Hors mesures d&apos;urgence prévues à
        l&apos;article 11-2, les Parties recherchent une solution amiable pendant 30 jours à
        compter de la notification du différend par lettre recommandée.
      </p>
      <p>
        <strong>15-3. Juridiction.</strong> À défaut d&apos;accord, et lorsque les deux Parties
        ont la qualité de commerçant ou de société commerciale, tout litige relatif à la
        conclusion, l&apos;interprétation, l&apos;exécution ou la cessation de l&apos;Accord
        relève de la compétence exclusive du tribunal des activités économiques de Marseille, ou
        de toute juridiction qui lui serait substituée, y compris en référé et nonobstant
        pluralité de défendeurs ou appel en garantie. Dans les autres cas, la juridiction
        compétente est déterminée selon les règles de droit commun.
      </p>

      <h3>Signatures</h3>
      <p>
        Fait à <V v={f.villeSignature} ph="ville" />, le <span className="nda-val">{dateStr}</span>,
        en deux exemplaires originaux ou par voie électronique.
      </p>
      <div className="sig-grid">
        <div className="sig-card">
          <p className="sig-title">Pour Appstronaute</p>
          <p>Nom : Rehane Ikhlef</p>
          <p>Qualité : représentant de House of Morpheus, Présidente</p>
          <p className="sig-mention">« Bon pour accord »</p>
          <div className="sig-frame">
            {/* Signature pré-enregistrée de la partie Appstronaute */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={SIG_A_SRC} alt="Signature Appstronaute" className="sig-img" />
          </div>
        </div>
        <div className="sig-card">
          <p className="sig-title">Pour le Partenaire</p>
          <p>
            Nom : <V v={signataireB(type, f)} ph="nom" />
          </p>
          <p>
            Qualité : <V v={qualiteB(type, f)} ph="fonction" />
          </p>
          <p className="sig-mention">« Bon pour accord »</p>
          <div className="sig-frame">
            {partnerSigUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={partnerSigUrl} alt="Signature du Partenaire" className="sig-img" />
            ) : (
              <span className="sig-empty">Signature à apposer ci-dessous</span>
            )}
          </div>
        </div>
      </div>

      <h3>Annexe 1. Fiche de fonction et d&apos;accès</h3>
      <p>
        À compléter pour chaque Partenaire et à mettre à jour à chaque changement de fonction ou
        d&apos;accès, par Écrit.
      </p>
      <table className="nda-table">
        <tbody>
          <tr>
            <td>Nature du Partenaire</td>
            <td>{type === "agence" ? "Agence partenaire" : "Freelance"}</td>
          </tr>
          <tr>
            <td>Fonction(s)</td>
            <td>{fonctionsLabel ? <span className="nda-val">{fonctionsLabel}</span> : <span className="nda-miss">[à sélectionner]</span>}</td>
          </tr>
          <tr>
            <td>Projets ou Clients concernés</td>
            <td>Tous projets confiés, sauf liste précisée par Écrit</td>
          </tr>
          <tr>
            <td>Outils et accès attribués</td>
            <td>Précisés par Écrit à l&apos;attribution des accès</td>
          </tr>
          <tr>
            <td>Outils d&apos;IA autorisés (art. 4-4)</td>
            <td>Aucun, sauf autorisation écrite d&apos;Appstronaute</td>
          </tr>
          <tr>
            <td>Numéro / compte de contact fourni pour les Prospects</td>
            <td>Le cas échéant, précisé par Écrit</td>
          </tr>
          <tr>
            <td>Personnel du Partenaire autorisé (agence)</td>
            <td>À désigner par Écrit avant tout accès</td>
          </tr>
          <tr>
            <td>Interlocuteur Appstronaute</td>
            <td>Rehane Ikhlef — contact@appstronaute.com</td>
          </tr>
          <tr>
            <td>Date de début d&apos;accès</td>
            <td>{dateStr}</td>
          </tr>
        </tbody>
      </table>

      <h3>Annexe 2. Engagement individuel de confidentialité</h3>
      <p>
        À faire signer par chaque membre du Personnel d&apos;une agence partenaire intervenant
        sur une Mission.
      </p>
      <p>
        Je soussigné(e) [prénom, nom], exerçant la fonction de [fonction] au sein de
        [dénomination du Partenaire], déclare avoir pris connaissance de l&apos;accord de
        confidentialité conclu entre Appstronaute et [dénomination du Partenaire] le [date].
      </p>
      <p>
        Je m&apos;engage personnellement, pendant la durée de mon intervention et après celle-ci
        pour les durées prévues à l&apos;article 12 de cet accord, à :
      </p>
      <ul>
        <li>
          garder strictement secrètes toutes les informations relatives à Appstronaute, à ses
          clients, prospects et projets dont j&apos;aurai connaissance ;
        </li>
        <li>
          ne les utiliser que pour les missions qui me sont confiées et ne les communiquer à
          aucun tiers ;
        </li>
        <li>
          ne conserver aucune copie de ces informations sur un support personnel et respecter
          les règles de sécurité, d&apos;usage de l&apos;intelligence artificielle et de
          publication prévues à l&apos;article 4 ;
        </li>
        <li>ne publier aucun élément des projets sur un portfolio ou un réseau social ;</li>
        <li>
          restituer et supprimer ces informations à la fin de mon intervention ou à la première
          demande.
        </li>
      </ul>
      <p>
        Je suis informé(e) que toute violation de ces engagements peut engager ma responsabilité
        civile, voire pénale, notamment au titre des atteintes au secret des affaires et des
        atteintes aux systèmes de traitement automatisé de données (articles 323-1 et suivants
        du Code pénal).
      </p>
      <p>Fait à [ville], le [date]. Signature :</p>

      <h3>Annexe 3. Clauses relatives au traitement de Données Personnelles (article 28 du RGPD)</h3>
      <p>
        <strong>1. Description du traitement.</strong>
      </p>
      <table className="nda-table">
        <tbody>
          <tr>
            <td>Objet et nature</td>
            <td>
              Exécution des Missions : prospection, gestion commerciale, gestion de projet,
              conception, développement, tests, maintenance
            </td>
          </tr>
          <tr>
            <td>Finalités</td>
            <td>
              Celles de la Mission uniquement, telles que définies par Appstronaute ou son
              Client
            </td>
          </tr>
          <tr>
            <td>Durée</td>
            <td>Durée de la Mission, puis restitution ou suppression selon l&apos;article 13</td>
          </tr>
          <tr>
            <td>Catégories de personnes</td>
            <td>
              Prospects, Clients et leurs contacts, utilisateurs finaux des applications,
              salariés et partenaires d&apos;Appstronaute
            </td>
          </tr>
          <tr>
            <td>Types de données</td>
            <td>
              Identité, coordonnées professionnelles et personnelles, données de connexion,
              données d&apos;usage, enregistrements d&apos;appels, données contenues dans les
              bases de test ou de production
            </td>
          </tr>
          <tr>
            <td>Données sensibles</td>
            <td>
              Aucune, sauf mention contraire écrite d&apos;Appstronaute précisant les mesures
              renforcées
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        <strong>2. Obligations du Partenaire.</strong> Le Partenaire s&apos;engage à :
      </p>
      <ol>
        <li>
          traiter les données uniquement sur instruction documentée d&apos;Appstronaute, y
          compris pour les transferts hors Union européenne, et l&apos;informer immédiatement
          s&apos;il estime qu&apos;une instruction enfreint la réglementation ;
        </li>
        <li>
          garantir que les personnes autorisées à traiter les données sont soumises à une
          obligation de confidentialité et formées à la protection des données ;
        </li>
        <li>
          mettre en œuvre les mesures techniques et organisationnelles prévues à l&apos;article
          32 du RGPD, dont celles de l&apos;article 4 de l&apos;Accord ;
        </li>
        <li>
          ne recourir à un sous-traitant ultérieur qu&apos;avec l&apos;autorisation écrite
          préalable et spécifique d&apos;Appstronaute, en lui imposant les mêmes obligations, et
          en restant pleinement responsable de ses manquements ;
        </li>
        <li>
          aider Appstronaute à répondre aux demandes d&apos;exercice des droits des personnes
          concernées, en lui transmettant toute demande reçue sous 48 heures, sans y répondre
          lui-même ;
        </li>
        <li>
          aider Appstronaute à garantir le respect des articles 32 à 36 du RGPD (sécurité,
          notification des violations sous 24 heures, analyses d&apos;impact, consultation
          préalable) ;
        </li>
        <li>
          au choix d&apos;Appstronaute, supprimer ou restituer toutes les données au terme de la
          Mission et détruire les copies existantes, sauf obligation légale de conservation ;
        </li>
        <li>
          mettre à la disposition d&apos;Appstronaute toutes les informations nécessaires pour
          démontrer le respect de ces obligations et permettre la réalisation d&apos;audits ;
        </li>
        <li>
          tenir, le cas échéant, le registre des catégories d&apos;activités de traitement prévu
          à l&apos;article 30.2 du RGPD.
        </li>
      </ol>
      <p>
        <strong>3. Responsabilité.</strong> Le Partenaire est responsable envers Appstronaute de
        tout dommage, sanction ou réclamation résultant d&apos;un traitement non conforme à ces
        clauses ou aux instructions reçues.
      </p>

      <h3>Annexe 4. Attestation de restitution et de destruction</h3>
      <p>
        Je soussigné(e) [prénom, nom], [agissant en qualité de représentant légal de
        [dénomination] / en qualité d&apos;entrepreneur individuel], atteste sur l&apos;honneur
        qu&apos;à la date du [date] :
      </p>
      <ul>
        <li>
          l&apos;ensemble des Informations Confidentielles, documents, fichiers et codes
          d&apos;Appstronaute et de ses Clients ont été restitués ;
        </li>
        <li>
          toutes les copies ont été définitivement supprimées de l&apos;ensemble des supports,
          comptes et appareils, y compris ceux de mon Personnel ;
        </li>
        <li>les contacts de Clients et Prospects ont été supprimés de mes appareils et comptes ;</li>
        <li>
          j&apos;ai quitté l&apos;ensemble des groupes, canaux et espaces de collaboration, et
          restitué tous les accès ;
        </li>
        <li>aucune publication relative aux projets ne subsiste sur un portfolio ou réseau social.</li>
      </ul>
      <p>Seules sont conservées, au titre d&apos;une obligation légale : [néant / préciser].</p>
      <p>
        Je reconnais que les obligations de confidentialité et de non-sollicitation demeurent
        applicables pour les durées prévues à l&apos;Accord.
      </p>
      <p>Fait à [ville], le [date]. Signature :</p>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* CSS d'impression injecté dans la fenêtre de téléchargement          */
/* ------------------------------------------------------------------ */

const PRINT_CSS = `
  * { box-sizing: border-box; }
  body { font-family: Georgia, "Times New Roman", serif; color: #16131c; margin: 0; padding: 34px 44px; font-size: 12.5px; line-height: 1.62; }
  .nda-doc-title { font-family: Arial, Helvetica, sans-serif; font-size: 19px; line-height: 1.25; margin: 0 0 6px; }
  .nda-confidentiel { font-family: Arial, Helvetica, sans-serif; font-weight: bold; letter-spacing: 2px; font-size: 11px; margin: 0 0 14px; }
  h3 { font-family: Arial, Helvetica, sans-serif; font-size: 14.5px; margin: 22px 0 8px; page-break-after: avoid; }
  p { margin: 0 0 8px; text-align: justify; }
  ul, ol { margin: 0 0 10px; padding-left: 22px; }
  li { margin-bottom: 4px; text-align: justify; }
  .nda-val { font-weight: bold; }
  .nda-miss { color: #a33; }
  .nda-table { width: 100%; border-collapse: collapse; margin: 8px 0 14px; font-size: 11.5px; page-break-inside: auto; }
  .nda-table th, .nda-table td { border: 1px solid #999; padding: 6px 8px; vertical-align: top; text-align: left; }
  .nda-table th { background: #f0eef5; font-family: Arial, Helvetica, sans-serif; }
  .sig-grid { display: flex; gap: 18px; margin: 14px 0 18px; page-break-inside: avoid; }
  .sig-card { flex: 1; border: 1px solid #999; border-radius: 6px; padding: 12px 14px; }
  .sig-card p { margin: 0 0 5px; text-align: left; }
  .sig-title { font-family: Arial, Helvetica, sans-serif; font-weight: bold; }
  .sig-mention { font-style: italic; }
  .sig-frame { margin-top: 8px; min-height: 84px; display: flex; align-items: center; }
  .sig-img { max-height: 84px; max-width: 100%; }
  .sig-empty { color: #a33; font-style: italic; font-size: 11px; }
`;

/* ------------------------------------------------------------------ */
/* Composant principal                                                 */
/* ------------------------------------------------------------------ */

export default function NdaAccord() {
  const [type, setType] = useState<PartnerType>("freelance");
  const [f, setF] = useState<Fields>(EMPTY);
  const [fonctions, setFonctions] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [sigUrl, setSigUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const hasInk = useRef(false);
  const printRef = useRef<HTMLDivElement | null>(null);

  const dateStr = useMemo(
    () =>
      new Date().toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    []
  );

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  function toggleFonction(x: string) {
    setFonctions((p) => (p.includes(x) ? p.filter((y) => y !== x) : [...p, x]));
  }

  /* --- signature canvas --- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.lineWidth = 2.2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#1a1725";
  }, [status]);

  function pos(e: React.PointerEvent<HTMLCanvasElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function startDraw(e: React.PointerEvent<HTMLCanvasElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    drawing.current = true;
    const ctx = e.currentTarget.getContext("2d");
    if (!ctx) return;
    const { x, y } = pos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  function moveDraw(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return;
    e.preventDefault();
    const ctx = e.currentTarget.getContext("2d");
    if (!ctx) return;
    const { x, y } = pos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    hasInk.current = true;
  }

  function endDraw(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return;
    drawing.current = false;
    if (hasInk.current && canvasRef.current) setSigUrl(canvasRef.current.toDataURL("image/png"));
  }

  function clearSig() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    hasInk.current = false;
    setSigUrl(null);
  }

  /* --- validation --- */
  function missingFields(): string[] {
    const miss: string[] = [];
    if (type === "agence") {
      if (!f.denomination) miss.push("dénomination sociale");
      if (!f.forme) miss.push("forme sociale");
      if (!f.capital) miss.push("capital");
      if (!f.rcsVille) miss.push("ville du RCS");
      if (!f.rcsNumero) miss.push("numéro RCS");
      if (!f.siege) miss.push("adresse du siège");
      if (!f.representant) miss.push("nom du représentant");
      if (!f.fonctionRep) miss.push("fonction du représentant");
    } else {
      if (!f.nomComplet) miss.push("prénom et nom");
      if (!f.siren) miss.push("numéro SIREN");
      if (!f.registreVille) miss.push("ville d'immatriculation");
      if (!f.adresse) miss.push("adresse professionnelle");
    }
    if (!f.email) miss.push("e-mail");
    if (!fonctions.length) miss.push("fonction(s) exercée(s)");
    if (!f.villeSignature) miss.push("ville de signature");
    if (!sigUrl) miss.push("signature");
    if (!consent) miss.push("case « Bon pour accord »");
    return miss;
  }

  /* --- envoi e-mail --- */
  async function handleSubmit() {
    if (status === "sending") return;
    const miss = missingFields();
    if (miss.length) {
      setErrorMsg(`Merci de compléter : ${miss.join(", ")}.`);
      return;
    }
    setErrorMsg("");
    setStatus("sending");
    const identite =
      type === "agence"
        ? {
            "Dénomination": f.denomination,
            "Forme sociale": f.forme,
            Capital: `${f.capital} €`,
            RCS: `${f.rcsVille} ${f.rcsNumero}`,
            "Siège social": f.siege,
            "Représentant": `${f.representant} (${f.fonctionRep})`,
          }
        : {
            "Prénom Nom": f.nomComplet,
            Statut: f.statut,
            SIREN: f.siren,
            "Immatriculation": `${f.registre} de ${f.registreVille}`,
            "Adresse professionnelle": f.adresse,
            "Naissance": f.dateNaissance ? `${f.dateNaissance} à ${f.lieuNaissance}` : "Non renseignée",
          };
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${FORM_EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Accord de confidentialité signé — ${partnerName(type, f)} (site Selekt)`,
          _template: "table",
          _cc: CONTACT_EMAIL,
          Document: "Accord de confidentialité Partenaires & Freelances — Appstronaute",
          "Type de partenaire": type === "agence" ? "Agence partenaire" : "Freelance",
          ...identite,
          "Fonction(s)": fonctions
            .map((x) => (x === "Autre" && f.fonctionAutre ? `Autre : ${f.fonctionAutre}` : x))
            .join(", "),
          "E-mail": f.email,
          "Téléphone": f.telephone || "Non renseigné",
          "Fait à": f.villeSignature,
          "Le": dateStr,
          Mention: "Bon pour accord (case cochée + signature manuscrite)",
          Horodatage: new Date().toISOString(),
          Navigateur: navigator.userAgent,
          "Signature (image PNG base64)": sigUrl,
        }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data && (data.success === "true" || data.success === true)) {
        setStatus("sent");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        throw new Error("send failed");
      }
    } catch {
      setStatus("error");
      setErrorMsg(
        `L'envoi automatique a échoué. Vous pouvez télécharger l'accord signé ci-dessous et l'envoyer à ${CONTACT_EMAIL}.`
      );
    }
  }

  /* --- téléchargement PDF : fenêtre d'impression autonome --- */
  function downloadPdf() {
    const node = printRef.current;
    if (!node) return;
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(
      `<!doctype html><html lang="fr"><head><meta charset="utf-8">` +
        `<base href="${window.location.origin}/">` +
        `<title>Accord de confidentialité — Appstronaute — ${partnerName(type, f) || "Partenaire"}</title>` +
        `<style>${PRINT_CSS}</style></head><body>${node.innerHTML}</body></html>`
    );
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 500);
  }

  const signed = status === "sent" || status === "error";

  return (
    <div className="relative px-4 pb-24 lg:px-8">
      {/* Styles écran du corps de contrat */}
      <style>{`
        #nda-screen .nda-body { color: rgba(42,34,22,0.82); font-size: 15px; line-height: 1.7; }
        #nda-screen .nda-body h3 { font-family: var(--font-serif), serif; color: var(--ink); font-weight: 500; font-size: 1.3rem; margin: 2.2rem 0 0.9rem; padding-top: 1.6rem; border-top: 1px solid rgba(42,34,22,0.12); }
        #nda-screen .nda-body p { margin: 0 0 0.7rem; }
        #nda-screen .nda-body strong { color: var(--ink); }
        #nda-screen .nda-body ul, #nda-screen .nda-body ol { margin: 0 0 0.9rem; padding-left: 1.3rem; display: grid; gap: 0.35rem; }
        #nda-screen .nda-doc-title { font-family: var(--font-serif), serif; color: var(--ink); font-weight: 500; font-size: 1.5rem; line-height: 1.3; margin-bottom: 0.5rem; }
        #nda-screen .nda-confidentiel { letter-spacing: 0.25em; font-size: 0.72rem; font-weight: 700; color: var(--wine); margin-bottom: 1rem; }
        #nda-screen .nda-val { color: var(--ink); font-weight: 600; border-bottom: 1px solid rgba(140,118,72,0.6); }
        #nda-screen .nda-miss { color: var(--wine); border-bottom: 1px dashed rgba(110,38,52,0.5); }
        #nda-screen .nda-table { width: 100%; border-collapse: collapse; margin: 0.6rem 0 1.1rem; font-size: 0.83rem; }
        #nda-screen .nda-table th, #nda-screen .nda-table td { border: 1px solid rgba(42,34,22,0.18); padding: 0.5rem 0.65rem; vertical-align: top; text-align: left; }
        #nda-screen .nda-table th { color: var(--ink); background: rgba(140,118,72,0.09); font-family: var(--font-serif), serif; font-size: 0.85rem; font-weight: 600; }
        #nda-screen .sig-grid { display: grid; gap: 1rem; margin: 1rem 0 1.4rem; }
        @media (min-width: 640px) { #nda-screen .sig-grid { grid-template-columns: 1fr 1fr; } }
        #nda-screen .sig-card { border: 1px solid rgba(42,34,22,0.16); border-radius: 14px; background: #fff; padding: 1rem 1.1rem; }
        #nda-screen .sig-card p { margin: 0 0 0.3rem; }
        #nda-screen .sig-title { color: var(--ink); font-family: var(--font-serif), serif; font-weight: 600; font-size: 1rem; margin-bottom: 0.55rem; }
        #nda-screen .sig-mention { font-style: italic; color: var(--ink); }
        #nda-screen .sig-frame { margin-top: 0.6rem; background: #fff; border: 1px solid rgba(42,34,22,0.14); border-radius: 10px; min-height: 92px; display: flex; align-items: center; justify-content: center; padding: 0.4rem; }
        #nda-screen .sig-img { max-height: 84px; max-width: 100%; }
        #nda-screen .sig-empty { color: var(--wine); font-style: italic; font-size: 0.78rem; }
      `}</style>

      <div className="mx-auto w-full max-w-3xl">
        {/* Bandeau d'état après envoi */}
        {signed && (
          <div
            className={`mb-8 rounded-[20px] border p-5 ${
              status === "sent" ? "border-brass/50 bg-brass/10" : "border-wine/40 bg-wine/10"
            }`}
          >
            <p className="font-serif text-lg text-ink">
              {status === "sent" ? "Accord signé et transmis" : "Accord signé — envoi à confirmer"}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed muted">
              {status === "sent"
                ? "Votre exemplaire signé a bien été transmis à Appstronaute. Conservez-en une copie en le téléchargeant ci-dessous."
                : errorMsg}
            </p>
            <button
              type="button"
              onClick={downloadPdf}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-cream-2 transition hover:bg-void"
            >
              Télécharger l&apos;accord signé (PDF)
            </button>
          </div>
        )}

        {/* Panneau d'informations du Partenaire */}
        {!signed && (
          <section className="mb-10 rounded-[20px] border border-ink/14 bg-card p-5 sm:p-7">
            <h2 className="title-1">
              <span className="mr-2.5 text-brass">01</span> Vos informations
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed muted">
              Ces informations complètent automatiquement l&apos;accord ci-dessous. Les champs
              encore vides apparaissent en orange dans le texte.
            </p>

            {/* Type de partenaire */}
            <div className="mt-5 flex flex-wrap gap-2.5">
              {(
                [
                  ["freelance", "Freelance (entrepreneur individuel)"],
                  ["agence", "Agence partenaire (personne morale)"],
                ] as const
              ).map(([val, label]) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setType(val)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    type === val
                      ? "border-brass bg-brass/12 text-ink"
                      : "border-ink/15 bg-paper text-ink/55 hover:border-ink/35"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {type === "agence" ? (
                <>
                  <input value={f.denomination} onChange={set("denomination")} placeholder="Dénomination sociale *" className={fieldClass} />
                  <input value={f.forme} onChange={set("forme")} placeholder="Forme sociale (SAS, SARL…) *" className={fieldClass} />
                  <input value={f.capital} onChange={set("capital")} placeholder="Capital social (en €) *" className={fieldClass} />
                  <input value={f.rcsVille} onChange={set("rcsVille")} placeholder="Ville du RCS *" className={fieldClass} />
                  <input value={f.rcsNumero} onChange={set("rcsNumero")} placeholder="Numéro RCS / SIREN *" className={fieldClass} />
                  <input value={f.siege} onChange={set("siege")} placeholder="Adresse du siège social *" className={fieldClass} />
                  <input value={f.representant} onChange={set("representant")} placeholder="Représentant (prénom nom) *" className={fieldClass} />
                  <input value={f.fonctionRep} onChange={set("fonctionRep")} placeholder="Fonction du représentant *" className={fieldClass} />
                </>
              ) : (
                <>
                  <input value={f.nomComplet} onChange={set("nomComplet")} placeholder="Prénom et nom *" autoComplete="name" className={fieldClass} />
                  <select value={f.statut} onChange={set("statut")} className={fieldClass}>
                    <option value="micro-entrepreneur">Micro-entrepreneur</option>
                    <option value="EI">Entreprise individuelle (EI)</option>
                    <option value="EURL">EURL</option>
                    <option value="SASU">SASU</option>
                  </select>
                  <input value={f.siren} onChange={set("siren")} placeholder="Numéro SIREN *" className={fieldClass} />
                  <div className="grid grid-cols-[110px_1fr] gap-3">
                    <select value={f.registre} onChange={set("registre")} className={fieldClass}>
                      <option value="RNE">RNE</option>
                      <option value="RCS">RCS</option>
                    </select>
                    <input value={f.registreVille} onChange={set("registreVille")} placeholder="Ville d'immatriculation *" className={fieldClass} />
                  </div>
                  <input value={f.adresse} onChange={set("adresse")} placeholder="Adresse professionnelle *" className={`${fieldClass} sm:col-span-2`} />
                  <input value={f.dateNaissance} onChange={set("dateNaissance")} placeholder="Date de naissance (facultatif)" className={fieldClass} />
                  <input value={f.lieuNaissance} onChange={set("lieuNaissance")} placeholder="Lieu de naissance (facultatif)" className={fieldClass} />
                </>
              )}
              <input value={f.email} onChange={set("email")} type="email" placeholder="E-mail *" autoComplete="email" className={fieldClass} />
              <input value={f.telephone} onChange={set("telephone")} type="tel" placeholder="Téléphone (facultatif)" autoComplete="tel" className={fieldClass} />
              <input value={f.villeSignature} onChange={set("villeSignature")} placeholder="Ville de signature *" className={fieldClass} />
            </div>

            {/* Fonctions exercées */}
            <p className="mt-5 text-sm font-medium text-ink">Fonction(s) exercée(s) *</p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {FONCTIONS.map((x) => (
                <button
                  key={x}
                  type="button"
                  onClick={() => toggleFonction(x)}
                  className={`rounded-full border px-3.5 py-1.5 text-[13px] transition ${
                    fonctions.includes(x)
                      ? "border-brass bg-brass/12 text-ink"
                      : "border-ink/15 bg-paper text-ink/55 hover:border-ink/35"
                  }`}
                >
                  {x}
                </button>
              ))}
            </div>
            {fonctions.includes("Autre") && (
              <input
                value={f.fonctionAutre}
                onChange={set("fonctionAutre")}
                placeholder="Précisez la fonction"
                className={`${fieldClass} mt-3`}
              />
            )}
          </section>
        )}

        {/* Contrat à l'écran */}
        <section id="nda-screen" className="rounded-[20px] border border-ink/14 bg-card p-5 sm:p-8">
          <ContractBody
            type={type}
            f={f}
            fonctions={fonctions}
            dateStr={dateStr}
            partnerSigUrl={sigUrl}
          />
        </section>

        {/* Zone de signature + envoi */}
        {!signed && (
          <section className="mt-10 rounded-[20px] border border-ink/14 bg-card p-5 sm:p-7">
            <h2 className="title-1">
              <span className="mr-2.5 text-brass">02</span> Signature du Partenaire
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed muted">
              La partie Appstronaute est déjà signée « Bon pour accord ». Signez ci-dessous à la
              souris ou au doigt, puis validez : votre exemplaire nous est transmis par e-mail et
              vous pourrez le télécharger.
            </p>

            <div className="mt-5 rounded-xl border border-ink/15 bg-white p-2">
              <canvas
                ref={canvasRef}
                onPointerDown={startDraw}
                onPointerMove={moveDraw}
                onPointerUp={endDraw}
                onPointerCancel={endDraw}
                className="h-[170px] w-full cursor-crosshair touch-none rounded-lg"
                aria-label="Zone de signature manuscrite"
              />
            </div>
            <div className="mt-2.5 flex items-center justify-between">
              <p className="text-xs italic text-ink/45">
                Mention « Bon pour accord » apposée automatiquement avec votre signature.
              </p>
              <button
                type="button"
                onClick={clearSig}
                className="rounded-lg border border-ink/20 px-3 py-1.5 text-xs text-ink/60 transition hover:border-ink/40"
              >
                Effacer
              </button>
            </div>

            <label className="mt-5 flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 h-4 w-4 accent-(--wine)"
              />
              <span className="text-sm leading-relaxed muted">
                <strong className="text-ink">Bon pour accord.</strong> Je certifie
                l&apos;exactitude des informations renseignées, reconnais avoir lu
                l&apos;intégralité de l&apos;accord (préambule, articles 1 à 15 et annexes) et
                l&apos;accepte sans réserve, ma signature électronique ayant la même valeur
                qu&apos;une signature manuscrite (articles 1366 et 1367 du Code civil).
              </span>
            </label>

            {errorMsg && (
              <p className="mt-4 rounded-xl border border-wine/40 bg-wine/10 px-4 py-3 text-sm text-wine">
                {errorMsg}
              </p>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={status === "sending"}
              className="mt-6 inline-flex h-12 cursor-pointer items-center justify-center rounded-full bg-ink px-8 text-[0.95rem] font-medium text-cream-2 transition hover:bg-void disabled:opacity-60"
            >
              {status === "sending" ? "Envoi en cours…" : "Signer et transmettre l'accord"}
            </button>
          </section>
        )}

        {/* Source cachée pour l'impression (toujours en valeurs figées) */}
        <div ref={printRef} className="hidden" aria-hidden>
          <ContractBody
            type={type}
            f={f}
            fonctions={fonctions}
            dateStr={dateStr}
            partnerSigUrl={sigUrl}
          />
        </div>
      </div>
    </div>
  );
}
