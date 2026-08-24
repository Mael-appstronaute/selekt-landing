# Selekt Retail OS — site vitrine

Refonte multi-pages du site Selekt (SaaS de clienteling pour le retail de luxe).
Next.js 16 (App Router) · TypeScript · Tailwind v4 · motion. DA « quiet luxury »
du brief `Selekt_Brief_Landing.md` (tokens exacts, Instrument Serif / Inter /
IBM Plex Mono, jamais de blanc pur, or rare).

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm run start
```

## Structure

- `app/(fr)/…` — pages françaises (racine) ; `app/(en)/en/…` — pages anglaises.
  Deux root layouts pour un `<html lang>` correct par langue.
- `content/` — toute la copy FR/EN, typée, par page. Une modification de texte
  se fait ici, jamais dans les composants.
- `components/ui` — primitives (Button, Card, Section, Kicker, Stat, Tabs,
  Accordion) ; `components/fx` — effets (BlurTitle, Reveal, CountUp, GoldLine,
  Marquee) ; `components/mockups` — mockups UI maison (aucune donnée réelle) ;
  `components/pages` — templates de pages.
- `lib/routes.ts` — carte des routes FR/EN (hreflang, sélecteur de langue).
- `app/api/demo` — réception du formulaire (honeypot, rate limit, validation),
  transfert vers `DEMO_WEBHOOK_URL` (voir `.env.example`).
- `/design` — page interne de démonstration du design system (noindex).

## À compléter avant mise en ligne

- `DEMO_WEBHOOK_URL` (endpoint du formulaire de démo).
- Mentions légales & politique de confidentialité : champs « À COMPLÉTER »
  dans `content/legal.ts`.
- Emplacement « Références » de la home : placeholder en attente de références
  publiables (`content/home.ts`, clé `proof`).
- Logo bordeaux : wordmark typographique en attendant le fichier
  (`components/site/Wordmark.tsx`).
