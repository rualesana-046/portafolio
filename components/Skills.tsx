"use client";

import { Cabinet } from "@/components/ui/Cabinet";
import { Polaroid } from "@/components/ui/Polaroid";
import { Section } from "@/components/ui/Section";
import { TechLogo } from "@/components/ui/TechLogo";
import { cabinetFolders, defaultCabinetFolder, polaroidTilts } from "@/data/cabinet";
import { interests } from "@/data/interests";
import { sections } from "@/data/sections";
import { skills } from "@/data/skills";
import { skillCategoryLabels, ui } from "@/data/ui";
import { useLocalized } from "@/hooks/useLocalized";
import { pickCyclic } from "@/lib/collections";
import { groupSkillsByCategory } from "@/lib/skills";
import type { CabinetFolder } from "@/types/cabinet";
import type { SkillCategory } from "@/types/skill";

const skillGroups = groupSkillsByCategory(skills, Object.keys(skillCategoryLabels) as SkillCategory[]);
const POLAROID_TILT_STEP = 2;

export function Skills() {
  const t = useLocalized();

  const renderContent = (folder: CabinetFolder, index: number, isVisited: boolean) => {
    if (!folder.shelf) {
      return (
        <div className="folder-groups">
          {skillGroups.map((group) => (
            <section key={group.category} className="folder-group">
              <h4 className="folder-group-title text-xs font-semibold uppercase tracking-[0.22em] text-letter-muted">
                {t(skillCategoryLabels[group.category])}
              </h4>
              <ul className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li key={skill.id} className="folder-chip">
                    <TechLogo src={skill.logo} className="folder-chip-logo h-4 w-4 bg-letter-ink" />
                    <span>{skill.name}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      );
    }

    const { kind, prints } = folder.shelf;
    return (
      <ul className="folder-polaroids">
        {interests
          .filter((interest) => interest.kind === kind)
          .map((interest, position) => (
            <li key={interest.id}>
              <Polaroid
                title={t(interest.title)}
                description={t(interest.description)}
                print={pickCyclic(prints, position)}
                tilt={pickCyclic(polaroidTilts, index * POLAROID_TILT_STEP + position)}
                photo={interest.image && { ...interest.image, alt: t(interest.image.alt) }}
                showPhoto={isVisited}
                link={interest.link}
                newTabLabel={t(ui.opensInNewTab)}
              />
            </li>
          ))}
      </ul>
    );
  };

  return (
    <Section id="skills" heading={sections.skills}>
      <Cabinet folders={cabinetFolders} defaultFolder={defaultCabinetFolder} renderContent={renderContent} />
    </Section>
  );
}
