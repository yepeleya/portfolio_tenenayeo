import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Code, 
  Coffee, 
  Heart, 
  Download, 
  Award,
  Target,
  Lightbulb,
  Users,
  Zap,
  Shield,
  Globe,
  Star
} from 'lucide-react';
import { downloadCVWithLoading } from '../utils/cvDownload';
import { useLoading } from '../context/LoadingContext';

const ModernAboutPage = () => {
  const [activeTab, setActiveTab] = useState('skills');
  const { setLoading } = useLoading();

  const handleDownloadCV = async () => {
    await downloadCVWithLoading(setLoading);
  };

  const skills = [
    { 
      category: "Frontend", 
      icon: Code,
      color: "blue",
      items: ["JavaScript (ES6+)", "TypeScript", "React", "Next.js", "Vue.js", "HTML5 & CSS3", "Tailwind CSS", "Sass/SCSS"],
      level: 95
    },
    { 
      category: "Backend", 
      icon: Zap,
      color: "green",
      items: ["Node.js", "Express.js", "Python", "Django", "PHP", "Laravel", "API REST", "GraphQL"],
      level: 90
    },
    { 
      category: "Bases de données", 
      icon: Shield,
      color: "purple",
      items: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Firebase"],
      level: 85
    },
    { 
      category: "DevOps & Outils", 
      icon: Globe,
      color: "orange",
      items: ["Git/GitHub", "Docker", "AWS", "Heroku", "Netlify", "VS Code", "Postman"],
      level: 80
    }
  ];

  const experiences = [
    {
      company: "Freelance",
      position: "Développeur Full-Stack",
      duration: "2020 - Présent",
      location: "Abidjan, Côte d'Ivoire",
      description: "Développement d'applications web modernes pour divers clients. Spécialisé en React, Node.js et bases de données. Accompagnement de A à Z sur les projets digitaux.",
      technologies: ["React", "Node.js", "TypeScript", "MySQL", "MongoDB", "AWS"],
      achievements: [
        "Développement de plus de 15 projets web",
        "Création de systèmes e-commerce complets",
        "Architecture de bases de données optimisées",
        "Intégration de solutions de paiement"
      ]
    }
  ];

  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Je recherche constamment de nouvelles technologies et approches pour créer des solutions créatives."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Je crois en la puissance du travail d'équipe et de la communication pour réussir les projets."
    },
    {
      icon: Target,
      title: "Excellence",
      description: "Je m'efforce de livrer un code de qualité et des expériences utilisateur exceptionnelles."
    },
    {
      icon: Heart,
      title: "Passion",
      description: "Le développement n'est pas qu'un travail pour moi, c'est une véritable passion quotidienne."
    }
  ];

  const stats = [
    { number: '15+', label: 'Projets Réalisés', icon: Award },
    { number: '3+', label: 'Années d\'Expérience', icon: Calendar },
    { number: '50+', label: 'Technologies Maîtrisées', icon: Code },
    { number: '100%', label: 'Satisfaction Client', icon: Star }
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
            Développeur passionné avec une soif d'apprendre et de créer des solutions innovantes 
            qui font la différence dans le monde numérique.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
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
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
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
                    <p className="text-gray-600 dark:text-gray-400">Abidjan, Côte d'Ivoire</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Expérience</h3>
                    <p className="text-gray-600 dark:text-gray-400">3+ années en développement</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <Coffee className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Passion</h3>
                    <p className="text-gray-600 dark:text-gray-400">Code, café et innovation</p>
                  </div>
                </div>
              </div>
            </div>

            <motion.button
              onClick={handleDownloadCV}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-3 w-full justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Download className="w-5 h-5" />
              <span>Télécharger mon CV</span>
            </motion.button>
          </motion.div>

          {/* Right side - Description */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Qui suis-je ?
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  Salut ! Je suis <strong className="text-blue-600 dark:text-blue-400">Tenena Yeo</strong>, 
                  un développeur full-stack passionné basé à Abidjan. Mon voyage dans le monde du 
                  développement a commencé par curiosité et s'est transformé en une véritable passion.
                </p>
                <p>
                  Je me spécialise dans la création d'applications web modernes et performantes en 
                  utilisant les dernières technologies. Mon approche combine créativité, technique 
                  et une attention particulière à l'expérience utilisateur.
                </p>
                <p>
                  Quand je ne code pas, vous me trouverez probablement en train d'explorer de nouvelles 
                  technologies, de boire du café ou de réfléchir à des solutions innovantes pour 
                  résoudre des problèmes complexes.
                </p>
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
          <div className="flex justify-center">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-2 rounded-2xl shadow-lg">
              <div className="flex space-x-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'skills' && (
            <div className="grid md:grid-cols-2 gap-8">
              {skills.map((skillGroup, index) => (
                <motion.div
                  key={skillGroup.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`p-3 bg-${skillGroup.color}-100 dark:bg-${skillGroup.color}-900 rounded-xl group-hover:scale-110 transition-transform`}>
                      <skillGroup.icon className={`w-6 h-6 text-${skillGroup.color}-600 dark:text-${skillGroup.color}-400`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {skillGroup.category}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-20">
                          <div 
                            className={`h-2 bg-${skillGroup.color}-500 rounded-full transition-all duration-1000`}
                            style={{ width: `${skillGroup.level}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-500">{skillGroup.level}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {skillGroup.items.map((skill) => (
                      <span
                        key={skill}
                        className="text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-lg"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {exp.position}
                      </h3>
                      <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold">
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-right mt-2 md:mt-0">
                      <p className="text-gray-600 dark:text-gray-400">{exp.duration}</p>
                      <p className="text-gray-500 dark:text-gray-500">{exp.location}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      Réalisations clés :
                    </h4>
                    <ul className="grid md:grid-cols-2 gap-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <Star className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-300">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      Technologies utilisées :
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-lg text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'values' && (
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group text-center"
                >
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ModernAboutPage;
