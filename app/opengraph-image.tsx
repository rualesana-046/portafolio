import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { MONOGRAM_PATH, MONOGRAM_VIEW_BOX } from "@/data/monogram";
import { profile } from "@/data/profile";
import { siteMetadata } from "@/data/site";
import { DEFAULT_LOCALE } from "@/lib/i18n";

const FONT_DIRECTORY = join(process.cwd(), "assets", "og");

const COLORS = {
  backgroundFrom: "#14584C",
  backgroundMid: "#052A24",
  backgroundTo: "#031C18",
  gold: "#C9AE7C",
  goldLight: "#DCC596",
  ink: "#EEE7D3",
} as const;

const SEAL_SIZE = 300;

export const alt = siteMetadata.shareImage.alt[DEFAULT_LOCALE];
export const size = { width: siteMetadata.shareImage.width, height: siteMetadata.shareImage.height };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const [titleFont, bodyFont] = await Promise.all([
    readFile(join(FONT_DIRECTORY, "GrenzeGotisch-Bold.ttf")),
    readFile(join(FONT_DIRECTORY, "Newsreader-Regular.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 90px",
          gap: 70,
          background: `linear-gradient(160deg, ${COLORS.backgroundFrom} 0%, ${COLORS.backgroundMid} 55%, ${COLORS.backgroundTo} 100%)`,
        }}
      >
        <div
          style={{
            width: SEAL_SIZE,
            height: SEAL_SIZE,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            border: `6px solid ${COLORS.gold}`,
            background: COLORS.backgroundTo,
          }}
        >
          <svg width={190} height={150} viewBox={MONOGRAM_VIEW_BOX}>
            <path d={MONOGRAM_PATH} fill={COLORS.goldLight} />
          </svg>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ fontFamily: "Grenze Gotisch", fontWeight: 700, fontSize: 90, lineHeight: 1.05, color: COLORS.goldLight }}>
            {profile.name}
          </div>
          <div style={{ width: 160, height: 4, background: COLORS.gold }} />
          <div style={{ fontFamily: "Newsreader", fontSize: 48, lineHeight: 1.2, color: COLORS.ink }}>
            {profile.headline[DEFAULT_LOCALE]}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Grenze Gotisch", data: titleFont, weight: 700, style: "normal" },
        { name: "Newsreader", data: bodyFont, weight: 400, style: "normal" },
      ],
    },
  );
}
