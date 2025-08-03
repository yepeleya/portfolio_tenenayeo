import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Filter, Search, Code, Eye, Star, Calendar } from 'lucide-react';

const ModernProjectsPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const projects = useMemo(() => [
    {
      id: 1,
      title: "Système de Parrainage ISTC Polytechnique",
      description: "Application web complète pour gérer l'attribution automatique de parrains et filleuls à l'ISTC Polytechnique avec export PDF.",
      fullDescription: "Un système web sophistiqué développé pour l'ISTC Polytechnique permettant de gérer efficacement l'attribution de parrains et filleuls. L'application permet l'upload de fichiers CSV, génère automatiquement des tableaux d'attribution, et offre des fonctionnalités d'export PDF avec jsPDF. Interface moderne avec sélection d'année académique et filière, conçue pour être responsive et intuitive.",
      technologies: ["HTML5", "CSS3", "JavaScript", "jsPDF", "FileReader API", "Responsive Design"],
      category: "frontend",
      github: "https://github.com/yepeleya/projet-parrainage",
      external: "https://yepeleya.github.io/projet-parrainage",
      image: "/api/placeholder/600/400",
      featured: true,
      status: "completed",
      year: "2024",
      rating: 5
    },
    {
      id: 2,
      title: "Plateforme JIG 2026 - Journée de l'Infographiste",
      description: "Système complet de gestion d'événement pour la JIG de l'ISTC Polytechnique avec authentification multi-rôles et paiement intégré.",
      fullDescription: "Une plateforme web complète développée pour gérer la Journée de l'Infographiste de l'ISTC Polytechnique. Le système comprend une authentification multi-rôles (Admin, Participant, Votant), la soumission de projets avec upload sécurisé, un système de vote avec paiement CinetPay, des dashboards administrateur et participant, une galerie des éditions précédentes, et un programme détaillé. Architecture sécurisée avec protection CSRF et validation avancée des fichiers.",
      technologies: ["PHP 8+", "MySQL", "Bootstrap 5", "CinetPay API", "Chart.js", "Sécurité CSRF"],
      category: "fullstack",
      github: "https://github.com/yepeleya/jig2026",
      external: "#",
      image: "/api/placeholder/600/400",
      featured: true,
      status: "in-progress",
      year: "2024",
      rating: 5
    },
    {
      id: 3,
      title: "Convertisseur de Devises",
      description: "Application de conversion de devises avec taux de change en temps réel et interface utilisateur intuitive.",
      fullDescription: "Une application web de conversion de devises utilisant des API de taux de change en temps réel. Interface utilisateur moderne et responsive avec historique des conversions stocké localement.",
      technologies: ["JavaScript", "API REST", "CSS3", "LocalStorage"],
      category: "frontend",
      github: "https://github.com/yepeleya/currency-converter",
      external: "https://yepeleya.github.io/currency-converter",
      image: "/api/placeholder/600/400",
      featured: false,
      status: "completed",
      year: "2024",
      rating: 4
    },
    {
      id: 4,
      title: "Générateur de QR Code",
      description: "Application web pour générer des QR codes personnalisés avec différents formats et options de styling.",
      fullDescription: "Un générateur de QR codes avancé permettant de créer des codes personnalisés avec différentes options de styling, formats, et couleurs. Utilise l'API Canvas pour le rendu et offre des options d'export.",
      technologies: ["JavaScript", "qrcode.js", "Canvas API", "CSS3"],
      category: "frontend",
      github: "https://github.com/yepeleya/qr-generator",
      external: "https://yepeleya.github.io/qr-generator",
      image: "/api/placeholder/600/400",
      featured: false,
      status: "completed",
      year: "2023",
      rating: 4
    },
    {
      id: 5,
      title: "Todo App Interactive",
      description: "Application de gestion de tâches avec fonctionnalités d'ajout, suppression et marquage comme complété.",
      fullDescription: "Une application de gestion de tâches moderne avec interface utilisateur intuitive. Permet d'ajouter, supprimer, modifier et marquer les tâches comme complétées. Utilise le LocalStorage pour la persistance des données.",
      technologies: ["React", "LocalStorage", "CSS3", "JavaScript"],
      category: "frontend",
      github: "https://github.com/yepeleya/todo-app",
      external: "https://yepeleya.github.io/todo-app",
      image: "/api/placeholder/600/400",
      featured: false,
      status: "completed",
      year: "2023",
      rating: 3
    },
    {
      id: 6,
      title: "Calculatrice Scientifique",
      description: "Calculatrice web avec fonctions scientifiques avancées et interface utilisateur moderne.",
      fullDescription: "Une calculatrice scientifique complète avec toutes les fonctions mathématiques avancées. Interface utilisateur moderne et responsive avec historique des calculs et modes différents pour diverses opérations scientifiques.",
      technologies: ["JavaScript", "HTML5", "CSS3", "Math.js"],
      category: "frontend",
      github: "https://github.com/yepeleya/scientific-calculator",
      external: "https://yepeleya.github.io/scientific-calculator",
      image: "/api/placeholder/600/400",
      featured: false,
      status: "completed",
      year: "2023",
      rating: 4
    }
  ], []);

  const categories = [
    { id: 'all', name: 'Tous les projets', count: projects.length },
    { id: 'fullstack', name: 'Full-Stack', count: projects.filter(p => p.category === 'fullstack').length },
    { id: 'frontend', name: 'Frontend', count: projects.filter(p => p.category === 'frontend').length },
    { id: 'backend', name: 'Backend', count: projects.filter(p => p.category === 'backend').length },
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesFilter = selectedFilter === 'all' || project.category === selectedFilter;
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesFilter && matchesSearch;
    });
  }, [selectedFilter, searchTerm, projects]);

  const featuredProjects = filteredProjects.filter(project => project.featured);
  const otherProjects = filteredProjects.filter(project => !project.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-6 py-16">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Mes{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Projets
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Découvrez une sélection de mes réalisations, des applications web complètes 
            aux APIs robustes, chaque projet raconte une histoire d'innovation et de qualité.
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un projet ou une technologie..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedFilter(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      selectedFilter === category.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <Filter className="w-4 h-4" />
                    <span>{category.name}</span>
                    <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <Star className="w-8 h-8 text-yellow-500 mr-3" />
              Projets Phares
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  {/* Project Image */}
                  <div className="relative h-64 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === 'completed' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                      }`}>
                        {project.status === 'completed' ? 'Terminé' : 'En cours'}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 flex items-center space-x-1">
                      {[...Array(project.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <div className="flex items-center space-x-2 text-white">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-medium">{project.year}</span>
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-lg text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4">
                      <motion.a
                        href={project.external}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Voir le projet</span>
                      </motion.a>
                      
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-400 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium rounded-xl transition-all duration-300"
                      >
                        <Github className="w-4 h-4" />
                        <span>Code</span>
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <Code className="w-8 h-8 text-blue-600 mr-3" />
              Autres Réalisations
            </h2>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence>
                {otherProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6"
                  >
                    {/* Project Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                        <Code className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex space-x-2">
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          <Github className="w-5 h-5" />
                        </motion.a>
                        <motion.a
                          href={project.external}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </motion.a>
                      </div>
                    </div>

                    {/* Project Content */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-1 rounded text-xs">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Project Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{project.year}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(project.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.section>
        )}

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Aucun projet trouvé
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Essayez de modifier vos critères de recherche ou de filtrage.
            </p>
            <button
              onClick={() => {
                setSelectedFilter('all');
                setSearchTerm('');
              }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-300"
            >
              Réinitialiser les filtres
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ModernProjectsPage;
