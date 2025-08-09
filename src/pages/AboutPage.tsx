import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Code, 
  Coffee, 
  Heart, 
  Award,
  Target,
  Lightbulb,
  Users,
  Zap,
  Shield,
  Globe,
  Star,
  BookOpen,
  Sparkles,
  CheckCircle,
  TrendingUp
} from 'lucide-react';
import { skillsData, learningJourney } from '../utils/skillsData';

const AboutPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'skills' | 'experience' | 'values'>('skills');

  // Mes informations personnelles réelles
  const personalInfo = {
    name: "Tenena Yeo",
    title: "Étudiant en Développement Web",
    bio: "Étudiant passionné de développement web avec une approche autodidacte. Spécialisé dans les technologies modernes du web et toujours en quête de nouveaux défis techniques.",
    experience: "3+ ans d'apprentissage autonome",
    startYear: 2021,
    email: "tenenayeo00@gmail.com",
    location: "Côte d'Ivoire",
    github: "https://github.com/yepeleya"
  };

  // Statistiques mises à jour
  const stats = [
    { number: '5+', label: 'Projets Réalisés', icon: Award },
    { number: '3+', label: 'Années d\'Apprentissage', icon: Calendar },
    { number: '10+', label: 'Technologies', icon: Code },
    { number: '100%', label: 'Satisfaction Client', icon: Star }
  ];

  // Données d'expérience basées sur le parcours réel
  const experienceData = [
    {
      year: "2021",
      title: "Début de l'aventure",
      description: "Premier contact avec la programmation via Python",
      details: "Découverte de la programmation avec Python - premiers pas dans le monde du code",
      icon: "🐍",
      technologies: ["Python", "Pygame"]
    },
    {
      year: "2022", 
      title: "Transition vers le Web",
      description: "Découverte du développement web",
      details: "Apprentissage d'HTML, CSS, JavaScript et bases du C - transition vers le web",
      icon: "🌐",
      technologies: ["HTML5", "CSS3", "JavaScript", "C"]
    },
    {
      year: "2023",
      title: "Consolidation des bases",
      description: "Approfondissement des technologies web",
      details: "Maîtrise de PHP, MySQL, Bootstrap, React.js et Git/GitHub - consolidation des compétences",
      icon: "🚀",
      technologies: ["PHP", "MySQL", "Bootstrap", "React.js", "Git/GitHub"]
    },
    {
      year: "2024",
      title: "Projets et spécialisation",
      description: "Réalisation de projets concrets",
      details: "Apprentissage TypeScript et Laravel, développement de projets réels avec satisfaction client",
      icon: "💼",
      technologies: ["TypeScript", "Laravel", "Tailwind CSS"]
    }
  ];

  // Mes valeurs (style moderne)
  const values = [
    {
      icon: BookOpen,
      title: "Apprentissage Continu",
      description: "Je crois en l'importance de ne jamais cesser d'apprendre et de rester curieux face aux nouvelles technologies."
    },
    {
      icon: Sparkles,
      title: "Qualité du Code",
      description: "J'attache une grande importance à écrire du code propre, lisible et maintenable."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Le développement est un travail d'équipe. J'aime partager mes connaissances et apprendre des autres."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "J'aime explorer de nouvelles approches et technologies pour résoudre des problèmes complexes."
    },
    {
      icon: Target,
      title: "Persévérance",
      description: "Face aux défis techniques, je persévère jusqu'à trouver une solution élégante."
    },
    {
      icon: Heart,
      title: "Impact Positif",
      description: "Je veux créer des applications qui apportent une valeur réelle aux utilisateurs."
    }
  ];

  const tabs = [
    { id: 'skills', label: 'Compétences', icon: Code },
    { id: 'experience', label: 'Expérience', icon: Award },
    { id: 'values', label: 'Valeurs', icon: Heart }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-6 py-16">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            À propos de{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              moi
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {personalInfo.bio}
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 group"
            >
              <div className="mb-4">
                <stat.icon className="w-8 h-8 mx-auto text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Personal Info Section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-20">
          {/* Left side - Personal info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Mon Parcours
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Localisation</h3>
                    <p className="text-gray-600 dark:text-gray-400">{personalInfo.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Expérience</h3>
                    <p className="text-gray-600 dark:text-gray-400">{personalInfo.experience}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <Coffee className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Passion</h3>
                    <p className="text-gray-600 dark:text-gray-400">Développement web moderne</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Objectif</h3>
                    <p className="text-gray-600 dark:text-gray-400">Devenir développeur full-stack expert</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Avatar and CTA */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center space-y-8"
          >
            <div className="relative">
              <div className="w-64 h-64 bg-gradient-to-br from-blue-500 via-purple-600 to-blue-700 rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-6xl text-white font-bold">TY</span>
              </div>
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {personalInfo.name}
              </h3>
              <p className="text-blue-600 dark:text-blue-400 font-semibold">
                {personalInfo.title}
              </p>
              
              <div className="flex space-x-4 justify-center">
                <a 
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Code className="w-5 h-5 mr-2" />
                  GitHub
                </a>
                <a 
                  href={`mailto:${personalInfo.email}`}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Contact
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'skills' | 'experience' | 'values')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                    : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-[400px]"
          >
            {/* Skills Tab */}
            {activeTab === 'skills' && (
              <div className="space-y-12">
                {/* Langages de programmation */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                    💻 Langages de Programmation
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {skillsData.programmingLanguages.map((skill, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <span className="text-3xl">{skill.icon}</span>
                            <div>
                              <h4 className="font-bold text-lg text-gray-900 dark:text-white">{skill.name}</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Depuis {skill.startYear}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{skill.level}%</span>
                          </div>
                        </div>
                        
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }}
                            viewport={{ once: true }}
                            className={`h-3 rounded-full ${
                              skill.level >= 75 ? 'bg-green-500' :
                              skill.level >= 60 ? 'bg-yellow-500' :
                              skill.level >= 40 ? 'bg-orange-500' :
                              'bg-red-500'
                            }`}
                          />
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{skill.description}</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          skill.status === 'Niveau avancé' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          skill.status === 'En cours d\'approfondissement' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          skill.status === 'Moins utilisé maintenant' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                        }`}>
                          {skill.status}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Technologies Web */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                    🌐 Technologies Web
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {skillsData.webTechnologies.map((skill, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 text-center rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                      >
                        <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform">{skill.icon}</span>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">{skill.name}</h4>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }}
                            viewport={{ once: true }}
                            className={`h-2 rounded-full ${
                              skill.level >= 80 ? 'bg-green-500' :
                              skill.level >= 70 ? 'bg-blue-500' :
                              'bg-purple-500'
                            }`}
                          />
                        </div>
                        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{skill.level}%</span>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{skill.status}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Frameworks, Bases de données et Outils */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Frameworks */}
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center flex items-center justify-center">
                      <Zap className="w-6 h-6 mr-2 text-purple-600" />
                      Frameworks
                    </h4>
                    {skillsData.frameworks.map((skill, index) => (
                      <div key={index} className="mb-4 last:mb-0">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-800 dark:text-gray-200">{skill.name}</span>
                          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="h-2 rounded-full bg-purple-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Base de données */}
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center flex items-center justify-center">
                      <Shield className="w-6 h-6 mr-2 text-blue-600" />
                      Bases de Données
                    </h4>
                    {skillsData.databases.map((skill, index) => (
                      <div key={index} className="mb-4 last:mb-0">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-800 dark:text-gray-200">{skill.name}</span>
                          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="h-2 rounded-full bg-blue-600"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Outils */}
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center flex items-center justify-center">
                      <Globe className="w-6 h-6 mr-2 text-gray-600" />
                      Outils
                    </h4>
                    {skillsData.tools.map((skill, index) => (
                      <div key={index} className="mb-4 last:mb-0">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-800 dark:text-gray-200">{skill.name}</span>
                          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="h-2 rounded-full bg-gray-800 dark:bg-gray-400"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies en apprentissage */}
                {skillsData.learning && skillsData.learning.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                      🌱 Technologies en Apprentissage
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {skillsData.learning.map((skill, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 backdrop-blur-sm p-6 rounded-2xl border border-green-200 dark:border-green-800 shadow-lg"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-4">
                              <span className="text-3xl">{skill.icon}</span>
                              <span className="font-bold text-lg text-gray-900 dark:text-white">{skill.name}</span>
                            </div>
                            <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                              {skill.status}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
                            <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }}
                              viewport={{ once: true }}
                              className="h-3 rounded-full bg-green-600"
                            />
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{skill.description}</p>
                          <span className="text-lg font-bold text-green-600 dark:text-green-400">{skill.level}%</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Experience Tab */}
            {activeTab === 'experience' && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                  📈 Mon Parcours de Développement
                </h3>
                {experienceData.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl shadow-lg">
                          {exp.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                          <span className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-bold">
                            <Calendar className="w-4 h-4 mr-1" />
                            {exp.year}
                          </span>
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white">{exp.title}</h4>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 font-medium mb-3">{exp.description}</p>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">{exp.details}</p>
                        
                        {exp.technologies && (
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech, techIndex) => (
                              <span 
                                key={techIndex}
                                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Values Tab */}
            {activeTab === 'values' && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                  💎 Mes Valeurs & Philosophie
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {values.map((value, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 group"
                    >
                      <div className="mb-4">
                        <value.icon className="w-12 h-12 mx-auto text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{value.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{value.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Objectifs 2025 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-blue-900/20 backdrop-blur-sm rounded-3xl p-8 shadow-lg"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              🎯 Mes Objectifs 2025
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Mes ambitions pour continuer à évoluer dans le développement web
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {learningJourney.goals2025.map((goal, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 group"
              >
                <CheckCircle className="w-6 h-6 text-green-500 mr-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-gray-800 dark:text-gray-200 font-medium">{goal}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Prêt à collaborer ?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Si vous avez un projet intéressant ou souhaitez discuter de développement web, 
            n'hésitez pas à me contacter. Je suis toujours ouvert aux nouvelles opportunités !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Heart className="w-5 h-5 mr-2" />
              Contactez-moi
            </a>
            <a 
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-gray-900 dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-gray-900 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Code className="w-5 h-5 mr-2" />
              Voir mon GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
