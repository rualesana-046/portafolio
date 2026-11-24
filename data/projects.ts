import { sameInEveryLocale } from "@/lib/i18n";
import type { Project } from "@/types/project";

const individualProject = { es: "Proyecto individual.", en: "Individual project." };

const medicalNotice = {
  es: "Esta aplicación no sustituye la atención médica.",
  en: "This application does not replace medical care.",
};

export const projects: readonly Project[] = [
  {
    id: "risklex",
    kind: "desktop",
    title: sameInEveryLocale("RiskLex"),
    description: {
      es: "Analiza documentos PDF y páginas web, como políticas de privacidad y términos y condiciones, para identificar posibles riesgos de privacidad, rastreo, costos y cancelaciones. Con inteligencia artificial, explica los hallazgos en lenguaje sencillo y señala las cláusulas correspondientes.",
      en: "It analyzes PDF documents and web pages, such as privacy policies and terms and conditions, to identify possible risks related to privacy, tracking, costs and cancellations. Using artificial intelligence, it explains the findings in plain language and points to the relevant clauses.",
    },
    technologies: [
      "typescript",
      sameInEveryLocale("Electron"),
      "react",
      "tailwindcss",
      sameInEveryLocale("SQLite"),
      sameInEveryLocale("Cloudflare Workers"),
      { es: "API de inteligencia artificial", en: "Artificial intelligence API" },
    ],
    features: {
      es: [
        "Analizar documentos PDF y páginas web de términos y condiciones.",
        "Identificar riesgos relacionados con privacidad, rastreo, costos y cancelaciones.",
        "Explicar los riesgos en lenguaje sencillo con ayuda de inteligencia artificial.",
        "Mostrar las cláusulas originales que respaldan cada hallazgo.",
      ],
      en: [
        "Analyze PDF documents and web pages containing terms and conditions.",
        "Identify risks related to privacy, tracking, costs and cancellations.",
        "Explain the risks in plain language with the help of artificial intelligence.",
        "Show the original clauses that support each finding.",
      ],
    },
    participation: individualProject,
    image: "/images/projects/risklex.webp",
    imageAlt: {
      es: "Pantalla de RiskLex en escritorio: menú lateral con Analizar, Resultados, Historial y Ajustes, y un cuadro para pegar el texto de los términos o de la política de privacidad, con el botón «Analizar documento».",
      en: "RiskLex desktop screen: a side menu with Analyze, Results, History and Settings, and a box to paste the text of the terms or privacy policy, with the “Analizar documento” button.",
    },
    links: {
      repository: "https://github.com/rualesana-046/proyecto_risklex",
    },
  },
  {
    id: "glycopulse",
    kind: "smartwatch",
    title: sameInEveryLocale("GlycoPulse"),
    description: {
      es: "Permite registrar episodios de malestar, identificar patrones de síntomas con ayuda de inteligencia artificial y ofrecer protocolos de orientación y solicitud de ayuda en emergencias.",
      en: "It lets users log episodes of discomfort, identify symptom patterns with the help of artificial intelligence, and offers guidance protocols and ways to request help in emergencies.",
    },
    technologies: [
      sameInEveryLocale("Kotlin"),
      sameInEveryLocale("Jetpack Compose for Wear OS"),
      sameInEveryLocale("Firebase"),
      sameInEveryLocale("Google Cloud"),
    ],
    features: {
      es: [
        "Registrar episodios de malestar mediante la selección de síntomas y contexto.",
        "Clasificar los episodios con inteligencia artificial para orientar al usuario.",
        "Mostrar protocolos de ayuda con recomendaciones preventivas y seguras.",
        "Activar alertas de emergencia con cuenta regresiva y envío de mensajes de ayuda.",
      ],
      en: [
        "Log episodes of discomfort by selecting symptoms and context.",
        "Classify episodes with artificial intelligence to guide the user.",
        "Show help protocols with preventive and safe recommendations.",
        "Trigger emergency alerts with a countdown and help messages.",
      ],
    },
    participation: individualProject,
    notice: medicalNotice,
    image: "/images/projects/glycopulse.webp",
    imageAlt: {
      es: "Tres pantallas de reloj inteligente de GlycoPulse: el botón rojo «Me siento mal», la lista de síntomas «¿Qué sientes?» con «Mareo» marcado y el aviso «Riesgo medio» con recomendaciones.",
      en: "Three GlycoPulse smartwatch screens: the red “Me siento mal” button, the “¿Qué sientes?” symptom list with “Mareo” checked, and a “Riesgo medio” warning with recommendations.",
    },
    links: {
      repository: "https://github.com/rualesana-046/GlycoPulse",
    },
  },
  {
    id: "blank-pages-guardian",
    kind: "game",
    title: sameInEveryLocale("El Guardián de las Páginas en Blanco"),
    description: {
      es: "El jugador explora escenarios, resuelve desafíos y toma decisiones que influyen en una historia sobre los recuerdos, el olvido y las conexiones humanas.",
      en: "The player explores settings, solves challenges and makes decisions that shape a story about memory, forgetting and human connection.",
    },
    technologies: [
      sameInEveryLocale("Godot 4"),
      sameInEveryLocale("GDScript"),
      sameInEveryLocale("JSON/CSV"),
    ],
    features: {
      es: [
        "Explorar escenarios y conversar con personajes para descubrir sus historias.",
        "Resolver desafíos de exploración, persecución y gestión de recursos.",
        "Personalizar al protagonista y recolectar recuerdos mediante el Cuaderno de Cera.",
        "Tomar decisiones que modifican la narrativa y llevan a uno de tres finales posibles.",
      ],
      en: [
        "Explore settings and talk to characters to discover their stories.",
        "Solve challenges of exploration, pursuit and resource management.",
        "Customize the protagonist and collect memories through the Wax Notebook.",
        "Make decisions that change the narrative and lead to one of three possible endings.",
      ],
    },
    participation: individualProject,
    image: "/images/projects/guardian.webp",
    imageAlt: {
      es: "Ilustración en pixel art de una aldea al atardecer, con casas de piedra y madera, una torre con reloj y hojas de papel flotando, bajo el título «El Guardián de las Páginas en Blanco».",
      en: "Pixel art illustration of a village at dusk, with stone and timber houses, a clock tower and sheets of paper floating in the air, under the title “El Guardián de las Páginas en Blanco”.",
    },
    links: {
      repository: "https://github.com/rualesana-046/Proyecto_videojuego_2D",
    },
  },
  {
    id: "lente-rosa",
    kind: "mobile",
    title: sameInEveryLocale("Lente Rosa"),
    description: {
      es: "Aplicación para consultar y compartir información comunitaria sobre la percepción de seguridad y comodidad en espacios urbanos, pensada especialmente para mujeres. Incluye valoraciones de lugares, comentarios y herramientas de apoyo durante los recorridos.",
      en: "Android app to consult and share community information about the perception of safety and comfort in urban spaces, designed especially for women. It includes place ratings, comments and support tools during journeys.",
    },
    technologies: [
      sameInEveryLocale("Kotlin"),
      sameInEveryLocale("Jetpack Compose"),
      "springboot",
      sameInEveryLocale("PostgreSQL/PostGIS"),
      sameInEveryLocale("Firebase"),
      sameInEveryLocale("Google Cloud Run"),
    ],
    features: {
      es: [
        "Consultar mapas comunitarios con indicadores de seguridad y comodidad urbana.",
        "Registrar y compartir experiencias sobre distintos espacios de la ciudad.",
        "Ver valoraciones y comentarios de otras usuarias.",
        "Acceder a herramientas de apoyo: rutas incómodas, ubicación compartida y llamada simulada.",
      ],
      en: [
        "Browse community maps with urban safety and comfort indicators.",
        "Record and share experiences about different places in the city.",
        "View ratings and comments from other users.",
        "Access support tools: uncomfortable routes, shared location and a simulated call.",
      ],
    },
    participation: individualProject,
    image: "/images/projects/lenterosa.webp",
    imageAlt: {
      es: "Tres pantallas de Lente Rosa: dos pasos de la introducción, «Cómo se siente un lugar» y «Tu opinión cuida a otras», y un mapa de Pasto con marcadores de valoración.",
      en: "Three Lente Rosa screens: two onboarding steps, “Cómo se siente un lugar” and “Tu opinión cuida a otras”, and a map of Pasto with rating markers.",
    },
    links: {
      repository: "https://github.com/rualesana-046/proyecto_movil_lenteRosa",
    },
  },
  {
    id: "neurolive",
    kind: "web",
    title: sameInEveryLocale("NeuroLive"),
    description: {
      es: "Interfaz web para pacientes, cuidadores, médicos y usuarios personales. Permite ver el estado biométrico del paciente, consultar el historial de crisis, gestionar vínculos y acceder a paneles según el rol. Los datos biométricos se toman con un sensor de pulso y un ESP32, y llegan a la interfaz por WebSocket.",
      en: "Web interface for patients, caregivers, doctors and personal users. It shows the patient's biometric status, the history of crises, lets users manage links and gives access to dashboards by role. Biometric data is captured with a pulse sensor and an ESP32 and reaches the interface over WebSocket.",
    },
    technologies: [
      "nextjs",
      "react",
      "typescript",
      "tailwindcss",
      sameInEveryLocale("API REST"),
      sameInEveryLocale("WebSocket"),
      sameInEveryLocale("ESP32"),
      "vercel",
    ],
    features: {
      es: [
        "Registro e inicio de sesión de usuarios.",
        "Paneles por rol: paciente, médico, cuidador y usuario personal.",
        "Visualización de telemetría biométrica y del estado de bienestar.",
        "Consulta del historial de crisis.",
        "Vinculación entre paciente, médico y cuidador.",
        "Configuración de perfil y preferencias.",
        "Exportación de datos clínicos.",
      ],
      en: [
        "User registration and login.",
        "Dashboards by role: patient, doctor, caregiver and personal user.",
        "Biometric telemetry and well-being status display.",
        "Crisis history.",
        "Linking between patient, doctor and caregiver.",
        "Profile and preference settings.",
        "Export of clinical data.",
      ],
    },
    participation: {
      es: "Proyecto en equipo de dos personas. Participé en todas las etapas, con mayor dedicación al front end y a la implementación del hardware.",
      en: "Two-person team project. I took part in every stage, with greater involvement in the front end and the hardware implementation.",
    },
    notice: medicalNotice,
    image: "/images/projects/neurolive.webp",
    imageAlt: {
      es: "Panel de NeuroLive: editor de texto de una sesión guardada, métricas en tiempo real con pulso de 74 y saturación de oxígeno de 98 %, y temporizador de la sesión activa.",
      en: "NeuroLive dashboard: a text editor for a saved session, real-time metrics with a pulse of 74 and oxygen saturation of 98%, and the active session timer.",
    },
    links: {},
  },
];
