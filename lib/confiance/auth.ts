import { hmacHex } from "./crypto";

/**
 * Session admin du back-office Confiance : cookie signé HMAC, 12 heures.
 * Mot de passe attendu dans CONFIANCE_ADMIN_PASSWORD (.env.production).
 * Sans cette variable, le back-office est inaccessible (aucun défaut).
 */

export const ADMIN_COOKIE = "confiance_admin";
const SESSION_MS = 12 * 60 * 60 * 1000;

function signingKey(): string | null {
  const pass = process.env.CONFIANCE_ADMIN_PASSWORD;
  if (!pass) return null;
  return `${pass}::${process.env.CONFIANCE_KEY ?? ""}`;
}

export function checkPassword(candidate: string): boolean {
  const pass = process.env.CONFIANCE_ADMIN_PASSWORD;
  return Boolean(pass) && candidate === pass;
}

export function makeSessionCookie(): string {
  const key = signingKey();
  if (!key) throw new Error("CONFIANCE_ADMIN_PASSWORD absente");
  const exp = Date.now() + SESSION_MS;
  return `${exp}.${hmacHex(key, String(exp))}`;
}

export function sessionValid(cookieValue: string | undefined): boolean {
  const key = signingKey();
  if (!key || !cookieValue) return false;
  const [exp, sig] = cookieValue.split(".");
  if (!exp || !sig) return false;
  if (Number(exp) < Date.now()) return false;
  return hmacHex(key, exp) === sig;
}

export function isAdmin(request: Request): boolean {
  const cookies = request.headers.get("cookie") ?? "";
  const match = cookies.match(new RegExp(`(?:^|;\\s*)${ADMIN_COOKIE}=([^;]+)`));
  return sessionValid(match?.[1]);
}

export function adminCookieHeader(value: string, maxAgeSeconds: number, request?: Request): string {
  // Secure seulement en HTTPS réel (nginx pose x-forwarded-proto) — sans
  // cette condition, les tests locaux en http perdraient le cookie.
  const secure =
    !request ||
    request.headers.get("x-forwarded-proto") === "https" ||
    new URL(request.url).protocol === "https:";
  return `${ADMIN_COOKIE}=${value}; Path=/; HttpOnly; SameSite=Lax;${secure ? " Secure;" : ""} Max-Age=${maxAgeSeconds}`;
}
