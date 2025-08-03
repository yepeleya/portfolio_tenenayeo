import { 
  faHtml5, 
  faJs, 
  faBootstrap, 
  faPhp, 
  faNodeJs,
  faGitAlt,
  faReact,
  faPython
} from '@fortawesome/free-brands-svg-icons';
import { 
  faDatabase, 
  faCode 
} from '@fortawesome/free-solid-svg-icons';

// Interface pour les compétences techniques
export interface TechSkill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'language' | 'tool' | 'learning';
  icon: any;
  years: number;
  description: string;
  projects: string[];
  isCore?: boolean;
  startYear?: number;
}

// Mes compétences techniques actuelles selon vos spécifications
export const myTechnologies: TechSkill[] = [
  // Frontend
  {
    name: "HTML & CSS",
    level: 85,
    category: "frontend",
    icon: faHtml5,
    years: 3,
    description: "Maîtrise du HTML5 sémantique et CSS3 moderne avec animations",
    projects: ["Portfolio", "Système de Parrainage ISTC"]
  },
  {
    name: "JavaScript",
    level: 80,
    category: "frontend",
    icon: faJs,
    years: 3,
    description: "JavaScript ES6+, manipulation DOM, événements et API",
    projects: ["Portfolio React", "Jeu Snake", "Système de Parrainage"]
  },
  {
    name: "Tailwind CSS",
    level: 75,
    category: "frontend",
    icon: faCode,
    years: 1,
    description: "Framework CSS utility-first pour un développement rapide",
    projects: ["Portfolio React"]
  },
  {
    name: "Bootstrap",
    level: 80,
    category: "frontend",
    icon: faBootstrap,
    years: 2,
    description: "Framework CSS responsive pour des interfaces modernes",
    projects: ["Système de Parrainage ISTC"]
  },
  {
    name: "TypeScript",
    level: 70,
    category: "frontend",
    icon: faCode,
    years: 1,
    description: "JavaScript typé pour des applications plus robustes",
    projects: ["Portfolio React"]
  },
  {
    name: "React.js",
    level: 65,
    category: "frontend",
    icon: faReact,
    years: 1,
    description: "Bibliothèque JavaScript pour interfaces utilisateur",
    projects: ["Portfolio moderne"]
  },

  // Backend
  {
    name: "PHP",
    level: 75,
    category: "backend",
    icon: faPhp,
    years: 2,
    description: "Développement backend avec PHP natif et orienté objet",
    projects: ["Système de Parrainage ISTC"]
  },
  {
    name: "Laravel",
    level: 60,
    category: "backend",
    icon: faPhp,
    years: 1,
    description: "Framework PHP moderne pour applications web robustes",
    projects: ["En apprentissage"]
  },
  {
    name: "Node.js",
    level: 65,
    category: "backend",
    icon: faNodeJs,
    years: 1,
    description: "JavaScript côté serveur pour des API modernes",
    projects: ["API REST en cours"]
  },

  // Base de données
  {
    name: "MySQL",
    level: 75,
    category: "database",
    icon: faDatabase,
    years: 2,
    description: "Gestion de bases de données relationnelles",
    projects: ["Système de Parrainage ISTC"]
  },

  // DevOps et outils
  {
    name: "Git/GitHub",
    level: 80,
    category: "devops",
    icon: faGitAlt,
    years: 3,
    description: "Contrôle de version et collaboration sur projets",
    projects: ["Tous mes projets"]
  },

  // Langages appris mais moins utilisés
  {
    name: "Python",
    level: 45,
    category: "language",
    icon: faPython,
    years: 4,
    description: "Premier langage appris, mais plus utilisé depuis longtemps",
    projects: ["Projets d'apprentissage"]
  },
  {
    name: "C",
    level: 40,
    category: "language",
    icon: faCode,
    years: 1,
    description: "Bases apprises, mais peu pratiqué récemment",
    projects: ["Exercices académiques"]
  }
];

// Fonctions utilitaires
export const getSkillsByCategory = (category: string) => {
  return myTechnologies.filter(skill => skill.category === category);
};

export const getCoreSkills = () => {
  return myTechnologies.filter(skill => skill.level >= 75);
};

export const getSkillsInLearning = () => {
  return myTechnologies.filter(skill => skill.level < 75);
};

export const getTotalExperience = () => {
  return Math.max(...myTechnologies.map(skill => skill.years));
};

export default myTechnologies;