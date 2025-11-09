import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faExternalLinkAlt, 
  faCode, 
  faCalendarAlt,
  faStar,
  faEye,
  faFilter
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Project } from '../types';

// Données des projets directement dans le composant
const mockProjects: Project[] = [
  {
    id: 1,
    title: "Système de Parrainage ISTC",
    description: "Plateforme web complète pour la gestion du parrainage étudiant à l'ISTC. Développée avec PHP, MySQL et JavaScript, elle permet la mise en relation entre parrains et filleuls avec un système de messagerie intégré.",
    shortDescription: "Système de parrainage étudiant avec messagerie intégrée",
    image: "/images/parrainage-preview.jpg",
    images: ["/images/parrainage-preview.jpg", "/images/parrainage-2.jpg"],
    technologies: ["PHP", "MySQL", "JavaScript", "HTML/CSS", "Bootstrap"],
    category: "Web Application",
    githubUrl: "https://github.com/yepeleya/projet-parrainage-aeistc",
    liveUrl: "https://yepeleya.github.io/projet-parrainage-aeistc",
    featured: true,
    year: 2024,
    status: "completed" as const,
    clicks: 45,
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-02-28T00:00:00Z"
  },
  {
    id: 2,
    title: "Jeu Snake Python",
    description: "Mon premier projet sérieux - un jeu Snake complet développé en Python avec Pygame. Ce projet m'a appris les bases de la programmation, la gestion des événements, et la logique de jeu.",
    shortDescription: "Premier projet Python avec Pygame",
    image: "/images/snake-game.jpg",
    images: ["/images/snake-game.jpg"],
    technologies: ["Python", "Pygame"],
    category: "Game",
    githubUrl: "https://github.com/TenenaYeo/Snake-Game",
    featured: true,
    year: 2021,
    status: "completed" as const,
    clicks: 156,
    createdAt: "2021-08-15T00:00:00Z",
    updatedAt: "2021-09-01T00:00:00Z"
  },
  {
    id: 3,
    title: "Portfolio React",
    description: "Portfolio moderne développé avec React, TypeScript, Tailwind CSS et Framer Motion. Architecture modulaire et animations avancées.",
    shortDescription: "Portfolio moderne avec React et TypeScript",
    image: "/images/react-portfolio.jpg",
    images: ["/images/react-portfolio.jpg"],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    category: "Web",
    githubUrl: "https://github.com/TenenaYeo/portfolio-react",
    liveUrl: "https://portfolio-tenenayeo.vercel.app",
    featured: true,
    year: 2024,
    status: "in-progress" as const,
    clicks: 89,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-12-27T00:00:00Z"
  }
];

const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'featured' | 'others'>('all');
  const [loading, setLoading] = useState(true);

  // Charger les projets au montage
  useEffect(() => {
    const loadProjects = () => {
      setLoading(true);
      try {
        // Utiliser directement mockProjects
        setProjects(mockProjects);
        setFilteredProjects(mockProjects);
      } catch (error) {
        console.error('Erreur lors du chargement des projets:', error);
        setProjects([]);
        setFilteredProjects([]);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Filtrer les projets
  useEffect(() => {
    let filtered = projects;
    
    switch (activeFilter) {
      case 'featured':
        filtered = projects.filter(project => project.featured);
        break;
      case 'others':
        filtered = projects.filter(project => !project.featured);
        break;
      default:
        filtered = projects;
    }
    
    setFilteredProjects(filtered);
  }, [projects, activeFilter]);

  // Filtres disponibles
  const filters = [
    { 
      key: 'all' as const, 
      label: 'Tous les projets', 
      count: projects.length 
    },
    { 
      key: 'featured' as const, 
      label: 'Projets phares', 
      count: projects.filter(p => p.featured).length 
    },
    { 
      key: 'others' as const, 
      label: 'Autres réalisations', 
      count: projects.filter(p => !p.featured).length 
    }
  ];

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des projets...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Mes Projets
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Découvrez mes réalisations concrètes, du système de parrainage ISTC 
            aux applications React modernes. Chaque projet raconte une étape de mon évolution.
          </p>
        </motion.div>

        {/* Filtres */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`flex items-center px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.key
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              <FontAwesomeIcon icon={faFilter} className="mr-2" />
              {filter.label} ({filter.count})
            </button>
          ))}
        </motion.div>

        {/* Grille des projets */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Message si aucun projet */}
        {filteredProjects.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Aucun projet trouvé
            </h3>
            <p className="text-gray-500">
              Essayez un autre filtre pour voir d'autres projets.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

// Composant pour une carte de projet
interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
    >
      {/* Image du projet */}
      <div className="relative h-48 bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FontAwesomeIcon 
              icon={faCode} 
              size="3x" 
              className="text-gray-300" 
            />
          </div>
        )}
        
        {/* Badge featured */}
        {project.featured && (
          <div className="absolute top-4 left-4">
            <span className="flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
              <FontAwesomeIcon icon={faStar} className="mr-1" />
              Projet phare
            </span>
          </div>
        )}

        {/* Badge status */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
            project.status === 'completed' 
              ? 'bg-green-100 text-green-800'
              : project.status === 'in-progress'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {project.status === 'completed' ? 'Terminé' : 
             project.status === 'in-progress' ? 'En cours' : 'Planifié'}
          </span>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-6">
        {/* Titre et description */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {project.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3">
            {project.shortDescription || project.description}
          </p>
        </div>

        {/* Technologies */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md font-medium"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Meta informations */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
            {project.year}
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faEye} className="mr-1" />
            {project.clicks} vues
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          {project.githubUrl && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors"
            >
              <FontAwesomeIcon icon={faGithub} className="mr-2" />
              Code
            </motion.a>
          )}
          
          {project.liveUrl && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-2" />
              Voir
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectsSection;
