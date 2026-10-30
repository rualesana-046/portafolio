import type { Project } from "@/types/project";

const placeholderImage = "/images/placeholders/project.svg";

export const projects: readonly Project[] = [
  {
    id: "sample-desktop",
    kind: "desktop",
    title: { es: "Proyecto de ejemplo 1", en: "Sample project 1" },
    description: {
      es: "Descripción técnica de ejemplo de una aplicación de escritorio.",
      en: "Sample technical description of a desktop application.",
    },
    technologies: ["java", "postgresql", "git"],
    image: placeholderImage,
    imageAlt: {
      es: "Marcador de imagen del proyecto de ejemplo 1",
      en: "Image placeholder for sample project 1",
    },
    links: { repository: "#", download: "#" },
  },
  {
    id: "sample-mobile",
    kind: "mobile",
    title: { es: "Proyecto de ejemplo 2", en: "Sample project 2" },
    description: {
      es: "Descripción técnica de ejemplo de una aplicación móvil.",
      en: "Sample technical description of a mobile application.",
    },
    technologies: ["react", "typescript", "mongodb"],
    image: placeholderImage,
    imageAlt: {
      es: "Marcador de imagen del proyecto de ejemplo 2",
      en: "Image placeholder for sample project 2",
    },
    links: { repository: "#", download: "#" },
  },
  {
    id: "sample-smartwatch",
    kind: "smartwatch",
    title: { es: "Proyecto de ejemplo 3", en: "Sample project 3" },
    description: {
      es: "Descripción técnica de ejemplo de una aplicación para smartwatch.",
      en: "Sample technical description of a smartwatch application.",
    },
    technologies: ["java", "git"],
    image: placeholderImage,
    imageAlt: {
      es: "Marcador de imagen del proyecto de ejemplo 3",
      en: "Image placeholder for sample project 3",
    },
    links: { repository: "#" },
  },
  {
    id: "sample-game",
    kind: "game",
    title: { es: "Proyecto de ejemplo 4", en: "Sample project 4" },
    description: {
      es: "Descripción técnica de ejemplo de un videojuego.",
      en: "Sample technical description of a video game.",
    },
    technologies: ["python", "git"],
    image: placeholderImage,
    imageAlt: {
      es: "Marcador de imagen del proyecto de ejemplo 4",
      en: "Image placeholder for sample project 4",
    },
    links: { repository: "#", download: "#" },
  },
  {
    id: "sample-web",
    kind: "web",
    title: { es: "Proyecto de ejemplo 5", en: "Sample project 5" },
    description: {
      es: "Descripción técnica de ejemplo de una aplicación web.",
      en: "Sample technical description of a web application.",
    },
    technologies: ["nextjs", "nestjs", "postgresql", "tailwindcss", "vercel"],
    image: placeholderImage,
    imageAlt: {
      es: "Marcador de imagen del proyecto de ejemplo 5",
      en: "Image placeholder for sample project 5",
    },
    links: { repository: "#", demo: "#" },
  },
  {
    id: "sample-personal",
    kind: "personal",
    title: { es: "Proyecto de ejemplo 6", en: "Sample project 6" },
    description: {
      es: "Descripción técnica de ejemplo de un proyecto personal.",
      en: "Sample technical description of a personal project.",
    },
    technologies: ["arduino", "python"],
    image: placeholderImage,
    imageAlt: {
      es: "Marcador de imagen del proyecto de ejemplo 6",
      en: "Image placeholder for sample project 6",
    },
    links: {},
  },
];
