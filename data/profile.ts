import type { Profile } from "@/types/profile";

export const profile: Profile = {
  name: "Nombre de ejemplo",
  headline: {
    es: "Titular de ejemplo: desarrollo full stack con Next.js, NestJS y Spring Boot",
    en: "Sample headline: full stack development with Next.js, NestJS and Spring Boot",
  },
  summary: {
    es: "Resumen de ejemplo. Aquí irá una presentación técnica breve centrada en frameworks y especialidades.",
    en: "Sample summary. A short technical introduction focused on frameworks and specialties will go here.",
  },
  photo: "/images/placeholders/profile.svg",
  photoAlt: {
    es: "Marcador decorativo en lugar de la fotografía, pendiente de entrega",
    en: "Decorative placeholder in place of the photograph, pending delivery",
  },
  cvPath: "/cv.pdf",
};
