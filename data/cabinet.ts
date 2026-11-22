import { illustrations } from "@/data/illustrations";
import { ui } from "@/data/ui";
import type { CabinetFolder, CabinetFolderId } from "@/types/cabinet";

export const cabinetFolders: readonly CabinetFolder[] = [
  {
    id: "readings",
    label: ui.folderReadings,
    description: ui.folderReadingsNote,
    stamp: { illustration: illustrations.fernStamp, caption: ui.stampReadings, tilt: 0 },
    shelf: { kind: "book", prints: [illustrations.keyPrint, illustrations.mothPrint] },
  },
  {
    id: "hobbies",
    label: ui.folderHobbies,
    stamp: { illustration: illustrations.wildflowerStamp, caption: ui.stampHobbies, tilt: 0 },
    shelf: { kind: "hobby", prints: [illustrations.fernPrint, illustrations.keyPrint] },
  },
  {
    id: "tools",
    label: ui.folderTools,
    stamp: { illustration: illustrations.keyStamp, caption: ui.stampTools, tilt: -45 },
  },
];

export const defaultCabinetFolder: CabinetFolderId = "tools";

export const polaroidTilts = [-2.25, 1.75, 2.5, -1.5, -2.75, 1.25] as const;
