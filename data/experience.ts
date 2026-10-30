import type { ExperienceEntry } from "@/types/experience";

export const experience: readonly ExperienceEntry[] = [
  {
    id: "sample-experience-1",
    role: { es: "Cargo de ejemplo 1", en: "Sample role 1" },
    organization: "Organización de ejemplo",
    period: { start: "2025-02", end: null },
    description: {
      es: "Descripción de ejemplo de la experiencia actual.",
      en: "Sample description of the current experience.",
    },
    highlights: {
      es: ["Logro de ejemplo 1", "Logro de ejemplo 2"],
      en: ["Sample achievement 1", "Sample achievement 2"],
    },
    technologies: ["nestjs", "postgresql", "railway"],
  },
  {
    id: "sample-experience-2",
    role: { es: "Cargo de ejemplo 2", en: "Sample role 2" },
    organization: "Organización de ejemplo",
    period: { start: "2024-03", end: "2024-12" },
    description: {
      es: "Descripción de ejemplo de una experiencia anterior.",
      en: "Sample description of a previous experience.",
    },
    highlights: {
      es: ["Logro de ejemplo 3"],
      en: ["Sample achievement 3"],
    },
    technologies: ["springboot", "java", "aws"],
  },
];
