import { Project, Feedback } from '../types';

// Types supplémentaires pour les données du portfolio
export interface SkillItem {
  name: string;
  level: number;
  icon: string;
  years: number;
  description: string;
  planned?: boolean;
}

export interface SkillsProgress {
  languages: SkillItem[];
  web: SkillItem[];
  tools: SkillItem[];
  frameworks: SkillItem[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  status: string;
  experience: string;
  startYear: number;
  email: string;
  location: string;
  phone?: string;
  github: string;
  linkedin?: string;
  website?: string;
  bio: string;
  avatar: string;
  resumeUrl?: string;
}

// Fonction pour récupérer dynamiquement les projets depuis l'API ou GitHub
export const getProjects = async (): Promise<Project[]> => {
  try {
    // Tentative de récupération depuis l'API
    const response = await fetch('http://localhost:3002/api/projects');
    if (response.ok) {
      const data = await response.json();
      return data.projects || mockProjects;
    }
  } catch (error) {
    console.warn('API non disponible, utilisation des données de base:', error);
  }
  return mockProjects;
};

export const mockProjects: Project[] = [
  {
    id: 1,
    title: "Système de Parrainage ISTC",
    description: "Plateforme web complète pour la gestion du parrainage étudiant à l'ISTC. Développée avec PHP, MySQL et JavaScript, elle permet la mise en relation entre parrains et filleuls avec un système de messagerie intégré.",
    shortDescription: "Système de parrainage étudiant avec messagerie intégrée",
    image: "/images/parrainage-preview.jpg",
    images: ["/images/parrainage-preview.jpg", "/images/parrainage-2.jpg"],
    technologies: ["PHP", "MySQL", "JavaScript", "HTML/CSS", "Bootstrap"],
    category: "Web Application",
    githubUrl: "https://github.com/TenenaYeo/istc-parrainage",
    liveUrl: "https://istc-parrainage.netlify.app",
    featured: true,
    year: 2024,
    status: "completed",
    clicks: 45,
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-02-28T00:00:00Z"
  },
  {
    id: 2,
    title: "Site Web JIG 2026",
    description: "Site officiel pour les Jeux Inter-écoles de Gestion 2026. Interface moderne avec système d'inscription, galerie photos et actualités en temps réel.",
    shortDescription: "Site officiel des JIG 2026 avec inscriptions",
    image: "/images/jig-preview.jpg",
    images: ["/images/jig-preview.jpg"],
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    category: "Website",
    githubUrl: "https://github.com/TenenaYeo/jig-2026",
    liveUrl: "https://jig2026.netlify.app",
    featured: true,
    year: 2024,
    status: "in-progress",
    clicks: 32,
    createdAt: "2024-03-15T00:00:00Z",
    updatedAt: "2024-11-20T00:00:00Z"
  },
  {
    id: 3,
    title: "Application Mobile ISTC",
    description: "Application mobile en développement pour l'ISTC avec React Native. Fonctionnalités : emploi du temps, notes, actualités et communication étudiants-administration.",
    shortDescription: "App mobile ISTC avec React Native",
    image: "/images/app-mobile.jpg",
    images: ["/images/app-mobile.jpg"],
    technologies: ["React Native", "TypeScript", "Expo", "Firebase"],
    category: "Mobile App",
    githubUrl: "https://github.com/TenenaYeo/istc-mobile",
    featured: false,
    year: 2024,
    status: "planned",
    clicks: 18,
    createdAt: "2024-10-01T00:00:00Z",
    updatedAt: "2024-10-01T00:00:00Z"
  }
];

// Données de progression des compétences - Seulement les technologies que vous maîtrisez
export const skillsProgress: SkillsProgress = {
  languages: [
    {
      name: "JavaScript",
      level: 80,
      icon: "fab fa-js-square",
      years: 3,
      description: "Maîtrise d'ES6+, manipulation DOM, événements"
    },
    {
      name: "PHP",
      level: 75,
      icon: "fab fa-php", 
      years: 2,
      description: "Développement backend, intégration bases de données"
    },
    {
      name: "TypeScript",
      level: 70,
      icon: "fab fa-js-square",
      years: 1,
      description: "JavaScript typé pour des applications plus robustes"
    },
    {
      name: "Python", 
      level: 45,
      icon: "fab fa-python",
      years: 4,
      description: "Premier langage appris, mais plus utilisé depuis longtemps"
    },
    {
      name: "C",
      level: 40,
      icon: "fas fa-code",
      years: 1,
      description: "Bases apprises, mais peu pratiqué récemment"
    }
  ],
  web: [
    {
      name: "HTML/CSS",
      level: 85,
      icon: "fab fa-html5",
      years: 3,
      description: "HTML5 sémantique, CSS3 moderne avec animations"
    },
    {
      name: "React.js",
      level: 65,
      icon: "fab fa-react",
      years: 1,
      description: "Bibliothèque JavaScript pour interfaces utilisateur"
    },
    {
      name: "MySQL",
      level: 75,
      icon: "fas fa-database",
      years: 2,
      description: "Gestion de bases de données relationnelles"
    }
  ],
  tools: [
    {
      name: "Git/GitHub",
      level: 80,
      icon: "fab fa-git-alt",
      years: 3,
      description: "Contrôle de version et collaboration sur projets"
    }
  ],
  frameworks: [
    {
      name: "Bootstrap",
      level: 80,
      icon: "fab fa-bootstrap",
      years: 2,
      description: "Framework CSS responsive pour interfaces modernes"
    },
    {
      name: "Tailwind CSS",
      level: 75,
      icon: "fas fa-palette",
      years: 1,
      description: "Framework CSS utility-first pour développement rapide"
    },
    {
      name: "Laravel",
      level: 60,
      icon: "fab fa-laravel",
      years: 1,
      description: "Framework PHP moderne pour applications web"
    },
    {
      name: "Node.js",
      level: 65,
      icon: "fab fa-node-js",
      years: 1,
      description: "JavaScript côté serveur pour des API modernes"
    }
  ]
};

// Informations personnelles réelles
export const personalInfo: PersonalInfo = {
  name: "Tenena Yeo",
  title: "Étudiant en Développement Web",
  status: "Étudiant",
  experience: "2 ans d'apprentissage autonome",
  startYear: 2021,
  email: "tenenayeo00@gmail.com",
  location: "Côte d'Ivoire",
  github: "https://github.com/TenenaYeo",
  bio: "Étudiant passionné de développement web avec une approche autodidacte. Spécialisé dans les technologies modernes du web et toujours en quête de nouveaux défis techniques.",
  avatar: "/images/profile-avatar.jpg",
  resumeUrl: "/cv-tenena-yeo.pdf"
};

// Messages simulés pour la section contact
export const messages: Array<{
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
}> = [
  {
    id: 1,
    name: "Marie Kouassi",
    email: "marie.kouassi@example.com",
    message: "Bonjour Tenena, j'ai vu votre portfolio et je suis impressionnée par vos projets. Nous avons une opportunité de stage qui pourrait vous intéresser.",
    createdAt: "2024-12-15T14:30:00Z",
    read: false
  }
];

// Feedbacks pour les témoignages
export const feedbacks: Feedback[] = [
  {
    id: 1,
    name: "Prof. Jean Kouakou",
    feedback: "Tenena montre une progression remarquable en développement web. Ses projets démontrent une bonne compréhension des technologies modernes.",
    type: "compliment" as const,
    createdAt: "2024-11-10T09:15:00Z",
    read: true
  },
  {
    id: 2,
    name: "Yves Bamba", 
    feedback: "Très bon travail sur les projets GitHub. Le système de parrainage est une excellente idée !",
    type: "compliment" as const,
    createdAt: "2024-07-20T10:30:00Z",
    read: true
  }
];

// Export vide pour assurer que le fichier est traité comme un module ES
export {};
