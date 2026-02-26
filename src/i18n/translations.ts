export type Language = 'es' | 'en';

export interface Translations {
  nav: {
    experience: string;
    projects: string;
    contact: string;
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
    },
    hero: {
      available: 'Disponible para trabajar',
      titlePrefix: 'Hola, soy',
      subtitle: 'Desarrollador Full-Stack | Estudiante de último año de Ingeniería del Software en URJC',
      description: 'Ingeniero de software emergente con una sólida base técnica y mentalidad de \'constructor\'. Especializado en crear soluciones eficientes e integrar IA para resolver problemas reales. Busco desafíos técnicos y colaboraciones de alto impacto.',
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
      description: 'Siempre estoy interesado en nuevas oportunidades y proyectos emocionales. Ya sea que tengas una pregunta o simplemente quieras saludar, ¡no dudes en contactar!',
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
    },
    hero: {
      available: 'Available for work',
      titlePrefix: "Hi, I'm",
      subtitle: 'Full-Stack Developer | Last-year Software Engineering Student at URJC',
      description: "Up-and-coming software engineer with a solid technical foundation and a 'builder' mindset. Specialised in creating efficient solutions and integrating AI to solve real-world problems. Seeking technical challenges and high-impact collaborations.",
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
