import type { Interest } from "@/types/interest";

export const interests: readonly Interest[] = [
  {
    id: "sample-book-1",
    kind: "book",
    title: { es: "Libro de ejemplo 1", en: "Sample book 1" },
    description: {
      es: "Por qué recomiendo este libro (texto de ejemplo).",
      en: "Why I recommend this book (sample text).",
    },
  },
  {
    id: "sample-book-2",
    kind: "book",
    title: { es: "Libro de ejemplo 2", en: "Sample book 2" },
    description: {
      es: "Por qué recomiendo este libro (texto de ejemplo).",
      en: "Why I recommend this book (sample text).",
    },
  },
  {
    id: "sample-hobby-1",
    kind: "hobby",
    title: { es: "Hobby de ejemplo 1", en: "Sample hobby 1" },
    description: {
      es: "Descripción de ejemplo de un hobby específico.",
      en: "Sample description of a specific hobby.",
    },
  },
  {
    id: "sample-hobby-2",
    kind: "hobby",
    title: { es: "Hobby de ejemplo 2", en: "Sample hobby 2" },
    description: {
      es: "Descripción de ejemplo de un hobby específico.",
      en: "Sample description of a specific hobby.",
    },
  },
  {
    id: "sample-creative-1",
    kind: "creative",
    title: { es: "Faceta creativa de ejemplo 1", en: "Sample creative pursuit 1" },
    description: {
      es: "Descripción de ejemplo de una trayectoria creativa.",
      en: "Sample description of a creative pursuit.",
    },
  },
  {
    id: "sample-creative-2",
    kind: "creative",
    title: { es: "Faceta creativa de ejemplo 2", en: "Sample creative pursuit 2" },
    description: {
      es: "Descripción de ejemplo de una trayectoria creativa.",
      en: "Sample description of a creative pursuit.",
    },
  },
];
