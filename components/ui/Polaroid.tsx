import Image from "next/image";
import type { CSSProperties } from "react";
import { PaperClip } from "@/components/ui/PaperClip";
import { maskVariableStyle } from "@/lib/mask";
import { isExternalUrl } from "@/lib/text";
import type { Illustration } from "@/types/illustration";

interface PolaroidPhoto {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
}

interface PolaroidProps {
  readonly title: string;
  readonly description: string;
  readonly print: Illustration;
  readonly tilt: number;
  readonly photo?: PolaroidPhoto;
  readonly showPhoto: boolean;
  readonly link?: string;
  readonly newTabLabel: string;
}

export function Polaroid({ title, description, print, tilt, photo, showPhoto, link, newTabLabel }: PolaroidProps) {
  const isExternal = link !== undefined && isExternalUrl(link);

  return (
    <article className="polaroid" style={{ "--tilt": `${tilt}deg` } as CSSProperties}>
      <PaperClip />
      <span className="polaroid-photo">
        {photo && showPhoto ? (
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="15rem"
            className="polaroid-image"
          />
        ) : (
          <span aria-hidden="true" className="folder-art polaroid-art" style={maskVariableStyle(print.src)} />
        )}
      </span>
      <h4 className="mt-3 font-body text-lg font-semibold italic text-letter-ink">
        {link ? (
          <a
            href={link}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="focus-ring-letter rounded-sm underline decoration-letter-line underline-offset-4"
          >
            {title}
            {isExternal && <span className="sr-only"> {newTabLabel}</span>}
          </a>
        ) : (
          title
        )}
      </h4>
      <p className="mt-1 text-sm leading-snug text-letter-muted">{description}</p>
    </article>
  );
}
