import type { Testimonial } from "@/types/testimonial";

export const testimonials: readonly Testimonial[] = [
  {
    id: "johana-andrade",
    author: "Johana Andrade",
    role: {
      es: "Ingeniera mecatrónica y desarrolladora frontend",
      en: "Mechatronics engineer and front-end developer",
    },
    context: "professional",
    quote: {
      es: "Aprecio su interés por desarrollar soluciones que no solo cumplan su propósito, sino que además sean agradables y fáciles de usar. Reconozco su atención al detalle, su creatividad y sus aportes durante el desarrollo de una plataforma que construimos en conjunto.",
      en: "I appreciate her interest in developing solutions that not only fulfill their purpose but are also pleasant and easy to use. I recognize her attention to detail, her creativity and her contributions during the development of a platform we built together.",
    },
  },
  {
    id: "jose-guerrero",
    author: "José Guerrero",
    role: { es: "Ingeniero electrónico", en: "Electronics engineer" },
    context: "professional",
    quote: {
      es: "He tenido la oportunidad de trabajar con ella en proyectos relacionados con electrónica y desarrollo de software. Destaco su curiosidad, su capacidad para aprender y su disposición para explorar soluciones desde diferentes perspectivas. Es alguien comprometida y con mucho interés por seguir creciendo en el ámbito tecnológico.",
      en: "I have had the opportunity to work with her on projects involving electronics and software development. I highlight her curiosity, her ability to learn and her willingness to explore solutions from different perspectives. She is a committed person with a strong interest in continuing to grow in the technology field.",
    },
  },
  {
    id: "juan-chaves",
    author: "Juan Chaves",
    role: { es: "Ingeniero civil", en: "Civil engineer" },
    context: "professional",
    quote: {
      es: "Ha mostrado un gran interés por comprender las necesidades del proyecto y encontrar la mejor manera de convertirlas en una solución tecnológica. Valoro su disposición para escuchar, proponer ideas y mantener una comunicación abierta durante el desarrollo de la aplicación.",
      en: "He has shown great interest in understanding the project's needs and finding the best way to turn them into a technological solution. I value his willingness to listen, propose ideas and keep communication open during the development of the application.",
    },
  },
];
