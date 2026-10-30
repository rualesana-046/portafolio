import type { Testimonial } from "@/types/testimonial";

export const testimonials: readonly Testimonial[] = [
  {
    id: "sample-testimonial-1",
    author: "Persona ficticia 1",
    role: { es: "Docente de ejemplo", en: "Sample professor" },
    organization: "Universidad de ejemplo",
    context: "academic",
    quote: {
      es: "Testimonio ficticio de ejemplo. Aquí irá un comentario académico real.",
      en: "Fictional sample testimonial. A real academic comment will go here.",
    },
  },
  {
    id: "sample-testimonial-2",
    author: "Persona ficticia 2",
    role: { es: "Líder técnico de ejemplo", en: "Sample tech lead" },
    organization: "Empresa de ejemplo",
    context: "professional",
    quote: {
      es: "Testimonio ficticio de ejemplo. Aquí irá un comentario profesional real.",
      en: "Fictional sample testimonial. A real professional comment will go here.",
    },
  },
  {
    id: "sample-testimonial-3",
    author: "Persona ficticia 3",
    role: { es: "Compañero de proyecto de ejemplo", en: "Sample project teammate" },
    organization: "Universidad de ejemplo",
    context: "academic",
    quote: {
      es: "Testimonio ficticio de ejemplo. Aquí irá otro comentario real.",
      en: "Fictional sample testimonial. Another real comment will go here.",
    },
  },
];
