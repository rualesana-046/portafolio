"use client";

import { useRef, useState, type ReactNode } from "react";
import { Folder } from "@/components/ui/Folder";
import { useIsHydrated } from "@/hooks/useDocumentAttribute";
import { useHoldInPlace } from "@/hooks/useHoldInPlace";
import { useLocalized } from "@/hooks/useLocalized";
import type { CabinetFolder, CabinetFolderId } from "@/types/cabinet";

interface CabinetProps {
  readonly folders: readonly CabinetFolder[];
  readonly defaultFolder: CabinetFolderId;
  readonly renderContent: (folder: CabinetFolder, index: number, isVisited: boolean) => ReactNode;
}

export function Cabinet({ folders, defaultFolder, renderContent }: CabinetProps) {
  const t = useLocalized();
  const isHydrated = useIsHydrated();
  const [openId, setOpenId] = useState<CabinetFolderId>(defaultFolder);
  const [visited, setVisited] = useState<ReadonlySet<CabinetFolderId>>(() => new Set([defaultFolder]));
  const cabinetRef = useRef<HTMLDivElement>(null);
  const holdInPlace = useHoldInPlace();

  const select = (id: CabinetFolderId, tab: HTMLElement) => {
    if (id === openId) {
      return;
    }
    const panels = [
      tab.closest(".folder")?.querySelector<HTMLElement>(".folder-panel"),
      cabinetRef.current?.querySelector<HTMLElement>(".folder[data-open] .folder-panel"),
    ].filter((panel): panel is HTMLElement => panel !== null && panel !== undefined);
    holdInPlace(tab, panels);
    setOpenId(id);
    setVisited((current) => (current.has(id) ? current : new Set([...current, id])));
  };

  return (
    <div ref={cabinetRef} className="cabinet">
      {folders.map((folder, index) => {
        const isVisited = visited.has(folder.id);
        return (
          <Folder
            key={folder.id}
            tone={folder.id}
            label={t(folder.label)}
            index={index}
            stamp={{ ...folder.stamp, caption: t(folder.stamp.caption) }}
            isOpen={openId === folder.id}
            isVisited={isVisited}
            isHydrated={isHydrated}
            onSelect={(tab) => select(folder.id, tab)}
          >
            {renderContent(folder, index, isVisited)}
          </Folder>
        );
      })}
    </div>
  );
}
