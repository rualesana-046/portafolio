import type { ContactFormStatus, SocialPlatform, ValidationErrorCode } from "@/types/contact";
import type { Localized } from "@/types/i18n";
import type { InterestKind } from "@/types/interest";
import type { ProjectKind } from "@/types/project";
import type { SkillCategory } from "@/types/skill";
import type { TestimonialContext } from "@/types/testimonial";

export const ui = {
  skipToContent: { es: "Saltar al contenido", en: "Skip to content" },
  mainNavigation: { es: "Navegación principal", en: "Main navigation" },
  openMenu: { es: "Abrir menú", en: "Open menu" },
  closeMenu: { es: "Cerrar menú", en: "Close menu" },
  themeLight: { es: "Alba", en: "Dawn" },
  themeDark: { es: "Ocaso", en: "Dusk" },
  switchToLight: { es: "Cambiar a tema claro (Alba)", en: "Switch to light theme (Dawn)" },
  switchToDark: { es: "Cambiar a tema oscuro (Ocaso)", en: "Switch to dark theme (Dusk)" },
  switchLanguage: { es: "Cambiar idioma a inglés", en: "Switch language to Spanish" },
  opensInNewTab: { es: "(se abre en una pestaña nueva)", en: "(opens in a new tab)" },
  downloadCv: { es: "Ver mi CV", en: "View my CV" },
  viewRepository: { es: "Código", en: "Code" },
  viewDemo: { es: "Demo", en: "Demo" },
  downloadProject: { es: "Descargar", en: "Download" },
  technologies: { es: "Tecnologías", en: "Technologies" },
  filterAll: { es: "Todos", en: "All" },
  filterInterests: { es: "Filtrar intereses por tipo", en: "Filter interests by type" },
  filterProjects: { es: "Filtrar proyectos por tipo", en: "Filter projects by type" },
  visibleItems: { es: "Elementos visibles", en: "Visible items" },
  projectLinks: { es: "Enlaces del proyecto", en: "Project links" },
  techStack: { es: "Mi stack", en: "My stack" },
  interests: { es: "Intereses complementarios", en: "Complementary interests" },
  previousTestimonial: { es: "Testimonio anterior", en: "Previous testimonial" },
  nextTestimonial: { es: "Testimonio siguiente", en: "Next testimonial" },
  present: { es: "Presente", en: "Present" },
  periodSeparator: { es: "–", en: "–" },
  academicBackground: { es: "Formación académica", en: "Academic background" },
  technicalExperience: { es: "Experiencia técnica y laboral", en: "Technical and work experience" },
  languages: { es: "Idiomas", en: "Languages" },
  viewCredential: { es: "Ver credencial", en: "View credential" },
  sendLetter: { es: "Sellar y abrir en mi correo", en: "Seal and open in my email" },
  copyMessage: { es: "Copiar mensaje", en: "Copy message" },
  characters: { es: "caracteres", en: "characters" },
  upTo: { es: "Hasta", en: "Up to" },
  between: { es: "Entre", en: "Between" },
  and: { es: "y", en: "and" },
  allFieldsRequired: { es: "Todos los campos son obligatorios.", en: "All fields are required." },
  formHasErrors: {
    es: "Revisa los campos marcados antes de sellar la carta.",
    en: "Check the highlighted fields before sealing the letter.",
  },
  mailTo: { es: "Para", en: "To" },
  mailSubject: { es: "Asunto", en: "Subject" },
  contactElsewhere: { es: "También puedes encontrarme en", en: "You can also find me on" },
  mailSubjectPrefix: { es: "Portafolio", en: "Portfolio" },
  mailBodyName: { es: "Nombre", en: "Name" },
  mailBodyEmail: { es: "Correo", en: "Email" },
  mailBodyMessage: { es: "Mensaje", en: "Message" },
  socialLinks: { es: "Redes y contacto", en: "Social and contact links" },
  copyrightSymbol: { es: "©", en: "©" },
  notFoundTitle: { es: "Página no encontrada", en: "Page not found" },
  notFoundBody: {
    es: "Este sendero del bosque no lleva a ninguna parte.",
    en: "This forest path leads nowhere.",
  },
  backHome: { es: "Volver al inicio", en: "Back to home" },
} as const satisfies Record<string, Localized>;

export const validationMessages = {
  required: { es: "Este campo es obligatorio.", en: "This field is required." },
  invalidName: {
    es: "Escribe un nombre válido: solo letras, espacios, guiones y apóstrofes.",
    en: "Enter a valid name: letters, spaces, hyphens and apostrophes only.",
  },
  nameTooLong: { es: "El nombre es demasiado largo.", en: "The name is too long." },
  invalidEmail: {
    es: "Escribe un correo válido, por ejemplo nombre@dominio.com.",
    en: "Enter a valid email, for example name@domain.com.",
  },
  subjectTooShort: { es: "El asunto es demasiado corto.", en: "The subject is too short." },
  subjectTooLong: { es: "El asunto es demasiado largo.", en: "The subject is too long." },
  messageTooShort: { es: "El mensaje es demasiado corto.", en: "The message is too short." },
  messageTooLong: {
    es: "El mensaje supera el límite de caracteres.",
    en: "The message exceeds the character limit.",
  },
} as const satisfies Record<ValidationErrorCode, Localized>;

export const formStatusMessages = {
  stamping: { es: "Sellando tu carta…", en: "Sealing your letter…" },
  opened: {
    es: "Tu aplicación de correo debería abrirse con la carta lista. Falta que pulses Enviar allí. Si no se abrió, usa Copiar mensaje.",
    en: "Your email app should open with the letter ready. You still need to press Send there. If it didn't open, use Copy message.",
  },
  copied: {
    es: "Mensaje copiado al portapapeles.",
    en: "Message copied to the clipboard.",
  },
  copyFailed: {
    es: "No se pudo copiar el mensaje. Selecciónalo y cópialo manualmente.",
    en: "The message could not be copied. Select it and copy it manually.",
  },
} as const satisfies Record<Exclude<ContactFormStatus, "idle">, Localized>;

export const projectKindLabels = {
  desktop: { es: "Escritorio", en: "Desktop" },
  mobile: { es: "Móvil", en: "Mobile" },
  smartwatch: { es: "Smartwatch", en: "Smartwatch" },
  game: { es: "Videojuego", en: "Game" },
  web: { es: "Web", en: "Web" },
  personal: { es: "Personal", en: "Personal" },
} as const satisfies Record<ProjectKind, Localized>;

export const interestKindLabels = {
  book: { es: "Libros", en: "Books" },
  hobby: { es: "Hobbies", en: "Hobbies" },
  creative: { es: "Creatividad", en: "Creative" },
} as const satisfies Record<InterestKind, Localized>;

export const skillCategoryLabels = {
  language: { es: "Lenguajes", en: "Languages" },
  framework: { es: "Frameworks y librerías", en: "Frameworks and libraries" },
  database: { es: "Bases de datos", en: "Databases" },
  platform: { es: "Entornos y plataformas", en: "Runtimes and platforms" },
  tool: { es: "Herramientas", en: "Tools" },
} as const satisfies Record<SkillCategory, Localized>;

export const testimonialContextLabels = {
  academic: { es: "Académico", en: "Academic" },
  professional: { es: "Profesional", en: "Professional" },
} as const satisfies Record<TestimonialContext, Localized>;

export const socialPlatformLabels = {
  email: { es: "Correo electrónico", en: "Email" },
  linkedin: { es: "LinkedIn", en: "LinkedIn" },
  github: { es: "GitHub", en: "GitHub" },
} as const satisfies Record<SocialPlatform, Localized>;
