import { createSkillIndex } from "@/lib/skills";
import type { Skill } from "@/types/skill";

export const skills: readonly Skill[] = [
  { id: "python", name: "Python", category: "language", logo: "/logos/tech/python.svg" },
  { id: "java", name: "Java", category: "language", logo: "/logos/tech/java.svg" },
  { id: "typescript", name: "TypeScript", category: "language", logo: "/logos/tech/typescript.svg" },
  { id: "react", name: "React", category: "framework", logo: "/logos/tech/react.svg" },
  { id: "nextjs", name: "Next.js", category: "framework", logo: "/logos/tech/nextjs.svg" },
  { id: "nestjs", name: "NestJS", category: "framework", logo: "/logos/tech/nestjs.svg" },
  { id: "springboot", name: "Spring Boot", category: "framework", logo: "/logos/tech/springboot.svg" },
  { id: "tailwindcss", name: "Tailwind CSS", category: "framework", logo: "/logos/tech/tailwindcss.svg" },
  { id: "bootstrap", name: "Bootstrap", category: "framework", logo: "/logos/tech/bootstrap.svg" },
  { id: "postgresql", name: "PostgreSQL", category: "database", logo: "/logos/tech/postgresql.svg" },
  { id: "mongodb", name: "MongoDB", category: "database", logo: "/logos/tech/mongodb.svg" },
  { id: "nodejs", name: "Node.js", category: "platform", logo: "/logos/tech/nodejs.svg" },
  { id: "vercel", name: "Vercel", category: "platform", logo: "/logos/tech/vercel.svg" },
  { id: "railway", name: "Railway", category: "platform", logo: "/logos/tech/railway.svg" },
  { id: "aws", name: "AWS", category: "platform", logo: "/logos/tech/aws.svg" },
  { id: "arduino", name: "Arduino", category: "platform", logo: "/logos/tech/arduino.svg" },
  { id: "git", name: "Git", category: "tool", logo: "/logos/tech/git.svg" },
  { id: "postman", name: "Postman", category: "tool", logo: "/logos/tech/postman.svg" },
];

export const skillIndex = createSkillIndex(skills);
