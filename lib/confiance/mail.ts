import nodemailer from "nodemailer";

/**
 * Envoi des dossiers de conformité par SMTP direct (prestataire européen,
 * mêmes variables SMTP_* que /api/demo — aucun service tiers hors UE).
 * Sans configuration SMTP, l'envoi est journalisé en erreur mais ne bloque
 * jamais la validation : le PDF reste archivé et retéléchargeable en admin.
 */

const CONTACT = "contact@selekt-retail.com";

export type DossierMail = {
  recipientEmail: string;
  recipientName: string;
  company: string;
  docTitle: string;
  versionLabel: string;
  docId: string;
  summary: string[];
  pdf: Buffer;
  filename: string;
};

export async function sendDossier(mail: DossierMail): Promise<boolean> {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error(`[confiance] SMTP non configuré : dossier ${mail.docId} non envoyé par mail`);
    return false;
  }
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: Number(process.env.SMTP_PORT ?? 465) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  await transporter.sendMail({
    from: `"Selekt Retail OS" <${SMTP_USER}>`,
    to: [mail.recipientEmail, CONTACT],
    subject: `${mail.docTitle} — ${mail.company} (${mail.versionLabel})`,
    text: [
      `Bonjour ${mail.recipientName},`,
      "",
      `Veuillez trouver ci-joint le document « ${mail.docTitle} » de Selekt Retail OS,`,
      `personnalisé pour ${mail.company}.`,
      "",
      "Récapitulatif :",
      ...mail.summary.map((line) => `  - ${line}`),
      "",
      `Identifiant du document : ${mail.docId}`,
      "",
      "Pour toute question : contact@selekt-retail.com",
      "",
      "Selekt Retail OS",
    ].join("\n"),
    attachments: [{ filename: mail.filename, content: mail.pdf, contentType: "application/pdf" }],
  });
  return true;
}
