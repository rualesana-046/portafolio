import type { AboutContent } from "@/types/profile";

export const about: AboutContent = {
  paragraph: {
    es: "Soy estudiante de Ingeniería de Software, con especial interés en la ingeniería de requisitos, el análisis, el diseño y el desarrollo de software. Me gusta comprender los problemas, explorar posibles soluciones y formar parte de todo el proceso de creación de un producto, teniendo siempre en cuenta las necesidades de las personas que lo utilizarán. Creo que un buen software no solo debe funcionar correctamente, sino también ser útil, intuitivo y ofrecer una buena experiencia a sus usuarios.",
    en: "I am a Software Engineering student with a special interest in requirements engineering, analysis, design and software development. I like to understand problems, explore possible solutions and be part of the whole process of creating a product, always keeping in mind the needs of the people who will use it. I believe good software must not only work correctly, but also be useful, intuitive and offer a good experience to its users.",
  },
  skills: [
    { es: "Ingeniería de requisitos", en: "Requirements engineering" },
    { es: "Análisis y diseño de software", en: "Software analysis and design" },
    { es: "Diseño centrado en el usuario", en: "User-centered design" },
    { es: "Desarrollo full stack", en: "Full stack development" },
    { es: "APIs REST", en: "REST APIs" },
    { es: "Despliegue en la nube", en: "Cloud deployment" },
  ],
  photo: {
    src: "/images/about.webp",
    alt: {
      es: "Ana María Ruales sentada, con camisa negra, sostiene un libro abierto frente a una pared blanca.",
      en: "Ana María Ruales seated, in a black shirt, holding an open book in front of a white wall.",
    },
  },
};
