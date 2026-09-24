import { createCipheriv, createDecipheriv, createHash, createHmac, randomBytes } from "node:crypto";

/**
 * Chiffrement au repos du module Confiance (store JSON + PDF archivés).
 * AES-256-GCM, clé dérivée de CONFIANCE_KEY (n'importe quelle chaîne → SHA-256).
 * Sans CONFIANCE_KEY (dev local), les fichiers sont écrits en clair.
 */

const MAGIC = Buffer.from("SLKENC1");

export function encryptionKey(): Buffer | null {
  const raw = process.env.CONFIANCE_KEY;
  if (!raw) return null;
  return createHash("sha256").update(raw).digest();
}

export function encryptAtRest(plain: Buffer): Buffer {
  const key = encryptionKey();
  if (!key) return plain;
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const enc = Buffer.concat([cipher.update(plain), cipher.final()]);
  return Buffer.concat([MAGIC, iv, cipher.getAuthTag(), enc]);
}

export function decryptAtRest(data: Buffer): Buffer {
  if (!data.subarray(0, MAGIC.length).equals(MAGIC)) return data; // fichier en clair (dev)
  const key = encryptionKey();
  if (!key) throw new Error("CONFIANCE_KEY absente : impossible de déchiffrer le store");
  const iv = data.subarray(MAGIC.length, MAGIC.length + 12);
  const tag = data.subarray(MAGIC.length + 12, MAGIC.length + 28);
  const enc = data.subarray(MAGIC.length + 28);
  const decipher = createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(enc), decipher.final()]);
}

export function sha256Hex(data: Buffer | string): string {
  return createHash("sha256").update(data).digest("hex");
}

export function hmacHex(key: string, value: string): string {
  return createHmac("sha256", key).update(value).digest("hex");
}

/** Jeton de lien : 192 bits aléatoires, transmis une seule fois, stocké hashé. */
export function newToken(): string {
  return randomBytes(24).toString("base64url");
}

export function newId(prefix: string): string {
  return `${prefix}_${randomBytes(6).toString("hex")}`;
}
