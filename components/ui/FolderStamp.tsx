import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { maskVariableStyle } from "@/lib/mask";
import type { Illustration } from "@/types/illustration";

interface FolderStampProps {
  readonly illustration: Illustration;
  readonly caption: string;
  readonly tilt: number;
  readonly className?: string;
}

export function FolderStamp({ illustration, caption, tilt, className }: FolderStampProps) {
  const artStyle: CSSProperties = { ...maskVariableStyle(illustration.src), rotate: `${tilt}deg` };

  return (
    <div className={cn("folder-stamp", className)}>
      <div className="folder-stamp-face">
        <span aria-hidden="true" className="folder-art folder-stamp-art" style={artStyle} />
        <p className="folder-stamp-caption">{caption}</p>
      </div>
    </div>
  );
}
