// Compétences techniques réelles de Tenena - Étudiant (2 ans d'apprentissage autonome)
export const skillsData = {
  programmingLanguages: [
    { 
      name: "JavaScript", 
      level: 80, 
      icon: "⚡", 
      startYear: 2022, 
      description: "Langage principal pour le développement web",
      status: "Niveau avancé"
    },
    { 
      name: "PHP", 
      level: 75, 
      icon: "🐘", 
      startYear: 2023, 
      description: "Backend web et développement de projets",
      status: "Niveau avancé"
    },
    { 
      name: "TypeScript", 
      level: 70, 
      icon: "�", 
      startYear: 2024, 
      description: "JavaScript typé pour applications robustes",
      status: "En cours d'approfondissement"
    },
    { 
      name: "Python", 
      level: 45, 
      icon: "🐍", 
      startYear: 2021, 
      description: "Premier langage appris, mais plus utilisé depuis longtemps",
      status: "Moins utilisé maintenant"
    },
    { 
      name: "C", 
      level: 40, 
      icon: "⚙️", 
      startYear: 2022, 
      description: "Bases apprises, mais peu pratiqué récemment",
      status: "Peu utilisé"
    }
  ],
  webTechnologies: [
    { name: "HTML5 & CSS3", level: 85, icon: "�", startYear: 2022, status: "Maîtrisé" },
    { name: "Bootstrap", level: 80, icon: "🥾", startYear: 2023, status: "Avancé" },
    { name: "Tailwind CSS", level: 75, icon: "💨", startYear: 2023, status: "Avancé" },
    { name: "React.js", level: 65, icon: "⚛️", startYear: 2023, status: "Intermédiaire" }
  ],
  frameworks: [
    { 
      name: "Laravel", 
      level: 60, 
      icon: "🏗️", 
      startYear: 2024, 
      description: "Framework PHP moderne",
      status: "En apprentissage"
    }
  ],
  databases: [
    { 
      name: "MySQL", 
      level: 75, 
      icon: "🗄️", 
      startYear: 2023, 
      description: "Base de données relationnelle principale",
      status: "Avancé"
    }
  ],
  tools: [
    { name: "Git/GitHub", level: 80, icon: "🐙", startYear: 2023, status: "Avancé" }
  ],
  learning: [
    { 
      name: "Node.js", 
      level: 65, 
      icon: "💚", 
      planned: false, 
      description: "JavaScript côté serveur",
      status: "En apprentissage"
    }
  ]
};

// Informations de progression
export const learningJourney = {
  startDate: "2021-09-01",
  currentLevel: "Développeur Junior",
  totalHours: 1500, // Estimation sur 2 ans
  completedProjects: 2,
  inProgressProjects: 1,
  goals2025: [
    "Maîtriser TypeScript",
    "Apprendre Node.js",
    "Explorer MongoDB",
    "Créer plus de projets open source"
  ]
};

export default skillsData;
