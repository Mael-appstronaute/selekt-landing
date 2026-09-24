# Module Confiance & conformité — mode d'emploi

## À quoi ça sert

Remplacer l'envoi en pièce jointe du Questionnaire de sécurité (17 sections)
et de la Fiche de description du traitement RGPD (11 sections) par des liens
personnalisés, avec une trace de ce qui a été envoyé, à qui et quand.

## Les trois pages

- **`/confiance`** : page publique, la seule indexée. Présentation courte
  (OVHcloud France, chiffrement, RGPD, DPA) + formulaire « Demander notre
  dossier de conformité ». Les demandes arrivent dans l'onglet Demandes du
  back-office et par mail à contact@selekt-retail.com (si SMTP configuré).
- **`/confiance/securite`** et **`/confiance/rgpd`** : pages privées. Sans
  lien valide, elles renvoient une 404. Jamais indexées (noindex, nofollow).
- **`/confiance-admin`** : back-office (mot de passe : variable
  `CONFIANCE_ADMIN_PASSWORD` sur le serveur).

## Générer un lien pour un client (onglet « Nouveau lien »)

1. Choisir le document et un **profil** (DPO, Sécurité / RSSI, Achats,
   Complet) : il pré-coche les sections. Ajustez les cases librement.
2. Renseigner le destinataire (nom, société, e-mail) et, si besoin, la date
   et le numéro de version affichés sur le document.
3. **Surcharges** : pour remplacer la réponse d'une section pour CE client
   uniquement (sans toucher au contenu de référence), dépliez « Surcharges
   ponctuelles » et saisissez le HTML de remplacement.
4. Cocher « Usage unique » si le lien doit mourir après validation. Sinon il
   expire au bout de 30 jours.
5. **Copier le lien affiché immédiatement : il ne sera plus jamais montré**
   (seule son empreinte est conservée). L'envoyer au client par e-mail.

## Ce que voit le client

Les réponses de référence, pré-remplies : il ne saisit rien dans le corps du
document. Il complète ses coordonnées, des commentaires par section et des
questions libres (sauvegarde automatique, il peut fermer et revenir), puis
valide. À la validation : PDF généré (charte Selekt, pied de page = version,
date, identifiant unique), envoyé à lui ET à contact@selekt-retail.com.

## Éditer les contenus (onglet « Documents »)

- Cliquer une section → éditer son titre et son contenu (HTML : paragraphes,
  listes, tableaux — bouton Aperçu pour contrôler le rendu).
- L'enregistrement modifie la **version courante**. Avant une refonte
  importante, cliquer « Publier une nouvelle version » (v1.1, v1.2… avec
  auteur) : l'état précédent est archivé et les liens déjà émis continuent de
  pointer vers la version qui leur a servi de base.
- La section « MODE D'EMPLOI » du questionnaire est marquée INTERNE : elle
  n'est jamais proposée ni envoyée aux clients.

## Journal (onglet « Journal »)

Chaque lien y figure avec : identifiant, document, version, profil, sections,
destinataire, dates de création / première ouverture / validation, IP,
empreinte SHA-256 du PDF. Export CSV (Excel) et retéléchargement des PDF
archivés (chiffrés sur le serveur, déchiffrés à la volée).

## Technique (pour la maintenance)

- Données : `data/confiance/` sur le serveur (store JSON + PDF), chiffrées
  AES-256-GCM avec `CONFIANCE_KEY`. Ce répertoire est hors git et hors
  archive de déploiement : il survit aux mises en production. **À inclure
  dans les sauvegardes du serveur.**
- Premier démarrage : les deux documents sont chargés en v1.0 depuis
  `data/confiance-seed/documents.json` (committé, généré des fichiers Word
  par `scripts/build-confiance-seed.mjs`).
- PDF : Chrome headless local (puppeteer). E-mails : SMTP direct via les
  variables `SMTP_*` (prestataire européen uniquement). Aucun service tiers
  hors UE, aucun traceur sur ces pages.
- Variables serveur (`.env.production`) : `CONFIANCE_KEY`,
  `CONFIANCE_ADMIN_PASSWORD`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`,
  `SMTP_PASS`.
- Audit accessibilité : `node scripts/a11y-confiance.mjs [url]` (axe-core,
  WCAG 2.1 AA) avec le site lancé sur :3010.
