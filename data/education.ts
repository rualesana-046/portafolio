import type { EducationEntry, LanguageProficiency } from "@/types/experience";

export const education: readonly EducationEntry[] = [
  {
    id: "software-engineering",
    title: { es: "Ingeniería de Software", en: "Software Engineering" },
    institution: {
      es: "Universidad Cooperativa de Colombia",
      en: "Universidad Cooperativa de Colombia",
    },
    period: { start: "2024", end: null },
  },
  {
    id: "programming-bootcamp",
    title: {
      es: "Bootcamp de programación, nivel intermedio",
      en: "Programming bootcamp, intermediate level",
    },
    institution: {
      es: "Talento Tech, en alianza con la Universidad Tecnológica de Pereira",
      en: "Talento Tech, in partnership with Universidad Tecnológica de Pereira",
    },
    period: { start: "2024", end: "2024" },
  },
  {
    id: "coding-diploma",
    title: {
      es: "Diplomado en codificación y programación",
      en: "Diploma in coding and programming",
    },
    institution: {
      es: "Pontificia Universidad Javeriana, con Samsung Electronics Colombia",
      en: "Pontificia Universidad Javeriana, with Samsung Electronics Colombia",
    },
    period: { start: "2020", end: "2021" },
  },
];

export const languageProficiencies: readonly LanguageProficiency[] = [];
