"use client";

import { AnimatePresence, m } from "framer-motion";
import { FilterChips } from "@/components/ui/FilterChips";
import { GlassCard } from "@/components/ui/GlassCard";
import { InterestCard } from "@/components/ui/InterestCard";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SkillTile } from "@/components/ui/SkillTile";
import { interests } from "@/data/interests";
import { sections } from "@/data/sections";
import { skills } from "@/data/skills";
import { interestKindLabels, skillCategoryLabels, ui } from "@/data/ui";
import { useKindFilter } from "@/hooks/useKindFilter";
import { useLocalized } from "@/hooks/useLocalized";
import { groupSkillsByCategory } from "@/lib/skills";
import type { InterestKind } from "@/types/interest";
import type { SkillCategory } from "@/types/skill";

const skillCategories = Object.keys(skillCategoryLabels) as SkillCategory[];
const interestKinds = Object.keys(interestKindLabels) as InterestKind[];
const skillGroups = groupSkillsByCategory(skills, skillCategories);

export function Skills() {
  const t = useLocalized();
  const { activeKind, setActiveKind, kinds, visibleItems } = useKindFilter(interests, interestKinds);

  return (
    <Section id="skills" heading={sections.skills}>
      <h3 id="skills-stack" className="mb-8 text-center font-title text-3xl font-semibold text-ink">
        {t(ui.techStack)}
      </h3>
      <ul aria-labelledby="skills-stack" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, index) => (
          <li key={group.category}>
            <Reveal delay={(index % 3) * 0.08} className="h-full">
              <GlassCard className="h-full p-6">
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-accent-strong">
                  {t(skillCategoryLabels[group.category])}
                </h4>
                <ul className="grid grid-cols-3 gap-3">
                  {group.skills.map((skill) => (
                    <li key={skill.id}>
                      <SkillTile skill={skill} />
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          </li>
        ))}
      </ul>

      <h3 id="skills-interests" className="mb-8 mt-24 text-center font-title text-3xl font-semibold text-ink">
        {t(ui.interests)}
      </h3>
      <FilterChips
        label={ui.filterInterests}
        kinds={kinds}
        labels={interestKindLabels}
        activeKind={activeKind}
        onSelect={setActiveKind}
        visibleCount={visibleItems.length}
      />
      <ul aria-labelledby="skills-interests" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence initial={false}>
          {visibleItems.map((interest, index) => (
            <m.li
              key={interest.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <Reveal delay={(index % 3) * 0.08} className="h-full">
                <InterestCard interest={interest} />
              </Reveal>
            </m.li>
          ))}
        </AnimatePresence>
      </ul>
    </Section>
  );
}
