import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

/**
 * Image de partage générée par page (Open Graph / Twitter), sur le gabarit
 * de la charte : fond void, titre Instrument Serif crème, wordmark et
 * domaine en Plex Mono. Branchée sur toutes les pages via pageMetadata
 * (`/og?title=…&locale=…`) — un lien partagé sur LinkedIn ou Slack a
 * désormais un visuel. Polices embarquées dans assets/og (pas de tiers).
 */

export const runtime = "nodejs";

const WIDTH = 1200;
const HEIGHT = 630;

let fonts: { serif: Buffer; mono: Buffer } | null = null;
async function loadFonts() {
  if (!fonts) {
    const dir = path.join(process.cwd(), "assets", "og");
    fonts = {
      serif: await readFile(path.join(dir, "InstrumentSerif-Regular.ttf")),
      mono: await readFile(path.join(dir, "IBMPlexMono-Medium.ttf")),
    };
  }
  return fonts;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("title") ?? "Selekt Retail OS").slice(0, 120);
  const locale = searchParams.get("locale") === "en" ? "en" : "fr";
  const { serif, mono } = await loadFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#100F0D",
          padding: "64px 72px",
          fontFamily: "Instrument Serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 10, height: 10, backgroundColor: "#C9A96A", borderRadius: 5 }} />
          <div
            style={{
              fontFamily: "IBM Plex Mono",
              fontSize: 26,
              letterSpacing: 10,
              color: "#C9A96A",
            }}
          >
            SELEKT RETAIL OS
          </div>
        </div>

        <div
          style={{
            fontSize: title.length > 60 ? 58 : 68,
            lineHeight: 1.12,
            color: "#EDE8DD",
            maxWidth: 980,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(201, 185, 158, 0.35)",
            paddingTop: 28,
          }}
        >
          <div
            style={{
              fontFamily: "IBM Plex Mono",
              fontSize: 22,
              letterSpacing: 4,
              color: "#C9B99E",
            }}
          >
            selekt-retail.com
          </div>
          <div
            style={{
              fontFamily: "IBM Plex Mono",
              fontSize: 20,
              letterSpacing: 6,
              color: "#8C7648",
            }}
          >
            {locale === "fr" ? "LE CLIENTELING DES MAISONS" : "LUXURY CLIENTELING"}
          </div>
        </div>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        { name: "Instrument Serif", data: serif, style: "normal", weight: 400 },
        { name: "IBM Plex Mono", data: mono, style: "normal", weight: 500 },
      ],
    },
  );
}
