import { NextResponse } from "next/server";
import { adminCookieHeader, checkPassword, makeSessionCookie } from "@/lib/confiance/auth";

/** Connexion au back-office Confiance (mot de passe CONFIANCE_ADMIN_PASSWORD). */

export const runtime = "nodejs";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_PER_WINDOW = 10;
const hits = new Map<string, number[]>();

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const stamps = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (stamps.length >= MAX_PER_WINDOW) return NextResponse.json({ ok: false }, { status: 429 });
  stamps.push(now);
  hits.set(ip, stamps);

  let data: { password?: string };
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (!data.password || !checkPassword(data.password)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.headers.set("Set-Cookie", adminCookieHeader(makeSessionCookie(), 12 * 60 * 60, request));
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.headers.set("Set-Cookie", adminCookieHeader("", 0));
  return res;
}
