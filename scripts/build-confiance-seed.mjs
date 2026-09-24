// Construit le jeu de données initial (v1.0) du module Confiance à partir
// des exports mammoth des deux documents Word (voir extract-confiance.mjs).
// Sortie : data/confiance-seed/documents.json — committé, source du premier
// démarrage du store (lib/confiance/store.ts).
// Usage : node scripts/build-confiance-seed.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

/** Découpe le HTML plat de mammoth en sections sur les <h1>. */
function splitSections(html) {
  const parts = html.split(/<h1>/).slice(1); // le préambule (titre, sommaire) est reconstruit par l'outil
  return parts.map((part) => {
    const end = part.indexOf("</h1>");
    const rawTitle = part.slice(0, end).trim();
    const body = part.slice(end + 5).trim();
    const numbered = rawTitle.match(/^(\d+)\.\s+(.*)$/);
    return {
      num: numbered ? Number(numbered[1]) : 0,
      title: numbered ? numbered[2] : rawTitle,
      html: body,
    };
  });
}

const securite = splitSections(readFileSync("scripts/out-securite.html", "utf8")).map((s) => ({
  ...s,
  // Le MODE D'EMPLOI est une page interne : jamais envoyée à un client.
  internal: s.num === 0,
}));
const rgpd = splitSections(readFileSync("scripts/out-rgpd.html", "utf8")).map((s) => ({
  ...s,
  internal: false,
  title: s.num === 0 ? "Objet du document" : s.title,
}));

const seed = {
  documents: {
    securite: {
      title: "Questionnaire de sécurité",
      subtitle: "Réponses de référence de Selekt Retail OS",
      sections: securite,
      profiles: {
        complet: securite.filter((s) => !s.internal).map((s) => s.num),
        dpo: [1, 2, 3, 6, 8, 12, 13, 14, 15, 16, 17],
        rssi: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 17],
        achats: [1, 2, 3, 9, 12, 13, 16, 17],
      },
    },
    rgpd: {
      title: "Fiche de description du traitement",
      subtitle: "Annexe RGPD article 28 — pré-remplie Selekt",
      sections: rgpd,
      profiles: {
        complet: rgpd.map((s) => s.num),
        dpo: rgpd.map((s) => s.num),
        rssi: [0, 1, 2, 5, 6, 7, 8, 10, 11],
        achats: [0, 1, 3, 8, 9, 11],
      },
    },
  },
};

mkdirSync("data/confiance-seed", { recursive: true });
writeFileSync("data/confiance-seed/documents.json", JSON.stringify(seed, null, 2), "utf8");
console.log(
  "seed écrit :",
  Object.entries(seed.documents)
    .map(([k, d]) => `${k} ${d.sections.length} sections`)
    .join(" · "),
);
