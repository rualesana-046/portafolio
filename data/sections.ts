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
    title: { es: "El Scriptorium", en: "The Scriptorium" },
    description: {
      es: "Donde se escribe y se construye software: proyectos de escritorio, móvil, smartwatch, videojuego y personales.",
      en: "Where software is written and built: desktop, mobile, smartwatch, game and personal projects.",
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
    title: { es: "Carta Sellada", en: "Sealed Letter" },
    description: {
      es: "Sella la carta y se abrirá tu correo con ella lista.",
      en: "Seal the letter and your email will open with it ready.",
    },
  },
  skills: {
    eyebrow: { es: "Habilidades", en: "Skills" },
    title: { es: "Herbario de Herramientas", en: "Herbarium of Tools" },
    description: {
      es: "Las herramientas con las que construyo y lo que me inspira.",
      en: "The tools I build with and what inspires me.",
    },
  },
};
