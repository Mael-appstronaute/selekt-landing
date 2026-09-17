import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * Réception des demandes de démo (formulaire /demo et pages SEO).
 * L'e-mail de notification part aussi du NAVIGATEUR vers FormSubmit (voir
 * DemoForm — les appels serveur vers FormSubmit sont bloqués par
 * Cloudflare) ; cette route reçoit une copie de chaque demande et :
 *   B. l'écrit dans Airtable (base SELEKT, table « Demandes de démo »),
 *      pour que rien ne se perde et que le commerce ait une file suivable ;
 *   A. envoie un mail SMTP direct à contact@selekt-retail.com si les
 *      variables SMTP_* sont posées (aucun tiers, aucun blocage possible).
 * Garde-fous de la passation du 16/09 : après validation, un échec de
 * transmission ne renvoie JAMAIS d'erreur au visiteur — on logge (pm2)
 * et on répond ok. Les jetons ne transitent que côté serveur.
 *
 * Env attendues sur le serveur (.env.production) :
 *   AIRTABLE_TOKEN_SITE   jeton en écriture sur la base SELEKT (repli :
 *                         AIRTABLE_TOKEN_LANDING, déjà prévue côté pilote)
 *   AIRTABLE_DEMO_TABLE   id ou nom de la table (défaut « Demandes de démo »)
 *   SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS   boîte Titan (option A)
 */

const AIRTABLE_BASE = "appy7D9hAfuL3quzi";
const MAIL_TO = "contact@selekt-retail.com";

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const stamps = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (stamps.length >= MAX_PER_WINDOW) return true;
  stamps.push(now);
  hits.set(ip, stamps);
  return false;
}

type DemoPayload = {
  name?: string;
  company?: string;
  email?: string;
  role?: string;
  roleOther?: string;
  network?: string;
  message?: string;
  consent?: string;
  website?: string;
  locale?: string;
};

async function writeToAirtable(data: DemoPayload, role: string) {
  const token = process.env.AIRTABLE_TOKEN_SITE ?? process.env.AIRTABLE_TOKEN_LANDING;
  if (!token) {
    console.error("[demo] AIRTABLE_TOKEN_SITE absente : demande non écrite dans Airtable");
    return;
  }
  const table = encodeURIComponent(process.env.AIRTABLE_DEMO_TABLE ?? "Demandes de démo");
  const res = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE}/${table}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      records: [
        {
          fields: {
            Nom: data.name,
            "Société": data.company,
            Email: data.email,
            Fonction: role,
            "Nb boutiques": data.network,
            Message: data.message ?? "",
            Consentement: true,
            "Reçue le": new Date().toISOString(),
            Source: "site — /demo",
            Langue: data.locale ?? "fr",
          },
        },
      ],
    }),
  });
  if (!res.ok) {
    throw new Error(`airtable ${res.status} — ${(await res.text()).slice(0, 300)}`);
  }
}

async function sendMail(data: DemoPayload, role: string) {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return;
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: Number(process.env.SMTP_PORT ?? 465) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  await transporter.sendMail({
    from: `"Site Selekt" <${SMTP_USER}>`,
    to: MAIL_TO,
    replyTo: data.email,
    subject: `Demande de démo — ${data.company}`,
    text: [
      `Nom : ${data.name}`,
      `Société : ${data.company}`,
      `Email : ${data.email}`,
      `Fonction : ${role}`,
      `Nb boutiques : ${data.network}`,
      `Langue : ${data.locale ?? "fr"}`,
      "",
      data.message?.trim() ? `Message :\n${data.message.trim()}` : "(pas de message)",
    ].join("\n"),
  });
}

export async function POST(request: Request) {
  let data: DemoPayload;
  try {
    data = (await request.json()) as DemoPayload;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Honeypot : réponse positive silencieuse, rien n'est transmis.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  // Validation serveur — mêmes règles que le client.
  const required = ["name", "company", "email", "role", "network"] as const;
  for (const field of required) {
    const value = data[field];
    if (typeof value !== "string" || !value.trim() || value.length > 500) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email!)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (data.consent !== "yes") {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (typeof data.message === "string" && data.message.length > 5000) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (typeof data.roleOther === "string" && data.roleOther.length > 500) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // « Autre » : la précision saisie accompagne la fonction
  const role = data.roleOther?.trim() ? `${data.role} — ${data.roleOther.trim()}` : data.role!;

  // B (Airtable) puis A (SMTP) : chaque canal échoue sans bloquer l'autre,
  // et aucun échec ne remonte au visiteur — le mail FormSubmit du navigateur
  // reste la troisième ceinture.
  const [airtable, mail] = await Promise.allSettled([
    writeToAirtable(data, role),
    sendMail(data, role),
  ]);
  if (airtable.status === "rejected") {
    console.error("[demo] écriture Airtable échouée :", airtable.reason);
  }
  if (mail.status === "rejected") {
    console.error("[demo] envoi SMTP échoué :", mail.reason);
  }
  return NextResponse.json({ ok: true });
}
