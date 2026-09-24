import { readFileSync, writeFileSync, mkdirSync, existsSync, renameSync } from "node:fs";
import { join } from "node:path";
import { decryptAtRest, encryptAtRest, newId, sha256Hex } from "./crypto";

/**
 * Persistance du module Confiance : un store JSON unique, chiffré au repos
 * (AES-256-GCM via CONFIANCE_KEY), écrit de façon atomique dans
 * data/confiance/ — répertoire hors git et hors archive de déploiement, donc
 * préservé à chaque mise en production. Premier démarrage : initialisation
 * v1.0 depuis data/confiance-seed/documents.json (committé).
 */

export type DocSlug = "securite" | "rgpd";
export const DOC_SLUGS: DocSlug[] = ["securite", "rgpd"];

export type ProfileKey = "dpo" | "rssi" | "achats" | "complet";
export const PROFILES: Record<ProfileKey, string> = {
  dpo: "DPO",
  rssi: "Sécurité / RSSI",
  achats: "Achats",
  complet: "Complet",
};

export type Section = { num: number; title: string; html: string; internal: boolean };

export type Version = {
  id: string;
  label: string; // v1.0, v1.1…
  createdAt: string;
  author: string;
  sections: Section[];
};

export type DocState = {
  title: string;
  subtitle: string;
  profiles: Record<ProfileKey, number[]>;
  versions: Version[]; // la dernière est la version courante
};

export type LinkRecord = {
  id: string;
  tokenHash: string;
  doc: DocSlug;
  versionId: string;
  versionLabel: string;
  profile: ProfileKey;
  sections: number[];
  recipient: { name: string; company: string; email: string };
  variables: { interlocuteur: string; societe: string; date: string; version: string };
  overrides: Record<string, string>; // num de section → HTML surchargé pour ce client
  singleUse: boolean;
  createdAt: string;
  expiresAt: string;
  firstOpenedAt?: string;
  openIp?: string;
  validatedAt?: string;
  validateIp?: string;
  pdfSha256?: string;
};

export type RequestRecord = {
  id: string;
  name: string;
  company: string;
  role: string;
  email: string;
  need: string;
  createdAt: string;
  ip: string;
};

export type DraftRecord = { fields: Record<string, string>; updatedAt: string };

export type ConfianceStore = {
  documents: Record<DocSlug, DocState>;
  links: LinkRecord[];
  requests: RequestRecord[];
  drafts: Record<string, DraftRecord>; // clé = tokenHash
};

const DATA_DIR = join(process.cwd(), "data", "confiance");
const STORE_FILE = join(DATA_DIR, "store.json");
const PDF_DIR = join(DATA_DIR, "pdfs");
const SEED_FILE = join(process.cwd(), "data", "confiance-seed", "documents.json");

function initFromSeed(): ConfianceStore {
  const seed = JSON.parse(readFileSync(SEED_FILE, "utf8")) as {
    documents: Record<DocSlug, { title: string; subtitle: string; sections: Section[]; profiles: Record<ProfileKey, number[]> }>;
  };
  const now = new Date().toISOString();
  const documents = {} as Record<DocSlug, DocState>;
  for (const slug of DOC_SLUGS) {
    const d = seed.documents[slug];
    documents[slug] = {
      title: d.title,
      subtitle: d.subtitle,
      profiles: d.profiles,
      versions: [{ id: newId("ver"), label: "v1.0", createdAt: now, author: "Selekt", sections: d.sections }],
    };
  }
  return { documents, links: [], requests: [], drafts: {} };
}

export function loadStore(): ConfianceStore {
  if (!existsSync(STORE_FILE)) {
    const store = initFromSeed();
    saveStore(store);
    return store;
  }
  return JSON.parse(decryptAtRest(readFileSync(STORE_FILE)).toString("utf8")) as ConfianceStore;
}

export function saveStore(store: ConfianceStore): void {
  mkdirSync(DATA_DIR, { recursive: true });
  const tmp = `${STORE_FILE}.tmp`;
  writeFileSync(tmp, encryptAtRest(Buffer.from(JSON.stringify(store), "utf8")));
  renameSync(tmp, STORE_FILE);
}

export function currentVersion(doc: DocState): Version {
  return doc.versions[doc.versions.length - 1];
}

export function findLink(store: ConfianceStore, token: string): LinkRecord | undefined {
  const hash = sha256Hex(token);
  return store.links.find((l) => l.tokenHash === hash);
}

/** Un lien est consultable tant qu'il n'est pas expiré ni consommé (usage unique validé). */
export function linkUsable(link: LinkRecord): boolean {
  if (new Date(link.expiresAt).getTime() < Date.now()) return false;
  if (link.singleUse && link.validatedAt) return false;
  return true;
}

/** Sections effectives d'un lien : celles cochées, jamais les internes, surcharges appliquées. */
export function linkSections(store: ConfianceStore, link: LinkRecord): Section[] {
  const doc = store.documents[link.doc];
  const version = doc.versions.find((v) => v.id === link.versionId) ?? currentVersion(doc);
  return version.sections
    .filter((s) => !s.internal && link.sections.includes(s.num))
    .map((s) => (link.overrides[String(s.num)] ? { ...s, html: link.overrides[String(s.num)] } : s));
}

export function savePdf(id: string, pdf: Buffer): void {
  mkdirSync(PDF_DIR, { recursive: true });
  writeFileSync(join(PDF_DIR, `${id}.pdf.enc`), encryptAtRest(pdf));
}

export function readPdf(id: string): Buffer | null {
  const file = join(PDF_DIR, `${id}.pdf.enc`);
  if (!existsSync(file)) return null;
  return decryptAtRest(readFileSync(file));
}
