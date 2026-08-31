# Crédits & sources visuelles

## Photographies (Unsplash)

Cinq photographies libres de droits (licence Unsplash — attribution non requise,
créditée par courtoisie). Chaque URL a été vérifiée (réponse HTTP + inspection
visuelle sur planche contact) avant intégration. Étalonnage chaud unifié
appliqué en CSS (`.photo-warm` : sepia .14, saturate .85, contrast 1.03) +
voile `--void-warm`/`--void` sur les panneaux à texte. Registre conforme au
brief : boutique de luxe, écrin, matière (cuir), geste d'artisan. Aucune marque
lisible dans les cadrages retenus.

| Usage | ID Unsplash | Page source |
|---|---|---|
| Pourquoi Selekt & /design — intérieur boutique crème | `photo-1782834294716-8e28c18bdba6` | https://unsplash.com/photos/8e28c18bdba6 |
| Home « Tracer » — vitrine d'écrin chaude | `photo-1774110073583-2475ab5ed8b2` | https://unsplash.com/photos/2475ab5ed8b2 |
| Home « Attribuer » — maroquinerie sur établi | `photo-1628483211662-9bcc692c46dc` | https://unsplash.com/photos/9bcc692c46dc |
| Home « Prouver » — mains d'artisan joaillier | `photo-1599071338288-49173359e0fd` | https://unsplash.com/photos/49173359e0fd |
| Home CTA — cuir sombre et outils | `photo-1635100299010-0410d7434a93` | https://unsplash.com/photos/0410d7434a93 |
| Vendeur — tailleur ajustant la veste d'un client | `photo-1781942213919-cae87e52dd90` | https://unsplash.com/photos/cae87e52dd90 |
| Configurabilité — atelier de couture | `photo-1618866903271-595806e0679d` | https://unsplash.com/photos/595806e0679d |
| Manager — tablette sur comptoir de boutique | `photo-1648824572410-2e15e187084c` | https://unsplash.com/photos/2e15e187084c |
| Plateforme — conseillère au comptoir, tablette | `photo-1648824571549-c3bc7946d603` | https://unsplash.com/photos/c3bc7946d603 |
| CA influencé — mouvement de montre, fond ambré | `photo-1768062251809-739d987a42fe` | https://unsplash.com/photos/739d987a42fe |
| IA copilote — plume écrivant sur papier | `photo-1455390582262-044cdead277a` | https://unsplash.com/photos/044cdead277a |
| Siège — bureau de direction en bois sombre | `photo-1770515853604-4487b6370bc1` | https://unsplash.com/photos/4487b6370bc1 |
| Sécurité — serrure ancienne ouvragée | `photo-1646872686934-cf4c910fc219` | https://unsplash.com/photos/cf4c910fc219 |

URLs servies via `images.unsplash.com/<id>?auto=format&fit=crop&w=<w>&q=80`
(registre centralisé dans `lib/photos.ts`), optimisées par next/image
(AVIF/WebP, srcset, lazy sauf héros).

## Mockups UI

Tous les visuels d'interface restent des **mockups HTML/CSS maison** aux tokens
de la charte (panneau d'attribution, cockpit KPI, priorités du jour, brouillon
IA), données manifestement fictives — brief §7. Aucune capture d'écran.

## Logos de connecteurs (`public/logos/`)

Logos officiels des éditeurs, utilisés pour signifier l'interopérabilité
(« Elle se connecte avec : »), affichés en silhouette encre (brightness-0)
pour rester dans la charte. Sources :

- Shopify — Wikimedia Commons (`Shopify_logo_2018.svg`)
- Cegid — cegid.com (`cegid-logo-blue-rgb.svg`, kit du site officiel)
- Salesforce — Wikimedia Commons (`Salesforce.com_logo.svg`)
- Fastmag (Orisha) — fastmag.fr (`wp-content/uploads/2023/10/image.png`, réduit à 310×80)
- Lightspeed — lightspeedhq.com (SVG inline du header officiel)
- Odeis — odeis.net (`logo_odeis.png`)
- PrestaShop — Wikimedia Commons (`Prestashop.svg`, logo officiel emblème + wordmark)
- Retail Pro — retailpro.com (`RetailProLogo_Nayax.svg`)

Marques et logos restent la propriété de leurs détenteurs respectifs ;
usage nominatif d'interopérabilité. À faire valider avant mise en ligne.

Le carrousel encre est conservé sur la LP pilote ; l'accueil utilise
désormais la grille d'icônes ci-dessous.

## Icônes d'applications (`public/icons/`)

Icônes seules (jamais de wordmark), en couleur, pour la grille du panneau
« Connecteurs » de l'accueil. Sources :

- svgl.app (SVG officiels redistribués) — Shopify, Salesforce, WhatsApp
- Simple Icons (CC0), recolorées couleur de marque — PrestaShop `#DF0067`
  (Zapier et WooCommerce écartés : leurs icônes Simple Icons sont des
  wordmarks)
- Favicons officiels 128×128 (Google s2) — Odeis (odeis.net),
  WooCommerce (woocommerce.com)
- Cegid & Splio — wordmarks officiels fournis par le client (28/08,
  JPEG WhatsApp), fond blanc détouré, affichés élargis (`wide`)
- Fastmag — monogramme « fg » historique (favicon 192×192 pré-Orisha,
  fastmag.fr 2019 via Wayback Machine — l'actuel est une tuile Orisha
  blanche illisible en 44 px et identique à celle d'Openbravo)
- Openbravo — monogramme « b » vert extrait du logo officiel
  (Wikipédia, `Openbravo's_Logo.png`)

Retours client 28/08 : Instagram → Odeis, Gmail → Cegid, Outlook → Openbravo,
Google Agenda → Fastmag, Google Sheets → WooCommerce, Messenger → Splio
(SVG correspondants retirés de `public/icons/`).

Retours client 31/08 (notes Figma sur un screenshot antérieur au 28/08) :
Slack → Retail Pro, Notion → Microsoft 365, Stripe → Oracle Xstore,
HubSpot → NewStore, Mailchimp → Microsoft Dynamics 365 Commerce,
Gmail → Bijou3. La tuile Gmail étant déjà devenue Cegid (retour 28/08),
Bijou3 remplace Google Analytics, dernière tuile non retail. Sources :

- Microsoft 365 — icône officielle 2022, Wikimedia Commons
  (`Microsoft_365_(2022).svg`)
- Microsoft Dynamics 365 Commerce — icône officielle, Wikimedia Commons
  (`Dynamics_365_Commerce_logo.svg`)
- Oracle Xstore — wordmark Oracle rouge `#C74634` officiel (Wikimedia,
  `Oracle_logo.svg`), affiché élargi (`wide`), pas d'icône Xstore dédiée
- NewStore — mark « N » officiel (newstore.com, `ns-mark.png`)
- Retail Pro — wordmark officiel déjà présent dans `public/logos/`,
  réutilisé, affiché élargi (`wide`)
- Bijou3 — aucune identité propre : bijou3.com redirige vers odeis.net
  (produit « Odeis Bijou3 ») ; icône Odeis réutilisée avec le label
  Bijou3, à faire valider par le client

Marques et icônes restent la propriété de leurs détenteurs respectifs ;
usage nominatif d'interopérabilité. À faire valider avant mise en ligne.

## Typographies

- Instrument Serif — Google Fonts (OFL)
- Inter — Google Fonts (OFL)
- IBM Plex Mono — Google Fonts (OFL)

## Composants & inspiration

Langage visuel : analyse des partis pris de bspk.com (voir
`../LANGAGE_DESIGN.md` et `../DIRECTION.md`) — parenté de famille, aucun
asset, aucune image ni icône provenant de leur site, aucune formulation
reprise. Vocabulaire d'animation inspiré de reactbits.dev / 21st.dev, réécrit
maison (React/Tailwind/motion), recoloré aux tokens Selekt, easing unique
cubic-bezier(0.22, 1, 0.36, 1), `prefers-reduced-motion` respecté.
