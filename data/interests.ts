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
      es: "Me gusta perderme entre libros, obras y artistas.",
      en: "I like getting lost among books, artworks and artists.",
    },
  },
  {
    id: "music",
    kind: "hobby",
    title: { es: "Música", en: "Music" },
    description: {
      es: "Una buena canción puede cambiarme el día.",
      en: "A good song can change my day.",
    },
  },
  {
    id: "documentaries-films",
    kind: "hobby",
    title: { es: "Documentales y películas", en: "Documentaries and films" },
    description: {
      es: "Me gustan las historias bien contadas, reales o de ficción.",
      en: "I like well-told stories, whether real or fictional.",
    },
  },
  {
    id: "writing",
    kind: "hobby",
    title: { es: "Escritura", en: "Writing" },
    description: {
      es: "Escribo para darle forma a mis ideas.",
      en: "I write to give shape to my ideas.",
    },
  },
  {
    id: "painting",
    kind: "hobby",
    title: { es: "Pintura", en: "Painting" },
    description: {
      es: "Pinto para expresarme sin palabras.",
      en: "I paint to express myself without words.",
    },
  },
  {
    id: "board-games-puzzles",
    kind: "hobby",
    title: { es: "Juegos de mesa y rompecabezas", en: "Board games and puzzles" },
    description: {
      es: "Me divierten los retos: armar, resolver y jugar.",
      en: "I enjoy a good challenge: putting together, solving and playing.",
    },
  },
  {
    id: "electronics-software",
    kind: "hobby",
    title: { es: "Electrónica y software", en: "Electronics and software" },
    description: {
      es: "Me gusta ver cómo un circuito y un programa pueden trabajar juntos.",
      en: "I like seeing how a circuit and a program can work together.",
    },
  },
];
