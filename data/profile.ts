import type { Profile } from "@/types/profile";

export const profile: Profile = {
  name: "Ana María Ruales",
  headline: {
    es: "Desarrolladora full stack",
    en: "Full stack developer",
  },
  summary: {
    es: "Desarrolladora full stack. Estudio Ingeniería de Software en la Universidad Cooperativa de Colombia y participo en cada etapa del ciclo de vida del software, desde el análisis de requisitos hasta el despliegue. Aprender es lo que me impulsa; hacer que lo que construyo sirva a otras personas, lo que da sentido a mi trabajo.",
    en: "Full stack developer. I study Software Engineering at Universidad Cooperativa de Colombia and take part in every stage of the software life cycle, from requirements analysis to deployment. Learning is what drives me; making what I build serve other people is what gives my work its meaning.",
  },
  photo: "/images/placeholders/profile-circle.svg",
  photoAlt: {
    es: "Espacio reservado para la foto de perfil",
    en: "Placeholder for the profile photo",
  },
  cvPath: "/cv.pdf",
};
