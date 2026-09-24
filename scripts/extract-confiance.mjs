// Extraction des deux documents Word de conformité vers HTML brut, pour
// construire le jeu de données initial (v1.0) du module Confiance.
// Usage : node scripts/extract-confiance.mjs
import mammoth from "mammoth";
import { writeFileSync } from "node:fs";

const DOCS = [
  ["C:/Users/maelv/Documents/Selekt_Questionnaire_Securite.docx", "scripts/out-securite.html"],
  ["C:/Users/maelv/Documents/Selekt_Fiche_RGPD.docx", "scripts/out-rgpd.html"],
];

for (const [src, out] of DOCS) {
  const { value, messages } = await mammoth.convertToHtml({ path: src });
  writeFileSync(out, value, "utf8");
  console.log(out, value.length, "chars", messages.length ? messages : "");
}
