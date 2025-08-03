import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TechSkill } from '../data/technologies';

interface TechnologyCardProps {
  skill: TechSkill;
  index: number;
}

const TechnologyCard: React.FC<TechnologyCardProps> = ({ skill, index }) => {
  // Couleurs selon la catégorie
  const getCategoryColor = (category: TechSkill['category']) => {
    switch (category) {
      case 'language':
        return 'from-blue-500 to-purple-600';
      case 'frontend':
        return 'from-green-500 to-teal-600';
      case 'backend':
        return 'from-orange-500 to-red-600';
      case 'database':
        return 'from-yellow-500 to-orange-600';
      case 'tool':
        return 'from-gray-500 to-gray-700';
      case 'learning':
        return 'from-pink-500 to-rose-600';
      default:
        return 'from-blue-500 to-purple-600';
    }
  };

  // Animation de la barre de progression
  const progressVariants = {
    hidden: { width: 0 },
    visible: { 
      width: `${skill.level}%`,
      transition: { 
        duration: 1.5, 
        delay: index * 0.1,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
      }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:border-gray-200 transition-all duration-300"
    >
      {/* En-tête avec icône et nom */}
      <div className="flex items-center mb-4">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getCategoryColor(skill.category)} flex items-center justify-center text-white text-xl mr-4`}>
          <FontAwesomeIcon icon={skill.icon} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800 flex items-center">
            {skill.name}
            {skill.isCore && (
              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                Core
              </span>
            )}
            {skill.category === 'learning' && (
              <span className="ml-2 px-2 py-1 bg-pink-100 text-pink-800 text-xs font-medium rounded-full">
                En cours
              </span>
            )}
          </h3>
          <p className="text-sm text-gray-500">
            {skill.years > 0 ? `${skill.years} an${skill.years > 1 ? 's' : ''}` : 'Nouveau'} d'expérience
          </p>
        </div>
      </div>

      {/* Barre de progression */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Niveau</span>
          <span className="text-sm font-bold text-gray-800">{skill.level}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className={`h-2 rounded-full bg-gradient-to-r ${getCategoryColor(skill.category)}`}
            variants={progressVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          />
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
        {skill.description}
      </p>

      {/* Projets (si disponibles) */}
      {skill.projects && skill.projects.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">
            Projets réalisés
          </h4>
          <div className="flex flex-wrap gap-1">
            {skill.projects.slice(0, 2).map((project, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
              >
                {project}
              </span>
            ))}
            {skill.projects.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-md">
                +{skill.projects.length - 2} autres
              </span>
            )}
          </div>
        </div>
      )}

      {/* Année de début */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <span className="text-xs text-gray-500">
          Depuis {skill.startYear}
        </span>
      </div>
    </motion.div>
  );
};

export default TechnologyCard;
