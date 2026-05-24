export type Language = 'es' | 'en';

export interface Translations {
  nav: {
    experience: string;
    projects: string;
    contact: string;
    about: string;
  };
  about: {
    badge: string;
    title: string;
    status: string;
    p1: string;
    p2: string;
    education: string;
    location: string;
    languages: string;
    skillsTitle: string;
  };
  hero: {
    available: string;
    titlePrefix: string;
    subtitle: string;
    description: string;
    location: string;
    age: string;
    btnContact: string;
    btnProjects: string;
  };
  experience: {
    badge: string;
    title: string;
    description: string;
  };
  projects: {
    badge: string;
    title: string;
    description: string;
    viewAll: string;
    featured: string;
    viewWeb: string;
  };
  contact: {
    badge: string;
    title: string;
    description: string;
    email: string;
    copyEmail: string;
    copied: string;
    location: string;
    availableRemote: string;
    findMeOn: string;
  };
}

export const translations: Record<Language, Translations> = {
  es: {
    nav: {
      experience: 'Experiencia',
      projects: 'Proyectos',
      contact: 'Contacto',
      about: 'Sobre Mí',
    },
    about: {
      badge: 'Sobre Mí',
      title: 'Creando soluciones digitales con mentalidad de constructor',
      status: 'Abierto a oportunidades',
      p1: 'Soy estudiante de Ingeniería del Software en URJC (último año) apasionado por convertir ideas en productos reales. Desde plataformas con IA hasta apps web full-stack, disfruto todo el proceso de construir algo que funciona.',
      p2: 'Actualmente estoy aprendiendo React Native y Expo con Orial, un gestor de hábitos personal, y terminando mi TFG (Smashly) — una app de pádel con IA. Me apasiona la integración de IA, la arquitectura limpia y construir herramientas que la gente use de verdad.',
      education: 'Educación',
      location: 'Ubicación',
      languages: 'Idiomas',
      skillsTitle: 'Stack Tecnológico',
    },
    hero: {
      available: 'Disponible para trabajar',
      titlePrefix: 'Hola, soy',
      subtitle: 'Desarrollador Full-Stack | Estudiante de último año de Ingeniería del Software en URJC',
      description: 'Construyo productos digitales con IA y arquitectura limpia. De la idea al deploy, pasando por código.',
      location: 'Madrid, España',
      age: '21 años',
      btnContact: 'Contactar',
      btnProjects: 'Ver Proyectos',
    },
    experience: {
      badge: 'Trayectoria',
      title: 'Experiencia Laboral',
      description: 'Mi trayectoria profesional a través de diferentes roles e industrias, construyendo habilidades que complementan mi experiencia técnica.',
    },
    projects: {
      badge: 'Portafolio',
      title: 'Proyectos Destacados',
      description: 'Una muestra de mi trabajo reciente y proyectos personales, demostrando mis habilidades en desarrollo web e ingeniería de software.',
      viewAll: 'Ver todos los proyectos en GitHub',
      featured: 'Destacado',
      viewWeb: 'Ver Web',
    },
    contact: {
      badge: 'Contacto',
      title: 'Trabajemos Juntos',
      description: 'Siempre estoy interesado en nuevas oportunidades y proyectos apasionantes. Ya sea que tengas una pregunta o simplemente quieras saludar, ¡no dudes en contactar!',
      email: 'Email',
      copyEmail: 'Copiar Email',
      copied: '¡Copiado!',
      location: 'Ubicación',
      availableRemote: 'Disponible para trabajo remoto',
      findMeOn: 'Encuéntrame en',
    },
  },
  en: {
    nav: {
      experience: 'Experience',
      projects: 'Projects',
      contact: 'Contact',
      about: 'About',
    },
    about: {
      badge: 'About Me',
      title: 'Building digital solutions with a builder mindset',
      status: 'Open to work',
      p1: "I'm a Software Engineering student at URJC (last year) who loves turning ideas into real products. From AI-powered platforms to full-stack web apps, I enjoy the entire process of building something that works.",
      p2: "Currently diving into React Native & Expo with Orial, a personal habit tracker, and finishing my TFG (Smashly) — a padel app with AI features. I'm passionate about AI integration, clean architecture, and building tools that people actually use.",
      education: 'Education',
      location: 'Location',
      languages: 'Languages',
      skillsTitle: 'Tech Stack',
    },
    hero: {
      available: 'Available for work',
      titlePrefix: "Hi, I'm",
      subtitle: 'Full-Stack Developer | Last-year Software Engineering Student at URJC',
      description: 'I build digital products with AI and clean architecture. From idea to deploy, one commit at a time.',
      location: 'Madrid, Spain',
      age: '21 years old',
      btnContact: 'Get in Touch',
      btnProjects: 'View Projects',
    },
    experience: {
      badge: 'Background',
      title: 'Work Experience',
      description: 'My professional journey through different roles and industries, building skills that complement my technical expertise.',
    },
    projects: {
      badge: 'Portfolio',
      title: 'Featured Projects',
      description: 'A showcase of my recent work and personal projects, demonstrating my skills in web development and software engineering.',
      viewAll: 'View All Projects on GitHub',
      featured: 'Featured',
      viewWeb: 'View Web',
    },
    contact: {
      badge: 'Get in Touch',
      title: "Let's Work Together",
      description: "I'm always interested in new opportunities and exciting projects. Whether you have a question or just want to say hi, feel free to reach out!",
      email: 'Email',
      copyEmail: 'Copy Email',
      copied: 'Copied!',
      location: 'Location',
      availableRemote: 'Available for remote work',
      findMeOn: 'Find me on',
    },
  },
};

export function getTranslations(lang: Language): Translations {
  return translations[lang];
}
