import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteMetadata } from "@/data/site";

const SOURCE_ICON_PATH = join(process.cwd(), "app", "icon.svg");

export const contentType = "image/png";

export function generateImageMetadata() {
  return siteMetadata.appIconSizes.map((size) => ({ id: String(size), size: { width: size, height: size }, contentType }));
}

interface IconProps {
  readonly id: Promise<string>;
}

export default async function Icon({ id }: IconProps) {
  const size = Number(await id);
  const source = await readFile(SOURCE_ICON_PATH);
  const dataUri = `data:image/svg+xml;base64,${source.toString("base64")}`;
  return new ImageResponse(<img src={dataUri} width={size} height={size} alt="" />, { width: size, height: size });
}
