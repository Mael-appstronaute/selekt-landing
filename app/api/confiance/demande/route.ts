import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { loadStore, saveStore } from "@/lib/confiance/store";
import { newId } from "@/lib/confiance/crypto";

/**
 * Formulaire public « Demander notre dossier de conformité » (/confiance).
 * Honeypot + limitation par IP, écriture au journal des demandes, puis
 * notification SMTP à contact@selekt-retail.com si SMTP_* est configuré.
 * Aucun service tiers : tout reste sur le serveur.
 */

export const runtime = "nodejs";

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

type Payload = {
  name?: string;
  company?: string;
  role?: string;
  email?: string;
  need?: string;
  website?: string; // honeypot
};

export async function POST(request: Request) {
  let data: Payload;
  try {
    data = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (data.website) return NextResponse.json({ ok: true }); // piège : succès silencieux

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) return NextResponse.json({ ok: false, error: "rate" }, { status: 429 });

  const required = ["name", "company", "role", "email", "need"] as const;
  for (const field of required) {
    const value = data[field];
    if (typeof value !== "string" || !value.trim() || value.length > 2000) {
      return NextResponse.json({ ok: false, error: field }, { status: 400 });
    }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email!)) {
    return NextResponse.json({ ok: false, error: "email" }, { status: 400 });
  }

  const store = loadStore();
  store.requests.push({
    id: newId("req"),
    name: data.name!.trim(),
    company: data.company!.trim(),
    role: data.role!.trim(),
    email: data.email!.trim(),
    need: data.need!.trim(),
    createdAt: new Date().toISOString(),
    ip,
  });
  saveStore(store);

  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;
  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(process.env.SMTP_PORT ?? 465),
        secure: Number(process.env.SMTP_PORT ?? 465) === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      });
      await transporter.sendMail({
        from: `"Site Selekt" <${SMTP_USER}>`,
        to: "contact@selekt-retail.com",
        replyTo: data.email,
        subject: `Demande de dossier de conformité — ${data.company!.trim()}`,
        text: [
          `Nom : ${data.name!.trim()}`,
          `Société : ${data.company!.trim()}`,
          `Fonction : ${data.role!.trim()}`,
          `Email : ${data.email!.trim()}`,
          "",
          `Besoin :\n${data.need!.trim()}`,
        ].join("\n"),
      });
    } catch (error) {
      console.error("[confiance] notification demande échouée :", error);
    }
  } else {
    console.error("[confiance] SMTP non configuré : demande enregistrée sans notification");
  }

  return NextResponse.json({ ok: true });
}
