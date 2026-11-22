import type { Interest } from "@/types/interest";

export const interests: readonly Interest[] = [
  {
    id: "pragmatic-programmer",
    kind: "book",
    title: { es: "El programador pragmático", en: "The Pragmatic Programmer" },
    description: { es: "Andrew Hunt y David Thomas", en: "Andrew Hunt and David Thomas" },
  },
  {
    id: "leer-es-resistir",
    kind: "book",
    title: { es: "Leer es resistir", en: "Leer es resistir" },
    description: { es: "Mario Mendoza", en: "Mario Mendoza" },
  },
  {
    id: "maria",
    kind: "book",
    title: { es: "María", en: "María" },
    description: { es: "Jorge Isaacs", en: "Jorge Isaacs" },
  },
  {
    id: "hunger-games",
    kind: "book",
    title: { es: "Los juegos del hambre", en: "The Hunger Games" },
    description: { es: "Suzanne Collins", en: "Suzanne Collins" },
  },
  {
    id: "fairs-museums-exhibitions",
    kind: "hobby",
    title: {
      es: "Ferias, museos y exposiciones",
      en: "Book fairs, museums and exhibitions",
    },
    description: {
      es: "Recorrer ferias de libros, museos y exposiciones de arte.",
      en: "Visiting book fairs, museums and art exhibitions.",
    },
  },
  {
    id: "music",
    kind: "hobby",
    title: { es: "Música", en: "Music" },
    description: { es: "Escuchar música.", en: "Listening to music." },
  },
  {
    id: "documentaries-films",
    kind: "hobby",
    title: { es: "Documentales y películas", en: "Documentaries and films" },
    description: { es: "Ver documentales y películas.", en: "Watching documentaries and films." },
  },
  {
    id: "writing",
    kind: "hobby",
    title: { es: "Escritura", en: "Writing" },
    description: { es: "Una forma de expresar mis ideas.", en: "A way of expressing my ideas." },
  },
  {
    id: "painting",
    kind: "hobby",
    title: { es: "Pintura", en: "Painting" },
    description: { es: "Otra forma de expresar mis ideas.", en: "Another way of expressing my ideas." },
  },
  {
    id: "board-games-puzzles",
    kind: "hobby",
    title: { es: "Juegos de mesa y rompecabezas", en: "Board games and puzzles" },
    description: { es: "Los juegos de mesa y los rompecabezas.", en: "Board games and puzzles." },
  },
  {
    id: "electronics-software",
    kind: "hobby",
    title: { es: "Electrónica y software", en: "Electronics and software" },
    description: {
      es: "Explorar proyectos que combinan la electrónica con el software.",
      en: "Exploring projects that combine electronics with software.",
    },
  },
];
