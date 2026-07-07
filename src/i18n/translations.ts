export type Language = 'es' | 'en';

export interface Translations {
  nav: {
    projects: string;
    work: string;
    contact: string;
    cta: string;
  };
  hero: {
    kicker: string;
    updated: string;
    lead: string;
    pillRole: string;
    pillCompany: string;
    pillDegree: string;
    ctaProjects: string;
    ctaContact: string;
  };
  projects: {
    kicker: string;
    title: string;
    viewAll: string;
    featured: string;
    source: string;
    orialDesc: string;
    smashlyDesc: string;
    fitmycvDesc: string;
    freeaiDesc: string;
  };
  work: {
    kicker: string;
    title: string;
    now: string;
    tagCurrent: string;
    tagIntern: string;
    tagRetail: string;
    tagCoach: string;
    roles: {
      fusuma: { title: string; b1: string; b2: string };
      pwc: { title: string; b1: string; b2: string };
      apple: { title: string; b1: string };
      futsal: { title: string; b1: string };
    };
  };
  contact: {
    kicker: string;
    titleLine1: string;
    titleLine2: string;
    lead: string;
    copy: string;
    copied: string;
    based: string;
    basedVal: string;
    remote: string;
    remoteVal: string;
  };
  footer: {
    set: string;
    top: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      projects: 'Projects',
      work: 'Work',
      contact: 'Contact',
      cta: 'Say hi',
    },
    hero: {
      kicker: '· Software Engineer · Madrid',
      updated: 'Last updated',
      lead: 'I build digital products with AI and clean architecture. From idea to deploy, one commit at a time.',
      pillRole: 'Software Engineer',
      pillCompany: '@ Fusuma',
      pillDegree: 'URJC · Graduated',
      ctaProjects: 'See projects',
      ctaContact: 'Get in touch',
    },
    projects: {
      kicker: 'Projects',
      title: 'Things I keep shipping.',
      viewAll: 'All on GitHub',
      featured: 'Featured',
      source: 'Source',
      orialDesc: 'A mobile habit tracker — streak logic, activity history, and data analysis. Local-first with expo-sqlite, typed with Drizzle, file-based routing via Expo Router.',
      smashlyDesc: 'Padel racket matcher — find your ideal racket, compare against alternatives. React + Vite + Supabase, with a small Python service for natural-language reviews.',
      fitmycvDesc: 'AI resume adaptation platform — tailors your CV to a job posting automatically. React + TypeScript frontend, FastAPI backend with scraping and doc generation.',
      freeaiDesc: 'Cloudflare Workers gateway that fronts multiple free-tier LLM providers behind one OpenAI-compatible endpoint. Swap providers without rewriting client code.',
    },
    work: {
      kicker: 'Work',
      title: 'Recent history.',
      now: 'Now',
      tagCurrent: 'Current',
      tagIntern: 'Internship',
      tagRetail: 'Retail',
      tagCoach: 'Coaching',
      roles: {
        fusuma: {
          title: 'Software Engineer',
          b1: 'Full-stack features in production with TypeScript, React, and Spring Boot.',
          b2: 'Code reviews, technical docs, and quality standards across teams.',
        },
        pwc: {
          title: 'Digital Assurance Intern',
          b1: 'Big Data validation at Santander Digital Services with the Aura tool.',
          b2: 'Co-authored internal technical guides for the team.',
        },
        apple: {
          title: 'Sales Specialist',
          b1: 'Explaining technology to real users, simplifying complex concepts.',
        },
        futsal: {
          title: 'Futsal Coach',
          b1: 'Coordinated groups and families — leadership and organisational instincts.',
        },
      },
    },
    contact: {
      kicker: 'Contact',
      titleLine1: 'Say',
      titleLine2: 'hi',
      lead: 'Open to interesting projects and good teams.',
      copy: 'Copy',
      copied: 'Copied',
      based: 'Based',
      basedVal: 'Madrid, Spain',
      remote: 'Remote',
      remoteVal: 'Yes · relocation open',
    },
    footer: {
      set: 'Set in Inter & JetBrains Mono',
      top: 'Top',
    },
  },
  es: {
    nav: {
      projects: 'Proyectos',
      work: 'Trabajo',
      contact: 'Contacto',
      cta: 'Escríbeme',
    },
    hero: {
      kicker: '· Ingeniero de Software · Madrid',
      updated: 'Última actualización',
      lead: 'Construyo productos digitales con IA y arquitectura limpia. De la idea al deploy, un commit a la vez.',
      pillRole: 'Ingeniero de Software',
      pillCompany: '@ Fusuma',
      pillDegree: 'URJC · Graduado',
      ctaProjects: 'Ver proyectos',
      ctaContact: 'Contactar',
    },
    projects: {
      kicker: 'Proyectos',
      title: 'Cosas que sigo lanzando.',
      viewAll: 'Todo en GitHub',
      featured: 'Destacado',
      source: 'Código',
      orialDesc: 'Un tracker de hábitos móvil — lógica de rachas, historial de actividad y análisis de datos. Local-first con expo-sqlite, tipado con Drizzle, routing basado en archivos con Expo Router.',
      smashlyDesc: 'Comparador de palas de pádel — encuentra tu pala ideal y compárala con alternativas. React + Vite + Supabase, con un pequeño servicio en Python para reseñas en lenguaje natural.',
      fitmycvDesc: 'Plataforma de adaptación de CVs con IA — ajusta tu currículum a una oferta automáticamente. Frontend en React + TypeScript, backend en FastAPI con scraping y generación de documentos.',
      freeaiDesc: 'Gateway en Cloudflare Workers que unifica varios proveedores de LLM gratuitos tras un endpoint compatible con OpenAI. Cambia de proveedor sin reescribir el cliente.',
    },
    work: {
      kicker: 'Trabajo',
      title: 'Trayectoria reciente.',
      now: 'Ahora',
      tagCurrent: 'Actual',
      tagIntern: 'Prácticas',
      tagRetail: 'Retail',
      tagCoach: 'Entrenador',
      roles: {
        fusuma: {
          title: 'Ingeniero de Software',
          b1: 'Funcionalidades full-stack en producción con TypeScript, React y Spring Boot.',
          b2: 'Code reviews, documentación técnica y estándares de calidad entre equipos.',
        },
        pwc: {
          title: 'Becario de Auditoría Digital',
          b1: 'Validación de Big Data en Santander Digital Services con la herramienta Aura.',
          b2: 'Coautor de guías técnicas internas para el equipo.',
        },
        apple: {
          title: 'Sales Specialist',
          b1: 'Explicar tecnología a usuarios reales, simplificando conceptos complejos.',
        },
        futsal: {
          title: 'Entrenador de Futsal',
          b1: 'Coordinación de grupos y familias — liderazgo y gestión.',
        },
      },
    },
    contact: {
      kicker: 'Contacto',
      titleLine1: 'Hable',
      titleLine2: 'mos',
      lead: 'Abierto a proyectos interesantes y buenos equipos.',
      copy: 'Copiar',
      copied: 'Copiado',
      based: 'Ubicación',
      basedVal: 'Madrid, España',
      remote: 'Remoto',
      remoteVal: 'Sí · abierto a reubicación',
    },
    footer: {
      set: 'Composición: Inter y JetBrains Mono',
      top: 'Arriba',
    },
  },
};

export function getTranslations(lang: Language): Translations {
  return translations[lang];
}
