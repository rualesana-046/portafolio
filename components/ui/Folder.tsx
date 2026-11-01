"use client";

import { useId, type CSSProperties, type ReactNode } from "react";
import { FolderStamp } from "@/components/ui/FolderStamp";
import type { Illustration } from "@/types/illustration";

interface FolderStampContent {
  readonly illustration: Illustration;
  readonly caption: string;
  readonly tilt: number;
}

interface FolderProps {
  readonly tone: string;
  readonly label: string;
  readonly index: number;
  readonly stamp: FolderStampContent;
  readonly isOpen: boolean;
  readonly isVisited: boolean;
  readonly isHydrated: boolean;
  readonly isFront: boolean;
  readonly onSelect: (tab: HTMLElement) => void;
  readonly children: ReactNode;
}

export function Folder({
  tone,
  label,
  index,
  stamp,
  isOpen,
  isVisited,
  isHydrated,
  isFront,
  onSelect,
  children,
}: FolderProps) {
  const id = useId();
  const tabId = `${id}-tab`;
  const panelId = `${id}-panel`;

  return (
    <section
      className="folder"
      data-tone={tone}
      data-open={isOpen ? "" : undefined}
      data-visited={isVisited ? "" : undefined}
      style={{ "--tab-index": index, "--layer": index + 1 } as CSSProperties}
    >
      <h3 className="folder-heading">
        <button
          id={tabId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          aria-disabled={isOpen || undefined}
          onClick={(event) => onSelect(event.currentTarget)}
          className="folder-tab focus-ring"
        >
          {label}
        </button>
      </h3>
      <div className="folder-body">
        <div className="folder-panel">
          <div className="folder-panel-inner">
            <div
              id={panelId}
              role="region"
              aria-labelledby={tabId}
              inert={isHydrated && !isOpen}
              className="folder-content"
            >
              <FolderStamp {...stamp} className="folder-sheet-stamp" />
              {children}
            </div>
          </div>
        </div>
        {isFront && <FolderStamp {...stamp} isDecorative className="folder-face-stamp" />}
      </div>
    </section>
  );
}
