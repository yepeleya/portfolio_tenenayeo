// Données du portfolio - Tenena Yeo

export const personalInfo = {
  name: "Tenena Yeo",
  title: "Étudiant en Développement Web",
  status: "Étudiant",
  experience: "2 ans d'apprentissage autonome",
  startYear: 2021,
  email: "tenenayeo00@gmail.com",
  location: "Côte d'Ivoire",
  bio: "Étudiant passionné de développement web avec 2 ans d'apprentissage autonome. Spécialisé en JavaScript, React, PHP et MySQL. Toujours à la recherche de nouveaux défis techniques et désireux d'approfondir mes connaissances en TypeScript et technologies modernes.",
  interests: [
    "Développement Web",
    "Programmation", 
    "Technologies émergentes",
    "Apprentissage continu",
    "Projets open source"
  ]
};

export const skillsProgress = {
  languages: [
    { name: "Python", level: 75, icon: "🐍", years: 3, description: "Premier langage appris - solides bases" },
    { name: "JavaScript", level: 80, icon: "⚡", years: 2, description: "Langage principal pour le web" },
    { name: "PHP", level: 70, icon: "🚀", years: 2, description: "Backend et projets scolaires" },
    { name: "TypeScript", level: 45, icon: "🔷", years: 0.5, description: "En cours d'apprentissage" }
  ],
  web: [
    { name: "HTML/CSS", level: 85, icon: "🎨", years: 2, description: "Maîtrise avancée du responsive" },
    { name: "React", level: 65, icon: "⚛️", years: 1, description: "Framework JavaScript principal" },
    { name: "Bootstrap", level: 75, icon: "🎯", years: 2, description: "Framework CSS de référence" },
    { name: "Tailwind CSS", level: 60, icon: "💨", years: 0.8, description: "Utility-first CSS moderne" }
  ],
  backend: [
    { name: "MySQL", level: 70, icon: "🗄️", years: 2, description: "Base de données relationnelle" },
    { name: "Git/GitHub", level: 75, icon: "📝", years: 2, description: "Versioning et collaboration" },
    { name: "REST APIs", level: 55, icon: "🔌", years: 1, description: "Développement d'APIs" }
  ],
  learning: [
    { name: "Node.js", level: 25, icon: "💚", planned: true, description: "Objectif 2024" },
    { name: "Vue.js", level: 15, icon: "💡", planned: true, description: "Alternative à React" },
    { name: "MongoDB", level: 15, icon: "🍃", planned: true, description: "Alternative à MySQL" }
  ]
};

export const mockStats = {
  totalVisitors: 450,
  uniqueVisitors: 280,
  pageViews: 850,
  bounceRate: 35,
  avgSessionDuration: "3m 45s",
  topPages: [
    { page: "/", views: 320 },
    { page: "/about", views: 180 },
    { page: "/projects", views: 150 }
  ]
};

export const mockMessages = [
  {
    id: 1,
    name: "Marie Koffi",
    email: "marie.koffi@email.com", 
    subject: "Opportunité de collaboration",
    message: "Bonjour Tenena, j'ai vu votre système de parrainage ISTC et je suis impressionnée. Nous aimerions discuter d'une possible collaboration pour notre startup EdTech.",
    date: "2024-03-15T14:30:00Z",
    read: false
  },
  {
    id: 2,
    name: "Ahmed Touré",
    email: "ahmed.toure@company.com",
    subject: "Stage développeur web",
    message: "Salut Tenena ! Votre portfolio montre de belles compétences en React. Nous avons une opportunité de stage de 3 mois chez nous. Êtes-vous intéressé ?",
    date: "2024-03-14T09:15:00Z",
    read: false
  },
  {
    id: 3,
    name: "Fatou Diallo",
    email: "f.diallo@istc.edu",
    subject: "Feedback sur le système de parrainage",
    message: "Excellent travail sur la plateforme de parrainage ! Les étudiants l'utilisent beaucoup. Avez-vous prévu d'ajouter une fonctionnalité de calendrier ?",
    date: "2024-03-13T16:45:00Z",
    read: true
  }
];

export const mockFeedbacks = [
  {
    id: 1,
    name: "Sarah Konaté",
    feedback: "Portfolio très professionnel ! J'aime particulièrement l'interface admin et les animations fluides.",
    type: "compliment" as const,
    createdAt: "2024-03-10T12:00:00Z",
    read: false
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
