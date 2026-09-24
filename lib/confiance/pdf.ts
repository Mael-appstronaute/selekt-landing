import type { Section } from "./store";

/**
 * Génération du PDF de dossier : gabarit HTML autonome dans la charte du
 * site (crème/encre/or, serif pour les titres), imprimé en A4 par un Chrome
 * headless local (puppeteer, chrome-headless-shell — aucun service externe).
 * Pied de page : version, date, identifiant unique, pagination.
 * Dev Windows : CONFIANCE_CHROME_PATH peut pointer vers msedge.exe.
 */

export type PdfInput = {
  docTitle: string;
  subtitle: string;
  versionLabel: string;
  docId: string;
  dateStr: string;
  variables: { interlocuteur: string; societe: string; date: string; version: string };
  recipient: { name: string; company: string; email: string };
  recipientFields: Record<string, string>;
  sections: (Section & { comment?: string })[];
  freeQuestions?: string;
};

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function buildDocumentHtml(input: PdfInput): string {
  const meta: [string, string][] = [
    ["Destinataire", input.variables.societe],
    ["Interlocuteur", input.variables.interlocuteur],
    ["Date", input.variables.date],
    ["Version", input.variables.version],
    ["Identifiant", input.docId],
  ];
  const fieldRows = Object.entries(input.recipientFields)
    .filter(([, v]) => v.trim())
    .map(([k, v]) => `<tr><td>${esc(k)}</td><td>${esc(v)}</td></tr>`)
    .join("");

  const sectionsHtml = input.sections
    .map(
      (s) => `
      <section>
        <h2>${s.num > 0 ? `${s.num}. ` : ""}${esc(s.title)}</h2>
        ${s.html}
        ${
          s.comment?.trim()
            ? `<div class="client-note"><p class="note-label">Commentaire du destinataire</p><p>${esc(s.comment.trim())}</p></div>`
            : ""
        }
      </section>`,
    )
    .join("");

  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<style>
  :root { --ink: #2A2216; --gold: #C9A96A; --brass: #8C7648; --line: rgba(42,34,22,0.16); --cream: #FAF7F0; }
  * { box-sizing: border-box; }
  body { font-family: Arial, 'Liberation Sans', 'Helvetica Neue', sans-serif; color: var(--ink); font-size: 10.5pt; line-height: 1.55; margin: 0; }
  h1, h2, .serif { font-family: Georgia, 'Liberation Serif', 'Times New Roman', serif; font-weight: 400; }
  .cover { padding: 26mm 0 10mm; border-bottom: 2px solid var(--ink); margin-bottom: 8mm; }
  .kicker { font-size: 8pt; letter-spacing: 0.22em; text-transform: uppercase; color: var(--brass); margin: 0 0 6mm; }
  h1 { font-size: 25pt; line-height: 1.1; margin: 0 0 3mm; }
  .subtitle { font-style: italic; color: rgba(42,34,22,0.72); margin: 0 0 8mm; }
  .meta { width: 100%; border-collapse: collapse; background: var(--cream); }
  .meta td { border: 1px solid var(--line); padding: 2.2mm 3.5mm; font-size: 9.5pt; }
  .meta td:first-child { width: 34%; color: var(--brass); text-transform: uppercase; letter-spacing: 0.08em; font-size: 8pt; }
  section { margin: 0 0 7mm; }
  h2 { font-size: 15pt; margin: 8mm 0 3mm; padding-top: 4mm; border-top: 1px solid var(--line); break-after: avoid; }
  h3 { font-size: 10.5pt; margin: 4.5mm 0 1.5mm; break-after: avoid; }
  p { margin: 0 0 2.5mm; }
  ul { margin: 0 0 2.5mm; padding-left: 5mm; }
  table { width: 100%; border-collapse: collapse; margin: 2mm 0 3.5mm; break-inside: auto; }
  th, td { border: 1px solid var(--line); padding: 1.8mm 3mm; text-align: left; vertical-align: top; font-size: 9.5pt; }
  th { background: var(--cream); font-weight: 700; }
  tr { break-inside: avoid; }
  .client-note { border: 1px solid var(--gold); background: #FDFBF6; padding: 3mm 4mm; margin-top: 2mm; }
  .note-label { font-size: 8pt; letter-spacing: 0.16em; text-transform: uppercase; color: var(--brass); margin: 0 0 1.5mm; }
</style>
</head>
<body>
  <div class="cover">
    <p class="kicker">Selekt Retail OS · Confiance &amp; conformité</p>
    <h1>${esc(input.docTitle)}</h1>
    <p class="subtitle">${esc(input.subtitle)}</p>
    <table class="meta"><tbody>
      ${meta.map(([k, v]) => `<tr><td>${esc(k)}</td><td>${esc(v)}</td></tr>`).join("")}
    </tbody></table>
  </div>
  ${sectionsHtml}
  <section>
    <h2>Coordonnées et compléments du destinataire</h2>
    <table><tbody>
      <tr><td>Interlocuteur</td><td>${esc(input.recipient.name)}</td></tr>
      <tr><td>Société</td><td>${esc(input.recipient.company)}</td></tr>
      <tr><td>Adresse électronique</td><td>${esc(input.recipient.email)}</td></tr>
      ${fieldRows}
    </tbody></table>
    ${
      input.freeQuestions?.trim()
        ? `<div class="client-note"><p class="note-label">Questions libres</p><p>${esc(input.freeQuestions.trim())}</p></div>`
        : ""
    }
  </section>
</body>
</html>`;
}

export async function renderPdf(input: PdfInput): Promise<Buffer> {
  const { default: puppeteer } = await import("puppeteer");
  const browser = await puppeteer.launch({
    headless: "shell",
    executablePath: process.env.CONFIANCE_CHROME_PATH || undefined,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
  try {
    const page = await browser.newPage();
    await page.setContent(buildDocumentHtml(input), { waitUntil: "load" });
    const footer = `
      <div style="width:100%; font-size:7pt; color:#8C7648; padding:0 12mm; display:flex; justify-content:space-between; font-family: Arial, sans-serif;">
        <span>${input.docTitle} · ${input.versionLabel} · ${input.dateStr} · ${input.docId}</span>
        <span>Page <span class="pageNumber"></span> / <span class="totalPages"></span></span>
      </div>`;
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: "<span></span>",
      footerTemplate: footer,
      margin: { top: "14mm", bottom: "18mm", left: "16mm", right: "16mm" },
    });
    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}
