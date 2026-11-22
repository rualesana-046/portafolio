"use client";

import { AnimatePresence, m } from "framer-motion";
import { FilterChips } from "@/components/ui/FilterChips";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { projects } from "@/data/projects";
import { sections } from "@/data/sections";
import { projectFilterLabels, ui } from "@/data/ui";
import { useKindFilter } from "@/hooks/useKindFilter";
import type { ProjectKind } from "@/types/project";

const projectKinds = Object.keys(projectFilterLabels) as ProjectKind[];

export function Projects() {
  const { activeKind, setActiveKind, kinds, visibleItems } = useKindFilter(projects, projectKinds);

  return (
    <Section id="projects" heading={sections.projects}>
      <FilterChips
        label={ui.filterProjects}
        kinds={kinds}
        labels={projectFilterLabels}
        activeKind={activeKind}
        onSelect={setActiveKind}
        visibleCount={visibleItems.length}
      />
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence initial={false}>
          {visibleItems.map((project, index) => (
            <m.li
              key={project.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <Reveal delay={(index % 3) * 0.08} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            </m.li>
          ))}
        </AnimatePresence>
      </ul>
    </Section>
  );
}
