import type { SectionHeadingContent, SectionId } from "@/types/navigation";

export const sections: Record<SectionId, SectionHeadingContent> = {
  hero: {
    eyebrow: { es: "Inicio", en: "Home" },
    title: { es: "El Juramento del Desarrollador", en: "The Developer's Oath" },
  },
  about: {
    eyebrow: { es: "Sobre mí", en: "About me" },
    title: { es: "Cuaderno de Campo", en: "Field Notebook" },
    description: {
      es: "Lo que observo, anoto y me apasiona lejos del teclado.",
      en: "What I observe, jot down and love away from the keyboard.",
    },
  },
  projects: {
    eyebrow: { es: "Proyectos", en: "Projects" },
    title: { es: "El Pensadero Digital", en: "The Digital Pensieve" },
    description: {
      es: "Recuerdos de software: escritorio, móvil, smartwatch, videojuego y proyectos personales.",
      en: "Software memories: desktop, mobile, smartwatch, game and personal projects.",
    },
  },
  testimonials: {
    eyebrow: { es: "Testimonios", en: "Testimonials" },
    title: { es: "El Concilio de Mentores", en: "The Council of Mentors" },
    description: {
      es: "Palabras de quienes han trabajado conmigo.",
      en: "Words from those who have worked with me.",
    },
  },
  experience: {
    eyebrow: { es: "Experiencia", en: "Experience" },
    title: { es: "El Mapa de Trayectoria", en: "The Trajectory Map" },
    description: {
      es: "Formación académica y experiencia técnica.",
      en: "Academic background and technical experience.",
    },
  },
  contact: {
    eyebrow: { es: "Contacto", en: "Contact" },
    title: { es: "El Despacho de Lechuzas", en: "The Owl Post Office" },
    description: {
      es: "Escríbeme una carta y la lechuza hará el resto.",
      en: "Write me a letter and the owl will do the rest.",
    },
  },
  skills: {
    eyebrow: { es: "Habilidades", en: "Skills" },
    title: { es: "La Sala de Menesteres", en: "The Room of Requirement" },
    description: {
      es: "Las herramientas con las que construyo y lo que me inspira.",
      en: "The tools I build with and what inspires me.",
    },
  },
};
