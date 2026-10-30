import type { EducationEntry, LanguageProficiency } from "@/types/experience";

export const education: readonly EducationEntry[] = [
  {
    id: "sample-degree",
    title: { es: "Título universitario de ejemplo", en: "Sample university degree" },
    institution: "Universidad de ejemplo",
    period: { start: "2022-02", end: null },
    description: {
      es: "Descripción de ejemplo del programa académico.",
      en: "Sample description of the academic program.",
    },
  },
  {
    id: "sample-certificate",
    title: { es: "Certificación de ejemplo", en: "Sample certification" },
    institution: "Institución de ejemplo",
    period: { start: "2024-06", end: "2024-08" },
    credentialUrl: "#",
  },
  {
    id: "sample-diploma",
    title: { es: "Diplomado de ejemplo", en: "Sample diploma course" },
    institution: "Institución de ejemplo",
    period: { start: "2023-09", end: "2023-11" },
  },
];

export const languageProficiencies: readonly LanguageProficiency[] = [
  {
    id: "english",
    language: { es: "Inglés", en: "English" },
    level: "B2 (ejemplo)",
  },
];
