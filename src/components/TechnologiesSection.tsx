import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TechnologyCard from './TechnologyCard';
import { myTechnologies, getSkillsByCategory, getCoreSkills, getSkillsInLearning, TechSkill } from '../data/technologies';

const TechnologiesSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Filtres disponibles
  const filters = [
    { key: 'all', label: 'Toutes', count: myTechnologies.length },
    { key: 'core', label: 'Principales', count: getCoreSkills().length },
    { key: 'frontend', label: 'Frontend', count: getSkillsByCategory('frontend').length },
    { key: 'backend', label: 'Backend', count: getSkillsByCategory('backend').length },
    { key: 'database', label: 'Base de données', count: getSkillsByCategory('database').length },
    { key: 'devops', label: 'DevOps', count: getSkillsByCategory('devops').length },
    { key: 'language', label: 'Langages appris', count: getSkillsByCategory('language').length }
  ];

  // Logique de filtrage
  const getFilteredSkills = (): TechSkill[] => {
    switch (activeFilter) {
      case 'core':
        return getCoreSkills();
      case 'frontend':
        return getSkillsByCategory('frontend');
      case 'backend':
        return getSkillsByCategory('backend');
      case 'database':
        return getSkillsByCategory('database');
      case 'devops':
        return getSkillsByCategory('devops');
      case 'language':
        return getSkillsByCategory('language');
      case 'learning':
        return getSkillsInLearning();
      default:
        return myTechnologies;
    }
  };

  const filteredSkills = getFilteredSkills();

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Mes Compétences Techniques
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Découvrez mes compétences organisées par domaines selon vos spécifications
          </p>
        </motion.div>

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
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.key
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 shadow-md'
              }`}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredSkills.map((skill: TechSkill, index: number) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <TechnologyCard skill={skill} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologiesSection;
