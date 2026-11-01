import type { Localized } from "@/types/i18n";
import type { Illustration } from "@/types/illustration";
import type { InterestKind } from "@/types/interest";

export type CabinetFolderId = "readings" | "hobbies" | "creations" | "tools";

export interface FolderStampArt {
  readonly illustration: Illustration;
  readonly caption: Localized;
  readonly tilt: number;
}

export interface FolderShelf {
  readonly kind: InterestKind;
  readonly prints: readonly [Illustration, ...Illustration[]];
}

export interface CabinetFolder {
  readonly id: CabinetFolderId;
  readonly label: Localized;
  readonly stamp: FolderStampArt;
  readonly shelf?: FolderShelf;
}
