import type { ContactContent } from "@/types/contact";

export const contact: ContactContent = {
  title: { es: "Carta de Correspondencia", en: "Letter of Correspondence" },
  greeting: { es: "Estimado visitante:", en: "Dear visitor," },
  body: {
    es: "Si tienes una propuesta, una pregunta o una idea que valga la pena construir, escríbeme. Tu carta se abrirá en tu aplicación de correo, lista para enviarse.",
    en: "If you have a proposal, a question or an idea worth building, write to me. Your letter will open in your email app, ready to be sent.",
  },
  signature: { es: "Con tinta y gratitud,", en: "With ink and gratitude," },
  fields: {
    name: {
      label: { es: "Nombre", en: "Name" },
      placeholder: { es: "Tu nombre", en: "Your name" },
    },
    email: {
      label: { es: "Correo electrónico", en: "Email" },
      placeholder: { es: "tu@correo.com", en: "you@email.com" },
    },
    subject: {
      label: { es: "Asunto", en: "Subject" },
      placeholder: { es: "¿Sobre qué quieres escribir?", en: "What would you like to write about?" },
    },
    message: {
      label: { es: "Mensaje", en: "Message" },
      placeholder: { es: "Escribe tu carta aquí…", en: "Write your letter here…" },
    },
  },
};
